import * as fs from 'fs';
import { RendererOptions, Renderer } from "./renderer";

export default class HtmlRenderer extends Renderer {
    constructor(options: RendererOptions) {
        super("default.ejs", options);
    }

    public async renderToFile(html: string, file: string, options: { title?: string }): Promise<string> {
        const filename = file.replace(/\.html$/i, '');
        const templatedHtml = await this.renderTemplate(html, options.title); // TODO: title

        return new Promise<string>((resolve, reject) => {
            fs.writeFile(filename + ".html", templatedHtml, (err) => {
                if (err) reject(new Error(`Error writing ${filename}.html`));
                else resolve(`${filename}.html`);
            });
        });
    }
}
