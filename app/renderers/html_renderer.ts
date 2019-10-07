import * as fs from 'fs';
import Renderer from "./renderer";

export default class HtmlRenderer extends Renderer {
    public renderToFile(html: string, file: string): Promise<string> {
        const filename = file.replace(/\.html$/i, '');
        return new Promise((resolve, reject) => {
            fs.writeFile(filename + ".html", html, (err) => {
                if (err) reject(new Error(`Error writing ${filename}.html`));
                else resolve(`${filename}.html`);
            });
        });
    }
}
