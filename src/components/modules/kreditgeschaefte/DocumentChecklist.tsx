"use client";

import { useState } from "react";
import { CheckCircle2, Circle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface ChecklistItem {
  id: string;
  label: string;
  hint?: string;
  required: boolean;
}

interface Props {
  items: ChecklistItem[];
  title?: string;
  subtitle?: string;
}

export function DocumentChecklist({
  items,
  title = "Unterlagen-Checkliste",
  subtitle,
}: Props) {
  const [checked, setChecked] = useState<Set<string>>(new Set());

  const toggle = (id: string) =>
    setChecked((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const required = items.filter((i) => i.required);
  const optional = items.filter((i) => !i.required);
  const doneRequired = required.filter((i) => checked.has(i.id)).length;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {subtitle && (
          <p className="text-sm text-text-secondary">{subtitle}</p>
        )}
      </CardHeader>
      <CardContent>
        {/* Progress */}
        <div className="mb-4 flex items-center gap-3">
          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-gray-100">
            <div
              className="h-full rounded-full bg-primary transition-all"
              style={{
                width:
                  required.length > 0
                    ? `${(doneRequired / required.length) * 100}%`
                    : "0%",
              }}
            />
          </div>
          <span className="text-xs text-text-secondary">
            {doneRequired}/{required.length} Pflichtunterlagen
          </span>
        </div>

        {/* Required items */}
        <div className="mb-4">
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-text-secondary">
            Pflichtunterlagen
          </p>
          <ul className="flex flex-col gap-1">
            {required.map((item) => (
              <ChecklistRow
                key={item.id}
                item={item}
                checked={checked.has(item.id)}
                onToggle={toggle}
              />
            ))}
          </ul>
        </div>

        {/* Optional items */}
        {optional.length > 0 && (
          <div>
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-text-secondary">
              Je nach Situation
            </p>
            <ul className="flex flex-col gap-1">
              {optional.map((item) => (
                <ChecklistRow
                  key={item.id}
                  item={item}
                  checked={checked.has(item.id)}
                  onToggle={toggle}
                />
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function ChecklistRow({
  item,
  checked,
  onToggle,
}: {
  item: ChecklistItem;
  checked: boolean;
  onToggle: (id: string) => void;
}) {
  return (
    <li>
      <button
        onClick={() => onToggle(item.id)}
        className={cn(
          "flex w-full items-start gap-3 rounded-DEFAULT px-3 py-2.5 text-left text-sm transition-colors",
          checked
            ? "bg-primary-light text-primary"
            : "hover:bg-gray-50 text-text-primary"
        )}
      >
        {checked ? (
          <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-primary" />
        ) : (
          <Circle size={16} className="mt-0.5 shrink-0 text-text-secondary" />
        )}
        <span className="flex-1">
          <span className={cn(checked && "line-through")}>{item.label}</span>
          {item.hint && (
            <span className="mt-0.5 block text-xs text-text-secondary">
              {item.hint}
            </span>
          )}
        </span>
      </button>
    </li>
  );
}
