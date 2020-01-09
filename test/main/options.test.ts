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

describe("Options", function(): void {
    it("Minify", async () => {
        const filename = await yamp(`${config.testDir}/test.md`, {
            output: `${config.testDir}/index`,
            format: "html",
            minify: true
        }) as string;
        assert.strictEqual(filename, `${config.testDir}/index.html`);

        const finalHtml = await readAndCheckFile(filename);
        assert.match(finalHtml, /<html>(.|\n)+<p>This should be included<\/p>(.|\n)+<\/html>/);
        assert.match(finalHtml, /<h1\ id="markdown-test">Markdown Test<\/h1><p>This <strong>file<\/strong> is for <em>testing<\/em> purposes/);
        assert.match(finalHtml, /<\!DOCTYPE html><html><head><meta charset="UTF-8">/);
        assert.match(finalHtml, /using namespace std\;\n\nmain\(\)\{\n/);
    });

    it.skip('koala');
    it.skip('style');

    it('highlight', async () => {
        const filename = await yamp(`${config.testDir}/test.md`, {
            output: `${config.testDir}/index`,
            format: "html",
            highlight: true
        }) as string;
        assert.strictEqual(filename, `${config.testDir}/index.html`);

        const finalHtml = await readAndCheckFile(filename);
        assert.match(finalHtml, /<html>(.|\n)+<p>This should be included<\/p>(.|\n)+<\/html>/);
        assert.match(finalHtml, /\.hljs/);
        assert.match(finalHtml, /<span class="hljs\-keyword">using<\/span>/);
    });

    it('highlight default to false', async () => {
        const filename = await yamp(`${config.testDir}/test.md`, {
            output: `${config.testDir}/index`,
            format: "html",
        }) as string;
        assert.strictEqual(filename, `${config.testDir}/index.html`);

        const finalHtml = await readAndCheckFile(filename);

        assert.match(finalHtml, /<html>(.|\n)+<p>This should be included<\/p>(.|\n)+<\/html>/);
        assert.notMatch(finalHtml, /\.hljs/);
        assert.notMatch(finalHtml, /<span class="hljs\-keyword">using<\/span>/);
    });

    it.skip('output');
});
