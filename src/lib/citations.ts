import type { Citation, Clause, ResolvedCitation } from "@/lib/types"

/**
 * Löst jede Citation auf ihre Klausel auf. Eine unbekannte `clauseId` ergibt
 * `clause: null` (die Anzeige fällt dann auf einen generischen Verweis zurück)
 * und wird im Dev-Build als Warnung gemeldet, damit fehlerhafte Daten früh
 * auffallen.
 */
export function resolveCitations(
  citations: Citation[],
  clauses: Clause[],
): ResolvedCitation[] {
  const clauseById = new Map(clauses.map((clause) => [clause.id, clause]))

  return citations.map((citation) => {
    const clause = clauseById.get(citation.clauseId) ?? null

    if (import.meta.env.DEV && !clause) {
      console.warn(
        `resolveCitations: Citation "${citation.id}" verweist auf unbekannte clauseId "${citation.clauseId}".`,
      )
    }

    return { ...citation, clause }
  })
}
