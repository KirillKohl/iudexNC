import { useEffect, useRef } from "react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { ClaimReport, Clause } from "@/lib/types"

interface SourcesPanelProps {
  clauses: Clause[]
  claimReport: ClaimReport
  activeClauseId: string | null
}

/**
 * Inhalt der Spalte „Quellen". Überschrift und Scroll-Container stellt die
 * <ColumnShell> in CoverageReview bereit.
 */
export function SourcesPanel({
  clauses,
  claimReport,
  activeClauseId,
}: SourcesPanelProps) {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Vertragsauszug</CardTitle>
          <CardDescription>Fiktiver Auszug – keine Rechtsberatung.</CardDescription>
        </CardHeader>
        <CardContent>
          <ol className="flex flex-col gap-3">
            {clauses.map((clause) => (
              <ClauseItem
                key={clause.id}
                clause={clause}
                isActive={clause.id === activeClauseId}
              />
            ))}
          </ol>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Schadensmeldung</CardTitle>
          <CardDescription>
            {claimReport.reference} · {claimReport.claimant} · eingegangen am{" "}
            {formatDate(claimReport.submittedAt)}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="font-serif text-[0.95rem] leading-relaxed whitespace-pre-line text-foreground/85">
            {claimReport.body}
          </p>
        </CardContent>
      </Card>
    </>
  )
}

/**
 * Eine Klausel. Bei `isActive` wird sie farblich hervorgehoben und in den
 * sichtbaren Bereich des Spalten-Scrollcontainers gescrollt.
 */
function ClauseItem({ clause, isActive }: { clause: Clause; isActive: boolean }) {
  const ref = useRef<HTMLLIElement>(null)

  useEffect(() => {
    if (isActive) {
      ref.current?.scrollIntoView({ behavior: "smooth", block: "center" })
    }
  }, [isActive])

  return (
    <li
      ref={ref}
      className={cn(
        "scroll-mt-24 rounded-lg border px-4 py-3",
        isActive
          ? "border-highlight bg-highlight-surface"
          : "border-transparent bg-muted/40",
      )}
    >
      <p className="text-sm font-medium">
        § {clause.number} · {clause.title}
      </p>
      <p className="mt-1.5 font-serif text-[0.95rem] leading-relaxed text-foreground/85">
        {clause.text}
      </p>
    </li>
  )
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  })
}
