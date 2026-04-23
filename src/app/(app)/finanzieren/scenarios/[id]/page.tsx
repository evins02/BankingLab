import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Clock, User } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { StatusDot } from "@/components/ui/status-dot";
import { SAMPLE_SCENARIOS } from "@/lib/constants";

const roleMap: Record<string, string> = {
  "relationship-manager": "Relationship Manager",
  "credit-office": "Kreditstelle",
  "credit-operations": "Kreditabwicklung",
  "compliance-officer": "Compliance Officer",
};

export default function ScenarioDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const scenario = SAMPLE_SCENARIOS.find((s) => s.id === params.id);
  if (!scenario) notFound();

  return (
    <>
      <Header title={scenario.title} />
      <div className="flex-1 overflow-y-auto p-6">
        <Link
          href="/finanzieren"
          className="mb-4 inline-flex items-center gap-1 text-sm text-text-secondary hover:text-text-primary"
        >
          <ChevronLeft size={15} /> Zurück zu Finanzieren
        </Link>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex flex-wrap items-center gap-2">
                  <StatusDot status={scenario.status} />
                </div>
                <CardTitle className="text-xl">{scenario.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-text-secondary">
                  {scenario.description}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {scenario.tags.map((tag) => (
                    <Badge key={tag} variant="neutral">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex flex-col gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Details</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-3 text-sm">
                <div className="flex items-center gap-2 text-text-secondary">
                  <User size={15} />
                  <span>{roleMap[scenario.role] ?? scenario.role}</span>
                </div>
                <div className="flex items-center gap-2 text-text-secondary">
                  <Clock size={15} />
                  <span>{scenario.durationMinutes} Minuten</span>
                </div>
              </CardContent>
            </Card>

            <Button size="lg" className="w-full">
              Szenario starten
            </Button>
            <Button variant="secondary" size="lg" className="w-full">
              Vorbereitung ansehen
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export async function generateStaticParams() {
  return SAMPLE_SCENARIOS.filter((s) => s.module === "finanzieren").map(
    (s) => ({ id: s.id })
  );
}
