import { cn } from "@/lib/utils";
import type { ScenarioStatus } from "@/types";

const statusConfig: Record<
  ScenarioStatus,
  { color: string; label: string }
> = {
  "not-started": { color: "bg-gray-300", label: "Nicht gestartet" },
  "in-progress": { color: "bg-accent", label: "In Bearbeitung" },
  completed: { color: "bg-primary", label: "Abgeschlossen" },
  failed: { color: "bg-red-500", label: "Nicht bestanden" },
};

interface StatusDotProps {
  status: ScenarioStatus;
  className?: string;
  showLabel?: boolean;
}

export function StatusDot({ status, className, showLabel = true }: StatusDotProps) {
  const config = statusConfig[status];
  return (
    <span className={cn("inline-flex items-center gap-1.5", className)}>
      <span className={cn("h-2 w-2 rounded-full", config.color)} />
      {showLabel && (
        <span className="text-xs text-text-secondary">{config.label}</span>
      )}
    </span>
  );
}
