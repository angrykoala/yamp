import { TemplateEngineOptions, TemplateEngine } from "./template_engine";

export { TemplateEngineOptions as RendererOptions } from "./template_engine";

export abstract class Renderer {
    private templateEngine: TemplateEngine;

    constructor(options: TemplateEngineOptions, template: string) {
        this.templateEngine = new TemplateEngine(template, options);

        // this.options = setDefaultOptions();
        // this.setOptions(options);
        // this.xejsTokens = []; //modify this to add new xejs tokens
        // this.setTemplate(template);
        // this.parser = inputParser;
        // this.name = "default";
        //
        // if (this.options.tags) this.fileLoader = this.loadFileXEJS;
        // else this.fileLoader = loadFile;
    }
    public abstract renderToFile(html: string, file: string, options: { title?: string }): Promise<string>;

    protected renderTemplate(html: string, title?: string): Promise<string> {
        return this.templateEngine.render(html, title);
    }

}
