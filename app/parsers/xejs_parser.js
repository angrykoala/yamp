"use strict";
const xejs = require('xejs');
require('pkginfo')(module, "version", "author", "license", "description");

const version = module.exports.version;

const xejsOptions = {
    openTag: "{{",
    closeTag: "}}",
    tokens: [
        [/date/i, "= getDate()"],
        [/page\s*?break/i, "-'<p style=\"page-break-after:always;\"></p>'"],
        [/yamp\s*?version/i, "='" + version + "'"]
    ]
};

function getDate() {
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    return day + "/" + month + "/" + year;
}

module.exports = function(file, options, tokens, done) {
    options=options || {};
    let args = Object.assign({}, options);
    args.getDate = getDate;
    let rendererOptions = Object.assign({}, xejsOptions);
    if(tokens.length>0) rendererOptions.tokens = rendererOptions.tokens.concat(tokens);
    let content = xejs(file, rendererOptions, args);
    done(null, content);
};
