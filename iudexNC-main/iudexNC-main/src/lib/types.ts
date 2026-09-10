export type CoverageStatus = "covered" | "not_covered" | "unclear"

/** Eine einzelne, nummerierte Vertragsklausel aus dem Vertragsauszug. */
export interface Clause {
  id: string
  number: number
  title: string
  text: string
}

/** Die eingegangene Schadensmeldung als Fließtext plus Kopfdaten. */
export interface ClaimReport {
  reference: string
  submittedAt: string
  claimant: string
  body: string
}

/** Ein Zitat der Einschätzung, das auf genau eine Klausel verweist. */
export interface Citation {
  id: string
  clauseId: string
  quote: string
  reasoning: string
}

/** Die (mockhafte) Deckungseinschätzung zum Vorgang. */
export interface Assessment {
  status: CoverageStatus
  confidence: number
  summary: string
  citations: Citation[]
}
