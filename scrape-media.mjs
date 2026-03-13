import puppeteer from 'puppeteer';

const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
const page = await browser.newPage();

const pages = [
  'https://somavac.com/',
  'https://somavac.com/about/',
  'https://somavac.com/how-it-works/',
  'https://somavac.com/patients/',
  'https://somavac.com/testimonials/',
  'https://somavac.com/early-data/',
  'https://somavac.com/a-caregivers-story/',
  'https://somavac.com/news/',
];

const allMedia = {};

for (const url of pages) {
  try {
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
    const media = await page.evaluate(() => {
      const imgs = [...document.querySelectorAll('img')]
        .map(i => ({ src: i.src, alt: i.alt || '', w: i.naturalWidth || i.width, h: i.naturalHeight || i.height }))
        .filter(i => i.src.length > 0 && i.src.indexOf('data:') === -1);
      const videos = [...document.querySelectorAll('video source, video[src]')]
        .map(v => v.src || '')
        .filter(s => s.length > 0);
      const iframes = [...document.querySelectorAll('iframe[src]')]
        .map(f => f.src)
        .filter(s => s.length > 0);
      return { imgs, videos, iframes };
    });
    allMedia[url] = media;
  } catch (e) {
    allMedia[url] = { error: e.message };
  }
}

console.log(JSON.stringify(allMedia, null, 2));
await browser.close();
