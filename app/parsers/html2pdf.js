"use strict";

const Pdf = require('html-pdf');


module.exports = function(html, outputFile, cb) {
    Pdf.create(html, {}).toFile(outputFile + '.pdf', function(err,res) {
        if (err) return cb(new Error("[html-pdf] outputFile error: "+err),res);
        return cb(null,res);
    });
};
