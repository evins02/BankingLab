import Link from "next/link";
import { CheckCircle2, type LucideIcon } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "@/components/ui/progress-bar";

export type ModuleStatus = "idle" | "active" | "done";

const statusConfig: Record<
  ModuleStatus,
  { label: string; className: string; dot?: boolean; check?: boolean }
> = {
  idle: {
    label: "Nicht gestartet",
    className: "bg-gray-100 text-text-secondary",
  },
  active: {
    label: "In Bearbeitung",
    className: "bg-accent-light text-accent",
    dot: true,
  },
  done: {
    label: "Abgeschlossen",
    className: "bg-primary-light text-primary",
    check: true,
  },
};

interface ModuleCardProps {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  status: ModuleStatus;
  completedScenarios: number;
  totalScenarios: number;
}

export function ModuleCard({
  title,
  description,
  href,
  icon: Icon,
  status,
  completedScenarios,
  totalScenarios,
}: ModuleCardProps) {
  const s = statusConfig[status];

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <div className="mb-3 flex items-start justify-between gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-light">
            <Icon size={20} className="text-primary" />
          </div>
          {/* Status badge */}
          <span
            className={`inline-flex items-center gap-1.5 rounded-pill px-2.5 py-0.5 text-xs font-medium ${s.className}`}
          >
            {s.dot && (
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            )}
            {s.check && <CheckCircle2 size={11} />}
            {s.label}
          </span>
        </div>
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>

      <CardContent className="flex-1">
        <div className="flex items-center justify-between text-xs text-text-secondary mb-1.5">
          <span>Fortschritt</span>
          <span>
            {completedScenarios}/{totalScenarios} Szenarien
          </span>
        </div>
        <ProgressBar value={completedScenarios} max={totalScenarios} />
      </CardContent>

      <CardFooter>
        <Button asChild className="w-full">
          <Link href={href}>
            {status === "idle" ? "Starten" : status === "active" ? "Fortfahren" : "Wiederholen"}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
