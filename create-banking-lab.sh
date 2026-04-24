#!/bin/bash
set -e

echo "🏦 Setting up Banking Lab..."

# 1. Scaffold Next.js 14
npx create-next-app@14 banking-lab \
  --typescript --tailwind --eslint --app --no-src-dir \
  --import-alias "@/*" --use-npm --yes

cd banking-lab

# 2. Install dependencies
npm install class-variance-authority clsx tailwind-merge lucide-react \
  @radix-ui/react-slot @radix-ui/react-dialog \
  @radix-ui/react-dropdown-menu @radix-ui/react-separator @radix-ui/react-tooltip

npm install -D prettier prettier-plugin-tailwindcss

echo "✅ Dependencies installed"

# 3. Write all source files
mkdir -p app/dashboard app/finanzieren/scenarios/\[id\] \
  app/banking-operations app/kyc \
  components/layout components/modules components/ui \
  lib types

# ── tailwind.config.ts ──────────────────────────────────────────────────────
cat > tailwind.config.ts << 'EOF'
import type { Config } from "tailwindcss";
const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        surface: "var(--surface)",
        primary: { DEFAULT: "var(--primary)", light: "var(--primary-light)" },
        accent:  { DEFAULT: "var(--accent)",  light: "var(--accent-light)"  },
        "text-primary":   "var(--text-primary)",
        "text-secondary": "var(--text-secondary)",
        border: "var(--border)",
      },
      borderRadius: { DEFAULT: "var(--radius)", pill: "var(--radius-pill)" },
      boxShadow:    { card: "0 1px 4px rgba(0,0,0,0.06)" },
      fontFamily:   { sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"] },
    },
  },
  plugins: [],
};
export default config;
EOF

# ── app/globals.css ─────────────────────────────────────────────────────────
cat > app/globals.css << 'EOF'
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --background: #F5F5F5;
  --surface:    #FFFFFF;
  --primary:       #16A34A;
  --primary-light: #DCFCE7;
  --accent:        #F97316;
  --accent-light:  #FFEDD5;
  --text-primary:   #0A0A0A;
  --text-secondary: #6B7280;
  --border:  #E5E7EB;
  --radius:  12px;
  --radius-pill: 999px;
}

body {
  background-color: var(--background);
  color: var(--text-primary);
  font-family: var(--font-geist-sans), system-ui, sans-serif;
}
EOF

# ── app/layout.tsx ───────────────────────────────────────────────────────────
cat > app/layout.tsx << 'EOF'
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Banking Lab",
  description: "Interactive learning platform for banking professionals",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body className={`${geistSans.variable} antialiased`}>{children}</body>
    </html>
  );
}
EOF

# ── app/page.tsx ─────────────────────────────────────────────────────────────
cat > app/page.tsx << 'EOF'
import { redirect } from "next/navigation";
export default function RootPage() { redirect("/dashboard"); }
EOF

# ── types/index.ts ───────────────────────────────────────────────────────────
cat > types/index.ts << 'EOF'
export type Module = "finanzieren" | "banking-operations" | "kyc";
export type Role = "relationship-manager" | "credit-office" | "credit-operations" | "compliance-officer";
export type ScenarioStatus = "not-started" | "in-progress" | "completed" | "failed";
export type DifficultyLevel = "beginner" | "intermediate" | "advanced";

export interface Scenario {
  id: string; module: Module; title: string; description: string;
  role: Role; difficulty: DifficultyLevel; status: ScenarioStatus;
  durationMinutes: number; tags: string[];
}
export interface UserProgress {
  scenariosCompleted: number; scenariosTotal: number;
  pointsEarned: number; currentStreak: number;
}
export interface NavItem { label: string; href: string; icon: string; badge?: number; }
EOF

# ── lib/utils.ts ─────────────────────────────────────────────────────────────
cat > lib/utils.ts << 'EOF'
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
export function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)); }
EOF

# ── lib/constants.ts ─────────────────────────────────────────────────────────
cat > lib/constants.ts << 'EOF'
import type { NavItem, Scenario } from "@/types";

export const NAV_ITEMS: NavItem[] = [
  { label: "Dashboard",          href: "/dashboard",          icon: "LayoutDashboard" },
  { label: "Finanzieren",        href: "/finanzieren",        icon: "TrendingUp", badge: 3 },
  { label: "Banking Operations", href: "/banking-operations", icon: "Landmark" },
  { label: "KYC / Compliance",   href: "/kyc",                icon: "ShieldCheck" },
];

export const SAMPLE_SCENARIOS: Scenario[] = [
  { id: "fin-001", module: "finanzieren", title: "KMU-Kreditantrag: Maschinenkauf",
    description: "Analysieren Sie den Kreditantrag einer Schreinerei für den Kauf einer CNC-Fräsmaschine.",
    role: "relationship-manager", difficulty: "beginner", status: "not-started",
    durationMinutes: 20, tags: ["KMU", "Investitionskredit", "Sicherheiten"] },
  { id: "fin-002", module: "finanzieren", title: "Hypothekarkredit: Eigenheim",
    description: "Bewerten Sie einen Hypothekarantrag für ein Einfamilienhaus.",
    role: "credit-office", difficulty: "intermediate", status: "in-progress",
    durationMinutes: 30, tags: ["Hypothek", "Eigenheim", "Tragbarkeit"] },
  { id: "fin-003", module: "finanzieren", title: "Restrukturierung: Problemengagement",
    description: "Ein bestehendes Kreditengagement zeigt erste Warnsignale.",
    role: "credit-office", difficulty: "advanced", status: "not-started",
    durationMinutes: 45, tags: ["Restrukturierung", "Risikomanagement"] },
  { id: "ops-001", module: "banking-operations", title: "Kontoeröffnung: Neukunde",
    description: "Führen Sie die vollständige Kontoeröffnung für einen Privatkunden durch.",
    role: "relationship-manager", difficulty: "beginner", status: "completed",
    durationMinutes: 15, tags: ["Onboarding", "Konto", "Legitimation"] },
  { id: "kyc-001", module: "kyc", title: "Beneficial Owner: Firmenstruktur",
    description: "Identifizieren Sie die wirtschaftlich berechtigte Person hinter einer Holdingstruktur.",
    role: "compliance-officer", difficulty: "advanced", status: "not-started",
    durationMinutes: 40, tags: ["Beneficial Owner", "Geldwäscherei", "AMLA"] },
];
EOF

# ── components/ui/button.tsx ─────────────────────────────────────────────────
cat > components/ui/button.tsx << 'EOF'
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50",
  { variants: {
      variant: {
        primary:   "bg-primary text-white hover:bg-primary/90",
        secondary: "border border-border bg-surface text-text-primary hover:bg-gray-50",
        ghost:     "text-text-secondary hover:bg-gray-100 hover:text-text-primary",
      },
      size: {
        sm:   "rounded-pill px-3 py-1.5 text-xs",
        md:   "rounded-pill px-5 py-2",
        lg:   "rounded-pill px-6 py-3 text-base",
        icon: "h-9 w-9 rounded-DEFAULT",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> { asChild?: boolean; }

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  }
);
Button.displayName = "Button";
export { Button, buttonVariants };
EOF

# ── components/ui/badge.tsx ──────────────────────────────────────────────────
cat > components/ui/badge.tsx << 'EOF'
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-pill px-2.5 py-0.5 text-xs font-medium",
  { variants: { variant: {
      green:   "bg-primary-light text-primary",
      orange:  "bg-accent-light text-accent",
      neutral: "bg-gray-100 text-text-secondary",
      dark:    "bg-text-primary text-white",
    } },
    defaultVariants: { variant: "neutral" },
  }
);

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {}
export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}
EOF

# ── components/ui/card.tsx ───────────────────────────────────────────────────
cat > components/ui/card.tsx << 'EOF'
import * as React from "react";
import { cn } from "@/lib/utils";

export const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("rounded-DEFAULT bg-surface p-6 shadow-card", className)} {...props} />
  )
);
Card.displayName = "Card";

export const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("mb-4 flex flex-col gap-1", className)} {...props} />
);
CardHeader.displayName = "CardHeader";

export const CardTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => <h3 ref={ref} className={cn("text-base font-semibold text-text-primary", className)} {...props} />
);
CardTitle.displayName = "CardTitle";

export const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => <p ref={ref} className={cn("text-sm text-text-secondary", className)} {...props} />
);
CardDescription.displayName = "CardDescription";

export const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("", className)} {...props} />
);
CardContent.displayName = "CardContent";

export const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("mt-4 flex items-center gap-3", className)} {...props} />
);
CardFooter.displayName = "CardFooter";
EOF

# ── components/ui/status-dot.tsx ─────────────────────────────────────────────
cat > components/ui/status-dot.tsx << 'EOF'
import { cn } from "@/lib/utils";
import type { ScenarioStatus } from "@/types";

const statusConfig: Record<ScenarioStatus, { color: string; label: string }> = {
  "not-started": { color: "bg-gray-300",  label: "Nicht gestartet" },
  "in-progress": { color: "bg-accent",    label: "In Bearbeitung"  },
  "completed":   { color: "bg-primary",   label: "Abgeschlossen"   },
  "failed":      { color: "bg-red-500",   label: "Nicht bestanden" },
};

export function StatusDot({ status, className, showLabel = true }: {
  status: ScenarioStatus; className?: string; showLabel?: boolean;
}) {
  const c = statusConfig[status];
  return (
    <span className={cn("inline-flex items-center gap-1.5", className)}>
      <span className={cn("h-2 w-2 rounded-full", c.color)} />
      {showLabel && <span className="text-xs text-text-secondary">{c.label}</span>}
    </span>
  );
}
EOF

# ── components/ui/progress-bar.tsx ───────────────────────────────────────────
cat > components/ui/progress-bar.tsx << 'EOF'
import { cn } from "@/lib/utils";

export function ProgressBar({ value, max, className }: { value: number; max: number; className?: string }) {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <div className={cn("h-1.5 w-full overflow-hidden rounded-full bg-gray-100", className)}>
      <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${pct}%` }} />
    </div>
  );
}
EOF

# ── components/layout/Sidebar.tsx ────────────────────────────────────────────
cat > components/layout/Sidebar.tsx << 'EOF'
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, TrendingUp, Landmark, ShieldCheck, Settings, HelpCircle, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_ITEMS } from "@/lib/constants";
import { Badge } from "@/components/ui/badge";

const ICONS: Record<string, LucideIcon> = { LayoutDashboard, TrendingUp, Landmark, ShieldCheck };

export function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="flex h-screen w-60 shrink-0 flex-col border-r border-border bg-surface">
      <div className="flex h-16 items-center gap-2.5 border-b border-border px-5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
          <span className="text-sm font-bold text-white">BL</span>
        </div>
        <span className="font-semibold text-text-primary">Banking Lab</span>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <p className="mb-2 px-2 text-[11px] font-medium uppercase tracking-wider text-text-secondary">Module</p>
        <ul className="flex flex-col gap-1">
          {NAV_ITEMS.map((item) => {
            const Icon = ICONS[item.icon];
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <li key={item.href}>
                <Link href={item.href} className={cn(
                  "flex items-center gap-3 rounded-pill px-3 py-2 text-sm transition-colors",
                  isActive ? "bg-text-primary font-medium text-white"
                           : "text-text-secondary hover:bg-gray-100 hover:text-text-primary"
                )}>
                  {Icon && <Icon size={16} />}
                  <span className="flex-1">{item.label}</span>
                  {item.badge && !isActive && <Badge variant="orange">{item.badge}</Badge>}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="border-t border-border px-3 py-3 flex flex-col gap-1">
        {[{ href: "/settings", icon: Settings, label: "Einstellungen" },
          { href: "/support",  icon: HelpCircle, label: "Support" }].map(({ href, icon: Icon, label }) => (
          <Link key={href} href={href} className="flex items-center gap-3 rounded-pill px-3 py-2 text-sm text-text-secondary transition-colors hover:bg-gray-100 hover:text-text-primary">
            <Icon size={16} />{label}
          </Link>
        ))}
        <div className="mt-2 flex items-center gap-3 px-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-light text-xs font-semibold text-primary">ML</div>
          <div className="min-w-0">
            <p className="truncate text-xs font-medium text-text-primary">Max Lernender</p>
            <p className="truncate text-[11px] text-text-secondary">Lehrjahr 2</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
EOF

# ── components/layout/Header.tsx ─────────────────────────────────────────────
cat > components/layout/Header.tsx << 'EOF'
import { Bell, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-border bg-surface px-6">
      <div>
        <h1 className="text-lg font-semibold text-text-primary">{title}</h1>
        {subtitle && <p className="text-xs text-text-secondary">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon"><Search size={18} /></Button>
        <Button variant="ghost" size="icon"><Bell size={18} /></Button>
      </div>
    </header>
  );
}
EOF

# ── components/layout/AppShell.tsx ───────────────────────────────────────────
cat > components/layout/AppShell.tsx << 'EOF'
import { Sidebar } from "./Sidebar";
export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar />
      <main className="flex flex-1 flex-col overflow-hidden">{children}</main>
    </div>
  );
}
EOF

# ── components/modules/ModuleCard.tsx ────────────────────────────────────────
cat > components/modules/ModuleCard.tsx << 'EOF'
import Link from "next/link";
import { type LucideIcon } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "@/components/ui/progress-bar";

interface ModuleCardProps {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  completedScenarios: number;
  totalScenarios: number;
}

export function ModuleCard({ title, description, href, icon: Icon, completedScenarios, totalScenarios }: ModuleCardProps) {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary-light">
          <Icon size={20} className="text-primary" />
        </div>
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="flex items-center justify-between text-xs text-text-secondary mb-1.5">
          <span>Fortschritt</span>
          <span>{completedScenarios}/{totalScenarios} Szenarien</span>
        </div>
        <ProgressBar value={completedScenarios} max={totalScenarios} />
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <Link href={href}>Starten</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
EOF

# ── components/modules/ScenarioCard.tsx ──────────────────────────────────────
cat > components/modules/ScenarioCard.tsx << 'EOF'
import Link from "next/link";
import { Clock, ChevronRight } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { StatusDot } from "@/components/ui/status-dot";
import type { Scenario } from "@/types";

const diffMap = {
  beginner:     { label: "Einsteiger",     variant: "green"   as const },
  intermediate: { label: "Fortgeschritten",variant: "orange"  as const },
  advanced:     { label: "Experte",        variant: "neutral" as const },
};
const roleMap: Record<string, string> = {
  "relationship-manager": "Relationship Manager",
  "credit-office":        "Kreditstelle",
  "credit-operations":    "Kreditabwicklung",
  "compliance-officer":   "Compliance Officer",
};

export function ScenarioCard({ scenario }: { scenario: Scenario }) {
  const diff = diffMap[scenario.difficulty];
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <div className="mb-2 flex items-start justify-between gap-2">
          <Badge variant={diff.variant}>{diff.label}</Badge>
          <StatusDot status={scenario.status} showLabel={false} />
        </div>
        <CardTitle>{scenario.title}</CardTitle>
        <CardDescription className="line-clamp-2">{scenario.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="flex flex-wrap gap-1.5">
          {scenario.tags.map(tag => <Badge key={tag} variant="neutral">{tag}</Badge>)}
        </div>
      </CardContent>
      <CardFooter className="justify-between border-t border-border pt-4">
        <div className="flex items-center gap-1.5 text-xs text-text-secondary">
          <Clock size={13} />
          <span>{scenario.durationMinutes} Min.</span>
          <span className="mx-1">·</span>
          <span>{roleMap[scenario.role] ?? scenario.role}</span>
        </div>
        <Button variant="secondary" size="sm" asChild>
          <Link href={`/${scenario.module}/scenarios/${scenario.id}`}>Starten <ChevronRight size={14} /></Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
EOF

# ── app layout (with AppShell) ────────────────────────────────────────────────
# We wrap the whole app in AppShell via root layout
cat > app/layout.tsx << 'EOF'
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { AppShell } from "@/components/layout/AppShell";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Banking Lab",
  description: "Interactive learning platform for banking professionals",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body className={`${geistSans.variable} antialiased`}>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
EOF

# ── app/dashboard/page.tsx ───────────────────────────────────────────────────
cat > app/dashboard/page.tsx << 'EOF'
import { TrendingUp, Landmark, ShieldCheck } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { ModuleCard } from "@/components/modules/ModuleCard";
import { Card, CardContent } from "@/components/ui/card";

const MODULES = [
  { title: "Finanzieren", href: "/finanzieren", icon: TrendingUp,
    description: "Kreditvergabe, Hypotheken und Risikobeurteilung aus drei Perspektiven.",
    completedScenarios: 1, totalScenarios: 8 },
  { title: "Banking Operations", href: "/banking-operations", icon: Landmark,
    description: "Kontoeröffnungen, Zahlungsverkehr, Mahnwesen und Settlement.",
    completedScenarios: 0, totalScenarios: 6 },
  { title: "KYC / Compliance", href: "/kyc", icon: ShieldCheck,
    description: "Kundendaten, Beneficial Owners und Geldwäschereibekämpfung.",
    completedScenarios: 0, totalScenarios: 5 },
];

const STATS = [
  { label: "Szenarien total",  value: "19" },
  { label: "Abgeschlossen",    value: "1"  },
  { label: "Genauigkeit",      value: "84%"},
];

export default function DashboardPage() {
  return (
    <>
      <Header title="Banking Lab" subtitle="Willkommen zurück, Max — mach weiter, wo du aufgehört hast." />
      <div className="flex-1 overflow-y-auto p-6">

        {/* Stats row */}
        <div className="mb-8 grid grid-cols-3 gap-4">
          {STATS.map(s => (
            <Card key={s.label}>
              <CardContent className="pt-2">
                <p className="text-3xl font-bold text-text-primary">{s.value}</p>
                <p className="mt-1 text-sm text-text-secondary">{s.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Module cards */}
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-text-secondary">Module</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {MODULES.map(m => <ModuleCard key={m.title} {...m} />)}
        </div>
      </div>
    </>
  );
}
EOF

# ── app/finanzieren/page.tsx ──────────────────────────────────────────────────
cat > app/finanzieren/page.tsx << 'EOF'
import { Header } from "@/components/layout/Header";
import { ScenarioCard } from "@/components/modules/ScenarioCard";
import { SAMPLE_SCENARIOS } from "@/lib/constants";
const scenarios = SAMPLE_SCENARIOS.filter(s => s.module === "finanzieren");
export default function FinanzierenPage() {
  return (
    <>
      <Header title="Finanzieren" subtitle="Kreditvergabe, Analyse und Risikomanagement" />
      <div className="flex-1 overflow-y-auto p-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {scenarios.map(s => <ScenarioCard key={s.id} scenario={s} />)}
        </div>
      </div>
    </>
  );
}
EOF

# ── app/banking-operations/page.tsx ──────────────────────────────────────────
cat > app/banking-operations/page.tsx << 'EOF'
import { Header } from "@/components/layout/Header";
import { ScenarioCard } from "@/components/modules/ScenarioCard";
import { SAMPLE_SCENARIOS } from "@/lib/constants";
const scenarios = SAMPLE_SCENARIOS.filter(s => s.module === "banking-operations");
export default function BankingOperationsPage() {
  return (
    <>
      <Header title="Banking Operations" subtitle="Konten, Zahlungen, Mahnwesen und Abwicklung" />
      <div className="flex-1 overflow-y-auto p-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {scenarios.map(s => <ScenarioCard key={s.id} scenario={s} />)}
        </div>
      </div>
    </>
  );
}
EOF

# ── app/kyc/page.tsx ──────────────────────────────────────────────────────────
cat > app/kyc/page.tsx << 'EOF'
import { Header } from "@/components/layout/Header";
import { ScenarioCard } from "@/components/modules/ScenarioCard";
import { SAMPLE_SCENARIOS } from "@/lib/constants";
const scenarios = SAMPLE_SCENARIOS.filter(s => s.module === "kyc");
export default function KycPage() {
  return (
    <>
      <Header title="KYC / Compliance" subtitle="Kundendaten, Beneficial Owner und Geldwäschereibekämpfung" />
      <div className="flex-1 overflow-y-auto p-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {scenarios.map(s => <ScenarioCard key={s.id} scenario={s} />)}
        </div>
      </div>
    </>
  );
}
EOF

# ── .prettierrc ───────────────────────────────────────────────────────────────
cat > .prettierrc << 'EOF'
{ "semi": true, "singleQuote": false, "trailingComma": "es5", "tabWidth": 2, "printWidth": 80, "plugins": ["prettier-plugin-tailwindcss"] }
EOF

# ── components.json ───────────────────────────────────────────────────────────
cat > components.json << 'EOF'
{ "$schema": "https://ui.shadcn.com/schema.json", "style": "default", "rsc": true, "tsx": true,
  "tailwind": { "config": "tailwind.config.ts", "css": "app/globals.css", "baseColor": "neutral", "cssVariables": true },
  "aliases": { "components": "@/components", "utils": "@/lib/utils" } }
EOF

echo ""
echo "✅ All files written. Running type check..."
npx tsc --noEmit && echo "✅ TypeScript OK"

echo ""
echo "🚀 Deploying to Vercel..."
npx vercel --yes

