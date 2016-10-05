"use strict";

const assert = require('chai').assert;
const async = require('async');

const titleParser = require('../../app/parsers/title_parser');
const titleTestData = require('../config/title_tests');

describe("Html Title Parser", function () {
    it("Basic test", (done) => {
        assert.ok(titleParser.html);
        assert.strictEqual(titleParser.html("example"), null);
        assert.strictEqual(titleParser.html("<h1>Title</h1>"), "Title");
        done();
    });

    async.eachSeries(titleTestData, function iteratee(testCase, cb) {
        if (testCase.html) {
            it(testCase.testTitle, () => {
                assert.strictEqual(titleParser.html(testCase.html), testCase.title);
            });
        } else {
            it.skip(testCase.testTitle);
        }
        cb();
    });
});
