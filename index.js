"use strict";

module.exports = {
    Renderer: require('./app/renderer'),
    renderers: {
        html: require('./app/renderers/html_renderer'),
        pdf: require('./app/renderers/pdf_renderer'),
        remark: require('./app/renderers/remark_renderer')
    },
    parsers: {
        md2html: require('./app/parsers/md2html'),
        xejs: require('./app/parsers/xejs_parser')
    }
};
