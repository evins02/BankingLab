"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Inputs {
  bruttojahreslohn: string;
  hypothekarbetrag: string;
  alter: string;
  pkJahresrente: string;
}

interface Result {
  zinskosten: number;
  amortisation: number;
  nebenkosten: number;
  wohnkosten: number;
  tragbarkeit: number;
  tragbarkeitRente: number | null;
  renteneinkommen: number | null;
}

const KALK_ZINSSATZ = 0.05;
const AHV_RENTE_APPROX = 28800; // CHF/year, approximate maximum AHV

function formatCHF(value: number) {
  return new Intl.NumberFormat("de-CH", {
    style: "currency",
    currency: "CHF",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatPct(value: number) {
  return (value * 100).toFixed(1) + "%";
}

function TragbarkeitsBar({ value }: { value: number }) {
  const pct = Math.min(value * 100, 100);
  const color =
    value <= 0.33
      ? "bg-green-500"
      : value <= 0.40
      ? "bg-amber-400"
      : "bg-red-500";
  return (
    <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-gray-100">
      <div
        className={cn("h-full rounded-full transition-all", color)}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

export function Tragbarkeitsrechner() {
  const [inputs, setInputs] = useState<Inputs>({
    bruttojahreslohn: "",
    hypothekarbetrag: "",
    alter: "",
    pkJahresrente: "",
  });
  const [result, setResult] = useState<Result | null>(null);

  const set = (field: keyof Inputs) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setInputs((prev) => ({ ...prev, [field]: e.target.value }));

  const calculate = () => {
    const lohn = parseFloat(inputs.bruttojahreslohn.replace(/[^0-9.]/g, "")) || 0;
    const hypo = parseFloat(inputs.hypothekarbetrag.replace(/[^0-9.]/g, "")) || 0;
    const alter = parseFloat(inputs.alter) || 0;
    const pkRente = parseFloat(inputs.pkJahresrente.replace(/[^0-9.]/g, "")) || 0;

    const zinskosten = hypo * KALK_ZINSSATZ;
    // Amortisation: 1% of mortgage (simplified, represents portion of 2nd mortgage)
    const amortisation = hypo * 0.01;
    // Nebenkosten: 1% of implied property value (mortgage / 0.8 LTV assumption)
    const nebenkosten = (hypo / 0.8) * 0.01;
    const wohnkosten = zinskosten + amortisation + nebenkosten;

    const tragbarkeit = lohn > 0 ? wohnkosten / lohn : 0;

    // Retirement scenario: show if age ≥ 45
    let tragbarkeitRente: number | null = null;
    let renteneinkommen: number | null = null;
    if (alter >= 45 && pkRente > 0) {
      renteneinkommen = AHV_RENTE_APPROX + pkRente;
      tragbarkeitRente = renteneinkommen > 0 ? wohnkosten / renteneinkommen : 0;
    }

    setResult({ zinskosten, amortisation, nebenkosten, wohnkosten, tragbarkeit, tragbarkeitRente, renteneinkommen });
  };

  const verdict = (t: number) =>
    t <= 0.33
      ? { label: "Tragbar", color: "text-green-600" }
      : t <= 0.40
      ? { label: "Grenzwertig", color: "text-amber-600" }
      : { label: "Nicht tragbar", color: "text-red-600" };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tragbarkeitsrechner</CardTitle>
        <p className="text-sm text-text-secondary">
          Berechnung nach Schweizer Bankstandard — kalkulatorischer Zinssatz 5%
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-medium text-text-secondary">
              Bruttojahreslohn (CHF)
            </span>
            <input
              type="text"
              inputMode="numeric"
              placeholder="z. B. 95 000"
              value={inputs.bruttojahreslohn}
              onChange={set("bruttojahreslohn")}
              className="rounded-DEFAULT border border-border bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30"
            />
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-medium text-text-secondary">
              Hypothekarbetrag (CHF)
            </span>
            <input
              type="text"
              inputMode="numeric"
              placeholder="z. B. 600 000"
              value={inputs.hypothekarbetrag}
              onChange={set("hypothekarbetrag")}
              className="rounded-DEFAULT border border-border bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30"
            />
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-medium text-text-secondary">
              Alter des Kunden
            </span>
            <input
              type="number"
              min={18}
              max={99}
              placeholder="z. B. 42"
              value={inputs.alter}
              onChange={set("alter")}
              className="rounded-DEFAULT border border-border bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30"
            />
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-medium text-text-secondary">
              PK-Jahresrente (CHF, aus PK-Ausweis)
            </span>
            <input
              type="text"
              inputMode="numeric"
              placeholder="z. B. 22 000"
              value={inputs.pkJahresrente}
              onChange={set("pkJahresrente")}
              className="rounded-DEFAULT border border-border bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30"
            />
          </label>
        </div>

        <Button onClick={calculate} className="mt-4">
          Berechnen
        </Button>

        {result && (
          <div className="mt-6 rounded-DEFAULT border border-border bg-surface p-4">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-text-secondary">
              Ergebnis
            </p>

            {/* Cost breakdown */}
            <div className="mb-4 flex flex-col gap-2 text-sm">
              <div className="flex justify-between">
                <span className="text-text-secondary">Zinskosten (kalkulatorisch 5%)</span>
                <span className="font-medium">{formatCHF(result.zinskosten)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Amortisation (1%)</span>
                <span className="font-medium">{formatCHF(result.amortisation)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Nebenkosten (1% Liegenschaftswert)</span>
                <span className="font-medium">{formatCHF(result.nebenkosten)}</span>
              </div>
              <div className="flex justify-between border-t border-border pt-2 font-semibold">
                <span>Total Wohnkosten / Jahr</span>
                <span>{formatCHF(result.wohnkosten)}</span>
              </div>
            </div>

            {/* Tragbarkeit */}
            <div className="rounded-DEFAULT bg-white p-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">
                  Tragbarkeit (aktuelles Einkommen)
                </span>
                <span
                  className={cn(
                    "text-sm font-bold",
                    verdict(result.tragbarkeit).color
                  )}
                >
                  {formatPct(result.tragbarkeit)} — {verdict(result.tragbarkeit).label}
                </span>
              </div>
              <TragbarkeitsBar value={result.tragbarkeit} />
              <p className="mt-1 text-[11px] text-text-secondary">
                Richtwert: max. 33% des Bruttoeinkommens
              </p>
            </div>

            {/* Retirement scenario */}
            {result.tragbarkeitRente !== null && result.renteneinkommen !== null && (
              <div className="mt-3 rounded-DEFAULT bg-white p-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">
                    Tragbarkeit bei Pensionierung
                  </span>
                  <span
                    className={cn(
                      "text-sm font-bold",
                      verdict(result.tragbarkeitRente).color
                    )}
                  >
                    {formatPct(result.tragbarkeitRente)} —{" "}
                    {verdict(result.tragbarkeitRente).label}
                  </span>
                </div>
                <TragbarkeitsBar value={result.tragbarkeitRente} />
                <p className="mt-1 text-[11px] text-text-secondary">
                  Renteneinkommen: AHV ca. {formatCHF(AHV_RENTE_APPROX)} + PK{" "}
                  {formatCHF(result.renteneinkommen - AHV_RENTE_APPROX)} ={" "}
                  {formatCHF(result.renteneinkommen)}
                </p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
