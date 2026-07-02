import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// Apple touch icon — NP monogram on gold.
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #fcd34d 0%, #d9942a 100%)",
          color: "#09090b",
          fontSize: 96,
          fontWeight: 700,
          letterSpacing: -4,
        }}
      >
        NP
      </div>
    ),
    { ...size },
  );
}
