// Generates neutral, clearly-labelled placeholder photos (webp) in public/placeholders.
// Usage: node scripts/make-placeholders.mjs   (requires sharp, installed with next)
import { createRequire } from "node:module";
import { readdirSync } from "node:fs";
import path from "node:path";

const require = createRequire(import.meta.url);
const pnpmDir = path.resolve("node_modules/.pnpm");
const sharpDir = readdirSync(pnpmDir).find((d) => d.startsWith("sharp@"));
const sharp = require(path.join(pnpmDir, sharpDir, "node_modules/sharp"));

const items = [
  ["founder-phuong", 800, 1000, "Chân dung Phương"],
  ["pathway-university", 1200, 750, "Du học đại học — sinh viên tại trường ĐH Đức"],
  ["pathway-vocational", 1200, 750, "Du học nghề — học viên Ausbildung"],
  ["gallery-1", 1200, 900, "Lớp học tiếng Đức"],
  ["gallery-2", 900, 1200, "Học viên nhận chứng chỉ Goethe"],
  ["gallery-3", 1200, 900, "Buổi tư vấn du học"],
  ["gallery-4", 1200, 900, "Chia tay học viên tại sân bay"],
  ["gallery-5", 900, 1200, "Học viên tại Đức"],
  ["gallery-6", 1200, 900, "Hoạt động ngoại khoá"],
];

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");

for (const [name, w, h, label] of items) {
  const s = Math.min(w, h);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="#e5eeff"/><stop offset="1" stop-color="#cfe3ea"/></linearGradient></defs>
  <rect width="100%" height="100%" fill="url(#g)"/>
  <rect x="${s * 0.04}" y="${s * 0.04}" width="${w - s * 0.08}" height="${h - s * 0.08}" rx="${s * 0.03}" fill="none" stroke="#94a3b8" stroke-width="${s * 0.004}" stroke-dasharray="${s * 0.02} ${s * 0.015}"/>
  <g transform="translate(${w / 2} ${h / 2 - s * 0.1})" fill="none" stroke="#64748b" stroke-width="${s * 0.012}" stroke-linejoin="round">
    <rect x="${-s * 0.09}" y="${-s * 0.06}" width="${s * 0.18}" height="${s * 0.13}" rx="${s * 0.02}"/>
    <circle r="${s * 0.035}" cy="${s * 0.005}"/>
    <path d="M${-s * 0.035} ${-s * 0.06} l${s * 0.015} ${-s * 0.025} h${s * 0.04} l${s * 0.015} ${s * 0.025}"/>
  </g>
  <text x="50%" y="${h / 2 + s * 0.07}" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-weight="700" font-size="${s * 0.05}" fill="#475569" letter-spacing="${s * 0.004}">ẢNH MẪU</text>
  <text x="50%" y="${h / 2 + s * 0.13}" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="${s * 0.032}" fill="#64748b">${esc(label)}</text>
</svg>`;
  await sharp(Buffer.from(svg)).webp({ quality: 70 }).toFile(`public/placeholders/${name}.webp`);
  console.log("✓", name);
}
