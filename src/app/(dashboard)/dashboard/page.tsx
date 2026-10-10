import { DASHBOARD_METRICS, RECENT_ACTIVITIES } from "@/data/mock-data";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, Users, Activity, Zap, Plus, ArrowUpRight } from "lucide-react";

const ICON_MAP: Record<string, React.ElementType> = {
  TrendingUp,
  Users,
  Activity,
  Zap,
};

export default function DashboardOverviewPage() {
  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Page Title & Action Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Bảng Điều Khiển
          </h1>
          <p className="text-sm text-slate-500">
            Xem nhanh hiệu suất bố cục và dữ liệu mô phỏng theo thời gian thực.
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <Button variant="outline" size="sm">
            Xuất dữ liệu
          </Button>
          <Button size="sm" className="gap-1.5">
            <Plus className="h-4 w-4" />
            <span>Thêm Widget</span>
          </Button>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {DASHBOARD_METRICS.map((metric) => {
          const IconComponent = ICON_MAP[metric.iconName] || TrendingUp;
          return (
            <Card key={metric.id} className="relative overflow-hidden">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  {metric.title}
                </span>
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400">
                  <IconComponent className="h-4 w-4" />
                </div>
              </div>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-2xl font-bold text-slate-900 dark:text-white">
                  {metric.value}
                </span>
                <Badge variant="success" className="text-[11px]">
                  {metric.change}
                </Badge>
              </div>
              <p className="mt-2 text-[11px] text-slate-400">So với tháng trước</p>
            </Card>
          );
        })}
      </div>

      {/* Main Grid: Content area & Recent Activity */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Layout Information Section */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Khung Bố Cục Nội Dung Chính</CardTitle>
                <CardDescription className="mt-1">
                  Khu vực linh hoạt để đặt biểu đồ, bảng biểu hoặc bản đồ.
                </CardDescription>
              </div>
              <Badge variant="outline">Dynamic Slot</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-64 rounded-xl border-2 border-dashed border-slate-200 bg-slate-50/50 p-6 flex flex-col items-center justify-center text-center dark:border-slate-800 dark:bg-slate-900/50">
              <div className="h-12 w-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center mb-3 dark:bg-blue-900/40 dark:text-blue-400">
                <ArrowUpRight className="h-6 w-6" />
              </div>
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Khu vực hiển thị nội dung biểu đồ hoặc bản đồ SVG
              </p>
              <p className="text-xs text-slate-400 max-w-sm mt-1">
                Tất cả các thành phần được bố trí sẵn để bạn cắm thẳng code component vào mà không cần viết lại khung layout.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activities List */}
        <Card>
          <CardHeader>
            <CardTitle>Hoạt Động Mẫu</CardTitle>
            <CardDescription>Nhật ký tương tác giao diện</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {RECENT_ACTIVITIES.map((act) => (
              <div key={act.id} className="flex items-start gap-3 pb-3 border-b border-slate-100 last:border-0 last:pb-0 dark:border-slate-800">
                <img
                  src={act.avatar}
                  alt={act.user}
                  className="h-8 w-8 rounded-full object-cover ring-2 ring-slate-100 dark:ring-slate-800"
                />
                <div className="flex-1 text-xs">
                  <p className="text-slate-900 font-medium dark:text-slate-100">
                    <span className="font-semibold">{act.user}</span> {act.action}{" "}
                    <span className="text-blue-600 font-medium">{act.target}</span>
                  </p>
                  <p className="text-[10px] text-slate-400 mt-1">{act.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
