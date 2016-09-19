#!/usr/bin/env node
"use strict";

//YAMP CLI
//If using npm use -- before arguments
const commander = require('commander');
require('pkginfo')(module, "version", "author", "license", "description");
const renderers = require('../index').renderers;

const version = module.exports.version;

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
    .option("--remark", "remark html slides")
    .option("--reveal", "reveal html slides")
    .option("-t, --title [value]", "sets the html title")
    .option("--style <file>", "custom css style")
    .option("--no-style", "disables css styling")
    .option("--minify", "minifies html output")
    .option("--no-highlight", "disable code highlight")
    .option("--no-tags", "disable markdown yamp tags")
    .option("-k, --koala", "your output will be koalafied")
    .parse(process.argv);
if (!inputFile) {
    console.error("Invalid Input", "usage: yamp [options] <file>");
    process.exit(1);
}

let rendererOptions = {
    outputFilename: commander.output,
    highlight: commander.highlight,
    style: commander.style,
    minify: commander.minify || false,
    title: commander.title,
    tags: commander.tags,
    koala: commander.koala
};


if(commander.html+commander.remark+commander.reveal>=2){
    console.log("Using Multiple renderers with html output is not allowed");
}

//Use a switch here!!
if (commander.html) {
    let renderer = new renderers.html(rendererOptions);
    renderer.renderFile(inputFile, (err) => {
        if (err) return console.log("Error: " + err);
        else console.log("HTML succesfully generated");

    });
}
else if(commander.remark){
    let renderer=new renderers.remark(rendererOptions);
    renderer.renderFile(inputFile, (err)=>{
        if (err) return console.log("Error: " + err);
        else console.log("Remark (HTML) succesfully generated");
    });    
}
else if(commander.reveal){
    let renderer=new renderers.reveal(rendererOptions);
    renderer.renderFile(inputFile, (err)=>{
        if (err) return console.log("Error: " + err);
        else console.log("Reveal (HTML) succesfully generated");
    });       
}
if (commander.pdf || (!commander.pdf && !commander.html && !commander.remark && !commander.reveal)) {
    let renderer = new renderers.pdf(rendererOptions);
    renderer.renderFile(inputFile, (err) => {
        if (err) return console.log("Error: " + err);
        else console.log("PDF succesfully generated");
    });
}
