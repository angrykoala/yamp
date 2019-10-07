import marked from 'marked';
import hljs from 'highlight.js';

export default class Md2Html {
    public generateHtml(markdown: string, options: { highlight: boolean }): Promise<string> {
        if (options.highlight) {
            marked.setOptions({
                highlight: (code) => {
                    return hljs.highlightAuto(code).value;
                }
            });
        }
        return new Promise((resolve, reject) => {
            marked(markdown, (err, res) => {
                if (err) reject(err);
                else resolve(res);
            });
        });
    }
}
