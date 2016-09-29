#!/usr/bin/env node

"use strict";

//YAMP CLI
//If using npm use -- before arguments
const commander = require('commander');
require('pkginfo')(module, "version", "author", "license", "description");
const renderers = require('../index').renderers;

const version = module.exports.version;

commander.version(version)
    .usage("<files> [options]")
    .description(module.exports.description)
    .option("-o, --output <file>", "output file name (without extension)")
    .option("--pdf", "pdf output")
    .option("--html", "html output")
    .option("--remark", "remark (html slides) output")
    .option("-t, --title [value]", "sets the html title")
    .option("--list-styles", "lists all styles provided by yamp")
    .option("--style <file>", "select one of the yamp styles or use a custom file")
    .option("--no-style", "disables css styling")
    .option("--minify", "minifies html output")
    .option("--no-highlight", "disable code highlight")
    .option("--no-tags", "disable markdown yamp tags")
    .option("--no-front-matter", "disable initial yaml options parsing")
    .option("-k, --koala", "your output will be koalafied")
    .parse(process.argv);

if (commander.listStyles) {
    const fs = require("fs");
    console.log("\n  listing available styles\n");

    let files = fs.readdirSync(__dirname + "/../styles");

    for (let i = 0; i < files.length; i++) {
        console.log("      *", files[i]);
    }

    console.log("\n  you can select one of these styles above as with --style option");
    console.log("  default: --style 'github-markdown.css'\n");
    process.exit(0);
}


if (commander.args.length===0) {
    console.error("Invalid Input", "usage: yamp <file> [options]");
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

for(let i=0;i<commander.args.length;i++){
    let inputFile=commander.args[i];
    renderFile(inputFile,selectedRenderers,rendererOptions);
}


function onRendererFinish(err, filename) {
    if (err) return console.log("Error: " + err);
    else console.log(filename + " created");
}


function renderFile(inputFile,selectedRenderers,options){
    for (let i = 0; i < selectedRenderers.length; i++) {
        let rendererName = selectedRenderers[i];

        let renderer = new renderers[rendererName](options);
        renderer.renderFile(inputFile, onRendererFinish);
    }
}
