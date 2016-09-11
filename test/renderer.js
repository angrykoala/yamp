"use strict";

const assert = require('chai').assert;
const fs = require('fs-extra');

const HtmlRenderer = require('../app/renderers').html;
const Renderer = require('../app/renderers/renderer');

const config = require('./config/config');

const testDir = config.testDir;
const testFile = config.testMdFile;

describe("Renderers", function() {
    beforeEach(function(done) {
        fs.remove(testDir, function(err) {
            assert.notOk(err);
            fs.copy(__dirname + "/config/" + testFile, testDir + "/" + testFile, done);
        });
    });
    afterEach(function(done) {
        fs.remove(testDir, function() {
            done();
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
        it.skip("Create Html file", function(done) {
            let renderer = new HtmlRenderer({
                outputFilename: testDir + "/prueba"
            });
            renderer.renderFile(testDir + "/" + testFile, function(err) {
                assert.notOk(err);
                fs.stat(testDir + "/prueba.html", function(err, res) {
                    assert.notOk(err);
                    assert.ok(res);
                    assert.ok(res.isFile());
                    //TODO: check html inside <body> on the file
                    done();
                });
            });
        });

        it.skip("Renderer options", function() {

        });
        it.skip("Extending class", function() {

        });
    });
    describe("Pdf Renderer", function() {


    });
});
