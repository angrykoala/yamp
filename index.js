"use strict";

//If using npm use -- before arguments
const commander = require('commander');
require('pkginfo')(module, "version", "author", "license", "description");
const renderer = require('./app/renderer');


const version = module.exports.version;

let inputFile;

commander.version(version)
    .usage("[options] <file>")
    .description(module.exports.description)
    .arguments('<file>')
    .action(function(file) {
        inputFile = file;
    })
    .option("--html", "html output")
    .option("--pdf", "pdf output")
    .option("--minify", "minifies html output")
    .option("--no-highlight", "disable code highlight")
    .option("--no-style", "disable default css styling")
    .option("-t, --title [value]", "sets the html title")
    .option("-k, --koala", "your output will be koalafied")
    .parse(process.argv);
if (!inputFile) {
    console.error("Invalid Input", "usage: yamp [options] <file>");
    process.exit(1);
}

let fileNameArr = inputFile.split(".");
if (fileNameArr.length > 1) fileNameArr.pop();
let fileName = fileNameArr.join(".");
let resourcesPath=__dirname+"/resources";

if (commander.html) {
    let rendererOptions = {
        fileName: fileName,
        output: "html",
        highlight: commander.highlight,
        style: commander.style,
        minify: commander.minify || false,
        resourcesPath: resourcesPath,
        title: commander.title,
        koala: commander.koala,
    };
    renderer(inputFile, rendererOptions, function(err) {
        if (err) return console.log("Error: " + err);
        else console.log("HTML succesfully generated");
    });
}
if (commander.pdf || (!commander.pdf && !commander.html)) {
    let rendererOptions = {
        fileName: fileName,
        output: "pdf",
        highlight: commander.highlight,
        minify: commander.minify || false,
        style: commander.style,
        title: commander.title,
        resourcesPath: resourcesPath,
        koala: commander.koala
    };
    renderer(inputFile, rendererOptions, function(err) {
        if (err) return console.log("Error: " + err);
        else console.log("PDF succesfully generated");
    });
}
