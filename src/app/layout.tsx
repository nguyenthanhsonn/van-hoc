import type { Metadata, Viewport } from "next";
import "maplibre-gl/dist/maplibre-gl.css";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: "Bản Đồ Việt Nam 2D Tương Tác | MapLibre GL JS",
  description:
    "Bản đồ Việt Nam 2D tương tác chuẩn 34 đơn vị hành chính sau sáp nhập, bao gồm đầy đủ Quần đảo Hoàng Sa và Trường Sa cùng các mốc địa danh văn học & lịch sử.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
