"use strict";
/*
Remark Renderer
===============
Renderer for Html presentation using remark
*/

const fs = require('fs');

const htmlMinifier = require('../minifier').html;
const Renderer = require('../renderer');

function nullRenderer(content,options,done){
    return done(null,content);
}

module.exports = class RemarkRenderer extends Renderer {
    constructor(options) {
        super(options, "remark.ejs", nullRenderer);
        this.output = "remark";
    }
    
    //args: content, done
    fileOutput(content,filename, done) {
        if (this.options.minify) content = htmlMinifier(content);
        fs.writeFile(filename + '.html', content, (err) => {
            if (err) return done(new Error("Error writing remark (html) file" + err),filename+".html");
            else return done(null,filename+".html");
        });
    }
};
