import marked from 'marked';
import hljs from 'highlight.js';

export default class Md2Html {
    public async generateHtml(markdown: string, options: { highlight: boolean }): Promise<string> {
        if (options.highlight) {
            marked.setOptions({
                highlight: (code) => {
                    return hljs.highlightAuto(code).value;
                }
            });
        }
        const html = await new Promise<string>((resolve, reject) => {
            marked(markdown, (err, res) => {
                if (err) reject(err);
                else resolve(res);
            });
        });

        this.resetMarkedOptions();
        return html;
    }

    private resetMarkedOptions(): void {
        marked.setOptions(
            marked.getDefaults()
        );
    }
}
