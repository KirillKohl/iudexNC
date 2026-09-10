import { useState, type ReactNode } from "react"

import { ActionBar } from "@/components/coverage-review/ActionBar"
import { AssessmentPanel } from "@/components/coverage-review/AssessmentPanel"
import { CitationsPanel } from "@/components/coverage-review/CitationsPanel"
import { SourcesPanel } from "@/components/coverage-review/SourcesPanel"
import { assessment, claimReport, contractClauses } from "@/lib/mock-data"

/**
 * Eine Layout-Spalte: feste Überschrift, darunter ein ab dem lg-Breakpoint
 * unabhängig scrollbarer Inhaltsbereich. Darunter (mobil) stapeln die Spalten
 * einfach und die Seite scrollt als Ganzes.
 */
function ColumnShell({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  return (
    <section aria-label={title} className="flex min-h-0 flex-col gap-4 lg:h-full">
      <h2 className="shrink-0 font-heading text-lg font-semibold">{title}</h2>
      {/*
        Block-Flow (space-y statt flex): die Karten behalten ihre natürliche
        Höhe und laufen über – der Container scrollt. In einem Flex-Container
        würden sie wegen `overflow:hidden` der Card-Komponente stattdessen
        zusammengestaucht.
      */}
      <div className="space-y-5 lg:min-h-0 lg:flex-1 lg:overflow-y-auto lg:pr-1">
        {children}
      </div>
    </section>
  )
}

export function CoverageReview() {
  // Einzige geteilte Zustandsgröße: die aktuell hervorgehobene Klausel.
  const [activeClauseId, setActiveClauseId] = useState<string | null>(null)

  // Der Status stammt derzeit unverändert aus den Mock-Daten.
  // Für ein manuelles Override später hier
  //   const [status, setStatus] = useState(assessment.status)
  // einführen und `setStatus` an <AssessmentPanel> durchreichen.
  const status = assessment.status

  function toggleClause(clauseId: string) {
    setActiveClauseId((current) => (current === clauseId ? null : clauseId))
  }

  return (
    <div className="mx-auto grid max-w-7xl gap-8 p-5 sm:p-8 lg:h-full lg:grid-cols-[2fr_3fr_minmax(240px,1fr)] lg:grid-rows-1">
      <ColumnShell title="Quellen">
        <SourcesPanel
          clauses={contractClauses}
          claimReport={claimReport}
          activeClauseId={activeClauseId}
        />
      </ColumnShell>

      <ColumnShell title="Belegstellen">
        <CitationsPanel
          citations={assessment.citations}
          clauses={contractClauses}
          activeClauseId={activeClauseId}
          onCitationClick={toggleClause}
        />
      </ColumnShell>

      {/*
        Rechte Spalte bleibt durch die feste Höhe des Layouts immer vollständig
        sichtbar – unabhängig davon, wie lang die Belegstellen-Liste ist.
      */}
      <ColumnShell title="Einschätzung">
        <AssessmentPanel status={status} assessment={assessment} />
        <ActionBar claimReference={claimReport.reference} />
      </ColumnShell>
    </div>
  )
}
