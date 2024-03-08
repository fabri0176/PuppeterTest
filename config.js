import 'dotenv/config';

export default {
    BASE_URL: process.env.BASE_URL ?? 'http://localhost:3000',
    DRAW_LIMIT: process.env.DRAW_LIMIT ?? 100,
    SCRAPER_TO_USE: process.env.SCRAPER_TO_USE ?? 'ScraperDummy',
};