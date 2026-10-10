"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { DASHBOARD_SECTIONS } from "@/data/navigation";
import { LayoutDashboard, BarChart3, Settings, Lock, Compass, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

const ICON_MAP: Record<string, React.ElementType> = {
  LayoutDashboard,
  BarChart3,
  Settings,
  Lock,
};

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 h-screen w-64 flex-col border-r border-slate-200/80 bg-white/95 dark:border-slate-800/80 dark:bg-slate-900/95 flex">
      {/* Brand Logo */}
      <div className="flex h-16 items-center gap-2.5 px-6 border-b border-slate-200/80 dark:border-slate-800/80">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md shadow-blue-500/20">
          <Compass className="h-5 w-5" />
        </div>
        <div>
          <span className="text-base font-bold text-slate-900 dark:text-white">VanHoc</span>
          <span className="text-xs text-blue-600 font-semibold block -mt-1">UI Workspace</span>
        </div>
      </div>

      {/* Navigation Sections */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
        {DASHBOARD_SECTIONS.map((section, idx) => (
          <div key={idx} className="space-y-1">
            {section.title && (
              <p className="px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                {section.title}
              </p>
            )}
            <div className="mt-2 space-y-1">
              {section.items.map((item) => {
                const isActive = pathname === item.href;
                const IconComponent = item.icon ? ICON_MAP[item.icon] : null;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "group flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-150",
                      isActive
                        ? "bg-blue-50 text-blue-700 shadow-xs dark:bg-blue-950/60 dark:text-blue-300"
                        : "text-slate-600 hover:bg-slate-100/80 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/60 dark:hover:text-slate-200"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      {IconComponent && (
                        <IconComponent
                          className={cn(
                            "h-4 w-4 transition-colors",
                            isActive
                              ? "text-blue-600 dark:text-blue-400"
                              : "text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300"
                          )}
                        />
                      )}
                      <span>{item.title}</span>
                    </div>

                    {item.badge ? (
                      <Badge variant="success">{item.badge}</Badge>
                    ) : (
                      isActive && <ChevronRight className="h-3.5 w-3.5 text-blue-500" />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Footer / System Status */}
      <div className="p-4 border-t border-slate-200/80 dark:border-slate-800/80">
        <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800/50">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-700 dark:text-slate-300">Layout System</span>
            <span className="h-2 w-2 rounded-full bg-emerald-500 ring-4 ring-emerald-500/20" />
          </div>
          <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">Next.js App Router v16</p>
        </div>
      </div>
    </aside>
  );
}
