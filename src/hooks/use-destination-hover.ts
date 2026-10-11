"use client";

import { useCallback, useState } from "react";

export function useDestinationHover() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [activeId, setActiveId]   = useState<string | null>(null);

  const setHovered = useCallback((id: string | null) => {
    setHoveredId(id);
  }, []);

  const setActive = useCallback((id: string | null) => {
    setActiveId((prev) => (prev === id ? null : id));
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, id: string) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        setActive(id);
      } else if (e.key === "Escape") {
        setActive(null);
      }
    },
    [setActive]
  );

  const handleTouchStart = useCallback(
    (id: string) => {
      setActive(id);
    },
    [setActive]
  );

  return {
    hoveredId,
    activeId,
    setHovered,
    setActive,
    handleKeyDown,
    handleTouchStart,
  };
}
