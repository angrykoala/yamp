type OutputFormat = "html" | "pdf" | "remark";

export interface YampOptions { // Higher Priority Options
    outputFilename?: string;
    styleName?: string;
    codeHighlight?: boolean;
    minify?: boolean;
    title?: string;
    frontMatter?: boolean;
    yampTags?: boolean;
    koala?: boolean;
    outputFormat?: OutputFormat | Array<OutputFormat>;
    output?: "file" | "string";
    join?: boolean;
}
