"use strict";

const marked = require('marked');
const hljs = require('highlight.js');


module.exports = function(content, options, cb) {
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
        cb(err, res);
    });
};
