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
    .option("--remark", "remark (html slides) output")
    .option("-t, --title [value]", "sets the html title")
    .option("--style <file>", "custom css style")
    .option("--no-style", "disables css styling")
    .option("--minify", "minifies html output")
    .option("--no-highlight", "disable code highlight")
    .option("--no-tags", "disable markdown yamp tags")
    .option("--no-front-matter", "disable initial yaml options parsing")
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
    frontMatter: commander.frontMatter,
    koala: commander.koala
};

let selectedRenderers = [];
for (let key in renderers) {
    if (commander[key]) selectedRenderers.push(key);
}

if (selectedRenderers.length === 0) selectedRenderers.push("pdf");


for (let i = 0; i < selectedRenderers.length; i++) {
    let rendererName = selectedRenderers[i];

    let renderer = new renderers[rendererName](rendererOptions);
    renderer.renderFile(inputFile, (err) => {
        if (err) return console.log("Error: " + err);
        else console.log(rendererName + " conversion successful");
    });
}
