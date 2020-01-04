import fs from 'fs-extra';

import yamp from '../../main';
import config from '../config';
import { assert } from 'chai';

describe("Pdf", function(): void {
    this.timeout(5000);
    it("Markdown to Pdf without format", async () => {
        const filename = await yamp(`${config.testDir}/test.md`, {
            output: `${config.testDir}/index`
        }) as string;
        assert.strictEqual(filename, `${config.testDir}/index.pdf`);

        const fileStatus = await fs.stat(filename);
        assert.ok(fileStatus);
        assert.ok(fileStatus.isFile());
        assert.ok(fileStatus.size > 10000);
    });

    it("Markdown to Pdf with format", async () => {
        const filename = await yamp(`${config.testDir}/test.md`, {
            output: `${config.testDir}/index`,
            format: 'pdf'
        }) as string;
        assert.strictEqual(filename, `${config.testDir}/index.pdf`);

        const fileStatus = await fs.stat(filename);
        assert.ok(fileStatus);
        assert.ok(fileStatus.isFile());
        assert.ok(fileStatus.size > 10000);
    });

    it("Markdown to Pdf without format and different extension", async () => {
        const filename = await yamp(`${config.testDir}/test.md`, {
            output: `${config.testDir}/index.html`
        }) as string;
        assert.strictEqual(filename, `${config.testDir}/index.html.pdf`);

        const fileStatus = await fs.stat(filename);
        assert.ok(fileStatus);
        assert.ok(fileStatus.isFile());
        assert.ok(fileStatus.size > 10000);
    });
});
