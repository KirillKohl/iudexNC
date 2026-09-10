import { useMemo, useState, type CSSProperties, type ReactNode } from "react"

import { ScrollColumn } from "@/components/coverage-review/layout/ScrollColumn"
import { ActionBar } from "@/components/coverage-review/panels/ActionBar"
import { AssessmentColumn } from "@/components/coverage-review/panels/AssessmentColumn"
import { CitationsColumn } from "@/components/coverage-review/panels/CitationsColumn"
import { SourcesColumn } from "@/components/coverage-review/panels/SourcesColumn"
import { resolveCitations } from "@/lib/citations"
import { PAGE_CONTAINER } from "@/lib/constants"
import { t } from "@/lib/strings"
import { cn } from "@/lib/utils"
import type { ClauseId, CoverageCase } from "@/lib/types"

interface CoverageReviewProps {
  coverageCase: CoverageCase
}

/** Eine Layout-Spalte der Ansicht: Titel, Grid-Track-Breite und Inhalt. */
interface CoverageColumn {
  id: string
  title: string
  /** Wert für `grid-template-columns` (nur ab lg wirksam). */
  track: string
  content: ReactNode
}

export function CoverageReview({ coverageCase }: CoverageReviewProps) {
  const { clauses, claimReport, assessment } = coverageCase

  // Einzige geteilte Zustandsgröße: die aktuell hervorgehobene Klausel.
  const [activeClauseId, setActiveClauseId] = useState<ClauseId | null>(null)

  const citations = useMemo(
    () => resolveCitations(assessment.citations, clauses),
    [assessment.citations, clauses],
  )

  function selectClause(clauseId: ClauseId) {
    setActiveClauseId((current) => (current === clauseId ? null : clauseId))
  }

  const columns: CoverageColumn[] = [
    {
      id: "sources",
      title: t.columns.sources,
      track: "2fr",
      content: (
        <SourcesColumn
          clauses={clauses}
          claimReport={claimReport}
          activeClauseId={activeClauseId}
        />
      ),
    },
    {
      id: "citations",
      title: t.columns.citations,
      track: "3fr",
      content: (
        <CitationsColumn
          citations={citations}
          activeClauseId={activeClauseId}
          onSelectClause={selectClause}
        />
      ),
    },
    {
      id: "assessment",
      title: t.columns.assessment,
      track: "minmax(240px, 1fr)",
      content: (
        <>
          <AssessmentColumn
            status={assessment.status}
            confidence={assessment.confidence}
            summary={assessment.summary}
          />
          <ActionBar caseReference={claimReport.reference} />
        </>
      ),
    },
  ]

  return (
    <div
      style={
        {
          "--coverage-columns": columns.map((column) => column.track).join(" "),
        } as CSSProperties
      }
      className={cn(
        PAGE_CONTAINER,
        "grid gap-8 p-5 sm:p-8 lg:h-full lg:grid-rows-1 lg:[grid-template-columns:var(--coverage-columns)]",
      )}
    >
      {columns.map((column) => (
        <ScrollColumn key={column.id} title={column.title}>
          {column.content}
        </ScrollColumn>
      ))}
    </div>
  )
}
