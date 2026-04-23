import type { NavItem, Scenario } from "@/types";

export const NAV_ITEMS: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: "LayoutDashboard" },
  { label: "Finanzieren", href: "/finanzieren", icon: "TrendingUp", badge: 3 },
  {
    label: "Banking Operations",
    href: "/banking-operations",
    icon: "Landmark",
  },
  { label: "KYC / Compliance", href: "/kyc", icon: "ShieldCheck" },
];

export const SAMPLE_SCENARIOS: Scenario[] = [
  {
    id: "fin-001",
    module: "finanzieren",
    title: "KMU-Kreditantrag: Maschinenkauf",
    description:
      "Analysieren Sie den Kreditantrag einer Schreinerei für den Kauf einer CNC-Fräsmaschine. Prüfen Sie Bonität, Sicherheiten und Tragbarkeit.",
    role: "relationship-manager",
    difficulty: "beginner",
    status: "not-started",
    durationMinutes: 20,
    tags: ["KMU", "Investitionskredit", "Sicherheiten"],
  },
  {
    id: "fin-002",
    module: "finanzieren",
    title: "Hypothekarkredit: Eigenheim",
    description:
      "Bewerten Sie einen Hypothekarantrag für ein Einfamilienhaus. Prüfen Sie Belehnungswert, Tragbarkeit und Eigenmittel.",
    role: "credit-office",
    difficulty: "intermediate",
    status: "in-progress",
    durationMinutes: 30,
    tags: ["Hypothek", "Eigenheim", "Tragbarkeit"],
  },
  {
    id: "fin-003",
    module: "finanzieren",
    title: "Restrukturierung: Problemengagement",
    description:
      "Ein bestehendes Kreditengagement zeigt erste Warnsignale. Erarbeiten Sie eine Restrukturierungsstrategie.",
    role: "credit-office",
    difficulty: "advanced",
    status: "not-started",
    durationMinutes: 45,
    tags: ["Restrukturierung", "Risikomanagement", "Watch-Liste"],
  },
  {
    id: "ops-001",
    module: "banking-operations",
    title: "Kontoeröffnung: Neukunde",
    description:
      "Führen Sie die vollständige Kontoeröffnung für einen Privatkunden durch inkl. Legitimationsprüfung.",
    role: "relationship-manager",
    difficulty: "beginner",
    status: "completed",
    durationMinutes: 15,
    tags: ["Onboarding", "Konto", "Legitimation"],
  },
  {
    id: "kyc-001",
    module: "kyc",
    title: "Beneficial Owner: Firmenstruktur",
    description:
      "Identifizieren Sie die wirtschaftlich berechtigte Person hinter einer verschachtelten Holdingstruktur.",
    role: "compliance-officer",
    difficulty: "advanced",
    status: "not-started",
    durationMinutes: 40,
    tags: ["Beneficial Owner", "Geldwäscherei", "AMLA"],
  },
];
