import * as toc from 'markdown-toc';

export default class TocGenerator {
    public insert(rawContent: string, options: { linkify: boolean }): Promise<string> {
        const processedContent = toc.insert(rawContent, {
            linkify: options.linkify
        });
        if (rawContent && !processedContent) return Promise.reject(new Error("TocGenerator - No content generated"));
        else return Promise.resolve(processedContent);
    }
}
