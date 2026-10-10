import Link from "next/link";
import { Container } from "@/components/layouts/container";
import { Compass } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full border-t border-slate-200/80 bg-slate-50/50 py-12 dark:border-slate-800/80 dark:bg-slate-950/50">
      <Container className="grid grid-cols-1 gap-8 md:grid-cols-4">
        {/* Col 1 */}
        <div className="space-y-3 md:col-span-2">
          <div className="flex items-center gap-2.5 font-bold text-slate-900 dark:text-white">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm">
              <Compass className="h-4 w-4" />
            </div>
            <span className="text-base tracking-tight">VanHoc Layout System</span>
          </div>
          <p className="text-sm text-slate-500 max-w-sm">
            Cấu trúc thư mục Next.js App Router tinh gọn, chuyên biệt phục vụ thiết kế bố cục giao diện, mockup và prototype mà không phụ thuộc backend API.
          </p>
        </div>

        {/* Col 2 */}
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-slate-100">Khám phá</p>
          <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
            <li><Link href="/" className="hover:text-blue-600">Trang chủ</Link></li>
            <li><Link href="/about" className="hover:text-blue-600">Giới thiệu</Link></li>
            <li><Link href="/dashboard" className="hover:text-blue-600">Bảng điều khiển</Link></li>
          </ul>
        </div>

        {/* Col 3 */}
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-slate-100">Bố cục mẫu</p>
          <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
            <li><Link href="/dashboard" className="hover:text-blue-600">Dashboard Layout</Link></li>
            <li><Link href="/analytics" className="hover:text-blue-600">Analytics Layout</Link></li>
            <li><Link href="/login" className="hover:text-blue-600">Auth Layout</Link></li>
          </ul>
        </div>
      </Container>

      <Container className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400">
        <p>© 2026 VanHoc. Thiết kế giao diện bằng Next.js & Tailwind CSS.</p>
        <p>Phiên bản Layout Prototype</p>
      </Container>
    </footer>
  );
}
