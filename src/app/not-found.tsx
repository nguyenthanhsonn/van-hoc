import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Compass, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 p-4 text-center dark:bg-slate-950">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 text-blue-600 shadow-inner dark:bg-blue-900/40 dark:text-blue-400">
        <Compass className="h-8 w-8" />
      </div>
      <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
        404 - Không Tìm Thấy Trang
      </h1>
      <p className="mt-3 max-w-md text-sm text-slate-500">
        Trang hoặc tuyến đường (route) bạn đang tìm kiếm không tồn tại hoặc đã được chuyển sang bố cục khác.
      </p>
      <div className="mt-6 flex items-center gap-3">
        <Link href="/">
          <Button className="gap-2">
            <Home className="h-4 w-4" />
            <span>Trang chủ</span>
          </Button>
        </Link>
        <Link href="/dashboard">
          <Button variant="outline">
            Vào Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
}
