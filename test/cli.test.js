"use strict";

/*
Yamp cli Test
==============
Command-line interface test
*/

const fs = require('fs');
const assert = require('chai').assert;
const yerbamate = require('yerbamate');

const config = require('./config/config');

const testDir = config.testDir;
const testFiles = config.testFiles.md;

describe("Yamp CLI", function() {
    this.timeout(8000);
    const pkg = yerbamate.loadPackage(module);
    const outputArg = " -o " + testDir;

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
            args: testDir + "/" + testFiles[0] + outputArg
        }, function(code, out, err) {
            assert.isTrue(yerbamate.successCode(code));
            assert.lengthOf(err, 0);
            assert.lengthOf(out, 1);

            fs.stat(testDir + "/test.pdf", function(err, res) {
                assert.notOk(err);
                assert.ok(res);
                assert.ok(res.isFile());
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
    it.skip("-o/--output <file>", () => {


    });
    it.skip("-v/--version", () => {



    });
    it.skip("-h/--help", () => {

    });
    it.skip("--pdf", () => {


    });
    it.skip("--html", () => {


    });
    it.skip("--remark", () => {


    });
    it.skip("Multiple files input", () => {

    });
    it.skip("Multiple files input with folder output", () => {

    });
    it.skip("Multiple files input with file output", () => {

    });
    it.skip("--join with multiple files input", () => {

    });
    it.skip("-t/--title", () => {

    });
    it.skip("--list-styles", () => {

    });
    it.skip("--style <yamp style>", () => {

    });
    it.skip("--style <custom style>", () => {


    });
    it.skip("--no-style", () => {

    });
    it.skip("--minify", () => {

    });
    it.skip("--no-highlight", () => {

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
