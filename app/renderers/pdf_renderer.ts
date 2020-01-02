import HtmlRenderer from './html_renderer';
import { RendererOptions } from './renderer';
import Html2Pdf from '../html2pdf';

export default class PdfRenderer extends HtmlRenderer {

    constructor(options: RendererOptions) {
        super(options);
    }

    public async renderToFile(html: string, file: string, options: { title?: string }): Promise<string> {
        let filename = file.replace(/\.pdf$/i, '');
        filename = `${filename}.pdf`;

        const templatedHtml = await this.generateHtml(html, options);

        const html2Pdf = new Html2Pdf();
        await html2Pdf.generatePdf(templatedHtml, filename);
        return filename;
    }
}
