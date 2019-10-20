import { assert } from 'chai';

import mdTestData from '../config/md_tests';
import Md2Html from '../../app/md2html';

function removeNewlines(str: string): string {
    return str.replace(/(\r\n|\n|\r)/gm, "");
}

describe("Markdown to Html", () => {
    const defaultOptions = {
        highlight: true
    };
    const md2Html = new Md2Html();

    it("Basic test", async () => {
        const html = await md2Html.generateHtml("example", defaultOptions);
        assert.ok(html);
    });

    for (const testCase of mdTestData) {
        if (testCase.md && testCase.html) {
            it(testCase.testTitle, async () => {
                const html = await md2Html.generateHtml(testCase.md!, defaultOptions);
                assert.ok(html);
                assert.strictEqual(removeNewlines(html), testCase.html);
            });
        } else {
            it.skip(testCase.testTitle);
        }
    }
});
