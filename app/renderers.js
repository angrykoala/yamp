"use strict";

const HtmlRenderer=require('./renderers/htmlRenderer');
const PdfRenderer=require('./renderers/pdfRenderer');

module.exports={
    html: HtmlRenderer,
    pdf: PdfRenderer   
};
