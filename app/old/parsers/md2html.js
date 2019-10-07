"use strict";
/*
Markdown to Html Parser
=======================
Translate markdown string to html using _marked_ and generates highlighted code. Updates requireHighlight option
*/

const marked = require('marked');
const hljs = require('highlight.js');

module.exports = function(content, options, done) {
    let highlighted = false;
    if (options.highlight) {
        marked.setOptions({
            highlight: (code) => {
                highlighted = true;
                return hljs.highlightAuto(code).value;
            }
        });
    }

    marked(content, function(err, res) {
        options.requireHighlight = highlighted;
        done(err, res);
    });
};
