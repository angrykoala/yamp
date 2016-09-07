"use strict";
module.exports = [{
    testTitle: "Html Header 1",
    html: "<h1>MyTitle</h1>",
    title: "MyTitle"
},{
    testTitle: "Html Header in div",
    html: "<div><h1>MyTitle</h1></div>",
    title: "MyTitle"   
},{
    testTitle: "Html Header 2",
    html: "<h2>FalseTitle</h2>",
    title: null  
},{
    testTitle: "Html Header 1 and 2",
    html: "<div><h2>FalseTitle</h2><h1>MyTitle</h1><h2>FalseTitle</h2></div>",
    title: "MyTitle"   
},{
    testTitle: "2 Html Header 1",
    html: "<div><h1>MyTitle1</h1><h1>MyTitle2</h1></div>",
    title: "MyTitle1"   
},{
    testTitle: "Html Header after paragraph",
    html: "<p>Text</p><h1>MyTitle</h1>",
    title: "MyTitle"   
},{
    testTitle: "Bad parsed Html",
    html: "<h1>Header<h1>",
    title: null    
},{
    testTitle: "Title with nested elements",
    html: "<h1>Hea<b>der</b></h1>",
    title: "Hea<b>der</b>"
},{
    testTitle: "Plain text",
    html: "This is an example",
    title: null
},{
    testTitle: "Markdown title",
    html: "# Title",
    title: null
}];




/*,{
    testTitle: "Title with attributes",
    html: "<h1 class=\"myclass\">My Title</h1>",
    title: "My Title"
}*/
