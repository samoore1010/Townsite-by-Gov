// Verifies that every file in ./design matches the checksums in design.lock.json.
// Any change since the last owner-approved design state fails this check.
//
//   node scripts/verify-design.js          verify (CI and pre-deploy)
//   node scripts/verify-design.js --write  re-seal after the owner approves a design change (npm run design:approve)

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT = path.join(__dirname, '..');
const DESIGN = path.join(ROOT, 'design');
const LOCK = path.join(ROOT, 'design.lock.json');

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    return e.isDirectory() ? walk(p) : [p];
  });
}

function hashes() {
  const out = {};
  for (const file of walk(DESIGN).sort()) {
    const rel = path.relative(ROOT, file).split(path.sep).join('/');
    out[rel] = crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
  }
  return out;
}

const current = hashes();

if (process.argv.includes('--write')) {
  fs.writeFileSync(LOCK, JSON.stringify(current, null, 2) + '\n');
  console.log(`Sealed ${Object.keys(current).length} design files in design.lock.json`);
  process.exit(0);
}

const locked = JSON.parse(fs.readFileSync(LOCK, 'utf8'));
const problems = [];
for (const [file, sum] of Object.entries(locked)) {
  if (!(file in current)) problems.push(`missing:  ${file}`);
  else if (current[file] !== sum) problems.push(`changed:  ${file}`);
}
for (const file of Object.keys(current)) {
  if (!(file in locked)) problems.push(`added:    ${file}`);
}

if (problems.length) {
  console.error('Design files do not match design.lock.json:\n  ' + problems.join('\n  '));
  console.error('\nDesign files changed since the last owner-approved state.');
  console.error('If the owner requested and approved this change, run: npm run design:approve');
  process.exit(1);
}
console.log(`Design verified: ${Object.keys(locked).length} files match design.lock.json`);
