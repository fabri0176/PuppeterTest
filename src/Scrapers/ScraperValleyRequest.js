import * as cheerio from 'cheerio';
import fetch from 'node-fetch';
import InterfaceScraper from './InterfaceScraper.js';

class ScraperValleyRequest extends InterfaceScraper {
    constructor({ baseUrl = null, drawLimit = null, }) {
        super();
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

export default ScraperValleyRequest;