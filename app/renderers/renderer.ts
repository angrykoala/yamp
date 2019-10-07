export default abstract class Renderer {
    public abstract renderToFile(html: string, file: string): Promise<string>;
}
