import _ from 'lodash';
import express from 'express';
import morgan from 'morgan';
import connectBusboy from 'connect-busboy';
import pako from 'pako';
import consumers from 'stream/consumers';
import Hash from 'typestub-ipfs-only-hash';
import { getDb, RKEY_FRESH_UPLOAD_HASHES, RKEY_PKG_HASHES, RKEY_EXTRA_HASHES } from './db';
import { DeploymentInfo } from '@usecannon/builder';

let rdb: Awaited<ReturnType<typeof getDb>>;
const RKEY_FRESH_GRACE_PERIOD = 5 * 60; // 5 minutes, or else we delete any uploaded artifacts from fresh

if (!process.env.REDIS_URL) {
  throw new Error('please set REDIS_URL');
}

if (!process.env.UPSTREAM_IPFS_URL) {
  throw new Error('please set UPSTREAM_IPFS_URL');
}

const app = express();
const port = process.env.PORT || '3000';

const upstreamIpfs = process.env.UPSTREAM_IPFS_URL;

app.use(morgan('short'));
app.use(connectBusboy({ immediate: true }));

app.post('/api/v0/add', async (req, res) => {
  // check to ensure the uploaded artifact is a cannon package
  if (req.busboy) {
    let fileReceived = false;
    req.busboy.on('file', async (_name, stream) => {
      fileReceived = true;
      // compute resulting IPFS hash from the uploaded data
      const rawData = await consumers.buffer(stream);
      const ipfsHash = await Hash.of(rawData);

      const now = Math.floor(Date.now() / 1000) + RKEY_FRESH_GRACE_PERIOD;

      let isSavable =
        (await rdb.zScore(RKEY_FRESH_UPLOAD_HASHES, ipfsHash)) !== null ||
        (await rdb.zScore(RKEY_PKG_HASHES, ipfsHash)) !== null;

      // if IPFS hash is not already allowed, lets see if this is a cannon package
      if (!isSavable) {
        try {
          const pkgData: DeploymentInfo = JSON.parse(pako.inflate(rawData, { to: 'string' }));
          //const def = new ChainDefinition(pkgData.def);

          // package is valid. Add to upload hashes
          isSavable = true;

          const miscIpfsHash = _.last(pkgData.miscUrl.split('://'))!;

          // as a special step here, we also save the misc url (we dont want to save it anywhere else)
          await rdb.zAdd(RKEY_FRESH_UPLOAD_HASHES, { score: now, value: miscIpfsHash }, { NX: true });
        } catch (err) {
          // pkg is not savable
          console.log('cannon package reading fail', err);
          return res.status(400).end('does not appear to be cannon package');
        }
      }

      if (isSavable) {
        // ensure the file is marked as a fresh upload
        await rdb.zAdd(RKEY_FRESH_UPLOAD_HASHES, { score: now, value: ipfsHash }, { NX: true });

        const form = new FormData();
        form.set('file', new File([rawData], 'file.txt'));
        try {
          const upstreamRes = await fetch(upstreamIpfs + req.url, {
            method: 'POST',
            body: form,
          });

          const upstreamBody = new TextDecoder().decode(await upstreamRes.arrayBuffer());
          return res.status(200).end(upstreamBody);
        } catch (err) {
          console.log('cannon package upload to IPFS fail', err);
          return res.status(500).end('ipfs write error');
        }
      } else {
        return res.status(400).end('ipfs artifact not accepted');
      }
    });
    req.busboy.on('finish', () => {
      if (!fileReceived) {
        return res.status(400).end('no upload data');
      }
    });
  } else {
    return res.status(400).end('no upload data');
  }
});

app.post('/api/v0/cat', async (req, res) => {
  // optimistically, start the upstream request immediately to save time
  const upstreamRes = await fetch(upstreamIpfs + req.url, {
    method: 'POST',
  });

  const ipfsHash = req.query.arg as string;
  if (!ipfsHash || ipfsHash.length === 0) {
    // the exact error message for this 400 error is necessary for backwards compatibility
    return res.status(400).end('argument "ipfs-path" is required');
  }
  // if the IPFS hash is in our database, go ahead and proxy the request
  const batch = rdb.multi();
  batch.zScore(RKEY_FRESH_UPLOAD_HASHES, ipfsHash);
  batch.zScore(RKEY_PKG_HASHES, ipfsHash);
  batch.zScore(RKEY_EXTRA_HASHES, ipfsHash);
  const existsResult = await batch.exec();
  const hashisRepod = _.some(existsResult, _.isNumber);

  if (hashisRepod) {
    try {
      const contentLength = upstreamRes.headers.get('content-length') || '' || upstreamRes.headers.get('x-content-length');
      res.setHeader('Content-Type', 'application/octet-stream');
      // NOTE: transfer-encoding apparently cant be sent at same time as content-length. and content length is better
      //res.setHeader('Transfer-Encoding', 'chunked');
      if (contentLength) {
        res.setHeader('Content-Length', contentLength);
      }

      // TODO: wtp does typescript think this doesn't work. literally on mdn example https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream#async_iteration_of_a_stream_using_for_await...of
      for await (const chunk of upstreamRes.body! as any) {
        res.write(Buffer.from(chunk));
      }
      return res.end();
    } catch (err) {
      console.log('cannon package download from IPFS fail', err);
      return res.status(500).end('cannon package download ipfs fail');
    }
  } else {
    // compute resulting IPFS hash from the uploaded data
    try {
      const rawData = await upstreamRes.arrayBuffer();
      const uint8Data = new Uint8Array(rawData);
      const decompressedData = pako.inflate(uint8Data, { to: 'string' });
      JSON.parse(decompressedData);

      // appears to be a cannon package. sendit back
      return res.end(Buffer.from(rawData));
    } catch (err) {
      // intentionally do nothing
    }
  }

  // otherwise dont return
  return res.status(404).end('unregistered ipfs data');
});

void getDb(process.env.REDIS_URL!).then(async (createdRdb) => {
  rdb = createdRdb;
  app.listen(port, () => {
    console.log(`listening on port ${port}`);
  });
});
