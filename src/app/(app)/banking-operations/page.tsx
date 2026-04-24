import { Header } from "@/components/layout/Header";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { ScenarioCard } from "@/components/modules/ScenarioCard";
import { EmptyState } from "@/components/ui/empty-state";
import { Card, CardContent } from "@/components/ui/card";
import { SAMPLE_SCENARIOS } from "@/lib/constants";

const scenarios = SAMPLE_SCENARIOS.filter(
  (s) => s.module === "banking-operations"
);

const TOPICS = [
  { title: "Kontoeröffnung", count: 4, icon: "🏦" },
  { title: "Zahlungsverkehr", count: 6, icon: "💸" },
  { title: "Mahnung & Betreibung", count: 3, icon: "📋" },
  { title: "Settlements", count: 2, icon: "🔄" },
];

export default function BankingOperationsPage() {
  return (
    <>
      <Header
        title="Banking Operations"
        subtitle="Konten, Zahlungen, Mahnwesen und Abwicklung"
      />
      <Breadcrumb
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Banking Operations" },
        ]}
      />
      <div className="flex-1 overflow-y-auto p-6">
        <section className="mb-8">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-text-secondary">
            Themenbereiche
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {TOPICS.map((topic) => (
              <Card
                key={topic.title}
                className="cursor-pointer transition-shadow hover:shadow-md"
              >
                <CardContent className="flex flex-col items-center gap-2 py-4 text-center">
                  <span className="text-2xl">{topic.icon}</span>
                  <p className="text-sm font-medium text-text-primary">
                    {topic.title}
                  </p>
                  <p className="text-xs text-text-secondary">
                    {topic.count} Szenarien
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-text-secondary">
            Alle Szenarien
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
