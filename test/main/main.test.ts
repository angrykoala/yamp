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

        const finalHtml = fs.readFileSync(filename, 'utf-8');
        assert.match(finalHtml, /<html>(.|\n)+<p>This should be included<\/p>(.|\n)+<\/html>/);
    });

    it("Markdown to remark html slides with default options", async () => {
        const filename = await yamp(`${config.testDir}/test.md`, {
            output: `${config.testDir}/index`,
            format: "remark"
        }) as string;
        assert.strictEqual(filename, `${config.testDir}/index.html`);

        const fileStatus = await fs.stat(filename);
        assert.ok(fileStatus);
        assert.ok(fileStatus.isFile());
        const finalHtml = fs.readFileSync(filename, 'utf-8');
        assert.match(finalHtml, /<html>(.|\n)+<p>This should be included<\/p>(.|\n)+<\/html>/);
        assert.match(finalHtml, /<script>(.|\n)+var slideshow = remark\.create\(\);(.|\n)+<\/script>/);

        // TODO: check finalHtml
        // assert.match(finalHtml, /<html>(.|\n)+<p>This should be included<\/p>(.|\n)+<\/html>/);
    });
    // TODO test output
});
