import RunScraper from "./src/RunScraper.js";

(async () => {
    try {
        const runScraper = new RunScraper();
        await runScraper.run();
    } catch (error) {
        console.error('An error occurred:', error);
    }
})();