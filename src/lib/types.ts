export type CoverageStatus = "covered" | "notCovered" | "unclear"

/** Eine einzelne, nummerierte Vertragsklausel aus dem Vertragsauszug. */
export interface Clause {
  id: string
  number: number
  title: string
  text: string
}

/** Kennung einer {@link Clause}; wird auch von {@link Citation} referenziert. */
export type ClauseId = Clause["id"]

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
  clauseId: ClauseId
  quote: string
  reasoning: string
}

/** Citation mit aufgelöster Klausel (`null`, wenn die `clauseId` unbekannt ist). */
export interface ResolvedCitation extends Citation {
  clause: Clause | null
}

/** Die (mockhafte) Deckungseinschätzung zum Vorgang. */
export interface Assessment {
  status: CoverageStatus
  /** Konfidenz des Prüfvorschlags in Prozent (CONFIDENCE_MIN–CONFIDENCE_MAX). */
  confidence: number
  summary: string
  citations: Citation[]
}

/** Ein vollständiger Prüfvorgang: Vertragsauszug, Schadensmeldung, Einschätzung. */
export interface CoverageCase {
  clauses: Clause[]
  claimReport: ClaimReport
  assessment: Assessment
}

/** Folgenreiche Entscheidung in der Aktionsleiste. */
export type ActionKind = "approve" | "escalate"

/** Texte einer bestätigungspflichtigen Aktion. */
export interface ActionCopy {
  trigger: string
  title: string
  description: string
  confirmLabel: string
  success: (caseReference: string) => string
}
