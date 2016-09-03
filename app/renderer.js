"use strict";

const fs = require('fs');
const ejs = require('ejs');
const md2html = require('./parsers/md2html');
const html2pdf = require('./parsers/html2pdf');


module.exports = function(inputFile, outputFile, cb) {
    fs.readFile(inputFile, 'utf8', function(err, data) {
        if (err) return cb(new Error("Error reading file: " + err));
        md2html(data, function(err, htmlContent) {
            if (err) return cb(err);
            ejs.renderFile('./templates/default.ejs', {
                title: "My own title",
                content: htmlContent,
                styleFile: "github-markdown.css"
            }, {}, function(err, html) {
                if (err) return cb(new Error("Error parsing ejs: " + err));

                fs.writeFile(outputFile + '.html', html, function(err) {
                    if (err) return cb(new Error("Error writing file" + err));
                    html2pdf(html, outputFile, cb);
                });
            });

        });

    });
};
