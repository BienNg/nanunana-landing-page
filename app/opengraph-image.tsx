import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { site } from "@/content/site";

export const alt = `${site.fullName} — ${site.slogan}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const asset = (p: string) => readFile(join(process.cwd(), p));
// Satori needs static (non-variable) fonts. Full TTFs (not subsets) so every
// Vietnamese glyph comes from the right weight.
const fontFiles = (
  [
    [600, "SemiBold"],
    [800, "ExtraBold"],
  ] as const
).map(async ([weight, file]) => ({
  name: `Jakarta${weight}`,
  weight,
  style: "normal" as const,
  data: await asset(`assets/fonts/PlusJakartaSans-${file}.ttf`),
}));
const logoSrc = asset("public/brand/logo-full.png").then(
  (b) => `data:image/png;base64,${b.toString("base64")}`,
);

export default async function Image() {
  const [fonts, logo] = await Promise.all([Promise.all(fontFiles), logoSrc]);
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        fontFamily: "Jakarta600",
        background: "linear-gradient(135deg, #f8fafc 0%, #e5eeff 60%, #cfe3ea 100%)",
        padding: 64,
        gap: 48,
        alignItems: "center",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
        <div
          style={{
            display: "flex",
            fontSize: 20,
            fontWeight: 600,
            color: "#0b7793",
            letterSpacing: 1,
            textTransform: "uppercase",
          }}
        >
          Tiếng Đức A1–C1 · Du học đại học · Du học nghề
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: 24,
            fontSize: 84,
            fontFamily: "Jakarta800",
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: -2,
          }}
        >
          <span style={{ color: "#0b7793" }}>NANU NANA</span>
          <span style={{ color: "#0f172a" }}>DU HỌC ĐỨC</span>
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 28,
            fontSize: 32,
            fontWeight: 600,
            color: "#0f172a",
          }}
        >
          Chất lượng và sự tử tế
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 12,
            fontSize: 24,
            fontWeight: 600,
            color: "#475569",
          }}
        >
          {site.phone.display} · Hồ Chí Minh · Hà Nội · Stuttgart
        </div>
      </div>
      <div
        style={{
          display: "flex",
          width: 380,
          height: 380,
          background: "#ffffff",
          borderRadius: 32,
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 24px 48px -12px rgba(0,141,165,0.25)",
        }}
      >
        <img src={logo} width={320} height={208} alt="" />
      </div>
    </div>,
    { ...size, fonts },
  );
}
