import Xejs from 'xejs';
import pkginfo from 'pkginfo';

pkginfo(module, "version");
const version = module.exports.version;

function getDate(): string {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return day + "/" + month + "/" + year;
}

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
                closeTag: "}}"
            },
            tokens: [
                [/date/i, "getDate()"],
                [/page\s*?break/i, "'<p style=\"page-break-after:always;\"></p>'"],
                [/yamp\s*?version/i, `'${version}'`],
                [/toc/i, "'<!-- toc -->'"]
            ],
            args: {
                getDate: getDate
            }
        };
    }
}
