"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { MAP_SPOTS, MapSpot } from "@/data/map-destinations";
import {
  MapPin,
  Sparkles,
  Heart,
  Eye,
  CheckCircle2,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Compass,
  X,
  Navigation,
  Sliders,
  Expand,
  Minimize,
  SlidersHorizontal,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function FullscreenDestinationMap() {
  const [selectedSpot, setSelectedSpot] = useState<MapSpot | null>(MAP_SPOTS[0]);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [showMarkers, setShowMarkers] = useState<boolean>(true);
  const [imageFit, setImageFit] = useState<"cover" | "contain">("cover");
  const [imageSource, setImageSource] = useState<"hd" | "ai">("hd");
  const [votedSpots, setVotedSpots] = useState<Record<string, number>>({});
  const [panPosition, setPanPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const dragStartRef = useRef<{ startX: number; startY: number; initPanX: number; initPanY: number }>({
    startX: 0,
    startY: 0,
    initPanX: 0,
    initPanY: 0,
  });

  const currentImage =
    imageSource === "hd"
      ? "/images/coastal-map-hd.jpg"
      : "/images/coastal-map-ai-hd.jpg";

  const filteredSpots =
    activeCategory === "all"
      ? MAP_SPOTS
      : MAP_SPOTS.filter((s) => s.category === activeCategory);

  const handleVote = (spotId: string) => {
    setVotedSpots((prev) => ({
      ...prev,
      [spotId]: (prev[spotId] || 0) + 1,
    }));
  };

  const handleZoom = (delta: number) => {
    setZoomLevel((prev) => {
      const next = Math.min(Math.max(prev + delta, 1), 3);
      if (next === 1) {
        setPanPosition({ x: 0, y: 0 });
      }
      return parseFloat(next.toFixed(2));
    });
  };

  const resetView = () => {
    setZoomLevel(1);
    setPanPosition({ x: 0, y: 0 });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoomLevel <= 1) return;
    setIsDragging(true);
    dragStartRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      initPanX: panPosition.x,
      initPanY: panPosition.y,
    };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStartRef.current.startX;
    const dy = e.clientY - dragStartRef.current.startY;
    setPanPosition({
      x: dragStartRef.current.initPanX + dx,
      y: dragStartRef.current.initPanY + dy,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const categories = [
    { id: "all", label: "Tất cả điểm đến", count: MAP_SPOTS.length },
    { id: "culture", label: "Di tích văn hoá", count: 2 },
    { id: "beach", label: "Bãi biển", count: 1 },
    { id: "marina", label: "Bến du thuyền", count: 1 },
    { id: "nature", label: "Cảnh quan thiên nhiên", count: 1 },
  ];

  return (
    <div
      className="relative h-screen w-screen overflow-hidden bg-slate-950 select-none"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      style={{ cursor: zoomLevel > 1 ? (isDragging ? "grabbing" : "grab") : "default" }}
    >
      {/* 1. TOP FLOATING CONTROL BAR */}
      <div className="absolute left-0 right-0 top-0 z-30 flex items-center justify-between p-4 sm:p-6 pointer-events-none">
        {/* Brand & Categories Filter */}
        <div className="pointer-events-auto flex flex-wrap items-center gap-2 sm:gap-3">
          {/* Brand Badge */}
          <div className="flex items-center gap-2.5 rounded-2xl bg-slate-950/85 px-4 py-2 text-white shadow-xl backdrop-blur-xl border border-white/15">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md shadow-blue-500/25">
              <Compass className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xs font-bold tracking-tight">BẢN ĐỒ TOÀN CẢNH</p>
              <p className="text-[10px] text-blue-400 font-medium">Độ Phân Giải Cao 3K HD</p>
            </div>
          </div>

          {/* Categories Filter */}
          <div className="hidden md:flex items-center gap-1.5 rounded-2xl bg-slate-950/85 p-1.5 shadow-xl backdrop-blur-xl border border-white/15">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  "flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold transition-all duration-200 cursor-pointer",
                  activeCategory === cat.id
                    ? "bg-blue-600 text-white shadow-md shadow-blue-500/30"
                    : "text-slate-300 hover:bg-white/10 hover:text-white"
                )}
              >
                <span>{cat.label}</span>
                <span
                  className={cn(
                    "rounded-full px-1.5 py-0.2 text-[10px]",
                    activeCategory === cat.id
                      ? "bg-white/20 text-white"
                      : "bg-white/10 text-slate-400"
                  )}
                >
                  {cat.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* View Controls & Display Quality Switches */}
        <div className="pointer-events-auto flex items-center gap-1.5 rounded-2xl bg-slate-950/85 p-1.5 shadow-xl backdrop-blur-xl border border-white/15 text-white">
          {/* Chế độ vừa khung vs tràn màn hình */}
          <button
            onClick={() => setImageFit((fit) => (fit === "cover" ? "contain" : "cover"))}
            title={imageFit === "cover" ? "Chuyển sang Vừa khung hình (Contain)" : "Chuyển sang Tràn màn hình (Cover)"}
            className="flex h-8 px-2.5 items-center gap-1 text-xs font-medium rounded-xl hover:bg-white/15 text-slate-200 hover:text-white transition cursor-pointer"
          >
            {imageFit === "cover" ? <Minimize className="h-3.5 w-3.5" /> : <Expand className="h-3.5 w-3.5" />}
            <span className="hidden sm:inline">{imageFit === "cover" ? "Tràn viền" : "Vừa khung"}</span>
          </button>

          {/* Chuyển đổi bản HD gốc vs Bản AI */}
          <button
            onClick={() => setImageSource((s) => (s === "hd" ? "ai" : "hd"))}
            title="Đổi nguồn ảnh hiển thị"
            className="flex h-8 px-2.5 items-center gap-1 text-xs font-medium rounded-xl hover:bg-white/15 text-slate-200 hover:text-white transition cursor-pointer"
          >
            <Sparkles className="h-3.5 w-3.5 text-amber-400" />
            <span className="hidden sm:inline">{imageSource === "hd" ? "Bản Gốc 3K" : "Bản AI Siêu Nét"}</span>
          </button>

          <div className="h-4 w-[1px] bg-white/20" />

          {/* Zoom In / Zoom Out */}
          <button
            onClick={() => handleZoom(0.3)}
            title="Phóng to (+)"
            className="flex h-8 w-8 items-center justify-center rounded-xl hover:bg-white/15 text-slate-200 hover:text-white transition cursor-pointer"
          >
            <ZoomIn className="h-4 w-4" />
          </button>
          <button
            onClick={() => handleZoom(-0.3)}
            title="Thu nhỏ (-)"
            className="flex h-8 w-8 items-center justify-center rounded-xl hover:bg-white/15 text-slate-200 hover:text-white transition cursor-pointer"
          >
            <ZoomOut className="h-4 w-4" />
          </button>

          {zoomLevel > 1 && (
            <button
              onClick={resetView}
              title="Đặt lại khung nhìn"
              className="flex h-8 px-2 items-center gap-1 text-[11px] font-medium rounded-xl hover:bg-white/15 text-slate-200 hover:text-white transition cursor-pointer"
            >
              <RotateCcw className="h-3 w-3" />
              <span>Reset</span>
            </button>
          )}

          <div className="h-4 w-[1px] bg-white/20" />

          {/* Toggle Markers */}
          <button
            onClick={() => setShowMarkers(!showMarkers)}
            title="Ẩn / Hiện Marker"
            className={cn(
              "flex h-8 px-2.5 items-center gap-1.5 text-xs font-medium rounded-xl transition cursor-pointer",
              showMarkers ? "bg-white/15 text-white" : "text-slate-400 hover:bg-white/10"
            )}
          >
            <Eye className="h-3.5 w-3.5" />
            <span className="hidden md:inline">{showMarkers ? "Hiện ghim" : "Ẩn ghim"}</span>
          </button>
        </div>
      </div>

      {/* 2. FULLSCREEN MAP IMAGE CANVAS */}
      <div className="relative h-full w-full flex items-center justify-center overflow-hidden">
        <div
          className={cn(
            "relative transition-transform duration-200 ease-out origin-center",
            imageFit === "cover" ? "h-full w-full" : "h-full w-full max-h-full max-w-full aspect-[16/9]"
          )}
          style={{
            transform: `translate(${panPosition.x}px, ${panPosition.y}px) scale(${zoomLevel})`,
          }}
        >
          {/* Raw Uncompressed High-Resolution Image */}
          <Image
            src={currentImage}
            alt="Bản đồ toàn cảnh khu di sản và vịnh biển độ nét cao"
            fill
            priority
            unoptimized
            className={cn(
              "pointer-events-none transition-all duration-300",
              imageFit === "cover" ? "object-cover object-center" : "object-contain object-center"
            )}
            style={{
              imageRendering: "crisp-edges",
            }}
          />

          {/* Interactive Spot Pins / Markers */}
          {showMarkers &&
            filteredSpots.map((spot) => {
              const isSelected = selectedSpot?.id === spot.id;

              return (
                <div
                  key={spot.id}
                  style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-10 cursor-pointer group pointer-events-auto"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedSpot(spot);
                  }}
                >
                  {/* Outer Pulsing Rings */}
                  <span className="absolute -inset-3 rounded-full bg-blue-500/40 animate-ping pointer-events-none" />
                  <span className="absolute -inset-1.5 rounded-full bg-amber-400/50 animate-pulse pointer-events-none" />

                  {/* Marker Pin */}
                  <div
                    className={cn(
                      "relative flex items-center gap-2 rounded-full px-3 py-1.5 shadow-2xl transition-all duration-300 backdrop-blur-md border",
                      isSelected
                        ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white scale-110 border-amber-300 ring-4 ring-amber-400/35"
                        : "bg-slate-950/85 text-white hover:bg-blue-600 hover:scale-105 border-white/25"
                    )}
                  >
                    <div
                      className={cn(
                        "flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold",
                        isSelected ? "bg-white text-amber-600" : "bg-blue-500 text-white"
                      )}
                    >
                      <MapPin className="h-3 w-3 fill-current" />
                    </div>
                    <span className="text-xs font-semibold whitespace-nowrap pr-1 tracking-tight">
                      {spot.name}
                    </span>
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {/* 3. BOTTOM QUICK SELECTION CHIPS */}
      <div className="absolute bottom-4 left-4 right-4 sm:left-6 sm:right-auto z-20 flex flex-wrap items-center gap-2 pointer-events-auto max-w-xl">
        {MAP_SPOTS.map((spot) => {
          const isSelected = selectedSpot?.id === spot.id;
          return (
            <button
              key={spot.id}
              onClick={() => setSelectedSpot(spot)}
              className={cn(
                "flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-medium backdrop-blur-xl border transition-all cursor-pointer shadow-lg",
                isSelected
                  ? "bg-blue-600 text-white border-blue-400 shadow-blue-500/30 scale-105"
                  : "bg-slate-950/85 text-slate-300 border-white/15 hover:bg-slate-900 hover:text-white"
              )}
            >
              <MapPin className="h-3 w-3 text-amber-400" />
              <span>{spot.name}</span>
            </button>
          );
        })}
      </div>

      {/* 4. FLOATING SPOT DETAIL CARD */}
      {selectedSpot && (
        <div className="absolute bottom-20 right-4 sm:bottom-6 sm:right-6 w-[calc(100vw-2rem)] sm:w-96 z-30 pointer-events-auto animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="relative rounded-3xl border border-white/20 bg-slate-950/90 p-5 sm:p-6 text-white shadow-2xl backdrop-blur-2xl">
            {/* Close Button */}
            <button
              onClick={() => setSelectedSpot(null)}
              className="absolute right-4 top-4 text-slate-400 hover:text-white transition cursor-pointer p-1 rounded-lg hover:bg-white/10"
              title="Đóng chi tiết"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Category & Rating */}
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-blue-500/20 px-2.5 py-0.5 text-[11px] font-semibold text-blue-300 border border-blue-500/30">
                <Compass className="h-3 w-3" />
                {selectedSpot.categoryLabel}
              </span>
              <span className="text-xs text-amber-400 font-semibold flex items-center gap-1">
                ★ {selectedSpot.rating}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-lg font-bold text-white tracking-tight">
              {selectedSpot.name}
            </h3>

            {/* Description */}
            <p className="mt-2 text-xs text-slate-300 leading-relaxed">
              {selectedSpot.description}
            </p>

            {/* Features Tags */}
            <div className="mt-3.5 flex flex-wrap gap-1.5">
              {selectedSpot.features.map((feat, i) => (
                <span
                  key={i}
                  className="flex items-center gap-1 rounded-lg bg-white/10 px-2 py-0.5 text-[11px] text-slate-200"
                >
                  <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                  {feat}
                </span>
              ))}
            </div>

            {/* Footer with Votes & Action Button */}
            <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3">
              <div className="text-xs text-slate-400">
                <span>Lượt bình chọn: </span>
                <span className="font-bold text-white">
                  {(
                    parseInt(selectedSpot.votes.replace(".", "")) +
                    (votedSpots[selectedSpot.id] || 0)
                  ).toLocaleString("vi-VN")}
                </span>
              </div>

              <button
                onClick={() => handleVote(selectedSpot.id)}
                className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-rose-500 to-pink-600 px-3.5 py-1.5 text-xs font-semibold text-white shadow-lg shadow-rose-500/25 hover:from-rose-600 hover:to-pink-700 transition active:scale-95 cursor-pointer"
              >
                <Heart className="h-3.5 w-3.5 fill-current" />
                <span>Bình chọn {votedSpots[selectedSpot.id] ? `(+${votedSpots[selectedSpot.id]})` : ""}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
