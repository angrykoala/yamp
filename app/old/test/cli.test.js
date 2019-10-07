"use strict";

/*
Yamp cli Test
==============
Command-line interface test
*/

const fs = require('fs');
const assert = require('chai').assert;
require('pkginfo')(module, "version", "author", "license", "description");

const yerbamate = require('yerbamate');

const config = require('./config/config');
const version = module.exports.version;

const testDir = config.testDir;
const testFiles = config.testFiles.md;

const regex = config.regex;


describe("Yamp CLI", function() {
    this.timeout(10000);
    const pkg = yerbamate.loadPackage(module);
    const outputArg = " -o " + testDir;
    const defaultArgs = testDir + "/" + testFiles[0] + outputArg;


    it("Default options", (done) => {
        yerbamate.run(pkg.scripts.start, pkg.dir, {
            args: testDir + "/" + testFiles[0]
        }, function(code, out, err) {
            assert.isTrue(yerbamate.successCode(code));
            assert.lengthOf(err, 0);
            assert.lengthOf(out, 1);
            fs.stat("./test.pdf", function(err, res) {
                assert.notOk(err);
                assert.ok(res);
                assert.ok(res.isFile());
                fs.unlinkSync("test.pdf");
                // CONTENT NOT TESTED
                done();
            });
        });
    });
    it("-o/--output <folder>", (done) => {
        yerbamate.run(pkg.scripts.start, pkg.dir, {
            args: defaultArgs
        }, function(code, out, err) {
            assert.isTrue(yerbamate.successCode(code));
            assert.lengthOf(err, 0);
            assert.lengthOf(out, 1);

            fs.stat(testDir + "/test.pdf", function(err, res) {
                assert.notOk(err);
                assert.ok(res);
                assert.ok(res.isFile());
                fs.unlinkSync(testDir + "/test.pdf");
                // CONTENT NOT TESTED
                yerbamate.run(pkg.scripts.start, pkg.dir, {
                    args: testDir + "/" + testFiles[0] + " --output " + testDir
                }, function(code, out, err) {
                    assert.isTrue(yerbamate.successCode(code));
                    assert.lengthOf(err, 0);
                    assert.lengthOf(out, 1);

                    fs.stat(testDir + "/test.pdf", function(err, res) {
                        assert.notOk(err);
                        assert.ok(res);
                        assert.ok(res.isFile());
                        done();
                    });
                });
            });
        });
    });
    it("-o to inexistent folder", (done) => {
        yerbamate.run(pkg.scripts.start, pkg.dir, {
            args: defaultArgs + "/test_folder/"
        }, function(code, out, err) {
            assert.isTrue(yerbamate.successCode(code));
            assert.lengthOf(err, 0);
            assert.lengthOf(out, 1);

            fs.stat(testDir + "/test_folder/test.pdf", function(err, res) {
                assert.notOk(err);
                assert.ok(res);
                assert.ok(res.isFile());
                done();
            });
        });

    });
    it("-o/--output <file>", (done) => {
        yerbamate.run(pkg.scripts.start, pkg.dir, {
            args: defaultArgs + "/my_test.pdf"
        }, function(code, out, err) {
            assert.isTrue(yerbamate.successCode(code));
            assert.lengthOf(err, 0);
            assert.lengthOf(out, 1);

            fs.stat(testDir + "/my_test.pdf", function(err, res) {
                assert.notOk(err);
                assert.ok(res);
                assert.ok(res.isFile());
                done();
            });
        });
    });
    it("-v/--version", (done) => {
        yerbamate.run(pkg.scripts.start, pkg.dir, {
            args: "-V"
        }, function(code, out, err) {
            assert.isTrue(yerbamate.successCode(code));
            assert.lengthOf(err, 0);
            assert.lengthOf(out, 1);
            assert.strictEqual(out[0], version);
            yerbamate.run(pkg.scripts.start, pkg.dir, {
                args: "--version"
            }, function(code, out, err) {
                assert.isTrue(yerbamate.successCode(code));
                assert.lengthOf(err, 0);
                assert.lengthOf(out, 1);
                assert.strictEqual(out[0], version);
                done();
            });
        });
    });
    it("-h/--help", (done) => {
        yerbamate.run(pkg.scripts.start, pkg.dir, {
            args: "-h"
        }, function(code, out, err) {
            assert.isTrue(yerbamate.successCode(code));
            assert.lengthOf(err, 0);
            assert.isAtLeast(out.length, 2);
            assert.match(out[1], /Yet Another Markdown Parser/);
            done();
        });

    });
    it("--pdf", (done) => {
        yerbamate.run(pkg.scripts.start, pkg.dir, {
            args: defaultArgs + " --pdf"
        }, function(code, out, err) {
            assert.isTrue(yerbamate.successCode(code));
            assert.lengthOf(err, 0);
            assert.lengthOf(out, 1);

            fs.stat(testDir + "/test.pdf", function(err, res) {
                assert.notOk(err);
                assert.ok(res);
                assert.ok(res.isFile());
                yerbamate.run(pkg.scripts.start, pkg.dir, {
                    args: defaultArgs + "/test2.html --pdf"
                }, function(code, out, err) {
                    assert.isTrue(yerbamate.successCode(code));
                    assert.lengthOf(err, 0);
                    assert.lengthOf(out, 1);

                    fs.stat(testDir + "/test2.html.pdf", function(err, res) {
                        assert.notOk(err);
                        assert.ok(res);
                        assert.ok(res.isFile());
                        done();
                    });
                });
            });
        });
    });
    it("--html", (done) => {
        yerbamate.run(pkg.scripts.start, pkg.dir, {
            args: defaultArgs + " --html"
        }, function(code, out, err) {
            assert.isTrue(yerbamate.successCode(code));
            assert.lengthOf(err, 0);
            assert.lengthOf(out, 1);

            fs.readFile(testDir + "/test.html", "utf8", (err, res) => {
                assert.notOk(err);
                assert.ok(res);
                assert.match(res, regex.html);
                assert.match(res, regex.htmlBody);
                assert.match(res, /(<style>[\s\S]*<\/style>[\s\S]*){2}/);
                yerbamate.run(pkg.scripts.start, pkg.dir, {
                    args: defaultArgs + "/test2.pdf --html"
                }, function(code, out, err) {
                    assert.isTrue(yerbamate.successCode(code));
                    assert.lengthOf(err, 0);
                    assert.lengthOf(out, 1);
                    fs.readFile(testDir + "/test2.pdf.html", "utf8", (err, res) => {
                        assert.notOk(err);
                        assert.ok(res);
                        assert.match(res, regex.html);
                        assert.match(res, regex.htmlBody);
                        done();
                    });
                });
            });
        });
    });
    it.skip("--remark", () => {


    });
    it.skip("Different extensions in output files", () => {


    });
    it.skip("Multiple outputs", () => {


    });
    it.skip("Multiple files input", () => {

    });
    it.skip("Multiple files input with folder output", () => {

    });
    it.skip("Multiple files input with file output", () => {

    });
    it.skip("--join with multiple files input", () => {

    });
    it("-t/--title", (done) => {
        const testTitle = "TestTitle";
        const titleRegex = /<title>TestTitle<\/title>/;
        yerbamate.run(pkg.scripts.start, pkg.dir, {
            args: defaultArgs + " --html -t " + testTitle
        }, function(code, out, err) {
            assert.isTrue(yerbamate.successCode(code));
            assert.lengthOf(err, 0);
            assert.lengthOf(out, 1);

            fs.readFile(testDir + "/test.html", "utf8", (err, res) => {
                assert.notOk(err);
                assert.ok(res);
                assert.match(res, titleRegex);
                yerbamate.run(pkg.scripts.start, pkg.dir, {
                    args: defaultArgs + " --html --title " + testTitle
                }, function(code, out, err) {
                    assert.isTrue(yerbamate.successCode(code));
                    assert.lengthOf(err, 0);
                    assert.lengthOf(out, 1);

                    fs.readFile(testDir + "/test.html", "utf8", (err, res) => {
                        assert.notOk(err);
                        assert.ok(res);
                        assert.match(res, titleRegex);
                        done();
                    });
                });
            });
        });
    });
    it("--list-styles", (done) => {
        yerbamate.run(pkg.scripts.start, pkg.dir, {
            args: " --list-styles"
        }, function(code, out, err) {
            assert.isTrue(yerbamate.successCode(code));
            assert.lengthOf(err, 0);
            assert.isAtLeast(out.length, 4);
            done();
        });
    });
    it.skip("--style <yamp style>", () => {

    });
    it.skip("--style <custom style>", () => {


    });
    it("--no-style and --no-highlight", (done) => {
        yerbamate.run(pkg.scripts.start, pkg.dir, {
            args: defaultArgs + " --html --no-style --no-highlight"
        }, function(code, out, err) {
            assert.isTrue(yerbamate.successCode(code));
            assert.lengthOf(err, 0);
            assert.lengthOf(out, 1);

            fs.readFile(testDir + "/test.html", "utf8", (err, res) => {
                assert.notOk(err);
                assert.ok(res);
                assert.notMatch(res, /<style>/);
                assert.notMatch(res, /<\/style>/);
                done();
            });
        });
    });
    it("--minify", (done) => {
        //This tests that minify actually returns the correct html, it doesn't test that it was actually minified
        yerbamate.run(pkg.scripts.start, pkg.dir, {
            args: defaultArgs + " --html --minify"
        }, function(code, out, err) {
            assert.isTrue(yerbamate.successCode(code));
            assert.lengthOf(err, 0);
            assert.lengthOf(out, 1);

            fs.readFile(testDir + "/test.html", "utf8", (err, res) => {
                assert.notOk(err);
                assert.ok(res);
                assert.match(res, regex.html);
                assert.match(res, regex.htmlBody);
                assert.match(res, /(<style>[\s\S]*<\/style>[\s\S]*){2}/);
                done();
            });
        });
    });
    it.skip("--no-tags", () => {

    });
    it.skip("--no-front-matter", () => {

    });
    it.skip("-k/--koala", () => {


    });
    it.skip("Invalid input files", () => {


    });
    it.skip("Invalid options", () => {

    });
});
