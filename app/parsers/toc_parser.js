"use strict";
/*
TOC Parser
==========
Inserts table of contents
*/
const toc = require('markdown-toc');

module.exports = function(content, done) {
    let parsedContent = toc.insert(content);
    let err = null;
    if (content && !parsedContent) err = new Error("Toc Parser - No content generated");
    return done(err, parsedContent);
};
