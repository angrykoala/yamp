"use strict";

const Renderer = require('../renderer');
const Md2Html = require('../parsers/md2html');
const html2pdf = require('../parsers/html2pdf');


module.exports = class PdfRenderer extends Renderer {
    constructor(options) {
        super(options, "default.ejs", Md2Html);
        this.output = "pdf";
        this.xejsTokens=[];
    }

    //args: content, done
    fileOutput(content,filename, done) {
        html2pdf(content, filename, (err) => {
            if (err) return done(new Error("Error writing file" + err),filename+".pdf");
            else return done(null,filename+".pdf");
        });
    }
};
