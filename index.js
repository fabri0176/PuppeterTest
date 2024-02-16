import 'dotenv/config'
import puppeteer from 'puppeteer';
import { JsonDB, Config } from 'node-json-db';

const db = new JsonDB(new Config("myDataBase", true, false, '/'));
const BASE_URL = process.env.BASE_URL;

const INPUTS = {
  TABLE_RESULTS: '.table.table-bordered.views-table.cols-6'
};

const delay = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));
const result = [];

(async () => {
  const browser = await puppeteer.launch({
    headless: false
  });
  console.log('--- START ---');
  const page = await browser.newPage();
  await page.goto(`${BASE_URL}/resultados`);

  let nPage = 0;
  let continueProcess = true;

  do {
    console.log('PAGE: ', nPage);
    await delay(4000);
    nPage += 1;
    if (nPage === 100) {
      continueProcess = false;
    }
    await page.waitForSelector(INPUTS.TABLE_RESULTS);
    const filas = await page.$$(INPUTS.TABLE_RESULTS + ' tbody tr');
    for (const fila of filas) {
      const columnas = await fila.$$('td');
      const [col1, col2, col3] = columnas;
      const sorteo = await page.evaluate(el => el.textContent, col1);
      const numero = await page.evaluate(el => el.textContent, col2);
      const serie = await page.evaluate(el => el.textContent, col3);
      const column = { sorteo: sorteo.trim(), numero: numero.trim(), serie: serie.trim(), };
      console.log(column);
    }
    await page.waitForSelector('.pagination.pager');
    await page.goto(`${BASE_URL}/resultados?page=${nPage}`);
  } while (continueProcess);
  await page.screenshot({ path: 'example.png' });
  await db.push("/test1", result);
})();