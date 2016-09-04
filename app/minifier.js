"use strict";

const htmlMinify = require('html-minifier').minify;


module.exports = {
	html: function(html) {
		return htmlMinify(html, {
			html5: true,
			minifyCSS: true,
			minifyJS: true,
			removeComments: true
		});
	}
};