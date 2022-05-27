import fs from 'fs-extra';
import path from 'path';
import AdmZip from 'adm-zip';
import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { ChainDefinition } from './types';

export function getCacheDir(cacheFolder: string, name: string, version: string) {
  return path.join(cacheFolder, 'cannon', name, version);
}

export function getLayerFiles(cacheDir: string, chainId: number, n: number) {
  const filename = `${chainId}-${n}`;

  const basename = path.join(cacheDir, filename);

  return {
    cannonfile: path.join(cacheDir, 'cannonfile.json'),
    chain: basename + '.chain',
    metadata: basename + '.json',
  };
}

export async function exportChain(hre: HardhatRuntimeEnvironment, name: string, version: string): Promise<Buffer> {
  const zip = new AdmZip();

  await zip.addLocalFolderPromise(getCacheDir(hre.config.paths.cache, name, version), {});

  try {
    zip.addLocalFile(path.join(hre.config.paths.root, 'README.md'));
  } catch (err) {
    console.warn('WARN: Could not add README.md to cannon chain archive', err);
  }

  try {
    zip.addLocalFile(path.join(hre.config.paths.root, 'cannonfile.toml'));
  } catch (err) {
    console.warn('WARN: Could not add original cannonfile.toml to cannon chain archive', err);
  }

  return zip.toBufferPromise();
}

export async function importChain(hre: HardhatRuntimeEnvironment, buf: Buffer): Promise<ChainDefinition> {
  const zip = new AdmZip(buf);

  const manifest = JSON.parse(zip.readAsText('cannonfile.json'));

  // manifest determines where to store the files
  const cacheDir = getCacheDir(hre.config.paths.cache, manifest.name, manifest.version);
  await zip.extractAllTo(cacheDir, true);

  return manifest as ChainDefinition;
}

export async function associateTag(hre: HardhatRuntimeEnvironment, name: string, version: string, tag: string) {
  const mainCacheDir = getCacheDir(hre.config.paths.cache, name, version);
  const tagCacheDir = getCacheDir(hre.config.paths.cache, name, tag);

  if (!(await fs.pathExists(mainCacheDir))) {
    throw new Error(`could not associate tag: cache dir for ${name}:${version} does not exist`);
  }

  if (version === tag) {
    return;
  }

  await fs.link(mainCacheDir, tagCacheDir);
}
