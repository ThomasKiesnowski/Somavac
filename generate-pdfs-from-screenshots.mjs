import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, 'pdfs');
const shotDir = path.join(__dirname, 'temporary screenshots');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
if (!fs.existsSync(shotDir)) fs.mkdirSync(shotDir, { recursive: true });

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

const VIEWPORT_WIDTH = 1440;

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  for (const p of pages) {
    const url = `http://localhost:3000/${p.slug}.html`;
    const pngPath = path.join(shotDir, `${p.label}-full.png`);
    const pdfPath = path.join(outDir, `Somavac-${p.label}.pdf`);
    console.log(`\n=== ${p.label} ===`);
    console.log(`URL: ${url}`);

    const page = await browser.newPage();
    await page.setViewport({ width: VIEWPORT_WIDTH, height: 900, deviceScaleFactor: 1 });
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 90000 });

    // Scroll slowly to bottom to trigger lazy-loads and IntersectionObserver animations
    await page.evaluate(async () => {
      await new Promise((resolve) => {
        let total = 0;
        const step = 300;
        const timer = setInterval(() => {
          window.scrollBy(0, step);
          total += step;
          if (total >= document.body.scrollHeight) {
            clearInterval(timer);
            window.scrollTo(0, 0);
            resolve();
          }
        }, 80);
      });
    });

    // Wait for any in-flight images
    await page.evaluate(async () => {
      const imgs = Array.from(document.images);
      await Promise.all(
        imgs.map((img) =>
          img.complete && img.naturalHeight !== 0
            ? null
            : new Promise((res) => {
                img.addEventListener('load', res, { once: true });
                img.addEventListener('error', res, { once: true });
              })
        )
      );
    });

    // Freeze animations / transitions so screenshot captures settled state
    await page.evaluate(() => {
      const style = document.createElement('style');
      style.textContent = `*, *::before, *::after {
        animation: none !important;
        transition: none !important;
      }`;
      document.head.appendChild(style);
      // Force any opacity-0 IntersectionObserver elements to visible
      document.querySelectorAll('[style*="opacity"]').forEach((el) => {
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
    });
    await new Promise((r) => setTimeout(r, 1200));

    // Full-page screenshot
    await page.screenshot({ path: pngPath, fullPage: true, type: 'png' });
    console.log(`Screenshot: ${pngPath}`);

    // Read image dimensions from the PNG
    const buf = fs.readFileSync(pngPath);
    const width = buf.readUInt32BE(16);
    const height = buf.readUInt32BE(20);
    console.log(`Dimensions: ${width} x ${height}`);

    // Convert PNG -> single-page PDF whose page dimensions match the image exactly
    const pxToIn = (px) => `${(px / 96).toFixed(4)}in`;
    const dataUrl = `data:image/png;base64,${buf.toString('base64')}`;
    const wrapper = await browser.newPage();
    const html = `<!doctype html><html><head><style>
      html,body{margin:0;padding:0;background:#fff;}
      img{display:block;width:${width}px;height:${height}px;}
    </style></head><body><img src="${dataUrl}"/></body></html>`;
    await wrapper.setContent(html, { waitUntil: 'load' });
    await wrapper.pdf({
      path: pdfPath,
      printBackground: true,
      width: pxToIn(width),
      height: pxToIn(height),
      margin: { top: 0, bottom: 0, left: 0, right: 0 },
      pageRanges: '1',
    });
    await wrapper.close();
    console.log(`PDF: ${pdfPath}`);

    await page.close();
  }

  await browser.close();
  console.log(`\nDone. PDFs in: ${outDir}`);
})();
