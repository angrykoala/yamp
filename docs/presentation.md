---
title: Yamp Presentation
koala: true
highlight: true
---

class: center, middle
Yamp
====
Yet Another Markdown Parser

---
# Introduction
Yamp is a tool to generate files in different formats from _markdown_ like pdf, html pages and presentations like this one.

All the files are also automatically formated and embedded with styles, providing a nice-looking document with minimal effort.

---
# Installation
[Node.js and npm](https://nodejs.org/en/) are required to install Yamp.
Once node and npm are installed, open a terminal (or command line in windows) and type:
```
npm install -g yamp
```
This will install the latest version of yamp.

---
# Usage
To convert a markdown file to pdf, simply type
```
yamp [myFile.md]
```
This will automatically create a pdf file with the same name.

If you want html page or a [remark presentation](https://remarkjs.com/) simply append `--html` or `--remark` to the command respectively.

>Yamp also supports converting multiple files and formats in one go: `yamp myFile1.md myFile2.md --html --pdf` will generate 4 different files (myFile1.html, myFile2.html, myFile1.pdf and myFile2.pdf)

---
# Usage
An output file can be specified with `--output` or `-o`:
```
yamp myFile.md -o MyPaper.pdf
```

>If you give an output while parsing multiple files, yamp will join them into one unique file

You can also use different styles, you can check the available styles with `--list-styles` option. To change style use the `--style [myStyle.css]` option. You can also change into your own css styles.

>_The styles are only available for html and pdf output_

To get a list of all possible commands, type `yamp --help`

---
# Other features
Yamp supports extra [XEJS](https://github.com/angrykoala/xejs) tags while rendering (between `{{ ... }}`):

* `include [myFile.md]` will include (and render) given file
* `toc` will generate a Table of contents
* `page break` will force a page break for pdf output
* `date` will include the date when rendering
* `yamp version` will include the yamp version used for compiling

---
# Other features
Yamp also supports **Front-Matter** options in your files:   
```md
---
title: my Title
highlight: false
---

Rest of file
```

The file will be render with the given options (keep in mind that front-matter will only work in the input file, not the included ones, and some options like `tags` are not supported)

> Other features such as _code highlight_ and html _minification_ are also supported

---
# Import yamp in your node project
As well as the CLI, yamp can be used directly from your nodejs project, install it in your project with `npm install --save yamp` and import it into your code:
```js
var yamp=require('yamp').renderers;

var myRenderer=new yamp.pdf({title: "my title",highlight:true});

myRenderer.renderFile("myFile.md",function(err,filename){
    if(!err) console.log(filename+" created!");
});
```

---
class: middle

These slides were rendered with yamp {{ yamp version }} on {{ date }} using [remark](https://remarkjs.com)

Check also the other examples:
* [Html](./index.html)
* [Pdf](./index.pdf)

Check the project in [GitHub](https://github.com/angrykoala/yamp)    
By @angrykoala 
