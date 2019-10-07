const titleRegex = {
    html: /<h1.*?>(.+?)<\/h1>/
};

export default class TitleParser {
    public getTitleFromHtml(html: string): string | undefined {
        return this.findTitle(html, titleRegex.html);

    }
    private findTitle(content: string, regex: RegExp): string | undefined {
        if (!content || !regex) return undefined;
        const arr = content.match(regex);
        if (!arr) return undefined;
        else return arr[1] || undefined;
    }
}
