import yamp from '../../main';
import config from '../config';

describe("nice", () => {
    it("example", async () => {
        await yamp(`${config.testDir}/test.md`, {
            output: config.testDir + "/index"
        });
    });
    // TODO test output
});
