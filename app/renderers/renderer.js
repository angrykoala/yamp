"use strict";

const fs = require('fs');
const ejs = require('ejs');
const path = require('path');

const titleParser = require('../parsers/title_parser');
const xejsParser = require('../parsers/xejs_parser');

const resourcesPath = __dirname + "/../../resources";

const defaultOptions = {
    highlight: true,
    style: true,
    minify: false,
    tags: true,
    koala: false
};

function removeFileExtension(filename){
    if (!filename) return "";
    let filenameArr = filename.split(".");
    if (filenameArr.length > 1) filenameArr.pop();
    return filenameArr.join(".");
}

function parseFilename(filepath) {
    if (!filepath) return "";
    let filename = path.basename(filepath);
    return removeFileExtension(filename);
}

function setOptions(options) {
    let res = {};
    Object.assign(res, defaultOptions);
    Object.assign(res, options);

    res.resourcesPath = resourcesPath;
    res.outputFilename = removeFileExtension(res.outputFilename);
    return res;
}


function loadFile(file, done) {
    fs.readFile(file, 'utf8', function(err, data) {
        if (err) return done(new Error("Error reading file: " + err));
        else return done(null, data);
    });
}

//Class to render from one file to another
module.exports = class Renderer {
    constructor(options, template, inputParser) {
        this.options = setOptions(options);
        this.xejsTokens = []; //modify this to add new xejs tokens
        if (this.options.output) this.output = this.options.output;
        this.setTemplate(template);
        this.parser = inputParser;

        if (this.options.tags) this.fileLoader = this.loadFileXEJS;
        else this.fileLoader = loadFile;
    }


    //To extend

    //args filename
    beforeLoad() {
        //Modify filename or this.fileLoader
    }

    //args templateOptions
    beforeRender() {
        //Modify templateData before rendering
    }

    //args: contentloadFileEJS 
    afterRender() {
        //Modify rendered data
    }

    //args: content, done
    fileOutput() {
        //Write file
    }

    //Public
    renderFile(file, done) {
        this.options.temp = {}; //resets temporal options
        if (!this.options.outputFilename) this.options.outputFilename = parseFilename(file);
        this.beforeLoad(file);
        this.fileLoader(file, (err, rawContent) => {
            if (err) return done(err);
            this.contentParse(rawContent, (err, content) => {
                if (err) return done(err);
                let title = this.getTitle(content);
                let templateData = this.setTemplateOptions();
                templateData.content = content;
                templateData.title = title;
                this.beforeRender(templateData);
                this.templateRender(templateData, (err, res) => {
                    if (err) return done(err);
                    this.afterRender(res);
                    this.fileOutput(res, done);
                });
            });
        });
    }

    //Private

    getTitle(parsedContent) {
        return this.options.title || titleParser.html(parsedContent) || parseFilename(this.options.outputFilename);
    }

    setTemplate(template) {
        if (!template) this.template = null;
        else this.template = __dirname + "/../../templates/" + template;
    }

    setTemplateOptions() {
        return {
            styleFile: "github-markdown.css",
            highlight: this.options.highlight && this.options.temp.requireHighlight,
            style: this.options.style,
            resourcesPath: this.options.resourcesPath,
            koala: this.options.koala,
            output: this.output,
            fs: fs
        };
    }

    contentParse(content, done) {
        this.parser(content, this.options, done);
    }
    templateRender(data, done) {
        ejs.renderFile(this.template, data, {}, done);
    }
    loadFileXEJS(file, done) {
        xejsParser(file, this.options, this.xejsTokens, done);
    }
};
