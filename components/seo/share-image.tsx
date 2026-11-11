import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { site, siteCopy } from "@/content/site";
import type { Locale } from "@/lib/i18n/locale";

export const shareImageSize = { width: 1200, height: 630 };
export const shareImageContentType = "image/png";

const readFont = (file: string) =>
  readFile(join(process.cwd(), "assets/fonts", `PlusJakartaSans-${file}.ttf`));
const readLogo = () => readFile(join(process.cwd(), "public/brand", "logo-full.png"));

const fontFiles = (
  [
    [600, "SemiBold"],
    [800, "ExtraBold"],
  ] as const
).map(async ([weight, file]) => ({
  name: `Jakarta${weight}`,
  weight,
  style: "normal" as const,
  data: await readFont(file),
}));
const logoSrc = readLogo().then((bytes) => `data:image/png;base64,${bytes.toString("base64")}`);

export function shareImageAlt(locale: Locale) {
  const copy = siteCopy[locale];
  return `${copy.fullName} — ${copy.slogan}`;
}

export async function renderShareImage(
  locale: Locale,
  topic?: { headline: string; subtitle: string; kicker?: string; places?: string },
) {
  const copy = siteCopy[locale];
  const headline = (topic?.headline ?? copy.tagline).toLocaleUpperCase(
    locale === "de" ? "de-DE" : "vi-VN",
  );
  const long = headline.length > 16;
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
          {topic ? (topic.kicker ?? "Ausbildung · NaNu NaNa") : copy.ogKicker}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: 24,
            fontSize: long ? 48 : 84,
            fontFamily: "Jakarta800",
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: long ? -1 : -2,
          }}
        >
          <span style={{ color: "#0b7793" }}>NANU NANA</span>
          <span style={{ color: "#0f172a" }}>{headline}</span>
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
          {topic?.subtitle ?? copy.ogMotto}
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
          {site.phone.display} · {topic?.places ?? copy.ogPlaces}
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
        {/* Satori renders this markup to a PNG; it does not accept next/image. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logo} width={320} height={208} alt="" />
      </div>
    </div>,
    { ...shareImageSize, fonts },
  );
}
