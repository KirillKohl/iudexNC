import type { ActionCopy, CoverageStatus } from "@/lib/types"

/**
 * Zentrale Sammlung aller im UI sichtbaren Texte (de). Bündelt die Strings,
 * die vorher über mehrere Komponenten verstreut waren – ein möglicher
 * Ansatzpunkt für spätere Lokalisierung.
 */
export const t = {
  app: {
    title: "Deckungsprüfung Rechtsschutz",
    subtitle:
      "Sachbearbeitung – Leistungspflicht anhand von Vertrag und Schadensmeldung prüfen",
  },
  columns: {
    sources: "Quellen",
    citations: "Belegstellen",
    assessment: "Einschätzung",
  },
  sources: {
    contractTitle: "Vertragsauszug",
    contractHint: "Fiktiver Auszug – keine Rechtsberatung.",
    claimTitle: "Schadensmeldung",
    metaSeparator: " · ",
    receivedPrefix: "eingegangen am ",
  },
  citations: {
    hint: "Auf ein Zitat klicken, um die Klausel links hervorzuheben.",
    referencePrefix: "Verweis auf ",
    referenceFallback: "Verweis auf Klausel",
  },
  assessment: {
    title: "Deckungseinschätzung",
    subtitle: "Automatischer Prüfvorschlag",
    confidenceLabel: "Konfidenz",
    statusLabels: {
      covered: "Gedeckt",
      notCovered: "Nicht gedeckt",
      unclear: "Unklar",
    } satisfies Record<CoverageStatus, string>,
  },
  actions: {
    decisionPrefix: "Entscheidung für Vorgang ",
    cancel: "Abbrechen",
    approve: {
      trigger: "Genehmigen",
      title: "Genehmigung bestätigen",
      description:
        "Die Deckungszusage wird im Vorgang vermerkt und der antragstellenden Person mitgeteilt. Die Entscheidung kann nicht ohne Weiteres zurückgenommen werden.",
      confirmLabel: "Genehmigen",
      success: (caseReference: string) =>
        `Fall genehmigt – Vorgang ${caseReference} abgeschlossen.`,
    } satisfies ActionCopy,
    escalate: {
      trigger: "Eskalieren",
      title: "Fall eskalieren",
      description:
        "Der Fall wird zur weiteren Prüfung an die Teamleitung weitergeleitet.",
      confirmLabel: "Eskalieren",
      success: (caseReference: string) =>
        `Fall an Teamleitung weitergeleitet – Vorgang ${caseReference}.`,
    } satisfies ActionCopy,
  },
}
