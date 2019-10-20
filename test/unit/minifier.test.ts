import { assert } from 'chai';

import Minifier from '../../app/minifier';

describe("Minifier", () => {
    const minifier = new Minifier();

    it("Minify Htmle", async () => {
        const originalHtml = `
        <h1>Hello</h1>
        <!-- a comment -->
        <p>Hello</p>
        `;
        const minifiedHtml = await minifier.minifyHtml(originalHtml);
        assert.strictEqual(minifiedHtml, `<h1>Hello</h1><p>Hello</p>`);
    });
});
