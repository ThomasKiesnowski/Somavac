const fs = require('fs');
const base = 'C:/Users/Thomas Kiesnowski/somavac-wp/themes/somavac/';

// 1) carousel clip fix in pages.json
const pf = base + 'data/pages.json';
const pages = JSON.parse(fs.readFileSync(pf, 'utf8'));
const OLD = 'class="overflow-hidden -mx-4 px-4"';
const NEW = 'class="overflow-hidden -mx-4 px-4 -my-8 py-8"';
let total = 0;
for (const p of pages) {
  if (typeof p.body !== 'string') continue;
  const n = p.body.split(OLD).length - 1;
  if (n) { p.body = p.body.split(OLD).join(NEW); total += n; console.log(`  ${p.slug}: ${n}`); }
}
if (!total) { console.error('ABORT: no wrappers found'); process.exit(1); }
fs.writeFileSync(pf, JSON.stringify(pages, null, 2) + '\n', 'utf8');
console.log('pages.json: ' + total + ' carousel wrapper(s) updated');

// 2) bump import version
const imp = base + 'inc/import.php';
let s = fs.readFileSync(imp, 'utf8');
const m = s.match(/get_option\( 'somavac_imported' \) === '(\d+)'/);
if (!m) { console.error('import version not found'); process.exit(1); }
const next = String(+m[1] + 1);
const n = (s.match(new RegExp("'" + m[1] + "'", 'g')) || []).length;
if (n !== 2) { console.error(`expected 2 occurrences of '${m[1]}', found ${n}`); process.exit(1); }
s = s.replace(new RegExp("'" + m[1] + "'", 'g'), "'" + next + "'");
fs.writeFileSync(imp, s, 'utf8');
console.log('import version bumped ' + m[1] + ' -> ' + next);
