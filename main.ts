//
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
    return "";
}
