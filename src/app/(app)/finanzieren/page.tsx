import { Header } from "@/components/layout/Header";
import { ScenarioCard } from "@/components/modules/ScenarioCard";
import { Badge } from "@/components/ui/badge";
import { SAMPLE_SCENARIOS } from "@/lib/constants";

const scenarios = SAMPLE_SCENARIOS.filter((s) => s.module === "finanzieren");

export default function FinanzierenPage() {
  return (
    <>
      <Header
        title="Finanzieren"
        subtitle="Kreditvergabe, Analyse und Risikomanagement"
      />
      <div className="flex-1 overflow-y-auto p-6">
        <div className="mb-6 flex flex-wrap gap-2">
          {["Alle", "Relationship Manager", "Kreditstelle", "Kreditabwicklung"].map(
            (role) => (
              <Badge
                key={role}
                variant={role === "Alle" ? "dark" : "neutral"}
                className="cursor-pointer text-sm px-3 py-1"
              >
                {role}
              </Badge>
            )
          )}
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {scenarios.map((scenario) => (
            <ScenarioCard key={scenario.id} scenario={scenario} />
          ))}
        </div>
      </div>
    </>
  );
}
