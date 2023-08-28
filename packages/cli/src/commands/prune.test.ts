import { prune } from './prune';
import { createDefaultReadRegistry } from '../registry';
import { CannonStorage, IPFSLoader } from '@usecannon/builder';
import fs from 'fs-extra';
import { getMainLoader, LocalLoader } from '../loader';

jest.mock('../registry');
jest.mock('../settings');
jest.mock('../loader');
jest.mock('../helpers');

describe('prune', () => {
  let testPkgData: any;
  let mockedFallBackRegistry: any;
  let localLoader: LocalLoader;
  let ipfsLoader: IPFSLoader;
  let mockStorage: CannonStorage;
  let writeSpy: jest.SpyInstance;

  beforeEach(() => {
    jest.clearAllMocks();

    mockedFallBackRegistry = {
      getAllUrls: jest.fn().mockResolvedValue(['file://2']),
    };

    localLoader = new LocalLoader('path');

    mockStorage = new CannonStorage(mockedFallBackRegistry, { file: localLoader });

    jest.mock('../settings', () => ({
      resolveCliSettings: jest.fn().mockReturnValue({}),
    }));
    jest
      .spyOn(localLoader, 'read')
      .mockImplementation(async (arg: string) => ({ generator: 'cannon test', timestamp: parseInt(arg.split('://')[1]) }));
    jest.spyOn(localLoader, 'list').mockResolvedValue(['file://1', 'file://2', 'file://3']);

    jest.useFakeTimers().setSystemTime(4000);
  });
  //afterEach(() => {
  // writeSpy.mockRestore();
  //);

  test('calling prune with dry run', async () => {
    console.log(Date.now());
    const [toDelete, stats] = await prune(mockStorage, [], [], 1);

    // returned list should include all files which rae within the time
    expect(toDelete).toEqual(['file://1', 'file://2']);
  });

  test('calling prune with filter', async () => {
    const [toDelete, stats] = await prune(mockStorage, ['some-pkg'], [], 1);

    // returned list should include only files which were within the time *and* not in the urls returned by registry
    expect(toDelete).toEqual(['file://1']);
  });
});
