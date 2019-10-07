"use strict";

const frontMatterParser = require('../../app/parsers/front_matter');
const assert = require('chai').assert;

const config = require('../config/config');

describe("Front Matter parser", function () {
    it("Parsing content with arguments", (done) => {
        assert.ok(frontMatterParser);
        frontMatterParser(config.frontMatter, (err, content, args) => {
            assert.notOk(err);
            assert.ok(content);
            assert.ok(args);
            assert.strictEqual(content, "This is the content\n---");
            assert.strictEqual(args.title, "my title");
            assert.strictEqual(args.description, "my description");
            done();
        });
    });
    it("Parsing content without arguments", (done) => {
        frontMatterParser("my file", (err, content, args) => {
            assert.notOk(err);
            assert.ok(content);
            assert.ok(args);
            assert.strictEqual(content, "my file");
            assert.strictEqual(Object.keys(args).length, 0);
            frontMatterParser("\n" + config.frontMatter, (err, content, args) => {
                assert.notOk(err);
                assert.ok(content);
                assert.ok(args);
                assert.strictEqual(content, "\n" + config.frontMatter);
                assert.strictEqual(Object.keys(args).length, 0);
                done();
            });
        });
    });
});
