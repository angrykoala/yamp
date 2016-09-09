"use strict";

module.exports = {
    renderers: require('./app/renderers'),
    Renderer: require('./app/renderers/renderer'),
    parsers: {
        md2html: require('./app/parsers/md2html')        
    }
};
