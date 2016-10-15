"use strict";

const assert = require('chai').assert;
const fs = require('fs-extra');

const Renderer = require('../../app/renderer');
const remarkRenderer = require('../../app/renderers/remark_renderer');
const config = require('../config/config');

const testDir = config.testDir;
const testFile = config.testFiles.remark;
const regex = config.regex;

describe("Remark Renderer", function() {
    it("Create Renderer with default data", () => {
        const renderer = new remarkRenderer({});
        assert.ok(renderer);
        assert.instanceOf(renderer, remarkRenderer);
        assert.instanceOf(renderer, Renderer);
        assert.strictEqual(renderer.output, "remark");
        const keys = Object.keys(config.rendererDefaultOptions);
        for (let i = 0; i < keys.length; i += 1) {
            const k = keys[i];
            assert.strictEqual(renderer.options[k], config.rendererDefaultOptions[k]);
        }
    });
    it("Create Remark file", (done) => {
        const renderer = new remarkRenderer({
            outputFilename: testDir + "/remark_test"
        });
        const originalOptions = JSON.stringify(renderer.options);
        renderer.renderFile(testDir + "/" + testFile, (renderFileError) => {
            assert.notOk(renderFileError);
            fs.stat(testDir + "/remark_test.html", (err, res) => {
                assert.notOk(err);
                assert.ok(res);
                assert.ok(res.isFile());
                fs.readFile(testDir + "/remark_test.html", "utf8", (err, res) => {
                    assert.notOk(err);
                    assert.ok(res);
                    assert.match(res, regex.html);
                    assert.match(res, regex.htmlBody);

                    for (let i = 0; i < regex.remarkTestFile.length; i++) {
                        assert.match(res, regex.remarkTestFile[i]);
                    }
                    assert.strictEqual(JSON.stringify(renderer.options), originalOptions);
                    done();

                });
            });
        });

    });
    it("Create Remark file with supplied extension", (done) => {
        const renderer = new remarkRenderer({
            outputFilename: testDir + "/remark_test"
        });

        renderer.renderFile(testDir + "/" + testFile, (renderFileError) => {
            assert.notOk(renderFileError);
            fs.stat(testDir + "/remark_test.html", (err, res) => {
                assert.notOk(err);
                assert.ok(res);
                assert.ok(res.isFile());
                done();
            });
        });

    });

});
