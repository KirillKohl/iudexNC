import { t } from "@/lib/strings"
import type { Clause } from "@/lib/types"

/** Klausel-Label, z. B. „§ 2 · Wartezeit". */
export function formatClauseLabel(clause: Clause): string {
  return `§ ${clause.number} · ${clause.title}`
}

/** Verweistext für ein Zitat; Fallback, wenn die Klausel nicht auflösbar ist. */
export function formatCitationReference(clause: Clause | null): string {
  return clause
    ? `${t.citations.referencePrefix}${formatClauseLabel(clause)}`
    : t.citations.referenceFallback
}

/** ISO-Datum als „08. September 2026"; bei ungültiger Eingabe unverändert. */
export function formatIsoDate(iso: string): string {
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return iso
  return date.toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  })
}

/** Ganzzahliger Prozentwert als Text, z. B. „58%". */
export function formatPercent(value: number): string {
  return `${value}%`
}
