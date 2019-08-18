#!/usr/bin/env node

/*
Yamp CLI
========
Provides a Command Line Interface to use yamp. Will be called with `yamp` when globally installed

>If using npm start use -- before arguments. e.g. `npm start -- myFile.md --pdf`
*/

import * as fs from 'fs';
import commander from 'commander';
import * as pkginfo from 'pkginfo';
pkginfo(module, "version", "author", "license", "description");
import { renderers } from '../main';

const version = module.exports.version;

commander.version(version)
    .usage("<files> [options]")
    .description(module.exports.description)
    .option("-o, --output <file | directory>", "output file name (without extension) or directory, if output is a filename, joins all the resulting files")
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
    .option("--join", "joins all input files into one unique output file")
    .option("-k, --koala", "your output will be koalafied")
    .parse(process.argv);

if (commander.listStyles) {
    const fs = require("fs");
    console.log("\n  Available styles\n");

    let files = fs.readdirSync(__dirname + "/../styles");

    for (let i = 0; i < files.length; i++) {
        console.log("      *", files[i]);
    }

    console.log("\n  you can select one of these styles above as with --style option");
    console.log("  default: --style 'github-markdown.css'\n");
    process.exit(0);
}


if (commander.args.length === 0) {
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

if (selectedRenderers.length === 0) {
    let fileExtension = getFileExtension(commander.output);
    if (fileExtension && renderers[fileExtension]) {
        selectedRenderers.push(fileExtension);
    } else {
        selectedRenderers.push("pdf");
    }
}

let rendererList = loadRenderers(selectedRenderers, rendererOptions);

let isDirectory = false;
if (commander.output) {
    if (commander.output[commander.output.length - 1] === "/") isDirectory = true;
    try {
        const stats = fs.lstatSync(commander.output);
        if (stats.isDirectory()) isDirectory = true;

    } catch (e) { }
}
if ((commander.output && !isDirectory) || commander.join) { //Join files
    let inputFiles = commander.args;
    for (let j = 0; j < rendererList.length; j++) {
        rendererList[j].renderFile(inputFiles, onRendererFinish);
    }
} else {
    for (let i = 0; i < commander.args.length; i++) { //Compile separately
        let inputFile = commander.args[i];
        for (let j = 0; j < rendererList.length; j++) {
            rendererList[j].renderFile(inputFile, onRendererFinish);
        }
    }
}


function getFileExtension(filename: string) {
    if (!filename) return null;
    const filenameArr = filename.split(".");
    if (filenameArr.length > 1) return (filenameArr.pop() as string).toLowerCase();
    else return null;
}

//Creates the selected renderes, return an array of rendereres
function loadRenderers(selectedRenderers: any, options: any) {
    let rendererList = [];
    for (let i = 0; i < selectedRenderers.length; i++) {
        let rendererName = selectedRenderers[i];
        if (renderers[rendererName]) {
            rendererList.push(new renderers[rendererName](options));
        }
    }
    return rendererList;
}

//Renderer callback
function onRendererFinish(err: Error, filename: string) {
    if (err) return console.log("Error: " + err);
    else console.log(filename + " created");
}
