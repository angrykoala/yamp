#!/usr/bin/env node

"use strict";

//If using npm use -- before arguments
let commander = require('commander');
let md = require('markdown-it')();
require('pkginfo')(module, "version", "author", "license", "description");
let fs = require('fs');
let pdf = require('html-pdf');
let ejs = require('ejs');

let version = module.exports.version;

let inputFile;
let outputFile;
commander.version(version)
    .usage("yamp [options] <file>")
    .description(module.exports.description)
    .arguments('<file> [output]')
    .action(function(file, output) {
        inputFile = file;
        outputFile = output;
    })
    .option("-o, --output <file>", "output file")
    .parse(process.argv);

let prev = '<link rel="stylesheet" href="github-markdown.css"><style>.markdown-body {box-sizing: border-box;        min-width: 200px;        max-width: 980px;        margin: 0 auto;      padding: 45px;    }</style> <article class="markdown-body">';

let prev2 = '<link rel="stylesheet" href="acm-sig.css">';

if (commander.output) outputFile = commander.output;

if (!inputFile || !outputFile) {
    return console.error("Invalid Input", "usage: yamp [options] <file>");
}
console.log(__dirname);

fs.readFile(inputFile, 'utf8', function(err, data) {
    if (err) {
        return console.error("Error reading file\n", err);
    }
    data = md.render(data);
    ejs.renderFile('./templates/default.ejs', {
        title: "My own title",
        content: data,
        styleFile: "github-markdown.css"
    }, {}, function(err, html) {
        if (err) {
            return console.error("Error parsing ejs\n", err);
        }

        fs.writeFile(outputFile + '.html', html, function(err) {
            if (err) {
                return console.error("Error writing file\n", err);
            }

            console.log("HTML successfully created");
            pdf.create(html, {
                "base": "file://" + __dirname + "/styles/"
            }).toFile(outputFile + '.pdf', function(err, res) {
                if (err) return console.error(err);
                return console.log("PDF successfully created");
            });
        });
    });
});
