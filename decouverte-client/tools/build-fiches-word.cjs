/* LES FICHES D'ACCOMPAGNEMENT EN WORD (M1.2.1 et M1.2.2).
 *
 *     node decouverte-client/tools/build-fiches-word.cjs [dossier] [échelle]
 *
 * Reprend la forme de la fiche M1.1.2 (v2) : son paquet Word est dans
 * tools/modele-fiche-word (styles, puces, pied de page) ; seul le corps est
 * écrit ici, avec les mêmes couleurs, tailles et tableaux. Le contenu est
 * dans tools/fiches-word-contenu.cjs. L'échelle (1 = tailles du modèle)
 * resserre l'ensemble pour tenir en deux pages A4.
 * Écrit Fiche_M1-2-1_Accompagnement_pedagogique_v2.docx et M1-2-2 dans le
 * dossier donné (par défaut : Téléchargements).
 */
'use strict';
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');
const os = require('os');

const MODELE = path.join(__dirname, 'modele-fiche-word');
const fiches = require('./fiches-word-contenu.cjs');
const outDir = process.argv[2] || path.join(os.homedir(), 'Downloads');
const S = Number(process.argv[3] || 0.8);

const C = { navy: '1B2370', blue: '1F4FD8', coral: 'E8664A', text: '222B3A', muted: '5B6577', head: 'EEF3FD', line: 'DCE3F0', box: 'F6F8FC' };
const W = 9906; // largeur utile (twips)
const sz = n => Math.max(12, Math.round(n * S));
const sp = n => Math.round(n * S);
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/* ---------- briques ---------- */
const FONT = '<w:rFonts w:ascii="Fira Sans" w:cs="Fira Sans" w:eastAsia="Fira Sans" w:hAnsi="Fira Sans"/>';
function run(text, { size = 19, color = C.text, bold = false, italic = false } = {}) {
  const s = sz(size);
  return `<w:r><w:rPr>${FONT}${bold ? '<w:b/><w:bCs/>' : ''}${italic ? '<w:i/><w:iCs/>' : ''}<w:color w:val="${color}"/><w:sz w:val="${s}"/><w:szCs w:val="${s}"/></w:rPr><w:t xml:space="preserve">${esc(text)}</w:t></w:r>`;
}
function para(runs, { before = 0, after = 0, line = 276, jc, keepNext, extra = '' } = {}) {
  return `<w:p><w:pPr>${keepNext ? '<w:keepNext/>' : ''}${extra}<w:spacing w:after="${sp(after)}" w:before="${sp(before)}" w:line="${line}"/>${jc ? `<w:jc w:val="${jc}"/>` : ''}</w:pPr>${[].concat(runs).join('')}</w:p>`;
}
const NONE = '<w:top w:val="none" w:color="FFFFFF" w:sz="0"/><w:left w:val="none" w:color="FFFFFF" w:sz="0"/><w:bottom w:val="none" w:color="FFFFFF" w:sz="0"/><w:right w:val="none" w:color="FFFFFF" w:sz="0"/>';
function cell(width, content, { fill, valign = 'top' } = {}) {
  const m = sp(70), h = 110;
  return `<w:tc><w:tcPr><w:tcW w:type="dxa" w:w="${width}"/><w:tcBorders><w:top w:val="none" w:color="FFFFFF" w:sz="0"/><w:left w:val="none" w:color="FFFFFF" w:sz="0"/><w:bottom w:val="single" w:color="${C.line}" w:sz="4"/><w:right w:val="none" w:color="FFFFFF" w:sz="0"/></w:tcBorders>${fill ? `<w:shd w:fill="${fill}" w:color="auto" w:val="clear"/>` : ''}<w:tcMar><w:top w:type="dxa" w:w="${m}"/><w:left w:type="dxa" w:w="${h}"/><w:bottom w:type="dxa" w:w="${m}"/><w:right w:type="dxa" w:w="${h}"/></w:tcMar><w:vAlign w:val="${valign}"/></w:tcPr>${content}</w:tc>`;
}
function table(widths, rows, header) {
  const tr = (cells, isHead) => `<w:tr><w:trPr><w:cantSplit/>${isHead ? '<w:tblHeader/>' : ''}</w:trPr>${cells}</w:tr>`;
  const head = header ? tr(header.map((h, i) => cell(widths[i], h, { fill: C.head, valign: header.valign || 'top' })).join(''), true) : '';
  return `<w:tbl><w:tblPr><w:tblW w:type="dxa" w:w="${W}"/><w:tblBorders>${NONE}<w:insideH w:val="none" w:color="FFFFFF" w:sz="0"/><w:insideV w:val="none" w:color="FFFFFF" w:sz="0"/></w:tblBorders><w:tblLayout w:type="fixed"/></w:tblPr><w:tblGrid>${widths.map(w => `<w:gridCol w:w="${w}"/>`).join('')}</w:tblGrid>${head}${rows.map(r => tr(r.map((c, i) => cell(widths[i], c.xml || c, c.opts || {})).join(''))).join('')}</w:tbl>`;
}

/* ---------- formes du modèle ---------- */
const P = {
  text: (t, o = {}) => para(run(t, o), o),
  headCell: t => para(run(t, { size: 17, color: C.navy, bold: true })),
  body: t => para(run(t)),
  strong: (t, color = C.navy) => para(run(t, { bold: true, color })),
  sub: t => para(run(t, { size: 16, color: C.muted }), { before: 30 }),
  heading: (n, t) => para([run(`${n}  `, { size: 24, color: C.coral, bold: true }), run(t, { size: 24, color: C.navy, bold: true })], { before: 200, after: 120, keepNext: true, extra: `<w:pBdr><w:bottom w:val="single" w:color="${C.line}" w:sz="6" w:space="4"/></w:pBdr>` }),
  small: (t, o = {}) => para(run(t, { size: 16, color: C.muted }), { before: 30, ...o }),
  bullet: ([b, t]) => `<w:p><w:pPr><w:pStyle w:val="ListParagraph"/><w:numPr><w:ilvl w:val="0"/><w:numId w:val="2"/></w:numPr><w:spacing w:after="${sp(70)}" w:line="276"/></w:pPr>${run(b, { bold: true, color: C.navy })}${run(t)}</w:p>`
};

function render(f) {
  const out = [];
  out.push(para(run(f.kicker, { size: 16, color: C.blue, bold: true }), { after: 40 }));
  out.push(para(run(f.title, { size: 40, color: C.navy, bold: true }), { after: 40, line: 240 }));
  out.push(para(run(`${f.code} · Fiche d’accompagnement pédagogique`, { size: 22, color: C.muted }), { after: 160 }));
  out.push(para(run(f.intro, { italic: true, color: C.muted }), { after: 60 }));

  out.push(P.heading(1, 'Le module en bref'));
  out.push(table([2000, 7906], f.brief.map(([k, v]) => [P.strong(k), P.body(v)])));

  out.push(P.heading(2, 'Le parcours et ses exercices, dans l’ordre de la plateforme'));
  out.push(table([600, 5000, 1700, 2606],
    f.steps.map(([name, kind, time, corr], i) => [para(run(String(i + 1), { size: 22, color: C.coral, bold: true })), P.strong(name) + P.sub(kind), P.body(time), P.body(corr)]),
    ['', 'Étape', 'Durée', 'Correction'].map(P.headCell)));

  out.push(para(run('Ce que travaille chaque étape du parcours', { size: 18, color: C.navy, bold: true }), { before: 160, after: 60, keepNext: true }));
  const mc = f.matrix.cols.length, first = 3500, other = Math.floor((W - first) / mc);
  const widths = [first, ...Array(mc).fill(other)]; widths[mc] += W - first - other * mc;
  const head = [para(run('Objectif', { size: 17, color: C.navy, bold: true }))].concat(f.matrix.cols.map(([n, l]) =>
    para(run(n, { size: 20, color: C.coral, bold: true }), { jc: 'center' }) + para(run(l, { size: 15, color: C.navy, bold: true }), { jc: 'center', line: 220 })));
  head.valign = 'bottom';
  out.push(table(widths, f.matrix.rows.map(r => [P.body(r[0])].concat(r.slice(1).map(m => ({ xml: para(m ? run(m, { size: 20, color: m === '●' ? C.coral : C.blue, bold: true }) : '', { jc: 'center' }), opts: { valign: 'center' } })))), head));
  out.push(P.small('● travaillé en priorité    ○ mobilisé en appui', { after: 0 }));

  out.push(P.heading(3, 'Selon la certification'));
  out.push(table([3700, 6206], f.certs.map(([[g, list], v]) => [P.strong(g) + P.sub(list), P.body(v)]), ['Certifications', 'Supports à privilégier'].map(P.headCell)));
  out.push(P.small(f.certNote));

  out.push(P.heading(4, 'Mettre en ligne'));
  f.online.forEach(b => out.push(P.bullet(b)));

  out.push(P.heading(5, 'Points de vigilance'));
  out.push(table([2600, 7306], f.watch.map(([k, v]) => [P.strong(k, C.blue), P.body(v)])));

  out.push(P.heading(6, 'Les erreurs fréquentes des apprenants, à reprendre en cours'));
  out.push(P.text(f.errorsIntro, { color: C.muted, after: 100 }));
  out.push(table([4300, 5606], f.errors.map(([a, b, c, d]) => [P.strong(a) + P.sub(b), para(run(c, { bold: true, color: C.coral }), { after: 20 }) + P.body(d)]),
    ['Ce que l’apprenant a du mal à faire', 'Une activité à mener avec le groupe'].map(P.headCell)));

  out.push(P.heading(7, 'Différencier'));
  f.differentiate.forEach(b => out.push(P.bullet(b)));
  out.push(`<w:p><w:pPr><w:pBdr><w:left w:val="single" w:color="${C.coral}" w:sz="18" w:space="8"/></w:pBdr><w:shd w:fill="${C.box}" w:color="auto" w:val="clear"/><w:spacing w:after="0" w:before="${sp(120)}" w:line="276"/><w:ind w:left="160" w:right="160"/></w:pPr>${run(f.retours[0], { bold: true, color: C.navy })}${run(f.retours[1])}</w:p>`);

  const m = sp(850);
  out.push(`<w:sectPr><w:footerReference w:type="default" r:id="rId6"/><w:pgSz w:w="11906" w:h="16838" w:orient="portrait"/><w:pgMar w:top="${m}" w:right="1000" w:bottom="${m}" w:left="1000" w:header="${sp(708)}" w:footer="${sp(500)}" w:gutter="0"/><w:pgNumType/><w:docGrid w:linePitch="360"/></w:sectPr>`);
  return fs.readFileSync(path.join(MODELE, 'document-entete.xml'), 'utf8') + out.join('') + '</w:body></w:document>';
}

/* ---------- archive .docx (zip) ---------- */
const CRC = (() => { const t = new Uint32Array(256); for (let n = 0; n < 256; n++) { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xEDB88320 ^ (c >>> 1) : c >>> 1; t[n] = c >>> 0; } return t; })();
const crc32 = buf => { let c = 0xFFFFFFFF; for (const b of buf) c = CRC[(c ^ b) & 0xFF] ^ (c >>> 8); return (c ^ 0xFFFFFFFF) >>> 0; };
function zip(files) {
  const parts = [], central = []; let offset = 0;
  for (const [name, data] of files) {
    const n = Buffer.from(name, 'utf8'), comp = zlib.deflateRawSync(data), crc = crc32(data);
    const h = Buffer.alloc(30); h.writeUInt32LE(0x04034b50, 0); h.writeUInt16LE(20, 4); h.writeUInt16LE(0x0800, 6); h.writeUInt16LE(8, 8); h.writeUInt32LE(0, 10);
    h.writeUInt32LE(crc, 14); h.writeUInt32LE(comp.length, 18); h.writeUInt32LE(data.length, 22); h.writeUInt16LE(n.length, 26); h.writeUInt16LE(0, 28);
    parts.push(h, n, comp);
    const c = Buffer.alloc(46); c.writeUInt32LE(0x02014b50, 0); c.writeUInt16LE(20, 4); c.writeUInt16LE(20, 6); c.writeUInt16LE(0x0800, 8); c.writeUInt16LE(8, 10); c.writeUInt32LE(0, 12);
    c.writeUInt32LE(crc, 16); c.writeUInt32LE(comp.length, 20); c.writeUInt32LE(data.length, 24); c.writeUInt16LE(n.length, 28); c.writeUInt32LE(offset, 42);
    central.push(c, n); offset += 30 + n.length + comp.length;
  }
  const cd = Buffer.concat(central), e = Buffer.alloc(22);
  e.writeUInt32LE(0x06054b50, 0); e.writeUInt16LE(files.length, 8); e.writeUInt16LE(files.length, 10); e.writeUInt32LE(cd.length, 12); e.writeUInt32LE(offset, 16);
  return Buffer.concat([...parts, cd, e]);
}
function walk(dir, base = '') {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(d => d.isDirectory() ? walk(path.join(dir, d.name), base + d.name + '/') : [base + d.name]);
}

for (const [key, f] of Object.entries(fiches)) {
  const files = walk(MODELE).filter(n => n !== 'document-entete.xml').map(n => {
    let data = fs.readFileSync(path.join(MODELE, n));
    if (n === 'word/footer1.xml') data = Buffer.from(data.toString('utf8').replace('M1.1.2 · Fiche', `${f.code} · Fiche`));
    if (n === 'docProps/core.xml') data = Buffer.from(data.toString('utf8').replace(/Un-named/g, 'CCI France').replace(/\d{4}-\d\d-\d\dT[\d:.]+Z/g, new Date().toISOString()));
    return [n, data];
  });
  files.splice(files.findIndex(([n]) => n === '[Content_Types].xml') + 1, 0, ['word/document.xml', Buffer.from(render(f), 'utf8')]);
  const file = path.join(outDir, `Fiche_M${key}_Accompagnement_pedagogique_v2.docx`);
  fs.writeFileSync(file, zip(files));
  console.log(file);
}
