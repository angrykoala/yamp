import * as fs from 'fs';
import * as ejs from 'ejs';
import * as path from 'path';
import { OutputType } from '../types';

export interface TemplateEngineOptions {
    highlight: boolean;
    style?: string;
    koala: boolean;
    output: OutputType;
}

interface TemplateData {
    highlight: boolean;
    style: boolean;
    styleFile?: string;
    resourcesPath: string;
    koala: boolean;
    content: string;
    output: OutputType;
    title?: string;
    fs: typeof fs;
}

const resourcesPath = path.join(__dirname, "/../resources");

export class TemplateEngine {
    private template: string;
    private options: TemplateEngineOptions;

    constructor(template: string, options: TemplateEngineOptions) {
        this.template = path.join(__dirname, "../../templates/", template);
        this.options = options;
    }

    public render(content: string, title?: string): Promise<string> {
        const templateData = this.generateTemplateData(content, title);

        return new Promise((resolve, reject) => {
            ejs.renderFile(this.template, templateData, {}, (err, res) => {
                if (err) reject(err);
                else resolve(res);
            });
        });
    }

    private getStyleFile(styleName: string): string {
        const defaultStyle = "github.css";
        const files = fs.readdirSync(__dirname + "/../styles");
        const index = files.indexOf(styleName);
        if (index > -1) {
            return files[index];
        } else return defaultStyle;

    }

    private generateTemplateData(content: string, title?: string): TemplateData {
        return {
            styleFile: this.options.style ? this.getStyleFile(this.options.style) : undefined,
            highlight: this.options.highlight,
            style: Boolean(this.options.style),
            resourcesPath: resourcesPath,
            koala: this.options.koala,
            output: this.options.output,
            content: content,
            title: title,
            fs: fs
        };
    }

}
