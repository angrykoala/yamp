0.4.3 / 2017-04-16
==================

  * Fixed bug with hightlight dependencies when yamp installed as a dependency
  * TOC links disabled for pdf output

0.4.2 / 2017-04-02
==================

  * Added unit tests for cli.js
  * Added coverage to cli.js
  * Removed Nodejs 4.6.1 from CI tests
  * Added yerbamate cli test library 1.0
  * Xejs updated to 0.7.0
  * Dependencies updated
  * Output to an inexistent folder (appending `/` to output) will create the folder

0.4.1 / 2016-10-18
==================

  * Output filename option will modify the default renderer if given extension applies to a renderer (e.g. `yamp file.md -o file.html` will now generate an html file)
  * Promises interface for yamp API
  * Xejs updated to 0.5.0, comment tags supported
  * Output option will no longer repeat the extension file

0.4.0 / 2016-10-15
==================

  * Directory as output supported
  * Xejs updated to 0.4.0
  * Tests coverage improved
  * Compiled docs added to github repo
  * Npmignore file created
  * Code comments improved
  * Presentation under docs improved
  * Tests separated in different files
  * Changelog added to docs

0.3.11 / 2016-10-04
===================

  * Added CONTRIBUTING.md
  * Renderer.renderfile separated in different files
  * CHANGELOG.md added
  * Options argument to renderFile
  * Yamp-cli updated to support multiple files and --join option added
  * Multiple input files for rendering accepted

0.3.10 / 2016-09-28
===================

  * Option --list-styles added
  * Jshint code problems fixed
  * Jshint added to travis
  * Options `--style` will now change between provided styles
  * Console logs removed
  * Academic style acm-sig.css added
  * Readme updated with contributors section
  * Renderer options improved
  * Front matter support
  * Default md2html parser changed to marked, markdown-it plugins no longer supported
  * Toc support
  * Bugfixes
  * Removed html and pdf docs to reduce package space
  * Readme updated

0.3.9 / 2016-09-23
==================

  * File title only uses output filename without extensions
  * File now generated on execution folder by default
  * Html attributes supported in title parser
  * Code highlight disabled if not necessary
  * Docs updated
  * Unit tests improved
  * Jshint updated
  * Xejs parser fixed,
  * Xejs updated
  * Unnecessary dependencies removed
  * Yamp cli improved

0.3.8 / 2016-09-19
==================

  * Custom XEJS tags per renderer
  * Dependencies upgraded
  * New badges added to readme
  * Docs updated

0.3.7 / 2016-09-19
==================

  * Remove unnecessary files
  * Tests updated
  * Default options no longer modified in renderer

0.3.6 / 2016-09-18
==================

  * Koala resource is now provided online
  * Docs for gh-pages
  * XEJS updated
  * Ignore case in xejs tags
  * Pdf renderer tests

0.3.5 / 2016-09-17
==================
   
  * Node.js version for tests updated
  * Remark slides support
  * Readme updated

0.3.4 / 2016-09-16
==================

  * Page break tag added

0.3.3 / 2016-09-16
==================

  * Removed EJS support
  * Added XEJS support for tags
  * Added tags `date` and `include`
  * Node >= 4.0.0 support added, travis updated

0.3.1 / 2016-09-12
==================

  * Default template fixed

0.3.0 / 2016-09-12
==================

  * Test coverage improved
  * Html renderer tests

0.2.12 / 2016-09-11
===================

  * Include markdown files support
  * EJS tags support

0.2.11 / 2016-09-10
===================

  * Image and font size fixed
  * Yamp module API
  * Readme updated
  * Yamp cli separated main code
  * Pdf parser changed
  * Added timeouts to tests

0.2.10 / 2016-09-09
===================

  * option `-o, --output` added

0.2.9 / 2016-09-08
==================

  * bugfixs
  * env node added to index.js

0.2.8 / 2016-09-08
==================

  * Custom style option added
  * Renderer class
  * Readme updated, added milestones
  * Custom title option added
  * -k option added, CI tests for windows added

0.2.7 / 2016-09-05
==================

  * The koala update

0.2.6 / 2016-09-05
==================

  * Removed console log and code cleaned

0.2.5 / 2016-09-05
==================

  * Images link fixed on pdf output
  * Html2pdf parser

0.2.4 / 2016-09-04
==================

  * Pdf style improved
  * `--no-style` option added

0.2.3 / 2016-09-04
==================

  * Minify and code highlight options
  * Code blocks in pdf output improved
  * Automatic line breaks removed

0.2.2 / 2016-09-04
==================

  * Markdown it plugins

0.2.0 / 2016-09-04
==================

  * Readme update
  * Code blocks display in pdf fixed

0.1.6 / 2016-09-04
==================

  * Unit tests and Continuous Integration

0.1.5 / 2016-09-03
==================

  * Readme and usage help updated

0.1.4 / 2016-09-03
==================

  * Title changes according to file

0.1.3 / 2016-09-03
==================

  * Code highlight support
