"use strict";

/*
Renderer Class
==============
Base class to implement renderers. Will provide basic workflow with file loading and common parsers
*/

const fs = require('fs');
const ejs = require('ejs');
const path = require('path');
const async = require('async');

const titleParser = require('./parsers/title_parser');
const xejsParser = require('./parsers/xejs_parser');
const tocParser = require('./parsers/toc_parser');
const frontMatterParser = require('./parsers/front_matter');

const resourcesPath = __dirname + "/../resources";

// Default rendering options
const defaultOptions = {
    highlight: true,
    style: true,
    minify: false,
    tags: true,
    frontMatter: true,
    koala: false,
    outputDirectory: '.'
};

// ## Private Functions

// Removes extension from filename
function removeFileExtension(filename) {
    if (!filename) return "";
    let filenameArr = filename.split(".");
    if (filenameArr.length > 1) filenameArr.pop();
    return filenameArr.join(".");
}

// Gets filename from path
function parseFilename(filepath) {
    if (!filepath) return "";
    let filename = path.basename(filepath);
    return removeFileExtension(filename);
}

// Returns the default options as a new object
function setDefaultOptions() {
    let res = {};
    Object.assign(res, defaultOptions);
    res.resourcesPath = resourcesPath;
    return res;
}

// Basic file loader
function loadFile(file, options, done) {
    fs.readFile(file, 'utf8', function(err, data) {
        if (err) return done(new Error("Error reading file: " + err));
        else return done(null, data);
    });
}


module.exports = class Renderer {
    // Contructor to be called by child constructor
    constructor(options, template, inputParser) {
            this.options = setDefaultOptions();
            this.setOptions(options);
            this.xejsTokens = []; //modify this to add new xejs tokens
            this.setTemplate(template);
            this.parser = inputParser;
            this.name = "default";

            if (this.options.tags) this.fileLoader = this.loadFileXEJS;
            else this.fileLoader = loadFile;
        }
        // Set one or more renderer options
    setOptions(options) {
        if (options) {
            Object.assign(this.options, options);
        }
    }


    // ## Methods to extend

    // Called before loading files
    // _args:_ filenames
    beforeLoad() {
        //Modify filename or this.fileLoader before loading files
    }

    // Called before rendering markdown
    // _args:_ templateData
    beforeRender() {
        //Modify templateData before rendering
    }

    // Called after rendering, to implement output
    // _args:: _ontent, filename, done
    fileOutput() {
        //Write file
    }

    // ## Public methods
    // Renders given file with given options
    renderFile(files, options, done) {
        let promise;

        if (!done && typeof options === "function") {
            done = options;
            options = {};
        }

        if (!done) {
            promise = new Promise((resolve, reject) => {
                done = (err) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                };
            });
        }

        if (!Array.isArray(files)) files = [files];
        let renderOptions = this.generateRenderOptions(files, options);

        this.loadFiles(files, renderOptions, (err, rawContent) => {
            if (err) return done(err);
            this.beforeParseRender(rawContent, renderOptions, (err, res) => {
                if (err) console.log("Warning:" + err);
                rawContent = res;
                this.contentParse(rawContent, renderOptions, (err, content) => {
                    if (err) return done(err);
                    this.renderTemplate(content, renderOptions, (err, res) => {
                        if (err) return done(err);
                        this.fileOutput(res, path.join(renderOptions.outputDirectory, renderOptions.outputFilename), (err) => {
                            done(err);
                        });
                    });
                });
            });
        });

        return promise;
    }

    // ## Private Methods

    // Creates rendering options object
    generateRenderOptions(files, options) {
        let renderOptions = options || {};
        Object.assign(renderOptions, this.options);
        if (!renderOptions.outputFilename) {
            renderOptions.outputFilename = parseFilename(files[0]);
        } else {
            try {
                let stats = fs.lstatSync(renderOptions.outputFilename);
                if (stats.isDirectory()) {
                    renderOptions.outputDirectory = renderOptions.outputFilename;
                    renderOptions.outputFilename = parseFilename(files[0]);
                }
            } catch (e) {
                // file does not exist, so it cannot be a directory
                // continue as normally
            }
        }
        return renderOptions;
    }


    beforeParseRender(rawContent, renderOptions, done) {
        frontMatterParser(rawContent, (err, res, attr) => {
            if (err) console.log("Warning:" + err);
            if (renderOptions.frontMatter) {
                rawContent = res;
                Object.assign(renderOptions, attr);
            }
            tocParser(rawContent, done);
        });
    }

    // Render parsed markdown into the template
    renderTemplate(content, renderOptions, done) {
        let title = this.getTitle(content, renderOptions);
        let templateData = this.setTemplateOptions(renderOptions);
        templateData.content = content;
        templateData.title = title;
        this.beforeRender(templateData);
        this.templateRender(templateData, done);
    }

    loadFiles(files, renderOptions, done) {
        this.beforeLoad(files);
        let rawContent = "";

        async.each(files, (file, cb) => {
            this.fileLoader(file, renderOptions, (err, res) => {
                rawContent += res;
                cb(err);
            });
        }, (err) => {
            done(err, rawContent);
        });
    }

    // Gets title from given options and files
    getTitle(parsedContent, options) {
        return options.title || titleParser.html(parsedContent) || parseFilename(options.outputFilename);
    }

    setTemplate(template) {
        if (!template) this.template = null;
        else this.template = __dirname + "/../templates/" + template;
    }

    setTemplateOptions(options) {
        let files = fs.readdirSync(__dirname + "/../styles");
        let index = files.indexOf(options.style);
        let styleFile = "github.css";

        if (index > -1) {
            styleFile = files[index];
            options.style = true;
        }

        return {
            styleFile: styleFile,
            highlight: options.highlight && options.requireHighlight,
            style: options.style,
            resourcesPath: options.resourcesPath,
            koala: options.koala,
            output: this.output,
            fs: fs
        };
    }

    contentParse(content, options, done) {
        this.parser(content, options, done);
    }
    templateRender(data, done) {
        ejs.renderFile(this.template, data, {}, done);
    }

    // Loader with XEJS parser
    loadFileXEJS(file, options, done) {
        xejsParser(file, options, this.xejsTokens, done);
    }
};
