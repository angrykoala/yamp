"use strict";

const Renderer = require('./renderer');
const Md2Html = require('../parsers/md2html');
const html2pdf = require('../parsers/html2pdf');


module.exports = class PdfRenderer extends Renderer {
    constructor(options) {
        super(options, "default.ejs", Md2Html);
        this.output = "pdf";
    }

    //args filename
    beforeLoad() {}
    
    //args templateOptions
    beforeRender() {}

    //args: content
    afterRender() {
        //Modify rendered data
    }

    //args: content, done
    fileOutput(content, done) {
        html2pdf(content, this.options.outputFilename, (err) => {
            if (err) return done(new Error("Error writing file" + err));
            else return done(null);
        });
    }
};
