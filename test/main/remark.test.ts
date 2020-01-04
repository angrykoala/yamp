import fs from 'fs-extra';

import yamp from '../../main';
import config from '../config';
import { assert } from 'chai';

describe("Remark", function(): void {

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
    });
});
