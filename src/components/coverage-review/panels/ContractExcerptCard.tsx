import { ClauseItem } from "@/components/coverage-review/panels/ClauseItem"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { t } from "@/lib/strings"
import type { Clause, ClauseId } from "@/lib/types"

interface ContractExcerptCardProps {
  clauses: Clause[]
  activeClauseId: ClauseId | null
}

/** Karte „Vertragsauszug" mit der Liste der nummerierten Klauseln. */
export function ContractExcerptCard({
  clauses,
  activeClauseId,
}: ContractExcerptCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t.sources.contractTitle}</CardTitle>
        <CardDescription>{t.sources.contractHint}</CardDescription>
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
  )
}
