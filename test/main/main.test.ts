import fs from 'fs-extra';

import yamp from '../../main';
import config from '../config';
import { assert } from 'chai';

describe("Main", () => {
    it("Markdown to Pdf with default options", async () => {
        const filename = await yamp(`${config.testDir}/test.md`, {
            output: `${config.testDir}/index`
        }) as string;
        assert.strictEqual(filename, `${config.testDir}/index.pdf`);

        const fileStatus = await fs.stat(filename);
        assert.ok(fileStatus);
        assert.ok(fileStatus.isFile());
        assert.ok(fileStatus.size > 10000);
    });
    it("Markdown to Html with default options", async () => {
        const filename = await yamp(`${config.testDir}/test.md`, {
            output: `${config.testDir}/index`,
            format: "html"
        }) as string;
        assert.strictEqual(filename, `${config.testDir}/index.html`);

        const fileStatus = await fs.stat(filename);
        assert.ok(fileStatus);
        assert.ok(fileStatus.isFile());
        // TODO: check html result
    });
    // TODO test output
});
