import { FolderOpen } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  title?: string;
  subtitle?: string;
}

export function EmptyState({
  title = "Noch keine Szenarien verfügbar",
  subtitle = "Dieser Bereich wird bald freigeschaltet.",
}: EmptyStateProps) {
  return (
    <Card className="flex flex-col items-center justify-center py-16 text-center">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
        <FolderOpen size={28} className="text-text-secondary" />
      </div>
      <h3 className="mb-1 text-base font-semibold text-text-primary">{title}</h3>
      <p className="mb-6 max-w-xs text-sm text-text-secondary">{subtitle}</p>
      <Button variant="secondary" size="md" disabled>
        Bald verfügbar
      </Button>
    </Card>
  );
}
