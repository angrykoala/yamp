import Xejs from 'xejs';
import * as pkginfo from 'pkginfo';

pkginfo(module, "version");
const version = module.exports.version;

export default class XejsLoader {
    public loadFile(file: string): Promise<string> {
        const options = this.generateOptions();
        const loader = new Xejs(options);
        return loader.render(file);
    }

    private generateOptions(): Xejs.Options {
        return {
            options: {
                openTag: "{{",
                closeTag: "}}",
                commentTag: "{#"
            },
            tokens: [
                [/date/i, "getDate()"],
                [/page\s*?break/i, "'<p style=\"page-break-after:always;\"></p>'"],
                [/yamp\s*?version/i, `'${version}'`],
                [/toc/i, "'<!-- toc -->'"]
            ],
            args: {}
        };
    }
}
