"use strict";

const assert = require('chai').assert;
const async = require('async');

const md2html = require('../../app/parsers/md2html');
const mdTestData = require('../config/md_tests');

function removeNewlines(str) {
    return str.replace(/(\r\n|\n|\r)/gm, "");
}

describe("Md2html", function () {
    let rendererOptions;
    beforeEach(() => {
        rendererOptions = {
            highlight: true
        };
    });

    it("Basic test", (done) => {
        md2html("example", rendererOptions, (err, res) => {
            assert.notOk(err);
            assert.ok(res);
            done();
        });
    });

    async.eachSeries(mdTestData, function iteratee(testCase, cb) {
        if (testCase.md && testCase.html) {
            it(testCase.testTitle, (done) => {
                md2html(testCase.md, rendererOptions, (err, res) => {
                    assert.notOk(err);
                    assert.ok(res);
                    assert.strictEqual(removeNewlines(res), testCase.html);
                    done();
                });
            });
        } else {
            it.skip(testCase.testTitle);
        }
        cb();
    });

    it("Highlight temporal option", (done) => {
        md2html("example", rendererOptions, (err, res) => {
            assert.notOk(err);
            assert.ok(res);
            assert.strictEqual(rendererOptions.requireHighlight, false);
            md2html("```\ntest code\n```", rendererOptions, (err, res) => {
                assert.notOk(err);
                assert.ok(res);
                assert.strictEqual(rendererOptions.requireHighlight, true);
                md2html("example2", rendererOptions, (err, res) => {
                    assert.notOk(err);
                    assert.ok(res);
                    assert.strictEqual(rendererOptions.requireHighlight, false);
                    md2html("`inline code`", rendererOptions, (err, res) => {
                        assert.notOk(err);
                        assert.ok(res);
                        assert.strictEqual(rendererOptions.requireHighlight, false);
                        done();
                    });
                });
            });
        });
    });
});
