"use strict";

const Pdf = require('html-pdf');


module.exports = function(html, outputFile, cb) {
    Pdf.create(html, {
        "base": "file://" + __dirname + "/styles/" //TODO: change base
    }).toFile(outputFile + '.pdf', function(err,res) {
        if (err) return cb(new Error("[html-pdf] outputFile error: "+err),res);
        return cb(null,res);
    });
};
