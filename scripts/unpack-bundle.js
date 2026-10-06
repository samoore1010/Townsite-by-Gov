// Unpacks a Claude Design bundle (single self-unpacking HTML file) into ./design.
// Mechanical only: decode assets to files, swap asset ids for file paths in the
// template, and map external React URLs to the local copies. Markup, styles and
// logic are never altered.
//
//   node scripts/unpack-bundle.js reference/artifact-bundle.html

const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const src = process.argv[2];
if (!src) {
  console.error('Usage: node scripts/unpack-bundle.js <bundle.html>');
  process.exit(1);
}

const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, 'design');
const html = fs.readFileSync(src, 'utf8');

function block(type) {
  const re = new RegExp(`<script type="__bundler/${type}">([\\s\\S]*?)</script>`);
  const m = html.match(re);
  return m ? JSON.parse(m[1]) : null;
}

const manifest = block('manifest');
let template = block('template');
const ext = block('ext_resources') || [];
if (!manifest || typeof template !== 'string') {
  console.error('Not a Claude Design bundle: manifest or template missing.');
  process.exit(1);
}

fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(path.join(OUT, 'assets', 'fonts'), { recursive: true });
fs.mkdirSync(path.join(OUT, 'assets', 'vendor'), { recursive: true });

const names = {};
let fontN = 0;
let otherN = 0;
for (const [uuid, entry] of Object.entries(manifest)) {
  let bytes = Buffer.from(entry.data, 'base64');
  if (entry.compressed) bytes = zlib.gunzipSync(bytes);
  const head = bytes.subarray(0, 200).toString('utf8');
  let rel;
  if (/GENERATED from dc-runtime/.test(head)) rel = 'assets/dc-runtime.js';
  else if (/react-dom\.production\.min\.js/.test(head)) rel = 'assets/vendor/react-dom.production.min.js';
  else if (/react\.production\.min\.js/.test(head)) rel = 'assets/vendor/react.production.min.js';
  else if (/^font\//.test(entry.mime)) rel = `assets/fonts/font-${String(++fontN).padStart(2, '0')}.woff2`;
  else rel = `assets/asset-${String(++otherN).padStart(2, '0')}`;
  fs.writeFileSync(path.join(OUT, rel), bytes);
  names[uuid] = rel;
  template = template.split(uuid).join(rel);
}

const resources = {};
for (const e of ext) if (names[e.uuid]) resources[e.id] = names[e.uuid];
// Formatting matches the original unpack exactly (", " and ": " separators).
const json = '{' + Object.entries(resources)
  .map(([k, v]) => JSON.stringify(k) + ': ' + JSON.stringify(v)).join(', ') + '}';
const inject = '<script>window.__resources = ' + json + ';</script>';
const headOpen = template.match(/<head[^>]*>/i);
if (headOpen) {
  const i = headOpen.index + headOpen[0].length;
  template = template.slice(0, i) + inject + template.slice(i);
}

fs.writeFileSync(path.join(OUT, 'index.html'), template);
console.log(`Unpacked ${Object.keys(manifest).length} assets into design/`);
