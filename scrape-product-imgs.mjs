import puppeteer from 'puppeteer';

const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
const page = await browser.newPage();
const urls = ['https://somavac.com/how-it-works/', 'https://somavac.com/patients/', 'https://somavac.com/about/'];
for (const url of urls) {
  await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
  const imgs = await page.evaluate(() => {
    return [...document.querySelectorAll('img')].map(i => ({ src: i.src, alt: i.alt, w: i.naturalWidth, h: i.naturalHeight })).filter(i => i.src && i.src.indexOf('data:') === -1);
  });
  console.log(url);
  console.log(JSON.stringify(imgs, null, 2));
}
await browser.close();
