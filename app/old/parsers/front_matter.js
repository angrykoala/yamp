"use strict";
/*
Front Matter Parser
===================
Parse front-matter options from given string
*/

const frontMatter = require('front-matter');

module.exports = function(content, done) {
    let data = frontMatter(content);

    done(null, data.body, data.attributes);
};
