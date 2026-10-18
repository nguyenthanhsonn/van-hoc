"use client";

import dynamic from "next/dynamic";

const VietnamMap = dynamic(
  () =>
    import("@/features/map/components/VietnamMap").then((mod) => mod.VietnamMap),
  {
    ssr: false,
    loading: () => (
      <div
        style={{
          width: "100vw",
          height: "100vh",
          backgroundColor: "#e8f4f8",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
          color: "#065f46",
          fontWeight: 600,
          fontSize: "0.95rem",
        }}
      >
        Đang tải bản đồ Việt Nam 2D...
      </div>
    ),
  }
);

export default function HomePage() {
  return (
    <main style={{ width: "100vw", height: "100vh", overflow: "hidden" }}>
      <VietnamMap />
    </main>
  );
}
