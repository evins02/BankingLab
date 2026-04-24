"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  TrendingUp,
  Landmark,
  ShieldCheck,
  Settings,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_ITEMS } from "@/lib/constants";
import { Badge } from "@/components/ui/badge";
import { BankingLabLogo } from "@/components/shared/BankingLabLogo";

const ICONS: Record<string, LucideIcon> = {
  LayoutDashboard,
  TrendingUp,
  Landmark,
  ShieldCheck,
};

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-60 shrink-0 flex-col border-r border-border bg-surface">
      {/* Logo */}
      <div className="flex h-16 items-center border-b border-border px-5">
        <BankingLabLogo size="md" />
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <p className="mb-2 px-2 text-[11px] font-medium uppercase tracking-wider text-text-secondary">
          Module
        </p>
        <ul className="flex flex-col gap-1">
          {NAV_ITEMS.map((item) => {
            const Icon = ICONS[item.icon];
            const isActive =
              pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-pill px-3 py-2 text-sm transition-colors",
                    isActive
                      ? "bg-text-primary font-medium text-white"
                      : "text-text-secondary hover:bg-gray-100 hover:text-text-primary"
                  )}
                >
                  {Icon && <Icon size={16} />}
                  <span className="flex-1">{item.label}</span>
                  {item.badge && !isActive && (
                    <Badge variant="orange">{item.badge}</Badge>
                  )}
                </Link>

                {/* Subnavigation — shown when parent is active */}
                {isActive && item.sections && (
                  <div className="ml-3 mt-1 border-l-2 border-border pl-3">
                    {item.sections.map((section) => (
                      <div key={section.label} className="mb-2">
                        <p className="mb-1 px-2 text-[10px] font-semibold uppercase tracking-wider text-text-secondary">
                          {section.label}
                        </p>
                        {section.items.map((sub) => {
                          const subActive =
                            pathname === sub.href ||
                            pathname.startsWith(sub.href + "/");
                          return (
                            <Link
                              key={sub.href}
                              href={sub.href}
                              className={cn(
                                "flex items-center rounded-pill px-2 py-1.5 text-xs transition-colors",
                                subActive
                                  ? "bg-gray-100 font-medium text-text-primary"
                                  : "text-text-secondary hover:bg-gray-50 hover:text-text-primary"
                              )}
                            >
                              {sub.label}
                            </Link>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="border-t border-border px-3 py-3">
        <Link
          href="/settings"
          className="flex items-center gap-3 rounded-pill px-3 py-2 text-sm text-text-secondary transition-colors hover:bg-gray-100 hover:text-text-primary"
        >
          <Settings size={16} />
          Einstellungen
        </Link>
        <div className="mt-3 flex items-center gap-3 px-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-light text-xs font-semibold text-primary">
            ML
          </div>
          <div className="min-w-0">
            <p className="truncate text-xs font-medium text-text-primary">
              Max Lernender
            </p>
            <p className="truncate text-[11px] text-text-secondary">Lehrjahr 2</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
