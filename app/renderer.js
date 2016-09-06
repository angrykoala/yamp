"use strict";

const fs = require('fs');

const md2html = require('./parsers/md2html');
const html2pdf = require('./parsers/html2pdf');
const htmlMinifier = require('./minifier').html;
const titleParser = require('./parsers/title_parser');
const ejs = require('ejs');


function mdFileLoader(file, options, done) {
    fs.readFile(file, 'utf8', function(err, data) {
        if (err) return done(new Error("Error reading file: " + err));
        md2html(data, {
            highlight: options.highlight
        }, done);
    });
}

module.exports = function(inputFile, options, cb) {
    mdFileLoader(inputFile, options, function(err, htmlContent) {
        if (err) return cb(err);
        let title = options.title || titleParser.html(htmlContent) || options.fileName;

        let rendererConfig = {
            title: title,
            fileName: options.fileName,
            content: htmlContent,
            highlight: options.highlight,
            styleFile: "github-markdown.css",
            style: options.style,
            resourcesPath: options.resourcesPath,
            koala: options.koala
        };

        switch (options.output) {
            case "html":
                htmlRenderer(rendererConfig, cb);
                break;
            case "pdf":
                pdfRenderer(rendererConfig, cb);
                break;
        }
    });
};

function templateRenderer(template, data, done) {
    template = __dirname + "/../templates/" + template;
    ejs.renderFile(template, data, data, done);
}

function htmlRenderer(options, done) {
    options.output = "html";
    templateRenderer("default.ejs", options, function(err, html) {
        if (err) return done(new Error("Error parsing ejs: " + err));
        if (options.minify) html = htmlMinifier(html);
        fs.writeFile(options.fileName + '.html', html, function(err) {
            if (err) return done(new Error("Error writing file" + err));
            else return done(null);
        });

    });
}

function pdfRenderer(options, done) {
    options.output = "pdf";
    templateRenderer("default.ejs", options, function(err, html) {
        if (err) return done(new Error("Error parsing ejs: " + err));
        //if(options.minify) html=htmlMinifier(html);
        html2pdf(html, options.fileName, done);
    });
}
