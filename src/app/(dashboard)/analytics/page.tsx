import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function AnalyticsPage() {
  const metrics = [
    { label: "Bình chọn trực tuyến", value: "85%", color: "bg-blue-600" },
    { label: "Tương tác bản đồ", value: "62%", color: "bg-indigo-600" },
    { label: "Đánh giá địa điểm", value: "94%", color: "bg-emerald-600" },
    { label: "Tỷ lệ thoát trang", value: "18%", color: "bg-amber-600" },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Phân Tích & Báo Cáo
        </h1>
        <p className="text-sm text-slate-500">
          Mẫu bố cục trang phân tích số liệu trực quan dạng progress bars và cards.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Tiến Độ Hoàn Thành & Tương Tác</CardTitle>
              <Badge variant="success">Hoạt động tốt</Badge>
            </div>
            <CardDescription>Mô phỏng thanh tiến độ trực quan</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            {metrics.map((item, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-slate-700 dark:text-slate-300">{item.label}</span>
                  <span className="text-slate-900 dark:text-white font-semibold">{item.value}</span>
                </div>
                <div className="h-2.5 w-full rounded-full bg-slate-100 overflow-hidden dark:bg-slate-800">
                  <div
                    className={`h-full rounded-full ${item.color} transition-all duration-500`}
                    style={{ width: item.value }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Cơ Cấu Bố Cục Báo Cáo</CardTitle>
            <CardDescription>Phân vùng khối thông tin độc lập</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 dark:bg-slate-900/60 dark:border-slate-800">
                <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">Khu vực 1: Tổng hợp nhanh</p>
                <p className="text-xs text-slate-500 mt-1">Sử dụng Flexbox hoặc CSS Grid để căn chỉnh 3 - 4 cột.</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 dark:bg-slate-900/60 dark:border-slate-800">
                <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">Khu vực 2: Biểu đồ trọng tâm</p>
                <p className="text-xs text-slate-500 mt-1">Dành diện tích lớn nhất (col-span-2) để hiển thị chi tiết.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
