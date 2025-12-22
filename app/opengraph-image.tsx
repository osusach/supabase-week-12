import { ImageResponse } from "next/og";

export const alt = "ChileBecas - Encuentra becas en Chile fácilmente";
export const contentType = "image/png";
export const size = { height: 630, width: 1200 };

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background:
            "linear-gradient(135deg, #1e40af 0%, #3b82f6 50%, #60a5fa 100%)",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "center",
          padding: "60px",
          width: "100%",
        }}
      >
        {/* Graduation cap icon */}
        <svg
          fill={"none"}
          height={"120"}
          stroke={"white"}
          strokeLinecap={"round"}
          strokeLinejoin={"round"}
          strokeWidth={"1.5"}
          viewBox={"0 0 24 24"}
          width={"120"}
        >
          <path d={"M22 10v6M2 10l10-5 10 5-10 5z"} />
          <path d="M6 12v5c3 3 9 3 12 0v-5" />
        </svg>

        <h1
          style={{
            fontSize: "80px",
            fontWeight: "bold",
            color: "white",
            marginTop: "30px",
            marginBottom: "20px",
          }}
        >
          ChileBecas
        </h1>

        <p
          style={{
            fontSize: "32px",
            color: "rgba(255, 255, 255, 0.9)",
            textAlign: "center",
            maxWidth: "800px",
          }}
        >
          Encuentra becas fácilmente en un solo lugar
        </p>
      </div>
    ),
    { ...size },
  );
}
