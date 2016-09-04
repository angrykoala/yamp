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
    linkify: true, //automatic links
    breaks: true, //automatic jump on new line
    highlight: highlightRenderer 
};

const md = new MarkdownIt(config);

module.exports = function(content,cb) {
    let res=md.render(content);
    return cb(null,res);
};
