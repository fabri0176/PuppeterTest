import RunScraper from "./src/RunScraper.js";

(async () => {
    const runScraper = new RunScraper();
    await runScraper.run();
})();