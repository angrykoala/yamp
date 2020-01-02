import fs from 'fs-extra';
import { assert } from 'chai';

import Html2Pdf from '../../app/html2pdf';
import config from '../config';

const testDir = config.testDir;

describe("Html2pdf", function(): any {
    this.timeout(5000);
    const html = "<h1>Test</h1>";
    const filePath = testDir + "/testFile.pdf";
    const html2Pdf = new Html2Pdf();

    it("Generate pdf", async () => {
        const exists = await fs.pathExists(filePath);
        assert.isFalse(exists);
        await html2Pdf.generatePdf(html, filePath);
        const fileStatus = await fs.stat(filePath);
        assert.ok(fileStatus);
        assert.ok(fileStatus.isFile());
        assert.ok(fileStatus.size > 10000);
    });
});
