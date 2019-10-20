import frontMatter from 'front-matter';

export default class FrontMatterParser {
    public parse(content: string): { content: string, attributes: any } {
        const data = frontMatter(content);
        return {
            content: data.body,
            attributes: data.attributes
        };
    }
}
