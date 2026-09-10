import {
  HIGHLIGHT_ACTIVE,
  HIGHLIGHT_INACTIVE_CITATION,
  SOURCE_TEXT_CLASS,
} from "@/components/coverage-review/styles"
import { formatCitationReference } from "@/lib/format"
import { t } from "@/lib/strings"
import { cn } from "@/lib/utils"
import type { ClauseId, ResolvedCitation } from "@/lib/types"

interface CitationsColumnProps {
  citations: ResolvedCitation[]
  activeClauseId: ClauseId | null
  onSelectClause: (clauseId: ClauseId) => void
}

/**
 * Inhalt der Spalte „Belegstellen": die Zitate-Liste. Ein Klick auf ein Zitat
 * hebt die zugehörige Klausel in der Spalte „Quellen" hervor.
 */
export function CitationsColumn({
  citations,
  activeClauseId,
  onSelectClause,
}: CitationsColumnProps) {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm text-muted-foreground">{t.citations.hint}</p>
      <ul className="flex flex-col gap-3">
        {citations.map((citation) => {
          const isActive = citation.clauseId === activeClauseId

          return (
            <li key={citation.id}>
              <button
                type="button"
                onClick={() => onSelectClause(citation.clauseId)}
                aria-pressed={isActive}
                className={cn(
                  "w-full rounded-lg border px-4 py-3 text-left",
                  "hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
                  isActive ? HIGHLIGHT_ACTIVE : HIGHLIGHT_INACTIVE_CITATION,
                )}
              >
                <span className="text-xs font-medium text-muted-foreground">
                  {formatCitationReference(citation.clause)}
                </span>
                <blockquote
                  className={cn(
                    SOURCE_TEXT_CLASS,
                    "mt-1.5 border-l-2 border-border/70 pl-3 text-foreground/90 italic",
                  )}
                >
                  „{citation.quote}“
                </blockquote>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {citation.reasoning}
                </p>
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
