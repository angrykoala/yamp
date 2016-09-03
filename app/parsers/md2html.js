"use strict";

const Hljs = require('highlight.js');
const MarkdownIt = require('markdown-it');

function highlightRenderer(str, lang) {
    if (lang && Hljs.getLanguage(lang)) {
        try {
            return Hljs.highlight(lang, str).value;
        } catch (e) {
            console.error("highlight error ", e);
        }
    }
    return "";
}

let config={
    html: true,
    linkify: true,
    highlight: highlightRenderer 
};

const md = new MarkdownIt(config);

module.exports = function(content,cb) {
    let res=md.render(content);
    return cb(null,res);
};
