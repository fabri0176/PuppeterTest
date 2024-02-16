import puppeteer from 'puppeteer';
import ScraperHelper from '../Helpers/ScraperHelper.js';


class ScraperValley {
    constructor({ baseUrl = null, drawLimit = null, }) {
        this.inputs = {
            TABLE_RESULTS: '.table.table-bordered.views-table.cols-6'
        };
        this.result = [];
        this.baseUrl = baseUrl;
        this.drawLimit = drawLimit;
    }

    async scrape() {
        console.log('--- START ScraperValley->scrape ---');
        const browser = await puppeteer.launch({
            headless: false,
        });
        const page = await browser.newPage();
        await page.goto(`${this.baseUrl}/resultados`);

        let nPage = 0;
        let continueProcess = true;

        do {
            console.log('PAGE: ', nPage);
            await ScraperHelper.delay(4);
            nPage += 1;
            if (nPage === 100) {
                continueProcess = false;
            }
            await page.waitForSelector(this.inputs.TABLE_RESULTS);
            const rows = await page.$$(this.inputs.TABLE_RESULTS + ' tbody tr');
            for (const row of rows) {
                const columns = await row.$$('td');
                const [col1, col2, col3] = columns;
                const sorteo = await page.evaluate(el => el.textContent, col1);
                const numero = await page.evaluate(el => el.textContent, col2);
                const serie = await page.evaluate(el => el.textContent, col3);

                if (Number.parseInt(this.drawLimit, 10) === Number.parseInt(sorteo, 10)) {
                    console.log('end');
                    continueProcess = false;
                    break;
                }

                const column = { sorteo: sorteo.trim(), numero: numero.trim(), serie: serie.trim() };
                console.log(column);
                this.result = [...this.result, column];
            }
            await page.waitForSelector('.pagination.pager');
            await page.goto(`${this.baseUrl}/resultados?page=${nPage}`);
        } while (continueProcess);
        await page.screenshot({ path: 'example.png' });
        return this.result;
    }
}

export default ScraperValley;