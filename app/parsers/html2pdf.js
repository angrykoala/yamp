"use strict";
/*
Html to PDF parser
==================
Generates pdf file from html string
*/

const Pdf = require('html-pdf');

module.exports = function(html, outputFile, done) {
    Pdf.create(html, {
        "border": {
            "top": "0",
            "right": "0",
            "bottom": "1in",
            "left": "0"
        },
        "header": {
            "height": "1in",
        },
        "zoomFactor": "0.75",
        "base": "file://" + process.cwd() + "/"
    }).toFile(outputFile + '.pdf', function(err, res) {
        if (err) return done(new Error("[html-pdf] outputFile error: " + err), res);
        return done(null, res);
    });
};
