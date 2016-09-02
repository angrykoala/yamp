#!/usr/bin/env node


//If using npm use -- before arguments
var commander = require('commander');
var md = require('markdown-it')();
var pkginfo = require('pkginfo')(module, "version", "author", "license", "description");
var fs = require('fs');
var pdf = require('html-pdf');

var version = module.exports.version;

var inputFile;
var outputFile;
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


var prev = '<link rel="stylesheet" href="github-markdown.css"><style>.markdown-body {box-sizing: border-box;        min-width: 200px;        max-width: 980px;        margin: 0 auto;      padding: 45px;    }</style> <article class="markdown-body">';

if (commander.output) outputFile = commander.output;

if (!inputFile || !outputFile) {
    return console.error("Invalid Input", "usage: yamp [options] <file>");
}
console.log(__dirname);
fs.readFile(inputFile, 'utf8', function(err, data) {
    if (err) {
        return console.error("Error reading file\n", err);
    }
    var html = prev + md.render(data) + "</article>";
    fs.writeFile(outputFile+'.html', html, function(err) {
        if (err) {
            return console.error("Error writing file\n", err);
        }

        console.log("HTML successfully created");
        pdf.create(html,{"base": "file://"+__dirname+"/styles/"}).toFile(outputFile + '.pdf', function(err, res) {
            if (err) return console.error(err);
            return console.log("PDF successfully created");
        });
    });
});
