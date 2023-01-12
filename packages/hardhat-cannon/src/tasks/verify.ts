import _ from 'lodash';
import { task } from 'hardhat/config';
import prompts from 'prompts';
import { TASK_VERIFY } from '../task-names';
import { ChainDefinition, getOutputs, IPFSChainBuilderRuntime } from '@usecannon/builder';
import { createDefaultReadRegistry, resolveCliSettings, runRpc } from '@usecannon/cli';
import { getProvider } from '@usecannon/cli/dist/src/rpc';

task(TASK_VERIFY, 'Verify a package on Etherscan')
  .addOptionalPositionalParam('packageName', 'Name and version of the Cannon package to verify')
  .addPositionalParam('preset', 'Specify an alternate preset', 'main')
  .addOptionalParam('apiKey', 'Etherscan API key')
  .setAction(async ({ packageName, preset, apiKey }, hre) => {
    // create temporary provider
    // todo: really shouldn't be necessary
    const provider = getProvider(
      await runRpc({
        port: 30000 + Math.floor(Math.random() * 30000),
      })
    );

    const resolver = createDefaultReadRegistry(resolveCliSettings());

    const runtime = new IPFSChainBuilderRuntime(
      {
        provider,
        chainId: hre.network.config.chainId!,
        async getSigner(addr: string) {
          // on test network any user can be conjured
          await provider.send('hardhat_impersonateAccount', [addr]);
          await provider.send('hardhat_setBalance', [addr, `0x${(1e22).toString(16)}`]);
          return provider.getSigner(addr);
        },

        baseDir: null,
        snapshots: false,
      },
      resolveCliSettings().ipfsUrl,
      resolver
    );

    const deployData = await runtime.readDeploy(packageName, preset);

    if (!deployData) {
      throw new Error(
        `deployment not found: ${packageName}. please make sure it exists for the given preset and current network.`
      );
    }

    const outputs = await getOutputs(runtime, new ChainDefinition(deployData.def), deployData.state);

    if (!outputs) {
      throw new Error('No chain outputs found. Has the requested chain already been built?');
    }

    if (apiKey) {
      // @ts-ignore
      hre.config.etherscan.apiKey = apiKey;
    }
    // @ts-ignore
    if (!hre.config?.etherscan?.apiKey) {
      const response = await prompts({
        type: 'text',
        name: 'etherscan_apikey',
        message: 'Please enter an Etherscan API key',
      });
      // @ts-ignore
      hre.config.etherscan.apiKey = response.etherscan_apikey;
    }

    for (const c in outputs.contracts) {
      if (_.has(outputs, ['contracts', c, 'sourceName']) && _.has(outputs, ['contracts', c, 'contractName'])) {
        console.log('Verifying contract:', c);
        try {
          await hre.run('verify:verify', {
            contract: `${outputs.contracts[c].sourceName}:${outputs.contracts[c].contractName}`,
            address: outputs.contracts[c].address,
            constructorArguments: outputs.contracts[c].constructorArgs || [],
          });
        } catch (err) {
          console.log(
            `Unable to verify ${outputs.contracts[c].sourceName}:${outputs.contracts[c].contractName} - ${
              (err as Error).message
            }`
          );
        }
      } else {
        console.log(`Skipping ${c}: sourceName or contractName has not been set.`);
      }
    }
  });
