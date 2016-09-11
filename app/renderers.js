"use strict";

const HtmlRenderer=require('./renderers/html_renderer');
const PdfRenderer=require('./renderers/pdf_renderer');

module.exports={
    html: HtmlRenderer,
    pdf: PdfRenderer   
};
