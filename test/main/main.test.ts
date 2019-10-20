import yamp from '../../main';
import config from '../config';

describe("Main", () => {
    it("Markdown to Html with default options", async () => {
        await yamp(`${config.testDir}/test.md`, {
            output: config.testDir + "/index"
        });
    });
    // TODO test output
});
