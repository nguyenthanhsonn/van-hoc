import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  return (
    <Card className="shadow-xl shadow-slate-200/50 dark:shadow-none">
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Đăng Nhập</CardTitle>
        <CardDescription>Nhập thông tin để truy cập vào hệ thống giao diện</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Email</label>
          <input
            type="email"
            placeholder="admin@example.com"
            defaultValue="admin@example.com"
            className="h-10 w-full rounded-xl border border-slate-200 px-3.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-800 dark:bg-slate-950"
          />
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Mật khẩu</label>
            <span className="text-xs text-blue-600 hover:underline cursor-pointer">Quên mật khẩu?</span>
          </div>
          <input
            type="password"
            defaultValue="••••••••"
            className="h-10 w-full rounded-xl border border-slate-200 px-3.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-800 dark:bg-slate-950"
          />
        </div>

        <Link href="/dashboard" className="block pt-2">
          <Button className="w-full">
            Đăng Nhập Ngay
          </Button>
        </Link>

        <p className="text-center text-xs text-slate-500 mt-4">
          Chưa có tài khoản?{" "}
          <Link href="/register" className="font-semibold text-blue-600 hover:underline">
            Đăng ký
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
