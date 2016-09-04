Yamp
====
_by @angrykoala_

[![npm version](https://badge.fury.io/js/yamp.svg)](https://badge.fury.io/js/yamp)
[![Build Status](https://travis-ci.org/angrykoala/yamp.svg?branch=master)](https://travis-ci.org/angrykoala/yamp)
[![codecov](https://codecov.io/gh/angrykoala/yamp/branch/master/graph/badge.svg)](https://codecov.io/gh/angrykoala/yamp)


>Yet Another Markdown Parser

The aim of this package is to provide an easy-to-use toolbox for markdown-related task including html & pdf conversion.

* **GitHub:** <https://github.com/angrykoala/yamp>
* **Npm:** <https://www.npmjs.com/package/yamp>

## Features
* HTML conversion
* PDF conversion
* Code highlight support
* Github-style output

### Upcoming
* Custom styles
* Custom templates
* Include support
* [HTML presentations](https://remarkjs.com/)

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
* `-h`, `--help` to display a basic man
* `-V`, `--version` to display _yamp_ version installed
* `--pdf` to generate a pdf (default)
* `--html`to generate html

To generate pdf and html:
```
yamp myFile.md --pdf --html
```

## Acknowledgments
* [Markdown-it](https://github.com/markdown-it/markdown-it) as markdown parser
* [Github-markdown.css](https://github.com/sindresorhus/github-markdown-css) as default parse style
* [Highlight.js](https://highlightjs.org) for code highlighting

>YAMP is developed under GNU GPL-3 license by @angrykoala 
