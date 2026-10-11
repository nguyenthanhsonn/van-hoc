import { SidebarSection } from "@/types/navigation";

export const DASHBOARD_SECTIONS: SidebarSection[] = [
  {
    title: "Tổng quan",
    items: [
      { title: "Dashboard", href: "/dashboard", icon: "LayoutDashboard" },
      { title: "Phân tích & Thống kê", href: "/analytics", icon: "BarChart3", badge: "Live" },
    ],
  },
  {
    title: "Hệ thống",
    items: [
      { title: "Cài đặt & Giao diện", href: "/settings", icon: "Settings" },
      { title: "Xác thực / Đăng nhập", href: "/login", icon: "Lock" },
    ],
  },
];
