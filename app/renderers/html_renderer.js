"use strict";
/*
Html Renderer
=============
Renderer for Html page files
*/

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
    fileOutput(content,filename, done) {
        filename = filename.replace(/\.html$/i, '');
        if (this.options.minify) content = htmlMinifier(content);
        fs.writeFile(filename + ".html", content, (err) => {
            if (err) return done(new Error("Error writing html file" + err),filename+".html");
            else return done(null,filename+".html");
        });
    }
};
