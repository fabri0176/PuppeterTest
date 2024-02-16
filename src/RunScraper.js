import config from "../config.js";
import ScraperValley from "./Scrapers/ScraperValley.js";

class RunScraper {
    async run() {
        const scraper = new ScraperValley({ baseUrl: config.BASE_URL, drawLimit: config.DRAW_LIMIT });
        await scraper.scrape();
    }
}

export default RunScraper;