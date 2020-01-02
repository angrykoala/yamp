import { assert } from 'chai';

import config from '../config';
import XejsLoader from '../../app/xejs_loader';

const testFiles = config.testFiles.xejs;
const testDir = config.testDir;

describe("XEjs parser", () => {
    const loader = new XejsLoader();

    it("Parsing file with default options", async () => {
        const file = await loader.loadFile(testDir + "/" + testFiles[0]);

        const reg = config.regex.xejsTestFile;
        assert.ok(file);
        for (let i = 0; i < reg.common.length; i += 1) {
            assert.match(file, reg.common[i]);
        }
        for (let i = 0; i < reg.defaultTags.length; i += 1) {
            assert.match(file, reg.defaultTags[i]);
        }
    });
});
