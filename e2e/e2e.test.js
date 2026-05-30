import puppetteer from 'puppeteer';
import { fork } from 'child_process';

jest.setTimeout(30000);

describe('Credit Card Validator e2e', () => {
  let browser;
  let page;
  let server;

  beforeAll(async () => {
    server = fork(`${__dirname}/e2e.server.js`);
    await new Promise((resolve, reject) => {
      server.on('error', reject);
      server.on('message', (message) => {
        if (message === 'ok') resolve();
      });
    });

    browser = await puppetteer.launch({
    });
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
    server.kill();
  });

  test('should validate correct Visa card', async () => {
    await page.goto('http://localhost:9000');
    await page.type('#cardNumber', '4111111111111111');
    await page.click('#validateBtn');
    await page.waitForSelector('.result.valid');
    const resultText = await page.$eval('.result', el => el.textContent);
    expect(resultText).toContain('действительна');
  });

  test('should reject invalid number', async () => {
    await page.goto('http://localhost:9000');
    await page.type('#cardNumber', '1234567890123456');
    await page.click('#validateBtn');
    await page.waitForSelector('.result.invalid');
    const resultText = await page.$eval('.result', el => el.textContent);
    expect(resultText).toContain('Неверный');
  });
});