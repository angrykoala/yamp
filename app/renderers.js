"use strict";

const HtmlRenderer=require('./renderers/html_renderer');
const PdfRenderer=require('./renderers/pdf_renderer');
const RemarkRenderer=require('./renderers/remark_renderer');
const RevealRenderer=require('./renderers/reveal_renderer');

module.exports={
    html: HtmlRenderer,
    pdf: PdfRenderer,
    remark: RemarkRenderer,
    reveal: RevealRenderer
};
