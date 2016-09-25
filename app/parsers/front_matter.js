"use strict";

const frontMatter = require('front-matter');

module.exports = function(content, done) {
    let data = frontMatter(content);

    done(null, data.body, data.attributes);
};
