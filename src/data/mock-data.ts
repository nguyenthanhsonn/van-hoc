import { MetricCard, ActivityItem } from "@/types/navigation";

export const DASHBOARD_METRICS: MetricCard[] = [
  {
    id: "m-1",
    title: "Tổng lượt truy cập",
    value: "148,920",
    change: "+12.5%",
    isPositive: true,
    iconName: "TrendingUp",
  },
  {
    id: "m-2",
    title: "Người dùng hoạt động",
    value: "24,850",
    change: "+8.2%",
    isPositive: true,
    iconName: "Users",
  },
  {
    id: "m-3",
    title: "Tỷ lệ tương tác UI",
    value: "68.4%",
    change: "+4.1%",
    isPositive: true,
    iconName: "Activity",
  },
  {
    id: "m-4",
    title: "Thời gian phản hồi",
    value: "124ms",
    change: "-18ms",
    isPositive: true,
    iconName: "Zap",
  },
];

export const RECENT_ACTIVITIES: ActivityItem[] = [
  {
    id: "a-1",
    user: "Minh Trang",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80",
    action: "đã cập nhật bố cục",
    target: "Dashboard Header",
    time: "5 phút trước",
  },
  {
    id: "a-2",
    user: "Hoàng Long",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
    action: "đã thêm component",
    target: "Sidebar Navigation",
    time: "24 phút trước",
  },
  {
    id: "a-3",
    user: "Thanh Tùng",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80",
    action: "tối ưu hoá màu sắc",
    target: "Dark Mode Palettes",
    time: "1 giờ trước",
  },
];
