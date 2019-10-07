declare module 'xejs' {
    namespace Xejs {
        interface Options {
            options?: {
                openTag?: string,
                closeTag?: string,
                commentTag?: string,
                ejsEscape?: boolean,
                singleTag?: boolean,
                defaultTokens?: boolean
            };
            tokens?: Array<[RegExp, string]>;
            args?: any;
        }
    }
    class Xejs {
        constructor(options?: Xejs.Options);
        public renderFile(file: string): Promise<string>;
        public render(file: string): Promise<string>;
        public renderString(content: string, includePath: string): Promise<string>;
    }
    export = Xejs;
}
