import * as fs from 'fs';
import { RendererOptions, Renderer } from "./renderer";

export default class HtmlRenderer extends Renderer {
    constructor(options: RendererOptions, template: string = "default.ejs") {
        super(options, template);
    }

    protected generateHtml(html: string, options: { title?: string }): Promise<string> {
        return this.renderTemplate(html, options.title); // TODO: title
    }

    public async renderToFile(html: string, file: string, options: { title?: string }): Promise<string> {
        const filename = file.replace(/\.html$/i, '');
        const templatedHtml = await this.generateHtml(html, options);

        return new Promise<string>((resolve, reject) => {
            fs.writeFile(filename + ".html", templatedHtml, (err) => {
                if (err) reject(new Error(`Error writing ${filename}.html`));
                else resolve(`${filename}.html`);
            });
        });
    }
}
