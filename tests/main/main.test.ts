import yamp from '../../main';

describe("nice", () => {
    it("example", async () => {
        await yamp("tests/test_files/test.md", {});
    });
});
