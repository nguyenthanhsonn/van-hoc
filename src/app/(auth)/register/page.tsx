import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function RegisterPage() {
  return (
    <Card className="shadow-xl shadow-slate-200/50 dark:shadow-none">
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Đăng Ký Tài Khoản</CardTitle>
        <CardDescription>Tạo tài khoản mới để trải nghiệm các layout</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Họ và tên</label>
          <input
            type="text"
            placeholder="Nguyễn Văn A"
            className="h-10 w-full rounded-xl border border-slate-200 px-3.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-800 dark:bg-slate-950"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Email</label>
          <input
            type="email"
            placeholder="you@example.com"
            className="h-10 w-full rounded-xl border border-slate-200 px-3.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-800 dark:bg-slate-950"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Mật khẩu</label>
          <input
            type="password"
            placeholder="••••••••"
            className="h-10 w-full rounded-xl border border-slate-200 px-3.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-800 dark:bg-slate-950"
          />
        </div>

        <Link href="/dashboard" className="block pt-2">
          <Button className="w-full">
            Đăng Ký
          </Button>
        </Link>

        <p className="text-center text-xs text-slate-500 mt-4">
          Đã có tài khoản?{" "}
          <Link href="/login" className="font-semibold text-blue-600 hover:underline">
            Đăng nhập
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
