"use strict";

const Hljs = require('highlight.js');
const Markdownit = require('markdown-it');

//Markdown-it plugins
const markdownitSup = require('markdown-it-sup');
const markdownitMark = require('markdown-it-mark');
const markdownitIns = require('markdown-it-ins');


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

let config = {
	html: true,
	linkify: true, //automatic links
	breaks: false, //automatic jump on new line
	highlight: highlightRenderer
};

const md = new Markdownit(config)
	.use(markdownitSup)
	.use(markdownitMark)
	.use(markdownitIns);


module.exports = function(content, cb) {
	let res = md.render(content);
	return cb(null, res);
};
