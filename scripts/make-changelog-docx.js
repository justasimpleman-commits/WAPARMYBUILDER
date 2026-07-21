#!/usr/bin/env node
/* Generate a Word (.docx) changelog from CHANGELOG.md.
   Usage:  node scripts/make-changelog-docx.js [version]
   - no arg  → uses the newest "## [x.y.z]" entry in CHANGELOG.md
   - version → renders that specific entry (e.g. 1.5.0)
   Output:  docs/CHANGELOG-<version>.docx  (also prints the path)
   Needs the `docx` devDependency (npm install --save-dev docx). */
const fs = require("fs");
const path = require("path");
const { Document, Packer, Paragraph, TextRun, HeadingLevel, BorderStyle } = require("docx");

const ROOT = path.join(__dirname, "..");
const md = fs.readFileSync(path.join(ROOT, "CHANGELOG.md"), "utf8");
const lines = md.split(/\r?\n/);

// inline **bold**, *italic*/_italic_, `code`; `base` props apply to plain text
// (used to render a whole line italic, e.g. the _..._ footer).
function runs(text, base = {}) {
  const out = [];
  const re = /(\*\*([^*]+)\*\*|`([^`]+)`|\*([^*]+)\*|_([^_]+)_)/g;
  let last = 0, m;
  const plain = t => new TextRun({ text: t, ...base });
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(plain(text.slice(last, m.index)));
    if (m[2] != null) out.push(new TextRun({ text: m[2], bold: true, italics: base.italics }));
    else if (m[3] != null) out.push(new TextRun({ text: m[3], font: "Consolas", italics: base.italics }));
    else out.push(new TextRun({ text: m[4] != null ? m[4] : m[5], italics: true }));
    last = re.lastIndex;
  }
  if (last < text.length) out.push(plain(text.slice(last)));
  return out.length ? out : [plain(text)];
}

// locate entries
const verLines = lines.map((l, i) => ({ i, m: l.match(/^##\s*\[([0-9]+\.[0-9]+\.[0-9]+)\]/) })).filter(x => x.m);
if (!verLines.length) { console.error("No '## [x.y.z]' entry found in CHANGELOG.md"); process.exit(1); }
const want = process.argv[2];
const start = want ? verLines.find(x => x.m[1] === want) : verLines[0];
if (!start) { console.error(`Version ${want} not found in CHANGELOG.md`); process.exit(1); }
const version = start.m[1];
const nextVer = verLines.find(x => x.i > start.i);
const endIdx = nextVer ? nextVer.i : lines.length;

// intro = lines between the H1 and the first version heading
const h1 = lines.findIndex(l => /^#\s+/.test(l));
const introLines = lines.slice(h1 + 1, verLines[0].i);

const children = [ new Paragraph({ heading: HeadingLevel.TITLE, children: [new TextRun("Warhammer Army Builder — Changelog")] }) ];

function flushPara(buf) {
  if (buf.join(" ").trim()) children.push(new Paragraph({ spacing: { after: 120 }, children: runs(buf.join(" ").trim()) }));
}
// intro paragraphs (blank-line separated, wrapped lines joined)
{ let buf = []; for (const l of introLines) { if (!l.trim()) { flushPara(buf); buf = []; } else buf.push(l.trim()); } flushPara(buf); }

// the version section — buffer bullets and paragraphs so wrapped lines join
let bullet = null, para = [];
const flushBullet = () => { if (bullet) { children.push(new Paragraph({ bullet: { level: 0 }, spacing: { after: 80 }, children: runs(bullet) })); bullet = null; } };
const flushP = () => {
  const txt0 = para.join(" ").trim(); para = [];
  if (!txt0) return;
  let txt = txt0, base = {};
  if (/^_.+_$/.test(txt)) { txt = txt.slice(1, -1); base = { italics: true }; }   // whole-line italic footer
  children.push(new Paragraph({ spacing: { after: 120 }, children: runs(txt, base) }));
};
const flushAll = () => { flushBullet(); flushP(); };
for (let i = start.i; i < endIdx; i++) {
  const l = lines[i];
  const h2 = l.match(/^##\s*\[([^\]]+)\]\s*(.*)$/);   // version heading
  const h3 = l.match(/^###\s+(.*)$/);
  if (h2) { flushAll(); children.push(new Paragraph({ heading: HeadingLevel.HEADING_1, spacing: { before: 220, after: 100 }, children: [new TextRun(`${h2[1]} ${h2[2]}`.trim())] })); continue; }
  if (h3) { flushAll(); children.push(new Paragraph({ heading: HeadingLevel.HEADING_2, spacing: { before: 180, after: 80 }, children: [new TextRun(h3[1])] })); continue; }
  if (/^-\s+/.test(l)) { flushAll(); bullet = l.replace(/^-\s+/, ""); continue; }
  if (bullet && /^\s+\S/.test(l)) { bullet += " " + l.trim(); continue; }   // wrapped bullet line
  if (/^---+$/.test(l.trim())) { flushAll(); children.push(new Paragraph({ spacing: { before: 160 }, border: { top: { style: BorderStyle.SINGLE, size: 6, color: "CCCCCC", space: 8 } }, children: [] })); continue; }
  if (!l.trim()) { flushAll(); continue; }   // blank line ends the current block
  para.push(l.trim());                        // accumulate a (possibly wrapped) paragraph
}
flushAll();

const doc = new Document({ creator: "Warhammer Army Builder", title: `Changelog ${version}`,
  sections: [{ properties: { page: { size: { width: 12240, height: 15840 } } }, children }] });

const outPath = path.join(ROOT, "docs", `CHANGELOG-${version}.docx`);
Packer.toBuffer(doc).then(buf => { fs.writeFileSync(outPath, buf); console.log(`Wrote ${path.relative(ROOT, outPath)} (${buf.length} bytes) for version ${version}`); });
