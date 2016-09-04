"use strict";

const fs = require('fs');
const assert = require('chai').assert;
const async = require('async');

const md2html = require('../app/parsers/md2html');
const html2pdf = require('../app/parsers/html2pdf');

const mdTestData = require('./config/mdTests');

function removeNewlines(str) {
    return str.replace(/(\r\n|\n|\r)/gm, "");
}

describe("Parsers", function() {
    describe("mM2html", function() {
        const rendererOptions = {
            highlight: true
        };

        it("Basic test", function(done) {
            md2html("example", rendererOptions, function(err, res) {
                assert.notOk(err);
                assert.ok(res);
                done();
            });
        });

        async.eachSeries(mdTestData, function iteratee(testCase, cb) {
            if (testCase.md && testCase.html) it(testCase.title, function(done) {
                md2html(testCase.md, rendererOptions, function(err, res) {
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

    describe("Html2pdf", function() {
        const html = "<h1>Test</h1>";
        let filename = process.cwd() + "/testFile.pdf";

        afterEach(function(done) {
            fs.unlink(filename, function() {
                filename = process.cwd() + "/testFile.pdf";
                done();
            });
        });
        it("Basic test", function(done) {
            html2pdf(html, "testFile", function(err, res) {
                assert.notOk(err);
                assert.ok(res);
                assert.strictEqual(res.filename, process.cwd() + "/testFile.pdf");
                filename = res.filename;
                fs.stat(res.filename, function(err, res) {
                    assert.notOk(err);
                    assert.ok(res);
                    assert.ok(res.isFile());
                    done();
                });
            });
        });
    });
});