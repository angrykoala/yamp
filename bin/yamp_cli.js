#!/usr/bin/env node
"use strict";

//YAMP CLI
//If using npm use -- before arguments
const commander = require('commander');
require('pkginfo')(module, "version", "author", "license", "description");
const Renderers = require('../app/renderers');


const version = module.exports.version;

function removeFilenameExtension(filename) {
    if (!filename) return "";
    let filenameArr = filename.split(".");
    if (filenameArr.length > 1) filenameArr.pop();
    return filenameArr.join(".");
}
let inputFile;

commander.version(version)
    .usage("[options] <file>")
    .description(module.exports.description)
    .arguments('<file>')
    .action(function(file) {
        inputFile = file;
    })
    .option("-o, --output <file>", "output file name (without extension)")
    .option("--pdf", "pdf output")
    .option("--html", "html output")
    .option("-t, --title [value]", "sets the html title")
    .option("--style <file>", "custom css style")
    .option("--no-style", "disables css styling")
    .option("--minify", "minifies html output")
    .option("--no-highlight", "disable code highlight")
    .option("-k, --koala", "your output will be koalafied")
    .parse(process.argv);
if (!inputFile) {
    console.error("Invalid Input", "usage: yamp [options] <file>");
    process.exit(1);
}


let filename = removeFilenameExtension(inputFile);
let outputFilename = removeFilenameExtension(commander.output);


let resourcesPath = __dirname + "/resources";


let rendererOptions = {
    filename: filename,
    outputFilename: outputFilename || filename,
    highlight: commander.highlight,
    style: commander.style,
    minify: commander.minify || false,
    resourcesPath: resourcesPath,
    title: commander.title,
    koala: commander.koala,
};

if (commander.html) {
    let renderer = new Renderers.html(rendererOptions);
    renderer.renderFile(inputFile, (err) => {
        if (err) return console.log("Error: " + err);
        else console.log("HTML succesfully generated");

    });
}
if (commander.pdf || (!commander.pdf && !commander.html)) {
    let renderer = new Renderers.pdf(rendererOptions);
    renderer.renderFile(inputFile, (err) => {
        if (err) return console.log("Error: " + err);
        else console.log("PDF succesfully generated");
    });
}
