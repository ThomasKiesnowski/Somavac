import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, 'pdfs');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const pages = [
  { slug: 'index', label: 'Home' },
  { slug: 'physicians', label: 'Physicians' },
  { slug: 'patients', label: 'Patients' },
  { slug: 'patient-support', label: 'Patient-Support' },
  { slug: 'patient-stories', label: 'Patient-Stories' },
  { slug: 'patient-community', label: 'Patient-Community' },
  { slug: 'team', label: 'Team' },
  { slug: 'news', label: 'News' },
];

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  for (const p of pages) {
    const url = `http://localhost:3000/${p.slug}.html`;
    const outPath = path.join(outDir, `Somavac-${p.label}.pdf`);
    console.log(`Rendering ${url} -> ${outPath}`);

    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 });

    // Scroll to trigger lazy loads / IntersectionObserver animations
    await page.evaluate(async () => {
      await new Promise((resolve) => {
        let totalHeight = 0;
        const distance = 400;
        const timer = setInterval(() => {
          window.scrollBy(0, distance);
          totalHeight += distance;
          if (totalHeight >= document.body.scrollHeight) {
            clearInterval(timer);
            window.scrollTo(0, 0);
            resolve();
          }
        }, 80);
      });
    });

    // Let images / fonts settle, force animations to a settled state
    await page.evaluate(() => {
      document.querySelectorAll('*').forEach((el) => {
        el.style.animation = 'none';
        el.style.transition = 'none';
      });
    });
    await new Promise((r) => setTimeout(r, 1500));

    await page.emulateMediaType('screen');
    await page.pdf({
      path: outPath,
      printBackground: true,
      format: 'Letter',
      margin: { top: '0.4in', bottom: '0.4in', left: '0.4in', right: '0.4in' },
      preferCSSPageSize: false,
    });

    await page.close();
  }

  await browser.close();
  console.log(`\nAll PDFs written to: ${outDir}`);
})();
