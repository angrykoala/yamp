"use strict";
/*
XEJS Parser
===========
Renders custom xejs tags {{ ... }} 
*/

const xejs = require('xejs');
require('pkginfo')(module, "version");

const version = module.exports.version;

// Default xejs options
const xejsOptions = {
    openTag: "{{",
    closeTag: "}}",
};

const xejsTokens = [
    [/date/i, "getDate()"],
    [/page\s*?break/i, "'<p style=\"page-break-after:always;\"></p>'"],
    [/yamp\s*?version/i, "'" + version + "'"],
    [/toc/i, "'<!-- toc -->'"]
];

function getDate() {
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    return day + "/" + month + "/" + year;
}

module.exports = function(file, options, tokens, done) {
    options = options || {};
    tokens=tokens || [];
    let args = Object.assign({}, options);
    args.getDate = getDate;
    let rendererOptions = Object.assign({}, xejsOptions);
    tokens = xejsTokens.concat(tokens);
    
    const xejsRenderer = new xejs({
        options: rendererOptions,
        tokens: tokens,
        args: args
    });
    xejsRenderer.render(file, done);
};
