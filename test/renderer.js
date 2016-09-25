"use strict";

const assert = require('chai').assert;
const fs = require('fs-extra');

const HtmlRenderer = require('../app/renderers/html_renderer');
const PdfRenderer = require('../app/renderers/pdf_renderer');

const Renderer = require('../app/renderer');

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
        it.skip("Output file", function() {


        });
        it.skip("Title", function() {

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
        it("Wrong input file", function(done) {
            let renderer = new HtmlRenderer();
            assert.ok(renderer);
            renderer.renderFile("", function(err) {
                assert.ok(err);
                fs.stat("/default.html", function(err) {
                    assert.ok(err);
                    renderer.renderFile("not_a_file.md", function(err) {
                        assert.ok(err);
                        fs.stat("/not_a_file.html", function(err) {
                            assert.ok(err);
                            renderer.renderFile("wrongFolder/not_a_file.md", function(err) {
                                assert.ok(err);
                                fs.stat("wrongFolder/not_a_file.html", function(err) {
                                    assert.ok(err);
                                    done();
                                });
                            });
                        });
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
                        renderer.renderFile(testDir + "/" + testFiles[1], function(err) {
                            assert.notOk(err);
                            fs.readFile(testDir + "/test.html", "utf8", function(err, res) {
                                assert.notOk(err);
                                assert.ok(res);
                                assert.match(res, regex.html);
                                assert.notMatch(res, regex.options.highlightjs);
                                assert.notMatch(res, regex.options.highlightcss);
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
                });
            });

            it("Title", function(done) {
                let titleTest = "Testing Title";
                let titleRegex = new RegExp("<title>" + titleTest + "</title>");
                let renderer = new HtmlRenderer({
                    outputFilename: testDir + "/test",
                    title: titleTest
                });
                renderer.renderFile(testDir + "/" + testFiles[0], function(err) {
                    assert.notOk(err);
                    fs.readFile(testDir + "/test.html", "utf8", function(err, res) {
                        assert.notOk(err);
                        assert.ok(res);
                        assert.match(res, regex.html);
                        assert.match(res, titleRegex);
                        renderer = new HtmlRenderer({
                            outputFilename: testDir + "/test",
                        });
                        renderer.renderFile(testDir + "/" + testFiles[1], function(err) {
                            assert.notOk(err);
                            fs.readFile(testDir + "/test.html", "utf8", function(err, res) {
                                titleRegex = /<title>test<\/title>/;
                                assert.notOk(err);
                                assert.ok(res);
                                assert.match(res, regex.html);
                                assert.match(res, titleRegex);
                                done();
                            });
                        });
                    });
                });

            });
            it.skip("Style", function() {

            });
            it.skip("Minify", function() {

            });
            it.skip("Koala", function() {


            });
            it.skip("Fron Matter",function(){
                
                
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
            this.timeout(5000);
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
