"use strict";
module.exports = [{
    testTitle: "Plain text",
    md: "this is plain text",
    html: "<p>this is plain text</p>"
}, {
    testTitle: "Headers",
    md: "# Header 1\n## Header 2\n### Header 3",
    html: "<h1>Header 1</h1><h2>Header 2</h2><h3>Header 3</h3>"
}, {
    testTitle: "Bold and Italic",
    md: "**bold** _italic_",
    html: "<p><strong>bold</strong> <em>italic</em></p>"
}, {
    testTitle: "New line",
    md: "line1   \nline2",
    html: "<p>line1<br>line2</p>"
}, {
    testTitle: "Not automatic new line",
    md: "line1\nline2",
    html: "<p>line1line2</p>"
}, {
    testTitle: "Multiple paragraphs",
    md: "paragraph1\n\nnew paragraph",
    html: "<p>paragraph1</p><p>new paragraph</p>"
}, {
    testTitle: "Code highlight",
    md: "```\nexample code\n```\n",
    html: "<pre><code>example code</code></pre>"
}, {
    testTitle: "Code highlight js",
    md: "```js\nexample code\n```\n",
    html: "<pre><code class=\"language-js\">example code</code></pre>"
}, {
    testTitle: "Highlight.js"

}, {
    testTitle: "No highlight"

}, {
    testTitle: "Link",
    md: "<http://asdfghjklqwertyu.com>",
    html: "<p><a href=\"http://asdfghjklqwertyu.com\">http://asdfghjklqwertyu.com</a></p>"
}, {
    testTitle: "Automatic link",
    md: "http://asdfghjklqwertyu.com",
    html: "<p><a href=\"http://asdfghjklqwertyu.com\">http://asdfghjklqwertyu.com</a></p>"
}, {
    testTitle: "Special characters",
    md: "aeiouáéíóú´'*+^ç¨´{}|@#~½¬{[]}",
    html: "<p>aeiouáéíóú´'*+^ç¨´{}|@#~½¬{[]}</p>"
}, {
    testTitle: "Tables",
}, {
    testTitle: "Ordered lists"
}, {
    testTitle: "Unordered lists"
}, {
    testTitle: "Images",
    md: "![Image description](/imagelink.png)",
    html: "<p><img src=\"/imagelink.png\" alt=\"Image description\"></p>"
}, {
    testTitle: "Plugin sup",
    md: "normaltext^suptext^normaltext",
    html: "<p>normaltext<sup>suptext</sup>normaltext</p>"
}, {
    testTitle: "Plugin mark",
    md: "normaltext==marktext==normaltext",
    html: "<p>normaltext<mark>marktext</mark>normaltext</p>"
}, {
    testTitle: "Plugin inserted",
    md: "normaltext++instext++normaltext",
    html: "<p>normaltext<ins>instext</ins>normaltext</p>"
}, {
    testTitle: "Escaped characters",
    md: "\\# \\^normal\\^ \\*\\*normal\\*\\*",
    html: "<p># ^normal^ **normal**</p>"
}];
