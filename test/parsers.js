"use strict";

const fs = require('fs-extra');
const assert = require('chai').assert;
const async = require('async');

const config = require('./config/config');
const md2html = require('../app/parsers/md2html');
const html2pdf = require('../app/parsers/html2pdf');
const titleParser = require('../app/parsers/title_parser');
const xejsParser = require('../app/parsers/xejs_parser');
const tocParser = require('../app/parsers/toc_parser');
const frontMatterParser = require('../app/parsers/front_matter');

const mdTestData = require('./config/md_tests');
const titleTestData = require('./config/title_tests');

const testFiles = config.testXejsFiles;
const testDir = config.testDir;

function removeNewlines(str) {
    return str.replace(/(\r\n|\n|\r)/gm, "");
}

describe("Parsers", function() {
    beforeEach(function(done) {
        fs.remove(testDir, function(err) {
            assert.notOk(err);
            for (let i = 0; i < testFiles.length; i++) {
                fs.copySync(__dirname + "/config/" + testFiles[i], testDir + "/" + testFiles[i]);
            }
            done();
        });
    });
    afterEach(function(done) {
        fs.remove(testDir, function() {
            done();
        });
    });
    describe("md2html", function() {
        let rendererOptions;
        beforeEach(function() {
            rendererOptions = {
                highlight: true
            };
        });

        it("Basic test", function(done) {
            md2html("example", rendererOptions, function(err, res) {
                assert.notOk(err);
                assert.ok(res);
                done();
            });
        });

        async.eachSeries(mdTestData, function iteratee(testCase, cb) {
            if (testCase.md && testCase.html) {
                it(testCase.testTitle, function(done) {
                    md2html(testCase.md, rendererOptions, function(err, res) {
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

        it("Highlight temporal option", function(done) {
            md2html("example", rendererOptions, function(err, res) {
                assert.notOk(err);
                assert.ok(res);
                assert.strictEqual(rendererOptions.requireHighlight, false);
                md2html("```\ntest code\n```", rendererOptions, function(err, res) {
                    assert.notOk(err);
                    assert.ok(res);
                    assert.strictEqual(rendererOptions.requireHighlight, true);
                    md2html("example2", rendererOptions, function(err, res) {
                        assert.notOk(err);
                        assert.ok(res);
                        assert.strictEqual(rendererOptions.requireHighlight, false);
                        md2html("`inline code`", rendererOptions, function(err, res) {
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

    describe("Html2pdf", function() {
        const html = "<h1>Test</h1>";
        const filename = "testFile.pdf";

        it("Basic test", function(done) {
            this.timeout(5000);
            fs.readFile(testDir + "/" + filename, function(err) {
                assert.ok(err);
                html2pdf(html, testDir + "/" + "testFile", function(err, res) {
                    assert.notOk(err);
                    assert.ok(res);
                    assert.strictEqual(res.filename, process.cwd() + "/" + testDir + "/" + filename);
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

    describe("Html Title Parser", function() {
        it("Basic test", function(done) {
            assert.ok(titleParser.html);
            assert.strictEqual(titleParser.html("example"), null);
            assert.strictEqual(titleParser.html("<h1>Title</h1>"), "Title");
            done();
        });

        async.eachSeries(titleTestData, function iteratee(testCase, cb) {
            if (testCase.html) {
                it(testCase.testTitle, function() {
                    assert.strictEqual(titleParser.html(testCase.html), testCase.title);
                });
            } else {
                it.skip(testCase.testTitle);
            }
            cb();
        });
    });

    describe("XEJS parser", function() {
        it("Parsing file with default options", function(done) {
            assert.ok(xejsParser);
            xejsParser(testDir + "/" + testFiles[0], {}, [], function(err, res) {
                const reg = config.regex.xejsTestFile;
                assert.notOk(err);
                assert.ok(res);
                for (let i = 0; i < reg.common.length; i++) {
                    assert.match(res, reg.common[i]);
                }
                for (let i = 0; i < reg.defaultTags.length; i++) {
                    assert.match(res, reg.defaultTags[i]);
                }
                done();
            });
        });
        it("Extra tags", function(done) {
            assert.ok(xejsParser);
            //{{ extra tag(12)}}
            xejsParser(testDir + "/" + testFiles[0], {}, [
                [/extra\s+tag\((\d+)\)/, "-'tag is $1'"]
            ], function(err, res) {
                const reg = config.regex.xejsTestFile;
                assert.notOk(err);
                assert.ok(res);
                for (let i = 0; i < reg.common.length; i++) {
                    assert.match(res, reg.common[i]);
                }
                for (let i = 0; i < reg.customTags.length; i++) {
                    assert.match(res, reg.customTags[i]);
                }
                done();
            });
        });
    });

    describe("Toc Parser", function() {
        const testContent = "# Title\nContent\n## Subtitle1\n## Subtitle2";

        it("Parsing content with TOC", function(done) {
            let content = "<!-- toc -->\n" + testContent;

            tocParser(content, (err, res) => {
                assert.notOk(err);
                assert.ok(res);
                assert.match(res, /<\!-- toc --\>[\s\S]*<\!-- tocstop --\>\s*# Title/);
                assert.match(res, /-\ \[Title\]\(#\S*\)/);
                assert.match(res, /\ \ \*\ \[Subtitle1\]\(#\S*\)\s*\*\ \[Subtitle2\]\(#\S*\)/);
                done();
            });
        });
        it("Parsing content without TOC", function(done) {
            tocParser(testContent, (err, res) => {
                assert.notOk(err);
                assert.ok(res);
                assert.equal(res, testContent);
                done();
            });

        });
        it("Parsing Empty content", function(done) {
            tocParser("", (err, res) => {
                assert.notOk(err);
                assert.strictEqual(res, "");
                done();
            });

        });
    });
    describe("Front Matter parser", function() {
        it("Parsing content with arguments", function(done) {
            assert.ok(frontMatterParser);
            frontMatterParser(config.frontMatter, function(err, content, args) {
                assert.notOk(err);
                assert.ok(content);
                assert.ok(args);
                assert.strictEqual(content, "This is the content\n---");
                assert.strictEqual(args.title, "my title");
                assert.strictEqual(args.description, "my description");
                done();
            });
        });
        it("Parsing content without arguments", function(done) {
            frontMatterParser("my file", function(err, content, args) {
                assert.notOk(err);
                assert.ok(content);
                assert.ok(args);
                assert.strictEqual(content, "my file");
                assert.strictEqual(Object.keys(args).length, 0);
                frontMatterParser("\n" + config.frontMatter, function(err, content, args) {
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
});
