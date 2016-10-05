"use strict";

const assert = require('chai').assert;
const fs = require('fs-extra');

const Renderer = require('../../app/renderer');
const HtmlRenderer = require('../../app/renderers/html_renderer');
const config = require('../config/config');

const regex = config.regex;
const testDir = config.testDir;
const testFrontMatterFile = config.testFrontMatterFile;
const testFiles = config.testMdFiles;

describe("Html Renderer", function () {
    it("Create Renderer with default data", () => {
        const renderer = new HtmlRenderer({});
        assert.ok(renderer);
        assert.instanceOf(renderer, HtmlRenderer);
        assert.instanceOf(renderer, Renderer);
        assert.strictEqual(renderer.output, "html");
        const keys = Object.keys(config.rendererDefaultOptions);
        for (let i = 0; i < keys.length; i += 1) {
            const k = keys[i];
            assert.strictEqual(renderer.options[k], config.rendererDefaultOptions[k]);
        }
    });
    it("Create Html file", (done) => {
        const renderer = new HtmlRenderer({
            outputFilename: testDir + "/test"
        });
        const originalOptions = JSON.stringify(renderer.options);
        renderer.renderFile(testDir + "/" + testFiles[0], (renderFileError) => {
            assert.notOk(renderFileError);
            fs.stat(testDir + "/test.html", (err, res) => {
                assert.notOk(err);
                assert.ok(res);
                assert.ok(res.isFile());

                fs.readFile(testDir + "/test.html", "utf8", (err, res) => {
                    assert.notOk(err);
                    assert.ok(res);
                    assert.match(res, regex.html);
                    assert.match(res, regex.htmlBody);
                    const body = regex.htmlBody.exec(res)[0];
                    assert.ok(body);
                    const regKeys = Object.keys(regex.htmlTestFile);
                    for (let i = 0; i < regKeys.length; i += 1) {
                        assert.match(body, regex.htmlTestFile[regKeys[i]]);
                    }
                    assert.strictEqual(JSON.stringify(renderer.options), originalOptions);
                    done();
                });
            });
        });
    });
    it("Wrong input file", (done) => {
        const renderer = new HtmlRenderer();
        assert.ok(renderer);
        renderer.renderFile("", (err) => {
            assert.ok(err);
            fs.readFile("/default.html", (err) => {
                assert.ok(err);
                renderer.renderFile("not_a_file.md", (err) => {
                    assert.ok(err);
                    fs.readFile("/not_a_file.html", (err) => {
                        assert.ok(err);
                        renderer.renderFile("wrongFolder/not_a_file.md", (err) => {
                            assert.ok(err);
                            fs.readFile("wrongFolder/not_a_file.html", (err) => {
                                assert.ok(err);
                                done();
                            });
                        });
                    });
                });
            });
        });
    });
    it("Rendering multiple files", (done) => {
        const renderer = new HtmlRenderer({
            outputFilename: testDir + "/test"
        });
        renderer.renderFile([testDir + "/" + testFiles[1], testDir + "/" + testFiles[0]], (err) => {
            assert.notOk(err);
            fs.readFile(testDir + "/test.html", "utf8", (err, res) => {
                assert.notOk(err);
                assert.ok(res);
                assert.match(res, regex.html);
                assert.match(res, regex.htmlBody);
                const body = regex.htmlBody.exec(res)[0];
                assert.ok(body);
                assert.match(body, /<p>This should be included<\/p>[\s]*<h1[\s\S]*Markdown Test<\/h1>/);
                done();
            });
        });
    });

    describe("Renderer options", () => {
        it("Highlight", (done) => {
            const renderer = new HtmlRenderer({
                outputFilename: testDir + "/test",
                highlight: true
            });
            const originalOptions = JSON.stringify(renderer.options);
            renderer.renderFile(testDir + "/" + testFiles[0], (err) => {
                assert.notOk(err);
                fs.readFile(testDir + "/test.html", "utf8", (err, res) => {
                    assert.notOk(err);
                    assert.ok(res);
                    assert.match(res, regex.html);
                    assert.match(res, regex.options.highlightjs);
                    assert.match(res, regex.options.highlightcss);
                    renderer.renderFile(testDir + "/" + testFiles[1], (err) => {
                        assert.notOk(err);
                        fs.readFile(testDir + "/test.html", "utf8", (err, res) => {
                            assert.notOk(err);
                            assert.ok(res);
                            assert.match(res, regex.html);
                            assert.notMatch(res, regex.options.highlightjs);
                            assert.notMatch(res, regex.options.highlightcss);
                            assert.strictEqual(JSON.stringify(renderer.options), originalOptions);
                            const renderer2 = new HtmlRenderer({
                                outputFilename: testDir + "/test",
                                highlight: false
                            });
                            const originalOptions2 = JSON.stringify(renderer2.options);
                            renderer2.renderFile(testDir + "/" + testFiles[0], (err) => {
                                assert.notOk(err);
                                fs.readFile(testDir + "/test.html", "utf8", (err, res) => {
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

        it("Title", (done) => {
            const titleTest = "Testing Title";
            let titleRegex = new RegExp("<title>" + titleTest + "</title>");
            let renderer = new HtmlRenderer({
                outputFilename: testDir + "/test",
                title: titleTest
            });
            renderer.renderFile(testDir + "/" + testFiles[0], (err) => {
                assert.notOk(err);
                fs.readFile(testDir + "/test.html", "utf8", (err, res) => {
                    assert.notOk(err);
                    assert.ok(res);
                    assert.match(res, regex.html);
                    assert.match(res, titleRegex);
                    renderer = new HtmlRenderer({
                        outputFilename: testDir + "/test",
                    });
                    renderer.renderFile(testDir + "/" + testFiles[1], (err) => {
                        assert.notOk(err);
                        fs.readFile(testDir + "/test.html", "utf8", (err, res) => {
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
        it.skip("Style", () => {

        });
        it.skip("Minify", () => {

        });
        it.skip("Koala", () => {


        });
        it("Front Matter", (done) => {
            const renderer = new HtmlRenderer({
                outputFilename: testDir + "/test",
            });
            renderer.renderFile(testDir + "/" + testFrontMatterFile, (err) => {
                assert.notOk(err);
                fs.readFile(testDir + "/test.html", "utf8", (err, res) => {
                    const titleRegex = /<title>Custom title<\/title>/;
                    assert.notOk(err);
                    assert.ok(res);
                    assert.match(res, regex.html);
                    assert.match(res, titleRegex);
                    assert.match(res, /This is an example of a front matter file/);
                    assert.notMatch(res, /title: Custom title/);
                    assert.notMatch(res, /koala: true/);
                    const renderer = new HtmlRenderer({
                        outputFilename: testDir + "/test",
                        frontMatter: false
                    });
                    renderer.renderFile(testDir + "/" + testFrontMatterFile, (err) => {
                        assert.notOk(err);
                        fs.readFile(testDir + "/test.html", "utf8", (err, res) => {
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
    it.skip("Extending class", () => {

    });
});
