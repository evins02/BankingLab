import { Header } from "@/components/layout/Header";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { ScenarioCard } from "@/components/modules/ScenarioCard";
import { EmptyState } from "@/components/ui/empty-state";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SAMPLE_SCENARIOS } from "@/lib/constants";

const scenarios = SAMPLE_SCENARIOS.filter((s) => s.module === "kyc");

const COMPLIANCE_AREAS = [
  {
    title: "Beneficial Owner",
    description: "Identifikation wirtschaftlich Berechtigter",
    badge: "AMLA",
    badgeVariant: "orange" as const,
  },
  {
    title: "Kundendaten",
    description: "Pflege und Verifizierung von Kundenstammdaten",
    badge: "CDB",
    badgeVariant: "green" as const,
  },
  {
    title: "Mittelherkunft",
    description: "Herkunft der eingebrachten Vermögenswerte",
    badge: "GwG",
    badgeVariant: "orange" as const,
  },
];

export default function KycPage() {
  return (
    <>
      <Header
        title="KYC / Compliance"
        subtitle="Kundendaten, Beneficial Owner und Geldwäschereibekämpfung"
      />
      <Breadcrumb
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "KYC / Compliance" },
        ]}
      />
      <div className="flex-1 overflow-y-auto p-6">
        <section className="mb-8">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-text-secondary">
            Compliance-Bereiche
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {COMPLIANCE_AREAS.map((area) => (
              <Card key={area.title} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle>{area.title}</CardTitle>
                    <Badge variant={area.badgeVariant}>{area.badge}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-text-secondary">{area.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-text-secondary">
            Szenarien
          </h2>
          {scenarios.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {scenarios.map((scenario) => (
                <ScenarioCard key={scenario.id} scenario={scenario} />
              ))}
            </div>
          )}
        </section>
      </div>
    </>
  );
}
