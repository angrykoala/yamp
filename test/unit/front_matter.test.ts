import { assert } from 'chai';

import config from '../config';
import FrontMatterParser from '../../app/front_matter_parser';

describe("Front Matter parser", () => {
    const frontMatterParser = new FrontMatterParser();
    it("Parsing content with arguments", () => {
        const result = frontMatterParser.parse(config.frontMatter);
        assert.ok(result);
        assert.ok(result.content);
        assert.ok(result.attributes);
        assert.strictEqual(result.content, "This is the content\n---");
        assert.strictEqual(result.attributes.title, "my title");
        assert.strictEqual(result.attributes.description, "my description");
    });

    it("Parsing content without arguments", () => {
        const result = frontMatterParser.parse("text without parser");
        assert.ok(result);
        assert.ok(result.content);
        assert.ok(result.attributes);
        assert.strictEqual(result.content, "text without parser");
        assert.strictEqual(Object.keys(result.attributes).length, 0);
    });
});
