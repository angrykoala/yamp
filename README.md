Yamp
====
_by @angrykoala_
[![Build Status](https://travis-ci.org/angrykoala/yamp.svg?branch=master)](https://travis-ci.org/angrykoala/yamp)
[![codecov](https://codecov.io/gh/angrykoala/yamp/branch/master/graph/badge.svg)](https://codecov.io/gh/angrykoala/yamp)


Yet Another Markdown Parser <https://github.com/angrykoala/yamp>

The aim of this package is to provide an easy-to-use toolbox for markdown-related task including html & pdf conversion.

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
To create a html and pdf files from your _markdown_ simply type:
```
yamp <file.md> <output_filename>
```

For example:
```
yamp README.md readme
```
Will generate `readme.html` and `readme.pdf`

### Options
* `-h`, `--help` to display a basic man
* `-V`, `--version` to display _yamp_ version installed
* `-o`, `--output` to select the output file name

## Acknowledgements
* [markdown-it](https://github.com/markdown-it/markdown-it) as markdown parser
* [github-markdown.css](https://github.com/sindresorhus/github-markdown-css) as default parse style

>YAMP is developed under GNU GPL-3 license by @angrykoala
>github-markdown.css 
