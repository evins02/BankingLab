import { Header } from "@/components/layout/Header";
import { StatsBar } from "@/components/modules/StatsBar";
import { ScenarioCard } from "@/components/modules/ScenarioCard";
import { SAMPLE_SCENARIOS } from "@/lib/constants";
import type { UserProgress } from "@/types";

const USER_PROGRESS: UserProgress = {
  scenariosCompleted: 4,
  scenariosTotal: 12,
  pointsEarned: 1340,
  currentStreak: 5,
};

export default function DashboardPage() {
  const recent = SAMPLE_SCENARIOS.slice(0, 3);

  return (
    <>
      <Header
        title="Willkommen zurück, Max"
        subtitle="Mach weiter, wo du aufgehört hast."
      />
      <div className="flex-1 overflow-y-auto p-6">
        <section className="mb-8">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-text-secondary">
            Dein Fortschritt
          </h2>
          <StatsBar progress={USER_PROGRESS} />
        </section>

        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-text-secondary">
              Aktuelle Szenarien
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {recent.map((scenario) => (
              <ScenarioCard key={scenario.id} scenario={scenario} />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
