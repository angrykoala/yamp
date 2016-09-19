"use strict";

const assert = require('chai').assert;
const fs = require('fs-extra');

const HtmlRenderer = require('../app/renderers').html;
const PdfRenderer = require('../app/renderers').pdf;

const Renderer = require('../app/renderers/renderer');

const config = require('./config/config');
const regex = config.regex;

const testDir = config.testDir;
const testFiles = config.testMdFiles;

describe("Renderers", function() {
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

    describe("Renderer Class", function() {
        it.skip("Create a default Renderer", function() {


        });
        it.skip("Extending Renderer class", function() {



        });
    });
    describe("Html Renderer", function() {
        it("Create Renderer with default data", function() {
            let renderer = new HtmlRenderer({});
            assert.ok(renderer);
            assert.instanceOf(renderer, HtmlRenderer);
            assert.instanceOf(renderer, Renderer);
            assert.strictEqual(renderer.output, "html");
            let keys = Object.keys(config.rendererDefaultOptions);
            for (let i = 0; i < keys.length; i++) {
                let k = keys[i];
                assert.strictEqual(renderer.options[k], config.rendererDefaultOptions[k]);
            }

        });
        it("Create Html file", function(done) {
            let renderer = new HtmlRenderer({
                outputFilename: testDir + "/test"
            });
            renderer.renderFile(testDir + "/" + testFiles[0], function(err) {
                assert.notOk(err);
                fs.stat(testDir + "/test.html", function(err, res) {
                    assert.notOk(err);
                    assert.ok(res);
                    assert.ok(res.isFile());

                    fs.readFile(testDir + "/test.html", "utf8", function(err, res) {
                        assert.notOk(err);
                        assert.ok(res);
                        assert.match(res, regex.html);
                        assert.match(res, regex.htmlBody);
                        let body = regex.htmlBody.exec(res)[0];
                        assert.ok(body);
                        let regKeys = Object.keys(regex.htmlTestFile);
                        for (let i = 0; i < regKeys.length; i++) {
                            assert.match(body, regex.htmlTestFile[regKeys[i]]);
                        }
                        done();
                    });
                });
            });
        });


        describe("Renderer options", function() {
            it("Highlight", function(done) {
                let renderer = new HtmlRenderer({
                    outputFilename: testDir + "/test",
                    highlight: true
                });
                renderer.renderFile(testDir + "/" + testFiles[0], function(err) {
                    assert.notOk(err);
                    fs.readFile(testDir + "/test.html", "utf8", function(err, res) {
                        assert.notOk(err);
                        assert.ok(res);
                        assert.match(res, regex.html);
                        assert.match(res, regex.options.highlightjs);
                        assert.match(res, regex.options.highlightcss);
                        let renderer = new HtmlRenderer({
                            outputFilename: testDir + "/test",
                            highlight: false
                        });
                        renderer.renderFile(testDir + "/" + testFiles[0], function(err) {
                            assert.notOk(err);
                            fs.readFile(testDir + "/test.html", "utf8", function(err, res) {
                                assert.notOk(err);
                                assert.ok(res);
                                assert.match(res, regex.html);
                                assert.notMatch(res, regex.options.highlightjs);
                                assert.notMatch(res, regex.options.highlightcss);
                                done();
                            });
                        });
                    });
                });
            });
            it("Style", function() {

            });
            it("Minify", function() {

            });
            it("Koala", function() {


            });
        });
        it.skip("Extending class", function() {

        });
    });
    describe("Pdf Renderer", function() {
        it("Create Renderer with default data", function() {
            let renderer = new PdfRenderer({});
            assert.ok(renderer);
            assert.instanceOf(renderer, PdfRenderer);
            assert.instanceOf(renderer, Renderer);
            assert.strictEqual(renderer.output, "pdf");
            let keys = Object.keys(config.rendererDefaultOptions);
            for (let i = 0; i < keys.length; i++) {
                let k = keys[i];
                assert.strictEqual(renderer.options[k], config.rendererDefaultOptions[k]);
            }
        });
        it("Create Pdf file", function(done) {
            let renderer = new PdfRenderer({
                outputFilename: testDir + "/prueba"
            });
            renderer.renderFile(testDir + "/" + testFiles[0], function(err) {
                assert.notOk(err);
                fs.stat(testDir + "/prueba.pdf", function(err, res) {
                    assert.notOk(err);
                    assert.ok(res);
                    assert.ok(res.isFile());
                    // CONTENT NOT TESTED
                    done();
                });
            });

        });
        describe.skip("Renderer options", function() {
            it("Highlight", function() {


            });
            it("Style", function() {

            });
            it("Minify", function() {

            });
            it("Koala", function() {


            });
        });
    });
});
