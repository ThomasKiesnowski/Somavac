import { PDFDocument, PDFName, PDFArray, PDFDict, PDFNumber, PDFRef } from 'pdf-lib';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pdfDir = path.join(__dirname, 'pdfs');

// Nav order
const sections = [
  { file: 'Somavac-Home.pdf', title: 'Home' },
  { file: 'Somavac-Physicians.pdf', title: 'Physicians' },
  { file: 'Somavac-Patients.pdf', title: 'Patients' },
  { file: 'Somavac-Patient-Support.pdf', title: 'Patient Support' },
  { file: 'Somavac-Patient-Stories.pdf', title: 'Patient Stories' },
  { file: 'Somavac-Patient-Community.pdf', title: 'Patient Community' },
  { file: 'Somavac-Team.pdf', title: 'Team' },
  { file: 'Somavac-News.pdf', title: 'News' },
];

const outPath = path.join(__dirname, 'Somavac-Full-Website.pdf');

const merged = await PDFDocument.create();
merged.setTitle('SOMAVAC Medical — Full Website');
merged.setAuthor('SOMAVAC Medical');
merged.setSubject('Complete capture of the SOMAVAC website — all pages');
merged.setCreator('Somavac PDF export');

const sectionStarts = []; // {title, pageRef}

for (const s of sections) {
  const bytes = fs.readFileSync(path.join(pdfDir, s.file));
  const src = await PDFDocument.load(bytes);
  const indices = src.getPageIndices();
  const copied = await merged.copyPages(src, indices);
  let firstRef = null;
  copied.forEach((pg, i) => {
    const ref = merged.addPage(pg).ref;
    if (i === 0) firstRef = ref;
  });
  sectionStarts.push({ title: s.title, pageRef: firstRef });
  console.log(`Added ${s.title} (${indices.length} pages)`);
}

// Build a PDF outline (bookmarks) so the document has a clickable table of contents
const context = merged.context;
const outlineDictRef = context.nextRef();

const itemRefs = sectionStarts.map(() => context.nextRef());

sectionStarts.forEach((s, i) => {
  const dest = PDFArray.withContext(context);
  dest.push(s.pageRef);
  dest.push(PDFName.of('Fit'));

  const item = context.obj({
    Title: context.obj(s.title),
    Parent: outlineDictRef,
    Dest: dest,
  });
  if (i > 0) item.set(PDFName.of('Prev'), itemRefs[i - 1]);
  if (i < itemRefs.length - 1) item.set(PDFName.of('Next'), itemRefs[i + 1]);
  context.assign(itemRefs[i], item);
});

const outlineDict = context.obj({
  Type: PDFName.of('Outlines'),
  First: itemRefs[0],
  Last: itemRefs[itemRefs.length - 1],
  Count: itemRefs.length,
});
context.assign(outlineDictRef, outlineDict);

merged.catalog.set(PDFName.of('Outlines'), outlineDictRef);
merged.catalog.set(PDFName.of('PageMode'), PDFName.of('UseOutlines'));

const outBytes = await merged.save();
fs.writeFileSync(outPath, outBytes);

const totalPages = merged.getPageCount();
console.log(`\nMerged ${sections.length} pages into ${totalPages} PDF pages`);
console.log(`Wrote: ${outPath}`);
console.log(`Size: ${(outBytes.length / 1024 / 1024).toFixed(1)} MB`);
