import { ClaimReportCard } from "@/components/coverage-review/panels/ClaimReportCard"
import { ContractExcerptCard } from "@/components/coverage-review/panels/ContractExcerptCard"
import type { ClaimReport, Clause, ClauseId } from "@/lib/types"

interface SourcesColumnProps {
  clauses: Clause[]
  claimReport: ClaimReport
  activeClauseId: ClauseId | null
}

/** Inhalt der Spalte „Quellen": Vertragsauszug und Schadensmeldung. */
export function SourcesColumn({
  clauses,
  claimReport,
  activeClauseId,
}: SourcesColumnProps) {
  return (
    <>
      <ContractExcerptCard clauses={clauses} activeClauseId={activeClauseId} />
      <ClaimReportCard claimReport={claimReport} />
    </>
  )
}
