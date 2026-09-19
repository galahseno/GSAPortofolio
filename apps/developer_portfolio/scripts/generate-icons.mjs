// Generates the GSA brand icon set into public/. Run manually: `pnpm generate:icons`.
// Output is committed, so this is intentionally not part of `astro build`.
//
// Wordmark is converted to outlines from the local Exo 2 variable font so it renders
// identically everywhere (SVG <text> would fall back to a system font in rasterizers).
import { mkdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import * as fontkit from "fontkit";
import sharp from "sharp";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PUBLIC = path.join(ROOT, "public");

// Brand tokens (src/styles/tokens.css)
const ORANGE = "#e4622f";
const WHITE = "#ffffff";
const PAGE_BG = "#fbfaf9";
const HEADING = "#1a1716";
const BODY = "#463f3a";

// Nav brand mark (Navigation.tsx): 14px text, 5px dot, 6px gap => em ratios.
const DOT_EM = 5 / 14;
const GAP_EM = 6 / 14;

const font = fontkit.openSync(path.join(PUBLIC, "fonts", "Exo2-Variable.ttf"));
const UPEM = font.unitsPerEm;
const CAP = font.capHeight;
const instances = new Map();

function instance(weight) {
  if (!instances.has(weight)) instances.set(weight, font.getVariation({ wght: weight }));
  return instances.get(weight);
}

// Lays out `text` and returns SVG path data in font units (y-up) plus ink bounds.
function outline(text, weight) {
  const run = instance(weight).layout(text);
  let pen = 0;
  const d = run.glyphs
    .map((glyph, i) => {
      const pos = run.positions[i];
      const segment = glyph.path.translate(pen + pos.xOffset, pos.yOffset).toSVG();
      pen += pos.xAdvance;
      return segment;
    })
    .join("");
  return { d, minX: run.bbox.minX, maxX: run.bbox.maxX };
}

const round = (n) => Math.round(n * 100) / 100;

// "GSA" + dot, centered on a `size` square. `width` is the total mark width in px.
function brandMark({ size, width, textFill, dotFill }) {
  const { d, minX, maxX } = outline("GSA", 700);
  const ink = maxX - minX;
  const totalUnits = ink + GAP_EM * UPEM + DOT_EM * UPEM;
  const scale = Math.round((width / totalUnits) * 1e5) / 1e5;
  const left = (size - width) / 2;
  const centerY = size / 2;
  const baseline = centerY + (CAP / 2) * scale;
  const dotR = (DOT_EM * UPEM * scale) / 2;
  const dotX = left + (ink + GAP_EM * UPEM) * scale + dotR;
  return `<path fill="${textFill}" transform="translate(${round(left - minX * scale)} ${round(baseline)}) scale(${scale} ${-scale})" d="${d}"/>
  <circle cx="${round(dotX)}" cy="${round(centerY)}" r="${round(dotR)}" fill="${dotFill}"/>`;
}

const SIZE = 512;

// Rounded tile (favicon, manifest "any" icons). Transparent corners.
function tileSvg({ px } = {}) {
  const dims = px ? `width="${px}" height="${px}" ` : "";
  return `<svg xmlns="http://www.w3.org/2000/svg" ${dims}viewBox="0 0 ${SIZE} ${SIZE}">
  <rect width="${SIZE}" height="${SIZE}" rx="${round(SIZE * 0.22)}" fill="${ORANGE}"/>
  ${brandMark({ size: SIZE, width: SIZE * 0.78, textFill: WHITE, dotFill: WHITE })}
</svg>
`;
}

// Full-bleed square (apple-touch-icon, maskable): the OS applies its own mask, so no
// transparent corners. `fraction` keeps the mark inside the safe zone.
function bleedSvg({ px, fraction }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${px}" height="${px}" viewBox="0 0 ${SIZE} ${SIZE}">
  <rect width="${SIZE}" height="${SIZE}" fill="${ORANGE}"/>
  ${brandMark({ size: SIZE, width: SIZE * fraction, textFill: WHITE, dotFill: WHITE })}
</svg>
`;
}

// 1200x630 social card, laid out like the site: name + orange dot, role beneath.
function ogSvg() {
  const W = 1200;
  const H = 630;
  const pad = 96;
  const tile = 132;
  const nameSize = 100;
  const roleSize = 44;

  const name = outline("Galah Seno Adjie", 700);
  const role = outline("Software Engineer", 500);
  const nameScale = nameSize / UPEM;
  const roleScale = roleSize / UPEM;
  const nameBaseline = 400;
  const roleBaseline = 480;
  const nameInk = (name.maxX - name.minX) * nameScale;
  // At headline size the nav's dot/gap ratio reads detached, so the dot is smaller and closer.
  const dotR = (0.26 * nameSize) / 2;
  const dotX = pad + nameInk + 0.24 * nameSize + dotR;
  const dotY = nameBaseline - (CAP * nameScale) / 2;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="${W}" height="${H}" fill="${PAGE_BG}"/>
  <g transform="translate(${pad} ${pad}) scale(${tile / SIZE})">
    <rect width="${SIZE}" height="${SIZE}" rx="${round(SIZE * 0.22)}" fill="${ORANGE}"/>
    ${brandMark({ size: SIZE, width: SIZE * 0.78, textFill: WHITE, dotFill: WHITE })}
  </g>
  <path fill="${HEADING}" transform="translate(${round(pad - name.minX * nameScale)} ${nameBaseline}) scale(${nameScale} ${-nameScale})" d="${name.d}"/>
  <circle cx="${round(dotX)}" cy="${round(dotY)}" r="${round(dotR)}" fill="${ORANGE}"/>
  <path fill="${BODY}" transform="translate(${round(pad - role.minX * roleScale)} ${roleBaseline}) scale(${roleScale} ${-roleScale})" d="${role.d}"/>
</svg>
`;
}

async function png(svg, file) {
  await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(path.join(PUBLIC, file));
  console.log("wrote", file);
}

await mkdir(PUBLIC, { recursive: true });

await writeFile(path.join(PUBLIC, "favicon.svg"), tileSvg());
console.log("wrote favicon.svg");

await png(tileSvg({ px: 96 }), "favicon-96.png");
await png(tileSvg({ px: 192 }), "icon-192.png");
await png(tileSvg({ px: 512 }), "icon-512.png");
await png(bleedSvg({ px: 180, fraction: 0.78 }), "apple-touch-icon.png");
await png(bleedSvg({ px: 512, fraction: 0.66 }), "icon-512-maskable.png");
await png(ogSvg(), "og-image.png");
