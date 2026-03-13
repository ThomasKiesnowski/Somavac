import puppeteer from 'puppeteer';

const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
const page = await browser.newPage();

const urls = [
  'https://somavac.com/testimonials/',
  'https://somavac.com/a-caregivers-story/',
  'https://somavac.com/early-data/',
  'https://somavac.com/somavac-welcomes-dr-aldona-spiegel-as-new-strategic-advisor/',
  'https://somavac.com/somavac-ceo-elizabeth-hoff-presents-at-lsi-europe-technology-receives-enthusiastic-response/',
  'https://somavac.com/lsi-somavac-redefining-post-surgical-recovery-for-breast-cancer-patients/',
  'https://somavac.com/somavac-named-one-of-five-companies-to-watch-from-lsi-market-insights/',
];

for (const url of urls) {
  try {
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
    const text = await page.evaluate(() => {
      const main = document.querySelector('main, .entry-content, article, .page-content, .site-content');
      if (main) return main.innerText;
      // fallback: get body text minus header/footer
      const body = document.body.cloneNode(true);
      body.querySelectorAll('header, footer, nav, script, style').forEach(el => el.remove());
      return body.innerText;
    });
    console.log('=== ' + url + ' ===');
    console.log(text.substring(0, 3000));
    console.log('\n---\n');
  } catch (e) {
    console.log('ERROR: ' + url + ' - ' + e.message);
  }
}
await browser.close();
