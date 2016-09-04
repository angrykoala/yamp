"use strict";
module.exports = [{
	title: "Plain text",
	md: "this is plain text",
	html: "<p>this is plain text</p>"
}, {
	title: "Headers",
	md: "# Header 1\n## Header 2\n### Header 3",
	html: "<h1>Header 1</h1><h2>Header 2</h2><h3>Header 3</h3>"
}, {
	title: "Bold and Italic",
	md: "**bold** _italic_",
	html: "<p><strong>bold</strong> <em>italic</em></p>"
}, {
	title: "New line",
	md: "line1   \nline2",
	html: "<p>line1<br>line2</p>"
}, {
	title: "Automatic new line",
	md: "line1\nline2",
	html: "<p>line1<br>line2</p>"
}, {
	title: "Multiple paragraphs",
	md: "paragraph1\n\nnew paragraph",
	html: "<p>paragraph1</p><p>new paragraph</p>"
}, {
	title: "Code highlight",
	md: "```\nexample code\n```\n",
	html: "<pre><code>example code</code></pre>"
}, {
	title: "Code highlight js",
	md: "```js\nexample code\n```\n",
	html: "<pre><code class=\"language-js\">example code</code></pre>"
}, {
	title: "Link",
	md: "<http://asdfghjklqwertyu.com>",
	html: "<p><a href=\"http://asdfghjklqwertyu.com\">http://asdfghjklqwertyu.com</a></p>"
}, {
	title: "Automatic link",
	md: "http://asdfghjklqwertyu.com",
	html: "<p><a href=\"http://asdfghjklqwertyu.com\">http://asdfghjklqwertyu.com</a></p>"
}, {
	title: "Special characters",
	md: "aeiouáéíóú´'*+^ç¨´{}|@#~½¬{[]}\""
}, {
	title: "Tables",
}, {
	title: "Ordered lists"
}, {
	title: "Unordered lists"
}, {
	title: "Images"
}, {
	title: "Plugin sup",
	md: "normaltext^suptext^normaltext",
	html: "<p>normaltext<sup>suptext</sup>normaltext</p>"
}, {
	title: "Plugin mark",
	md: "normaltext==marktext==normaltext",
	html: "<p>normaltext<mark>marktext</mark>normaltext</p>"
}, {
	title: "Plugin inserted",
	md: "normaltext++instext++normaltext",
	html: "<p>normaltext<ins>instext</ins>normaltext</p>"
}, {
	title: "Escaped characters",
	md: "\\# \\^normal\\^ \\*\\*normal\\*\\*",
	html: "<p># ^normal^ **normal**</p>"
}];