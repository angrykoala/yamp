"use strict";

const fs = require('fs');
const ejs = require('ejs');

const titleParser = require('../parsers/title_parser');

function loadFile(file, done) {
    fs.readFile(file, 'utf8', function(err, data) {
        if (err) return done(new Error("Error reading file: " + err));
        else return done(null, data);
    });
}


//Class to render from one file to another
module.exports = class Renderer {
    constructor(options, template, inputParser) {
        this.options = options;
        this.setTemplate(template);
        this.parser = inputParser;
    }

    //To extend

    //args templateOptions
    beforeRender() {
        //Modify templateData before rendering
    }

    //args: content
    afterRender() {
        //Modify rendered data
    }

    //args: content, done
    fileOutput() {
        //Write file

    }

    //Public
    renderFile(file, done) {
        loadFile(file, (err, rawContent) => {
            if (err) return done(err);
            this.contentParse(rawContent, (err, content) => {
                if (err) return done(err);
                let title = this.getTitle(file, content);
                let templateData = this.setTemplateOptions();
                templateData.content = content;
                templateData.title = title;
                if (this.output) templateData.output = this.output;
                this.beforeRender(templateData);
                this.templateRender(templateData, (err, res) => {
                    this.afterRender(res);
                    if (err) return done(err);
                    this.fileOutput(res, done);
                });
            });
        });
    }

    //Private

    getTitle(filename, parsedContent) {
        return this.options.title || titleParser.html(parsedContent) || filename;
    }

    setTemplate(template) {
        if (!template) this.template = null;
        else this.template = __dirname + "/../../templates/" + template;
    }

    setTemplateOptions() {
        return {
            styleFile: "github-markdown.css",
            highlight: this.options.highlight,
            style: this.options.style,
            resourcesPath: this.options.resourcesPath,
            koala: this.options.koala,
        };

    }

    contentParse(rawContent, done) {
        this.parser(rawContent, this.options, done);
    }
    templateRender(data, done) {
        ejs.renderFile(this.template, data, {}, done);
    }
};
