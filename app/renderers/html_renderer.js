"use strict";

const fs = require('fs');

const htmlMinifier = require('../minifier').html;
const Renderer = require('../renderer');
const Md2Html = require('../parsers/md2html');


module.exports = class HtmlRenderer extends Renderer {
    constructor(options) {
        super(options, "default.ejs", Md2Html);
        this.output = "html";
    }
    
    //args: content, done
    fileOutput(content, done) {
        if (this.options.minify) content = htmlMinifier(content);
        fs.writeFile(this.options.outputFilename + '.html', content, (err) => {
            if (err) return done(new Error("Error writing html file" + err));
            else return done(null);
        });
    }
};
