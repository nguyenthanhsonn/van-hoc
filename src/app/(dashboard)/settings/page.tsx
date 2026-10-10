import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function SettingsPage() {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Cài Đặt Hệ Thống & Giao Diện
        </h1>
        <p className="text-sm text-slate-500">
          Mẫu bố cục biểu mẫu và các tùy chọn giao diện người dùng.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Thông Tin Tổ Chức</CardTitle>
          <CardDescription>Cấu hình tên hiển thị và định danh dự án</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Tên dự án</label>
            <input
              type="text"
              defaultValue="Hệ Thống Bình Chọn Văn Học"
              className="h-10 w-full rounded-xl border border-slate-200 px-3.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-800 dark:bg-slate-950"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Mô tả ngắn</label>
            <textarea
              rows={3}
              defaultValue="Dự án giao diện mô phỏng layout hiện đại bằng Next.js App Router."
              className="w-full rounded-xl border border-slate-200 p-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-800 dark:bg-slate-950"
            />
          </div>

          <div className="pt-2 flex justify-end gap-2.5">
            <Button variant="outline">Hủy bỏ</Button>
            <Button>Lưu thay đổi</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
