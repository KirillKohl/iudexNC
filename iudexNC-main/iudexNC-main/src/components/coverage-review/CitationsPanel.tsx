import { useMemo } from "react"

import { cn } from "@/lib/utils"
import type { Citation, Clause } from "@/lib/types"

interface CitationsPanelProps {
  citations: Citation[]
  clauses: Clause[]
  activeClauseId: string | null
  onCitationClick: (clauseId: string) => void
}

/**
 * Inhalt der Spalte „Belegstellen": die Zitate-Liste. Ein Klick auf ein Zitat
 * hebt die zugehörige Klausel in der Spalte „Quellen" hervor.
 * Überschrift und Scroll-Container stellt die <ColumnShell> bereit.
 */
export function CitationsPanel({
  citations,
  clauses,
  activeClauseId,
  onCitationClick,
}: CitationsPanelProps) {
  const clausesById = useMemo(
    () => new Map(clauses.map((clause) => [clause.id, clause])),
    [clauses],
  )

  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm text-muted-foreground">
        Auf ein Zitat klicken, um die Klausel links hervorzuheben.
      </p>
      <ul className="flex flex-col gap-3">
        {citations.map((citation) => {
          const clause = clausesById.get(citation.clauseId)
          const isActive = citation.clauseId === activeClauseId

          return (
            <li key={citation.id}>
              <button
                type="button"
                onClick={() => onCitationClick(citation.clauseId)}
                aria-pressed={isActive}
                className={cn(
                  "w-full rounded-lg border px-4 py-3 text-left",
                  "hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
                  isActive
                    ? "border-highlight bg-highlight-surface"
                    : "border-border",
                )}
              >
                <span className="text-xs font-medium text-muted-foreground">
                  {clause
                    ? `Verweis auf § ${clause.number} · ${clause.title}`
                    : "Verweis auf Klausel"}
                </span>
                <blockquote className="mt-1.5 border-l-2 border-border/70 pl-3 font-serif text-[0.95rem] leading-relaxed text-foreground/90 italic">
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
