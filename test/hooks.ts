import fs from 'fs-extra';

import config from './config';

// const testDir = config.testDir;
// const testFilesList = config.testFiles;
//
// let testFiles = [];
//
// let testFilesKeys = Object.keys(testFilesList);
//
// for (let i = 0; i < testFilesKeys.length; i++) {
//     testFiles = testFiles.concat(testFilesList[testFilesKeys[i]]);
// }

beforeEach(async () => {
    await fs.remove(config.testDir);
    await fs.copy(config.testFilesOrig, config.testDir);
});

afterEach(async () => {
    await fs.remove(config.testDir);
});
