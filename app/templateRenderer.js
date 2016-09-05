"use strict";
const ejs = require('ejs');


module.exports = function(template, data, done) {
    template = __dirname + "/../templates/" + template;
    ejs.renderFile(template, data, data, done);
};
