import Link from "next/link";
import { Compass } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50/70 p-4 dark:bg-slate-950">
      {/* Brand Header */}
      <Link href="/" className="mb-8 flex items-center gap-2.5 font-bold text-slate-900 dark:text-white">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md shadow-blue-500/20">
          <Compass className="h-5 w-5" />
        </div>
        <span className="text-xl tracking-tight">VanHoc<span className="text-blue-600">UI</span></span>
      </Link>

      {/* Auth Card Content */}
      <div className="w-full max-w-md">{children}</div>

      {/* Back to Home Link */}
      <p className="mt-8 text-center text-xs text-slate-400">
        <Link href="/" className="hover:text-blue-600 underline underline-offset-4">
          ← Quay lại Trang chủ
        </Link>
      </p>
    </div>
  );
}
