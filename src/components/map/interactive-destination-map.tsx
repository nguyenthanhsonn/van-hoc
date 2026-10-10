"use client";

import React, { useState } from "react";
import Image from "next/image";
import { MAP_SPOTS, MapSpot } from "@/data/map-destinations";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  Sparkles,
  Heart,
  Navigation,
  Eye,
  CheckCircle2,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Layers,
  X,
  Compass,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function InteractiveDestinationMap() {
  const [selectedSpot, setSelectedSpot] = useState<MapSpot | null>(MAP_SPOTS[0]);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [showMarkers, setShowMarkers] = useState<boolean>(true);
  const [votedSpots, setVotedSpots] = useState<Record<string, number>>({});

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

  const categories = [
    { id: "all", label: "Tất cả điểm đến", count: MAP_SPOTS.length },
    { id: "culture", label: "Di tích văn hoá", count: 2 },
    { id: "beach", label: "Bãi biển", count: 1 },
    { id: "marina", label: "Bến tàu & Vịnh", count: 1 },
    { id: "nature", label: "Cảnh quan núi", count: 1 },
  ];

  return (
    <div className="relative w-full overflow-hidden rounded-3xl border border-slate-200/80 bg-slate-950 shadow-2xl dark:border-slate-800">
      {/* Top Floating Control Bar */}
      <div className="absolute left-4 right-4 top-4 z-20 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
        {/* Category Pills (Pointer events auto) */}
        <div className="pointer-events-auto flex flex-wrap items-center gap-1.5 rounded-2xl bg-slate-900/80 p-1.5 shadow-lg backdrop-blur-md border border-white/10">
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

        {/* View / Zoom Controls */}
        <div className="pointer-events-auto hidden sm:flex items-center gap-1.5 rounded-2xl bg-slate-900/80 p-1.5 shadow-lg backdrop-blur-md border border-white/10 text-white">
          <button
            onClick={() => setZoomLevel((z) => Math.min(z + 0.2, 1.6))}
            title="Phóng to"
            className="flex h-8 w-8 items-center justify-center rounded-xl hover:bg-white/10 text-slate-200 hover:text-white transition cursor-pointer"
          >
            <ZoomIn className="h-4 w-4" />
          </button>
          <button
            onClick={() => setZoomLevel((z) => Math.max(z - 0.2, 1))}
            title="Thu nhỏ"
            className="flex h-8 w-8 items-center justify-center rounded-xl hover:bg-white/10 text-slate-200 hover:text-white transition cursor-pointer"
          >
            <ZoomOut className="h-4 w-4" />
          </button>
          <div className="h-4 w-[1px] bg-white/20" />
          <button
            onClick={() => setShowMarkers(!showMarkers)}
            title="Bật/Tắt điểm đánh dấu"
            className={cn(
              "flex h-8 px-2.5 items-center gap-1.5 text-xs font-medium rounded-xl transition cursor-pointer",
              showMarkers ? "bg-white/15 text-white" : "text-slate-400 hover:bg-white/10"
            )}
          >
            <Eye className="h-3.5 w-3.5" />
            <span>{showMarkers ? "Hiện Marker" : "Ẩn Marker"}</span>
          </button>
        </div>
      </div>

      {/* Main Map Canvas Area */}
      <div className="relative aspect-[16/9] min-h-[500px] sm:min-h-[600px] w-full overflow-hidden select-none bg-slate-900">
        <div
          className="relative h-full w-full transition-transform duration-500 ease-out origin-center"
          style={{ transform: `scale(${zoomLevel})` }}
        >
          {/* Base Map Image */}
          <Image
            src="/images/coastal-map.jpg"
            alt="Bản đồ tổng thể khu du lịch văn hóa ven biển"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center pointer-events-none"
          />

          {/* Interactive Spot Pins / Markers */}
          {showMarkers &&
            filteredSpots.map((spot) => {
              const isSelected = selectedSpot?.id === spot.id;

              return (
                <div
                  key={spot.id}
                  style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-10 cursor-pointer group"
                  onClick={() => setSelectedSpot(spot)}
                >
                  {/* Outer Pulsing Radar Ring */}
                  <span className="absolute -inset-2.5 rounded-full bg-blue-500/40 animate-ping pointer-events-none" />
                  <span className="absolute -inset-1 rounded-full bg-amber-400/50 animate-pulse pointer-events-none" />

                  {/* Marker Pin Icon */}
                  <div
                    className={cn(
                      "relative flex items-center gap-2 rounded-full px-2.5 py-1.5 shadow-xl transition-all duration-300 backdrop-blur-md border",
                      isSelected
                        ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white scale-110 border-amber-300 ring-4 ring-amber-400/30"
                        : "bg-slate-950/85 text-white hover:bg-blue-600 hover:scale-105 border-white/20"
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

        {/* Selected Spot Detail Floating Card (Bottom-Left or Centered-Bottom on Mobile) */}
        {selectedSpot && (
          <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-md z-30 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="relative rounded-2xl border border-white/15 bg-slate-950/90 p-5 text-white shadow-2xl backdrop-blur-xl">
              {/* Close Button */}
              <button
                onClick={() => setSelectedSpot(null)}
                className="absolute right-3.5 top-3.5 text-slate-400 hover:text-white transition cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>

              {/* Tag & Category */}
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-flex items-center gap-1 rounded-full bg-blue-500/20 px-2.5 py-0.5 text-[11px] font-semibold text-blue-300 border border-blue-500/30">
                  <Compass className="h-3 w-3" />
                  {selectedSpot.categoryLabel}
                </span>
                <span className="text-[11px] text-amber-400 font-semibold flex items-center gap-1">
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

              {/* Key Features Chips */}
              <div className="mt-3 flex flex-wrap gap-1.5">
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

              {/* Actions Footer */}
              <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3">
                <div className="text-xs text-slate-400">
                  <span>Lượt bình chọn: </span>
                  <span className="font-bold text-white">
                    {parseInt(selectedSpot.votes.replace(".", "")) +
                      (votedSpots[selectedSpot.id] || 0)}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleVote(selectedSpot.id)}
                    className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-rose-500 to-pink-600 px-3 py-1.5 text-xs font-semibold text-white shadow-md shadow-rose-500/20 hover:from-rose-600 hover:to-pink-700 transition active:scale-95 cursor-pointer"
                  >
                    <Heart className="h-3.5 w-3.5 fill-current" />
                    <span>Bình chọn (+{votedSpots[selectedSpot.id] || 0})</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Compass Badge in Top-Right Corner */}
        <div className="absolute bottom-4 right-4 z-20 pointer-events-none hidden md:flex items-center gap-2 rounded-xl bg-slate-900/70 px-3 py-2 text-xs text-slate-300 backdrop-blur-md border border-white/10">
          <Navigation className="h-4 w-4 text-blue-400 rotate-45" />
          <span>Hướng Đông Nam • Tầm nhìn toàn cảnh 360°</span>
        </div>
      </div>
    </div>
  );
}
