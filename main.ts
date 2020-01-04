import { arrayfy } from './app/utils';
import XejsLoader from './app/xejs_loader';
import TocGenerator from './app/toc_generator';
import Md2Html from './app/md2html';
import { RendererOptions, Renderer } from './app/renderers/renderer';
import HtmlRenderer from './app/renderers/html_renderer';
import TitleParser from './app/title_parser';
import { outputFormat } from './app/types';
import PdfRenderer from './app/renderers/pdf_renderer';
import RemarkRenderer from './app/renderers/remark_renderer';
//
//     .option("-o, --output <file | directory>", "output file name (without extension) or directory, if output is a filename, joins all the resulting files")
//     .option("--pdf", "pdf output")
//     .option("--html", "html output")
//     .option("--remark", "remark (html slides) output")
//     .option("-t, --title [value]", "sets the html title")
//     .option("--list-styles", "lists all styles provided by yamp")
//     .option("--style <file>", "select one of the yamp styles or use a custom file")
//     .option("--no-style", "disables css styling")
//     .option("--minify", "minifies html output")
//     .option("--no-highlight", "disable code highlight")
//     .option("--no-tags", "disable markdown yamp tags")
//     .option("--no-front-matter", "disable initial yaml options parsing")
//     .option("--join", "joins all input files into one unique output file")
//     .option("-k, --koala", "your output will be koalafied")
// }

interface YampOptions {
    minify?: boolean;
    koala?: boolean;
    style?: string;
    highlight?: boolean;
    format?: outputFormat;
    output: string;
}

function generateHtml(rawMarkdown: string, options: Pick<YampOptions, 'minify' | 'highlight'>): Promise<string> {
    const md2Html = new Md2Html();
    return md2Html.generateHtml(rawMarkdown, { highlight: Boolean(options.highlight) });
}

function getRenderer(options: RendererOptions): Renderer {
    switch (options.format) {
        case "html":
            return new HtmlRenderer(options);
        case "pdf":
            return new PdfRenderer(options);
        case "remark":
            return new RemarkRenderer(options);
    }
}

export default async function yamp(files: string | Array<string>, options: YampOptions): Promise<string | void> {
    files = arrayfy(files);
    const loader = new XejsLoader();
    let markdown = await loader.loadFile(files[0]);
    // TODO: frontMatter

    const tocGenerator = new TocGenerator();
    markdown = await tocGenerator.insert(markdown, { linkify: true });

    const html = await generateHtml(markdown, options);

    const titleParser = new TitleParser();
    const title = titleParser.getTitleFromHtml(html);

    const renderer = getRenderer({
        highlight: Boolean(options.highlight),
        style: options.style,
        koala: Boolean(options.koala),
        format: options.format || "pdf",
        minify: Boolean(options.minify)
    });
    const filePath = await renderer.renderToFile(html, options.output, { title: title });
    return filePath;
    // frontMatterParser(rawContent, (err, res, attr) => {
    //     if (err) console.log("Warning:" + err);
    //     if (renderOptions.frontMatter) {
    //         rawContent = res;
    //         Object.assign(renderOptions, attr);
    //     }
    //
    //     const linkifyToc = (this.output !== "pdf");
    //     tocParser(rawContent,linkifyToc, done);
    // });
}

/* Expected flow
1. Loader
    * Xejs
3. Front Matter
4. TOC
5. md2html
6. Title
7. Render
    * Html?
    * PDF
    * REMARK
8, Output
*/
