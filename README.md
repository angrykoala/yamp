Yamp
====
_by @angrykoala_

[![npm version](https://badge.fury.io/js/yamp.svg)](https://badge.fury.io/js/yamp) 
[![Build Status](https://travis-ci.org/angrykoala/yamp.svg?branch=master)](https://travis-ci.org/angrykoala/yamp) 
[![codecov](https://codecov.io/gh/angrykoala/yamp/branch/master/graph/badge.svg)](https://codecov.io/gh/angrykoala/yamp) 


>Yet Another Markdown Parser

The aim of this package is to provide an easy-to-use toolbox for markdown-related task including Html & Pdf conversion.

* **GitHub:** <https://github.com/angrykoala/yamp>
* **Npm:** <https://www.npmjs.com/package/yamp>

## Features
* HTML conversion
* PDF conversion
* Code highlight support
* Github-style output
* CSS-embedded HTML (Just open it offline in any browser)
* HTML tags support (For PDF output too)
* Koalafied

### Upcoming
* Custom styles
* Custom templates
* Include other files in your markdown
* Node module to use **yamp** programmatically
* Client-side web support (bower)
* [HTML presentations](https://remarkjs.com/)
 
> Check the [project roadmap](https://github.com/angrykoala/yamp/milestones?direction=desc&sort=completeness&state=open)

## Installation
To use _yamp_ install it globally using **npm**:
```
npm install -g yamp
```

## Usage
To create a `.pdf` file from your _markdown_ file, simply type:
```
yamp <file.md>
```
For example:
```
yamp README.md
```
Will generate `readme.pdf`.

### Options
* `-h`, `--help` to display a basic usage information
* `-V`, `--version` to display _yamp_ version installed
* `-o`, `--output <file>` output filename (without extension)
* `--pdf` to generate a pdf (default)
* `--html`to generate html
* `-t`, `--title [value]` to add a custom title
* `--style <file>` to set a custom CSS stylesheet
    * Option not suported along with `--no-style`
* `--no-style` to disable CSS styling
    * Options not supported along with `--style <file>`
* `--minify` to minify Html output
* `--no-highlight` to disable code highlight


* `-k`, `--koala` to koalify your outputs

To generate pdf and html with default styling and options:
```
yamp myFile.md --pdf --html
```

>The `--no-highlight` and `--no-style` options will greatly reduce your Html and Pdf outputs

## Development Instructions
To contribute to **yamp** you should clone the official repository <https://github.com/angrykoala/yamp> or your own _fork_ with `git`.

You can also download it from [GitHub](https://github.com) clicking [here](https://github.com/angrykoala/yamp/archive/master.zip)

* To install execute `npm install` in the downloaded/cloned folder
* To test, execute `npm test`
* To execute the CLI, execute `npm start -- <file> [options]`
* To install your local version globally, execute `npm install -g .` on the project folder

>It is strongly recommended to install the npm repository version instead of your local copy


## Acknowledgments
* [Markdown-it](https://github.com/markdown-it/markdown-it) as markdown parser
* [Github-markdown.css](https://github.com/sindresorhus/github-markdown-css) as default parse style
* [Highlight.js](https://highlightjs.org) for code highlighting
* [html-pdf](https://github.com/marcbachmann/node-html-pdf) for pdf generation

>YAMP is developed under GNU GPL-3 license by @angrykoala 
