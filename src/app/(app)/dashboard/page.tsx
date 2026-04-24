import { TrendingUp, Landmark, ShieldCheck } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { ModuleCard } from "@/components/modules/ModuleCard";
import { Card, CardContent } from "@/components/ui/card";

const MODULES = [
  {
    title: "Kreditgeschäfte",
    description:
      "Kreditvergabe, Hypotheken und Risikobeurteilung aus drei Perspektiven.",
    href: "/kreditgeschaefte",
    icon: TrendingUp,
    status: "active" as const,
    completedScenarios: 1,
    totalScenarios: 8,
  },
  {
    title: "Banking Operations",
    description:
      "Kontoeröffnungen, Zahlungsverkehr, Mahnwesen und Settlement.",
    href: "/banking-operations",
    icon: Landmark,
    status: "idle" as const,
    completedScenarios: 0,
    totalScenarios: 6,
  },
  {
    title: "KYC / Compliance",
    description:
      "Kundendaten, Beneficial Owners und Geldwäschereibekämpfung.",
    href: "/kyc",
    icon: ShieldCheck,
    status: "done" as const,
    completedScenarios: 5,
    totalScenarios: 5,
  },
];

const STATS = [
  { label: "Szenarien total", value: "19" },
  { label: "Abgeschlossen", value: "6" },
  { label: "Genauigkeit", value: "84%" },
];

export default function DashboardPage() {
  return (
    <>
      <Header
        title="Banking Lab"
        subtitle="Willkommen zurück, Max — mach weiter, wo du aufgehört hast."
      />
      <div className="flex-1 overflow-y-auto p-6">
        {/* Stats row */}
        <div className="mb-8 grid grid-cols-3 gap-4">
          {STATS.map((s) => (
            <Card key={s.label}>
              <CardContent className="pt-2">
                <p className="text-3xl font-bold text-text-primary">{s.value}</p>
                <p className="mt-1 text-sm text-text-secondary">{s.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Module cards */}
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-text-secondary">
          Module
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {MODULES.map((m) => (
            <ModuleCard key={m.title} {...m} />
          ))}
        </div>
      </div>
    </>
  );
}
