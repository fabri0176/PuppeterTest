import config from "../config.js";

class RunScraper {
    async run() {
        const scraperClass = await RunScraper.loadClass(config.SCRAPER_TO_USE);
        const scraper = new scraperClass({ baseUrl: config.BASE_URL, drawLimit: config.DRAW_LIMIT });
        const result = await scraper.scrape();
        console.log(result);
    }

    static async loadClass(className) {
        const module = await import(`./Scrapers/${className}.js`);
        return module.default;
    }
}

export default RunScraper;
