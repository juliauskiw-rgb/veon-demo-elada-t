// Builds WebP variants of client object photos (public/img/objects/<slug>.jpg) into public/img/objects/opt/
// and writes src/data/images.json (variant widths + natural size). Never upscales. Run by `prebuild`/`predev`.
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const dir = path.resolve('public/img/objects');
const out = path.join(dir, 'opt');
const WIDTHS = [480, 800, 1200];
const meta = {};
if (fs.existsSync(dir)) {
  fs.mkdirSync(out, { recursive: true });
  for (const f of fs.readdirSync(dir)) {
    const m = f.match(/^(.+)\.(jpe?g|png)$/i);
    if (!m) continue;
    const src = path.join(dir, f);
    const info = await sharp(src).metadata();
    const widths = [...new Set(WIDTHS.map((w) => Math.min(w, info.width)))];
    for (const w of widths) {
      const dest = path.join(out, `${m[1]}-${w}.webp`);
      if (!fs.existsSync(dest) || fs.statSync(dest).mtimeMs < fs.statSync(src).mtimeMs) {
        await sharp(src).resize({ width: w, withoutEnlargement: true }).webp({ quality: 78 }).toFile(dest);
      }
    }
    meta[m[1]] = { file: f, width: info.width, height: info.height, widths };
  }
}
fs.writeFileSync(path.resolve('src/data/images.json'), JSON.stringify(meta, null, 2) + '\n');
console.log('optimize-images:', Object.keys(meta).length, 'photos');
