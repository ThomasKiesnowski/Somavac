import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const screenshotDir = path.join(__dirname, 'temporary screenshots');

if (!fs.existsSync(screenshotDir)) {
  fs.mkdirSync(screenshotDir, { recursive: true });
}

const url = process.argv[2] || 'http://localhost:3000';
const scrollY = parseInt(process.argv[3] || '0');
const label = process.argv[4] || 'section';

const existing = fs.readdirSync(screenshotDir).filter(f => f.startsWith('screenshot-'));
let maxNum = 0;
for (const f of existing) {
  const match = f.match(/screenshot-(\d+)/);
  if (match) maxNum = Math.max(maxNum, parseInt(match[1]));
}
const num = maxNum + 1;
const filename = `screenshot-${num}-${label}.png`;
const outputPath = path.join(screenshotDir, filename);

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
  // Trigger all reveals
  await page.evaluate(async () => {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
  });
  await new Promise(r => setTimeout(r, 500));
  await page.evaluate((y) => window.scrollTo(0, y), scrollY);
  await new Promise(r => setTimeout(r, 300));
  await page.screenshot({ path: outputPath, fullPage: false });
  console.log(`Screenshot saved to: ${outputPath}`);
  await browser.close();
})();
