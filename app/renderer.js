"use strict";

const fs = require('fs');
const ejs = require('ejs');
const md2html = require('./parsers/md2html');
const html2pdf = require('./parsers/html2pdf');
const htmlMinifier = require('./minifier').html;

module.exports = function(inputFile, options, cb) {
	fs.readFile(inputFile, 'utf8', function(err, data) {
		if (err) return cb(new Error("Error reading file: " + err));
		md2html(data, {
			highlight: options.highlight
		}, function(err, htmlContent) {
			if (err) return cb(err);
			switch (options.output) {
				case "html":
					ejs.renderFile(__dirname + '/../templates/default.ejs', {
						title: options.fileName,
						content: htmlContent,
						output: "html",
						highlight: options.highlight,
						styleFile: "github-markdown.css",
						style: options.style
					}, {}, function(err, html) {
						if (err) return cb(new Error("Error parsing ejs: " + err));
						if (options.minify) html = htmlMinifier(html);
						fs.writeFile(options.fileName + '.html', html, function(err) {
							if (err) return cb(new Error("Error writing file" + err));
							else return cb(null);
						});
					});

					break;
				case "pdf":
					ejs.renderFile(__dirname + '/../templates/default.ejs', {
						title: options.fileName,
						content: htmlContent,
						output: "pdf",
						highlight: options.highlight,
						styleFile: "github-markdown.css",
						style: options.style
					}, {}, function(err, html) {
						if (err) return cb(new Error("Error parsing ejs: " + err));
						//if(options.minify) html=htmlMinifier(html);
						html2pdf(html, options.fileName, cb);
					});
					break;
			}
		});
	});
};
