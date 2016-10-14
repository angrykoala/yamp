"use strict";

/*
Main Test
==============
General app tests
*/

const assert = require('chai').assert;

const yamp = require('../index');
const yampExports = require('./config/config').yampExports;

describe("Main", function () {
    it("Require module", () => {
        assert.ok(yamp);
        assert.ok(yamp.renderers);
        assert.ok(yamp.Renderer);
        assert.ok(yamp.parsers);
    });

    it("Exported renderers", () => {
        let keys = Object.keys(yamp.renderers);
        assert.equal(keys.length, yampExports.renderers.length);
        for (let i = 0; i < yampExports.renderers.length; i++) {
            assert.ok(yamp.renderers[yampExports.renderers[i]]);
        }
    });
    it("Exported parsers", () => {
        let keys = Object.keys(yamp.parsers);
        assert.equal(keys.length, yampExports.parsers.length);
        for (let i = 0; i < yampExports.parsers.length; i++) {
            assert.ok(yamp.parsers[yampExports.parsers[i]]);
        }
    });
});
