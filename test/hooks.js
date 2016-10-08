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
const testFilesList = config.testFiles;

let testFiles = [];

for (let key in testFilesList) {
        testFiles = testFiles.concat(testFilesList[key]);
}

beforeEach(function(done) {
    fs.remove(testDir, (err) => {
        assert.notOk(err);
        for (let i = 0; i < testFiles.length; i++) {
            fs.copySync(__dirname + "/config/test_files/" + testFiles[i], testDir + "/" + testFiles[i]);
        }
        done();
    });
});

afterEach(function(done) {
    fs.remove(testDir, () => {
        done();
    });
});
