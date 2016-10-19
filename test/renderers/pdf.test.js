"use strict";

const fs = require('fs');
const assert = require('chai').assert;

const config = require('../config/config');
const Renderer = require('../../app/renderer');
const PdfRenderer = require('../../app/renderers/pdf_renderer');

const testDir = config.testDir;
const testFiles = config.testFiles.md;

describe("Pdf Renderer", function() {
    it("Create Renderer with default data", () => {
        const renderer = new PdfRenderer({});
        assert.ok(renderer);
        assert.instanceOf(renderer, PdfRenderer);
        assert.instanceOf(renderer, Renderer);
        assert.strictEqual(renderer.output, "pdf");
        const keys = Object.keys(config.rendererDefaultOptions);
        for (let i = 0; i < keys.length; i += 1) {
            const k = keys[i];
            assert.strictEqual(renderer.options[k], config.rendererDefaultOptions[k]);
        }
    });
    it("Create Pdf file", function(done) {
        this.timeout(5000);
        const renderer = new PdfRenderer({
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
    it("Create Pdf file using a Promise", function(done) {
        this.timeout(5000);
        const renderer = new PdfRenderer({
            outputFilename: testDir + "/prueba"
        });
        renderer.renderFile(testDir + "/" + testFiles[0])
        .then(function() {
            fs.stat(testDir + "/prueba.pdf", function(err, res) {
                assert.notOk(err);
                assert.ok(res);
                assert.ok(res.isFile());
                // CONTENT NOT TESTED
                done();
            });
        });

    });
    it("Create PDF file with supplied extension", function(done) {
        this.timeout(5000);
        const renderer = new PdfRenderer({
            outputFilename: testDir + "/prueba.pdf"
        });
        renderer.renderFile(testDir + "/" + testFiles[0], function(err) {
            assert.notOk(err);
            fs.stat(testDir + "/prueba.pdf", function(err, res) {
                assert.notOk(err);
                assert.ok(res);
                assert.ok(res.isFile());
                done();
            });
        });

    });
    it("Create Pdf file in specified non-existing folder", function(done) {
        this.timeout(5000);
        const renderer = new PdfRenderer({
            outputFilename: testDir + "/prueba/"
        });
        renderer.renderFile(testDir + "/" + testFiles[0], function(err) {
            assert.notOk(err);
            fs.stat(testDir + "/prueba/test.pdf", function(err, res) {
                assert.notOk(err);
                assert.ok(res);
                assert.ok(res.isFile());
                // CONTENT NOT TESTED
                done();
            });
        });

    });
    describe.skip("Renderer options", () => {
        it("Highlight", () => {


        });
        it("Style", () => {

        });
        it("Minify", () => {

        });
        it("Koala", () => {


        });
    });
});
