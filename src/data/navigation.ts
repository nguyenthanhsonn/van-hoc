import { NavItem, SidebarSection } from "@/types/navigation";

export const MARKETING_NAV_ITEMS: NavItem[] = [
  { title: "Trang chủ", href: "/" },
  { title: "Giới thiệu", href: "/about" },
  { title: "Bảng điều khiển", href: "/dashboard" },
];

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
