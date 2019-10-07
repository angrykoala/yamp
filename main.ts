// export default {
//     Renderer: require('./app/renderer'),
//     renderers: {
//         html: require('./app/renderers/html_renderer'),
//         pdf: require('./app/renderers/pdf_renderer'),
//         remark: require('./app/renderers/remark_renderer')
//     },
//     parsers: {
//         md2html: require('./app/parsers/md2html'),
//         xejs: require('./app/parsers/xejs_parser')
//     }
// };
import { YampOptions } from './app/types/options';
import { arrayfy } from './app/utils';
import XejsLoader from './app/xejs_loader';
import TocGenerator from './app/toc_generator';
import Md2Html from './app/md2html';
import TitleParser from './app/title_parser';
import Renderer from './app/renderers/renderer';
import HtmlRenderer from './app/renderers/html_renderer';
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

export { YampOptions } from './app/types/options';

export async function yamp(files: string | Array<string>, options: YampOptions): Promise<string | void> {
    files = arrayfy(files);
    const loader = new XejsLoader();
    // TODO: load template!!!
    let rawMarkdown = await loader.loadFile(files[0]);
    // TODO: frontMatter
    const tocGenerator = new TocGenerator();
    rawMarkdown = await tocGenerator.insert(rawMarkdown, { linkify: true });
    const md2Html = new Md2Html();
    const html = await md2Html.generateHtml(rawMarkdown, { highlight: true });
    // TODO: minify
    const titleParser = new TitleParser();
    const title = titleParser.getTitleFromHtml(html);
    const renderer = getRenderer();
    await renderer.renderToFile(html, "./output.html");

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

    return "";
}

function getRenderer(): Renderer {
    return new HtmlRenderer();
}

/* Expected flow
1. Loader
    * Xejs
3. Front Matter
4. TOC
5. md2hmtl
6 Title
7. Render
    * Html?
    * PDF
    * REMARK
8, Output
*/