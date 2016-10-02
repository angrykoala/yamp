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
const testFrontMatterFile = config.testFrontMatterFile;

describe("Renderers", function() {
    beforeEach(function(done) {
        fs.remove(testDir, function(err) {
            assert.notOk(err);
            for (let i = 0; i < testFiles.length; i++) {
                fs.copySync(__dirname + "/config/" + testFiles[i], testDir + "/" + testFiles[i]);
            }
            fs.copySync(__dirname + "/config/" + testFrontMatterFile, testDir + "/" + testFrontMatterFile);
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
        it.skip("Rendering multiple files", function() {

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
            let originalOptions = JSON.stringify(renderer.options);
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
                        assert.strictEqual(JSON.stringify(renderer.options), originalOptions);
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
                fs.readFile("/default.html", function(err) {
                    assert.ok(err);
                    renderer.renderFile("not_a_file.md", function(err) {
                        assert.ok(err);
                        fs.readFile("/not_a_file.html", function(err) {
                            assert.ok(err);
                            renderer.renderFile("wrongFolder/not_a_file.md", function(err) {
                                assert.ok(err);
                                fs.readFile("wrongFolder/not_a_file.html", function(err) {
                                    assert.ok(err);
                                    done();
                                });
                            });
                        });
                    });
                });
            });
        });
        it("Rendering multiple files", function(done) {
            let renderer = new HtmlRenderer({
                outputFilename: testDir + "/test"
            });
            renderer.renderFile([testDir + "/" + testFiles[1], testDir + "/" + testFiles[0]], function(err) {
                assert.notOk(err);
                fs.readFile(testDir + "/test.html", "utf8", function(err, res) {
                    assert.notOk(err);
                    assert.ok(res);
                    assert.match(res, regex.html);
                    assert.match(res, regex.htmlBody);
                    let body = regex.htmlBody.exec(res)[0];
                    assert.ok(body);
                    assert.match(body,/<p>This should be included<\/p>[\s]*<h1[\s\S]*Markdown Test<\/h1>/);
                    done();
                });
            });
        });

        describe("Renderer options", function() {
            it("Highlight", function(done) {
                let renderer = new HtmlRenderer({
                    outputFilename: testDir + "/test",
                    highlight: true
                });
                let originalOptions = JSON.stringify(renderer.options);
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
                                assert.strictEqual(JSON.stringify(renderer.options), originalOptions);
                                let renderer2 = new HtmlRenderer({
                                    outputFilename: testDir + "/test",
                                    highlight: false
                                });
                                let originalOptions2 = JSON.stringify(renderer2.options);
                                renderer2.renderFile(testDir + "/" + testFiles[0], function(err) {
                                    assert.notOk(err);
                                    fs.readFile(testDir + "/test.html", "utf8", function(err, res) {
                                        assert.notOk(err);
                                        assert.ok(res);
                                        assert.match(res, regex.html);
                                        assert.notMatch(res, regex.options.highlightjs);
                                        assert.notMatch(res, regex.options.highlightcss);
                                        assert.strictEqual(JSON.stringify(renderer2.options), originalOptions2);
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
            it("Front Matter", function(done) {
                let renderer = new HtmlRenderer({
                    outputFilename: testDir + "/test",
                });
                renderer.renderFile(testDir + "/" + testFrontMatterFile, function(err) {
                    assert.notOk(err);
                    fs.readFile(testDir + "/test.html", "utf8", function(err, res) {
                        let titleRegex = /<title>Custom title<\/title>/;
                        assert.notOk(err);
                        assert.ok(res);
                        assert.match(res, regex.html);
                        assert.match(res, titleRegex);
                        assert.match(res, /This is an example of a front matter file/);
                        assert.notMatch(res, /title: Custom title/);
                        assert.notMatch(res, /koala: true/);
                        let renderer = new HtmlRenderer({
                            outputFilename: testDir + "/test",
                            frontMatter: false
                        });
                        renderer.renderFile(testDir + "/" + testFrontMatterFile, function(err) {
                            assert.notOk(err);
                            fs.readFile(testDir + "/test.html", "utf8", function(err, res) {
                                assert.notOk(err);
                                assert.ok(res);
                                assert.match(res, regex.html);
                                assert.notMatch(res, titleRegex);
                                assert.match(res, /This is an example of a front matter file/);
                                assert.match(res, /title: Custom title/);
                                assert.match(res, /koala: true/);
                                done();
                            });
                        });
                    });
                });
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
