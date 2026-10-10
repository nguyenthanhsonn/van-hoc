import { Container } from "@/components/layouts/container";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, FolderTree, Palette, Cpu } from "lucide-react";

export default function AboutPage() {
  const highlights = [
    {
      title: "Kiến trúc Route Group",
      description: "Tách bạch giao diện marketing và dashboard độc lập bằng cách dùng (marketing) và (dashboard).",
      icon: FolderTree,
    },
    {
      title: "Không phụ thuộc Backend API",
      description: "Dữ liệu được quản lý tập trung ở thư mục src/data/, giúp mockup và test UI cực nhanh.",
      icon: Cpu,
    },
    {
      title: "Design System linh hoạt",
      description: "Tái sử dụng các UI components tại src/components/ui/ với Tailwind CSS hiện đại.",
      icon: Palette,
    },
  ];

  return (
    <div className="py-16">
      <Container className="max-w-4xl space-y-12">
        <div className="space-y-4 text-center">
          <Badge variant="default">Giới thiệu</Badge>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            Về Cấu Trúc Bố Cục Này
          </h1>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Giải pháp bố cục thư mục dành cho nhà phát triển muốn tập trung 100% vào thiết kế trải nghiệm người dùng, giao diện quản trị và landing page mà không cần cài đặt API hay cơ sở dữ liệu.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {highlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Card key={idx}>
                <CardHeader>
                  <div className="h-10 w-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3 dark:bg-blue-950/60 dark:text-blue-400">
                    <Icon className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-base">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-500 leading-relaxed">{item.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </Container>
    </div>
  );
}
