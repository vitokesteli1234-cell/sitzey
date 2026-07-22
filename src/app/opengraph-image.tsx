import { ImageResponse } from "next/og";

export const alt = "Sitzey — Website Design & Development Studio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Reuses the exact SITZEY wordmark gradient and copy already used in
// galaxy-interactive-hero-section.tsx's HeroContent — no new brand assets.
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#000000",
          backgroundImage:
            "radial-gradient(ellipse 60% 60% at 30% 30%, rgba(147,51,234,0.35), transparent 70%), radial-gradient(ellipse 60% 60% at 75% 75%, rgba(217,70,239,0.25), transparent 70%)",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 132,
            fontWeight: 700,
            letterSpacing: -2,
            backgroundImage:
              "linear-gradient(90deg, #f5d0fe, #e879f9, #c084fc, #a78bfa)",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          SITZEY
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 24,
            fontSize: 34,
            color: "#d1d5db",
            letterSpacing: 2,
            textTransform: "uppercase",
          }}
        >
          Website design &amp; development studio
        </div>
      </div>
    ),
    { ...size }
  );
}
