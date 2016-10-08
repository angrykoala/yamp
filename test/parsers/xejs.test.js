"use strict";

const assert = require('chai').assert;

const config = require('../config/config');
const xejsParser = require('../../app/parsers/xejs_parser');

const testFiles = config.testFiles.xejs;
const testDir = config.testDir;

describe("XEJS parser", function () {
    it("Parsing file with default options", (done) => {
        assert.ok(xejsParser);
        xejsParser(testDir + "/" + testFiles[0], {}, [], (err, res) => {
            const reg = config.regex.xejsTestFile;
            assert.notOk(err);
            assert.ok(res);
            for (let i = 0; i < reg.common.length; i += 1) {
                assert.match(res, reg.common[i]);
            }
            for (let i = 0; i < reg.defaultTags.length; i += 1) {
                assert.match(res, reg.defaultTags[i]);
            }
            done();
        });
    });
    it("Extra tags", (done) => {
        assert.ok(xejsParser);
        // {{ extra tag(12)}}
        xejsParser(testDir + "/" + testFiles[0], {}, [
            [/extra\s+tag\((\d+)\)/, "-'tag is $1'"]
        ], (err, res) => {
            const reg = config.regex.xejsTestFile;
            assert.notOk(err);
            assert.ok(res);
            for (let i = 0; i < reg.common.length; i += 1) {
                assert.match(res, reg.common[i]);
            }
            for (let i = 0; i < reg.customTags.length; i += 1) {
                assert.match(res, reg.customTags[i]);
            }
            done();
        });
    });
});
