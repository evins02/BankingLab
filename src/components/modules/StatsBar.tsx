import { ProgressRing } from "@/components/ui/progress-ring";
import { Card } from "@/components/ui/card";
import type { UserProgress } from "@/types";

interface StatsBarProps {
  progress: UserProgress;
}

export function StatsBar({ progress }: StatsBarProps) {
  const stats = [
    {
      label: "Szenarien",
      value: `${progress.scenariosCompleted}/${progress.scenariosTotal}`,
      ring: true,
    },
    { label: "Punkte", value: progress.pointsEarned.toLocaleString("de-CH") },
    { label: "Streak", value: `${progress.currentStreak} Tage` },
  ];

  return (
    <div className="grid grid-cols-3 gap-4">
      {stats.map((stat) => (
        <Card key={stat.label} className="flex items-center gap-4 py-4">
          {stat.ring && (
            <ProgressRing
              value={progress.scenariosCompleted}
              max={progress.scenariosTotal}
            />
          )}
          <div>
            <p className="text-2xl font-bold text-text-primary">{stat.value}</p>
            <p className="text-xs text-text-secondary">{stat.label}</p>
          </div>
        </Card>
      ))}
    </div>
  );
}
