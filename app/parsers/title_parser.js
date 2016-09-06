"use strict";


let titleRegex = {
    html: /<h1>.+?<\/h1>/
};

function findTitle(content,regex){
    if(!content || ! regex) return null;
    let arr=content.match(regex);
    if(!arr) return null;
    else return arr[0] || null;
}
module.exports = {
    html: function(htmlContent) {
        let title=findTitle(htmlContent,titleRegex.html);
        if(!title) return null;
        else return title.slice(4,title.length-5);
    }
};
