/**
 * Generates TheoSheets wordmark SVG with vector paths (no text/font imports).
 * Uses Playfair Display: Theo #4b3a2a, Sheets #b89a63 (italic).
 */
const opentype = require("opentype.js");
const fs = require("fs");
const path = require("path");

const FONT_REGULAR = path.join(
  __dirname,
  "../node_modules/@fontsource/playfair-display/files/playfair-display-latin-500-normal.woff"
);
const FONT_ITALIC = path.join(
  __dirname,
  "../node_modules/@fontsource/playfair-display/files/playfair-display-latin-500-italic.woff"
);

const THEO_COLOR = "#4b3a2a";
const SHEETS_COLOR = "#b89a63";
const FONT_SIZE = 42;
const BASELINE_Y = 48; // SVG y for baseline (opentype y increases up, we flip)

function loadFont(filePath) {
  const buffer = fs.readFileSync(filePath);
  const arrayBuffer = buffer.buffer.slice(
    buffer.byteOffset,
    buffer.byteOffset + buffer.byteLength
  );
  return opentype.parse(arrayBuffer);
}

function getPathData(font, text, x, y) {
  const path = font.getPath(text, x, y, FONT_SIZE);
  return path.toPathData();
}

function main() {
  const fontRegular = loadFont(FONT_REGULAR);
  const fontItalic = loadFont(FONT_ITALIC);

  // opentype uses y-up; SVG uses y-down. We generate with y=0 as baseline,
  // then flip. Path extends roughly -12 (descenders) to +38 (ascenders).
  const scaleY = -1;
  const translateY = BASELINE_Y;

  // "Theo" - measure width for spacing
  const theoPath = fontRegular.getPath("Theo", 0, 0, FONT_SIZE);
  const theoBounds = theoPath.getBoundingBox();
  const theoWidth = theoBounds.x2 - theoBounds.x1;

  // Gap between Theo and Sheets (premium kerning, Henle/Editions Peters style)
  const gap = 4;
  const sheetsX = theoWidth + gap;

  // Generate path data (y-up coords, we'll transform)
  const theoPathData = getPathData(fontRegular, "Theo", 0, 0);
  const sheetsPathData = getPathData(fontItalic, "Sheets", sheetsX, 0);

  // Total width for viewBox
  const sheetsPath = fontItalic.getPath("Sheets", sheetsX, 0, FONT_SIZE);
  const sheetsBounds = sheetsPath.getBoundingBox();
  const totalWidth = Math.ceil(sheetsBounds.x2) + 10;
  const viewHeight = 60;

  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 60" width="300" height="60" role="img" aria-label="TheoSheets">
  <g transform="translate(0, ${translateY}) scale(1, ${scaleY})">
    <path d="${theoPathData}" fill="${THEO_COLOR}"/>
    <path d="${sheetsPathData}" fill="${SHEETS_COLOR}"/>
  </g>
</svg>
`;

  const outDir = path.join(__dirname, "../public/brand");
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }
  const outPath = path.join(outDir, "theosheets-wordmark.svg");
  fs.writeFileSync(outPath, svg.trim(), "utf8");
  console.log("Generated:", outPath);
}

main();
