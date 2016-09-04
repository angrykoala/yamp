"use strict";

const assert = require('chai').assert;
const async = require('async');
const md2html = require('../app/parsers/md2html');
const mdTestData = require('./config/mdTests');

function removeNewlines(str) {
    return str.replace(/(\r\n|\n|\r)/gm, "");
}


describe('md2html parser', function() {
    it("Basic test", function(done) {
        md2html("example", function(err, res) {
            assert.notOk(err);
            assert.ok(res);
            done();
        });
    });

    async.eachSeries(mdTestData, function iteratee(testCase, cb) {
        if (testCase.md && testCase.html) it(testCase.title, function(done) {
            md2html(testCase.md, function(err, res) {
                assert.notOk(err);
                assert.ok(res);
                assert.strictEqual(removeNewlines(res), testCase.html);
                done();
            });

        });
        else {
            it.skip(testCase.title);
        }
        cb();
    });
});
