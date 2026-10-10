import { ComponentType } from "react";

export interface NavItem {
  title: string;
  href: string;
  icon?: string;
  badge?: string;
  description?: string;
}

export interface SidebarSection {
  title?: string;
  items: NavItem[];
}

export interface MetricCard {
  id: string;
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  iconName: string;
}

export interface ActivityItem {
  id: string;
  user: string;
  avatar: string;
  action: string;
  target: string;
  time: string;
}
