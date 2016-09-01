#!/usr/bin/env node


//If using npm use -- before arguments
var commander = require('commander');
var md = require('markdown-it')();
var pkginfo = require('pkginfo')(module, "version", "author", "license", "description");
var fs = require('fs');

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


if (commander.output) outputFile = commander.output;

if (!inputFile || !outputFile) {
    return console.error("Invalid Input", "usage: yamp [options] <file>");
}

fs.readFile(inputFile, 'utf8', function(err, data) {
    if (err) {
        return console.error("Error reading file\n", err);
    }
    fs.writeFile(outputFile, md.render(data), function(err) {
        if (err) {
            return console.err("Error writing file\n", err);
        }

        return console.log("HTML successfully generate");
    });
});
