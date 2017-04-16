"use strict";

const assert = require('chai').assert;

const tocParser = require('../../app/parsers/toc_parser');

describe("Toc Parser", function() {
    const testContent = "# Title\nContent\n## Subtitle1\n## Subtitle2";

    it("Parsing content with TOC", (done) => {
        const content = "<!-- toc -->\n" + testContent;

        tocParser(content, true, (err, res) => {
            assert.notOk(err);
            assert.ok(res);
            assert.match(res, /<\!-- toc --\>[\s\S]*<\!-- tocstop --\>\s*# Title/);
            assert.match(res, /-\ \[Title\]\(#\S*\)/);
            assert.match(res, /\ \ \*\ \[Subtitle1\]\(#\S*\)\s*\*\ \[Subtitle2\]\(#\S*\)/);
            done();
        });
    });
    it("Parsing content without TOC", (done) => {
        tocParser(testContent, true, (err, res) => {
            assert.notOk(err);
            assert.ok(res);
            assert.equal(res, testContent);
            done();
        });
    });
    it("Parsing Empty content", (done) => {
        tocParser("", true, (err, res) => {
            assert.notOk(err);
            assert.strictEqual(res, "");
            done();
        });
    });
    it("Links Disabled", (done) => {
        const content = "<!-- toc -->\n" + testContent;

        tocParser(content, false, (err, res) => {
            assert.notOk(err);
            assert.ok(res);
            assert.match(res, /<\!-- toc --\>[\s\S]*<\!-- tocstop --\>\s*# Title/);
            assert.match(res, /-\ Title/);
            assert.match(res, /\ \ \*\ Subtitle1\s*\*\ Subtitle2/);
            done();
        });
    });
});
