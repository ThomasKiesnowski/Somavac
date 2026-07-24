import puppeteer from 'puppeteer';
import { PDFDocument, PDFName, PDFArray } from 'pdf-lib';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outPath = path.join(__dirname, 'Somavac-Full-Website-compressed.pdf');

const pages = [
  { slug: 'index', title: 'Home' },
  { slug: 'physicians', title: 'Physicians' },
  { slug: 'patients', title: 'Patients' },
  { slug: 'patient-support', title: 'Patient Support' },
  { slug: 'patient-stories', title: 'Patient Stories' },
  { slug: 'patient-community', title: 'Patient Community' },
  { slug: 'team', title: 'Team' },
  { slug: 'news', title: 'News' },
];

const RENDER_WIDTH = 1200;   // CSS px width to render at
const JPEG_QUALITY = 62;     // 0-100
const PAGE_W = 612;          // Letter width in pt
const PAGE_H = 792;          // Letter height in pt

const browser = await puppeteer.launch({
  headless: 'new',
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});

const merged = await PDFDocument.create();
merged.setTitle('SOMAVAC Medical — Full Website');
merged.setAuthor('SOMAVAC Medical');
merged.setSubject('Complete capture of the SOMAVAC website — all pages (screen-optimized)');

const sectionStarts = [];

for (const p of pages) {
  const url = `http://localhost:3000/${p.slug}.html`;
  const page = await browser.newPage();
  await page.setViewport({ width: RENDER_WIDTH, height: 900, deviceScaleFactor: 1 });
  await page.goto(url, { waitUntil: 'networkidle0', timeout: 90000 });

  // Trigger lazy loads / reveal animations
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let y = 0;
      const step = 500;
      const t = setInterval(() => {
        window.scrollBy(0, step);
        y += step;
        if (y >= document.body.scrollHeight) { clearInterval(t); window.scrollTo(0, 0); resolve(); }
      }, 60);
    });
  });
  // Force all reveal-on-scroll content into its visible end state, settle charts,
  // eager-load images, and start any videos so nothing screenshots blank.
  await page.evaluate(() => {
    document.querySelectorAll('.reveal').forEach((el) => {
      el.classList.add('visible');
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
    document.querySelectorAll('.chart-bar').forEach((bar) => {
      if (bar.dataset.height) bar.style.height = bar.dataset.height;
    });
    document.querySelectorAll('img').forEach((img) => {
      img.loading = 'eager';
      if (img.dataset.src && !img.getAttribute('src')) img.src = img.dataset.src;
      if (img.dataset.srcset && !img.getAttribute('srcset')) img.srcset = img.dataset.srcset;
    });
    document.querySelectorAll('video').forEach((v) => {
      v.muted = true; v.autoplay = true; v.playsInline = true;
      try { v.load(); v.play().catch(() => {}); } catch (e) {}
    });
    // Kill animations/transitions so nothing is captured mid-flight
    document.querySelectorAll('*').forEach((el) => {
      el.style.animationDuration = '0s';
      el.style.transitionDuration = '0s';
    });
  });

  // Wait for fonts and image decode to finish
  await page.evaluate(async () => {
    if (document.fonts && document.fonts.ready) { try { await document.fonts.ready; } catch (e) {} }
    await Promise.all([...document.images].map((img) =>
      (img.decode ? img.decode().catch(() => {}) : Promise.resolve())));
  });
  await new Promise((r) => setTimeout(r, 1500));
  await page.emulateMediaType('screen');

  const shot = await page.screenshot({ type: 'jpeg', quality: JPEG_QUALITY, fullPage: true });
  const dims = await page.evaluate(() => ({ w: document.documentElement.scrollWidth, h: document.body.scrollHeight }));
  await page.close();

  const jpg = await merged.embedJpg(shot);
  const imgW = jpg.width, imgH = jpg.height;
  const scale = PAGE_W / imgW;          // fit image to page width, edge to edge
  const scaledH = imgH * scale;         // total height in pt
  const numPages = Math.max(1, Math.ceil(scaledH / PAGE_H));

  let firstRef = null;
  for (let k = 0; k < numPages; k++) {
    const pg = merged.addPage([PAGE_W, PAGE_H]);
    if (k === 0) firstRef = pg.ref;
    // Draw whole scaled image; shift up so slice k is visible. Origin is bottom-left.
    const imageTopY = PAGE_H + k * PAGE_H;           // where image top sits (page coords)
    pg.drawImage(jpg, { x: 0, y: imageTopY - scaledH, width: PAGE_W, height: scaledH });
  }
  sectionStarts.push({ title: p.title, pageRef: firstRef });
  console.log(`${p.title.padEnd(18)} img ${imgW}x${imgH}px -> ${numPages} pages, jpeg ${(shot.length/1024).toFixed(0)} KB`);
}

await browser.close();

// Bookmarks
const context = merged.context;
const outlineRef = context.nextRef();
const itemRefs = sectionStarts.map(() => context.nextRef());
sectionStarts.forEach((s, i) => {
  const dest = PDFArray.withContext(context);
  dest.push(s.pageRef);
  dest.push(PDFName.of('Fit'));
  const item = context.obj({ Title: context.obj(s.title), Parent: outlineRef, Dest: dest });
  if (i > 0) item.set(PDFName.of('Prev'), itemRefs[i - 1]);
  if (i < itemRefs.length - 1) item.set(PDFName.of('Next'), itemRefs[i + 1]);
  context.assign(itemRefs[i], item);
});
context.assign(outlineRef, context.obj({
  Type: PDFName.of('Outlines'), First: itemRefs[0], Last: itemRefs[itemRefs.length - 1], Count: itemRefs.length,
}));
merged.catalog.set(PDFName.of('Outlines'), outlineRef);
merged.catalog.set(PDFName.of('PageMode'), PDFName.of('UseOutlines'));

const bytes = await merged.save();
fs.writeFileSync(outPath, bytes);
console.log(`\nWrote ${outPath}`);
console.log(`Pages: ${merged.getPageCount()}  Size: ${(bytes.length/1024/1024).toFixed(1)} MB`);
