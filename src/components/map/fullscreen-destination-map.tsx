"use client";

import React from "react";
import { InteractiveDestinationMap } from "./interactive-destination-map";

/**
 * Fullscreen wrapper for the interactive map.
 * Render full màn hình sạch sẽ, không có thanh header tiêu đề đè lên bản đồ.
 */
export function FullscreenDestinationMap() {
  const [debug] = React.useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return new URLSearchParams(window.location.search).get("debug") === "1";
  });

  return (
    <main
      style={{
        width: "100vw",
        minHeight: "100vh",
        background: "#050810",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <InteractiveDestinationMap debug={debug} />
    </main>
  );
}
