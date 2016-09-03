#!/usr/bin/env node

"use strict";

//If using npm use -- before arguments
const commander = require('commander');
require('pkginfo')(module, "version", "author", "license", "description");
const renderer=require('./app/renderer');


const version = module.exports.version;

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

if (commander.output) outputFile = commander.output;

if (!inputFile || !outputFile) {
    return console.error("Invalid Input", "usage: yamp [options] <file>");
}

renderer(inputFile,outputFile,function(err){
    if(err) return console.log("Error: "+err);
    else console.log("Succesfully converted");
    
    
});
