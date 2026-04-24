import { cn } from "@/lib/utils";

const PHASES = [
  { n: 1, label: "Dokumente auswählen" },
  { n: 2, label: "Dossier prüfen" },
  { n: 3, label: "Feedback" },
];

export function PhaseProgress({ current }: { current: 1 | 2 | 3 }) {
  return (
    <div className="flex items-center gap-0 border-b border-border bg-surface px-6 py-3">
      {PHASES.map((p, i) => {
        const done = p.n < current;
        const active = p.n === current;
        return (
          <div key={p.n} className="flex items-center">
            {i > 0 && (
              <div
                className={cn(
                  "mx-3 h-px w-10 transition-colors",
                  done ? "bg-primary" : "bg-border"
                )}
              />
            )}
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  "flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold transition-colors",
                  done && "bg-primary text-white",
                  active && "bg-text-primary text-white",
                  !done && !active && "bg-gray-100 text-text-secondary"
                )}
              >
                {done ? "✓" : p.n}
              </span>
              <span
                className={cn(
                  "text-xs font-medium transition-colors",
                  active ? "text-text-primary" : "text-text-secondary"
                )}
              >
                {p.label}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
