"use strict";
/*
Title Parser
============
Gets title from first html header
*/

let titleRegex = {
    html: /<h1.*?>(.+?)<\/h1>/
};

function findTitle(content, regex) {
    if (!content || !regex) return null;
    let arr = content.match(regex);
    if (!arr) return null;
    else return arr[1] || null;
}
module.exports = {
    html: function(htmlContent) {
        let title = findTitle(htmlContent, titleRegex.html);
        if (!title) return null;
        return title;
    }
};
