import { RendererOptions } from "./renderer";
import HtmlRenderer from './html_renderer';

export default class RemarkRenderer extends HtmlRenderer {
    constructor(options: RendererOptions) {
        super(options, "remark.ejs");
    }
}
