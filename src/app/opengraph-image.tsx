import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Causey";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "#f5f9fc",
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 28,
          }}
        >
          {/* Red C mark */}
          <div
            style={{
              width: 120,
              height: 120,
              borderRadius: 28,
              background: "#c23b32",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="72" height="72" viewBox="0 0 32 32" fill="none">
              <path
                d="M21.2 11.1c-.85-1.15-2.2-1.85-3.85-1.85-2.95 0-5.05 2.15-5.05 5.25s2.1 5.25 5.05 5.25c1.65 0 3-.7 3.85-1.85l2.05 1.35C22 21.1 20 22.35 17.35 22.35 12.9 22.35 9.7 19.1 9.7 14.5S12.9 6.65 17.35 6.65c2.65 0 4.65 1.2 5.9 3.1l-2.05 1.35Z"
                fill="#ffffff"
              />
            </svg>
          </div>

          <div
            style={{
              fontSize: 96,
              fontWeight: 700,
              letterSpacing: "-0.04em",
              color: "#14181c",
              lineHeight: 1,
            }}
          >
            Causey
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
