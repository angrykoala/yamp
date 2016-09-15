"use strict";
const xejs = require('xejs');


const xejsOptions = {
    openTag: "{{",
    closeTag: "}}",
    tokens: [
        [/[Dd]ate/, "= getDate()"],
        [/[Pp]age\s*?[Bb]reak/,"-'<p style=\"page-break-after:always;\"></p>'"]
    ]
};

function getDate() {
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    return day + "/" + month + "/" + year;
}

module.exports = function(file, options, done) {
    let content = xejs(file, xejsOptions, {
        getDate: getDate
    });
    done(null, content);
};
