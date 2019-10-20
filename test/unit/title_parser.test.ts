import { assert } from 'chai';

import TitleParser from '../../app/title_parser';
import titleTestData from '../config/title_tests';

describe("Html Title Parser", () => {
    const titleParser = new TitleParser();

    it("Basic test", () => {
        assert.strictEqual(titleParser.getTitleFromHtml("example"), undefined);
        assert.strictEqual(titleParser.getTitleFromHtml("<h1>Title</h1>"), "Title");
    });

    for (const testCase of titleTestData) {
        it(testCase.testTitle, () => {
            assert.strictEqual(titleParser.getTitleFromHtml(testCase.html), testCase.title);
        });
    }
});
