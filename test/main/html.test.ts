import fs from 'fs-extra';

import yamp from '../../main';
import config from '../config';
import { assert } from 'chai';

describe("Html", function(): void {
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
        assert.match(finalHtml, /using namespace std\;\n\nmain\(\)\{\n/);
    });

    it("Markdown to Html with html extension", async () => {
        const filename = await yamp(`${config.testDir}/test.md`, {
            output: `${config.testDir}/index.html`,
            format: "html"
        }) as string;
        assert.strictEqual(filename, `${config.testDir}/index.html`);

        const fileStatus = await fs.stat(filename);
        assert.ok(fileStatus);
        assert.ok(fileStatus.isFile());

        const finalHtml = fs.readFileSync(filename, 'utf-8');
        assert.match(finalHtml, /<html>(.|\n)+<p>This should be included<\/p>(.|\n)+<\/html>/);
    });

    it("Markdown to Html with different extension", async () => {
        const filename = await yamp(`${config.testDir}/test.md`, {
            output: `${config.testDir}/index.pdf`,
            format: "html"
        }) as string;
        assert.strictEqual(filename, `${config.testDir}/index.pdf.html`);

        const fileStatus = await fs.stat(filename);
        assert.ok(fileStatus);
        assert.ok(fileStatus.isFile());

        const finalHtml = fs.readFileSync(filename, 'utf-8');
        assert.match(finalHtml, /<html>(.|\n)+<p>This should be included<\/p>(.|\n)+<\/html>/);
    });

    it("Markdown to Html with minify", async () => {
        const filename = await yamp(`${config.testDir}/test.md`, {
            output: `${config.testDir}/index`,
            format: "html",
            minify: true
        }) as string;
        assert.strictEqual(filename, `${config.testDir}/index.html`);

        const fileStatus = await fs.stat(filename);
        assert.ok(fileStatus);
        assert.ok(fileStatus.isFile());

        const finalHtml = fs.readFileSync(filename, 'utf-8');
        assert.match(finalHtml, /<html>(.|\n)+<p>This should be included<\/p>(.|\n)+<\/html>/);
        assert.match(finalHtml, /<h1\ id="markdown-test">Markdown Test<\/h1><p>This <strong>file<\/strong> is for <em>testing<\/em> purposes/);
        assert.match(finalHtml, /<\!DOCTYPE html><html><head><meta charset="UTF-8">/);
        assert.match(finalHtml, /using namespace std\;\n\nmain\(\)\{\n/);
    });
});
