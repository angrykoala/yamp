"use strict";

/*
Hooks
==============
Mocha hooks for each test
*/


const assert = require('chai').assert;
const fs = require('fs-extra');

const config = require('./config/config');

const testDir = config.testDir;
const testMdFiles = config.testMdFiles;
const testXejsFiles = config.testXejsFiles;
const testFrontMatterFile = config.testFrontMatterFile;

const testFiles = testMdFiles.concat(testXejsFiles);

beforeEach(function(done) {
    fs.remove(testDir, (err) => {
        assert.notOk(err);
        for (let i = 0; i < testFiles.length; i++) {
            fs.copySync(__dirname + "/config/" + testFiles[i], testDir + "/" + testFiles[i]);
        }
        fs.copySync(__dirname + "/config/" + testFrontMatterFile, testDir + "/" + testFrontMatterFile);
        done();
    });
});

afterEach(function(done) {
    fs.remove(testDir, () => {
        done();
    });
});
