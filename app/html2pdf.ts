import * as Wendigo from 'wendigo';

export default class Html2Pdf {
    public async generatePdf(html: string, outputFile: string): Promise<void> {
        const browser = await Wendigo.createBrowser();
        try {
            await browser.setContent(html);
            await browser.pdf({
                path: outputFile,
                margin: {
                    // top: "1in",
                    right: "0",
                    bottom: "1in",
                    left: "0"
                },
                printBackground: true,
                scale: 1.1
            });
            await this.browserTeardown();
        } catch (err) {
            await this.browserTeardown();
            throw err;
        }
    }

    private async browserTeardown(): Promise<void> {
        await Wendigo.stop();
    }
}

// module.exports = function(html, outputFile, done) {
//     Pdf.create(html, {
//         "border": {
//             "top": "0",
//             "right": "0",
//             "bottom": "1in",
//             "left": "0"
//         },
//         "header": {
//             "height": "1in",
//         },
//         "zoomFactor": "0.75",
//         "base": "file://" + process.cwd() + "/"
//     }).toFile(outputFile + '.pdf', function(err, res) {
//         if (err) return done(new Error("[html-pdf] outputFile error: " + err), res);
//         return done(null, res);
//     });
// };
