"use strict";
/*
TOC Parser
==========
Inserts table of contents
*/
const toc = require('markdown-toc');

module.exports = function(content, linkify, done) {
    let parsedContent = toc.insert(content, {
        linkify: linkify
    });
    let err = null;
    if (content && !parsedContent) err = new Error("Toc Parser - No content generated");
    return done(err, parsedContent);
};
