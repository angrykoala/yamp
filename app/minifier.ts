import { minify as htmlMinify } from 'html-minifier';

export default class Minifier {
    public async minifyHtml(html: string): Promise<string> {
        return htmlMinify(html, {
            html5: true,
            minifyCSS: true,
            minifyJS: true,
            removeComments: true,
            collapseWhitespace: true
        });
    }
}
