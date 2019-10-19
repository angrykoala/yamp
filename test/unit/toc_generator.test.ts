import { assert } from 'chai';
import TocGenerator from '../../app/toc_generator';

describe("Toc Generator", () => {
    const testContent = "# Title\nContent\n## Subtitle1\n## Subtitle2";
    const tocGenerator = new TocGenerator();

    it("Parsing content with TOC", async () => {
        const content = "<!-- toc -->\n" + testContent;
        const res = await tocGenerator.insert(content, { linkify: true });
        assert.ok(res);
        assert.match(res, /<\!-- toc --\>[\s\S]*<\!-- tocstop --\>\s*# Title/);
        assert.match(res, /-\ \[Title\]\(#\S*\)/);
        assert.match(res, /\ \ \*\ \[Subtitle1\]\(#\S*\)\s*\*\ \[Subtitle2\]\(#\S*\)/);
    });

    it("Parsing content without TOC", async () => {
        const res = await tocGenerator.insert(testContent, { linkify: true });
        assert.ok(res);
        assert.equal(res, testContent);
    });

    it("Parsing Empty content", async () => {
        const res = await tocGenerator.insert("", { linkify: true });
        assert.strictEqual(res, "");
    });

    it("Links Disabled", async () => {
        const content = "<!-- toc -->\n" + testContent;
        const res = await tocGenerator.insert(content, { linkify: false });

        assert.ok(res);
        assert.match(res, /<\!-- toc --\>[\s\S]*<\!-- tocstop --\>\s*# Title/);
        assert.match(res, /-\ Title/);
        assert.match(res, /\ \ \*\ Subtitle1\s*\*\ Subtitle2/);
    });
});
