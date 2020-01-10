import fs from 'fs-extra';

import yamp from '../../main';
import config from '../config';
import { assert } from 'chai';

async function readAndCheckFile(filename: string): Promise<string> {
    const fileStatus = await fs.stat(filename);
    assert.ok(fileStatus);
    assert.ok(fileStatus.isFile());

    return fs.readFileSync(filename, 'utf-8');
}

describe("Html", function(): void {
    it("Markdown to Html with default options", async () => {
        const filename = await yamp(`${config.testDir}/test.md`, {
            output: `${config.testDir}/index`,
            format: "html"
        }) as string;
        assert.strictEqual(filename, `${config.testDir}/index.html`);

        const finalHtml = await readAndCheckFile(filename);
        assert.match(finalHtml, /<html>(.|\n)+<p>This should be included<\/p>(.|\n)+<\/html>/);
        assert.match(finalHtml, /using namespace std\;\n\nmain\(\)\{\n/);
    });

    it("Markdown to Html with html extension", async () => {
        const filename = await yamp(`${config.testDir}/test.md`, {
            output: `${config.testDir}/index.html`,
            format: "html"
        }) as string;
        assert.strictEqual(filename, `${config.testDir}/index.html`);

        const finalHtml = await readAndCheckFile(filename);
        assert.match(finalHtml, /<html>(.|\n)+<p>This should be included<\/p>(.|\n)+<\/html>/);
    });

    it("Markdown to Html with different extension", async () => {
        const filename = await yamp(`${config.testDir}/test.md`, {
            output: `${config.testDir}/index.pdf`,
            format: "html"
        }) as string;
        assert.strictEqual(filename, `${config.testDir}/index.pdf.html`);

        const finalHtml = await readAndCheckFile(filename);
        assert.match(finalHtml, /<html>(.|\n)+<p>This should be included<\/p>(.|\n)+<\/html>/);
    });

    it("Markdown to Html with multiple files");
    it("Frontmatter");
});
