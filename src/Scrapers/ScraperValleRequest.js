import * as cheerio from 'cheerio';
import fetch from 'node-fetch';

class ScraperValleRequest {
    constructor({ baseUrl = null, drawLimit = null, }) {
        this.inputs = {
            TABLE_RESULTS: '.table.table-bordered.views-table.cols-6'
        };
        this.result = [];
        this.baseUrl = baseUrl;
        this.drawLimit = drawLimit;
    }

    async scrape() {
        console.log('--- START ScraperValleRequest->scrape ---');
    }
}

export default ScraperValleRequest;