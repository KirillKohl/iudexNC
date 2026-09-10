import type { Assessment, ClaimReport, Clause, CoverageCase } from "@/lib/types"

/**
 * Fiktiver Vertragsauszug. Rein zu Demozwecken – keine echten
 * Versicherungsbedingungen und keine Rechtsberatung.
 */
const contractClauses: Clause[] = [
  {
    id: "clause-1",
    number: 1,
    title: "Deckungsumfang",
    text: "Versicherungsschutz besteht für die Wahrnehmung rechtlicher Interessen der versicherten Person im Arbeits-, Miet- und allgemeinen Vertragsrecht. Der Versicherer trägt die gesetzlichen Anwalts- und Gerichtskosten bis zur vereinbarten Versicherungssumme von 300.000 EUR je Rechtsschutzfall.",
  },
  {
    id: "clause-2",
    number: 2,
    title: "Wartezeit",
    text: "Für Streitigkeiten aus dem Arbeits- und dem allgemeinen Vertragsrecht gilt eine Wartezeit von drei Monaten ab Versicherungsbeginn. Rechtsschutzfälle, die vor Ablauf der Wartezeit eintreten, sind vom Versicherungsschutz ausgeschlossen. Für Schadenersatzansprüche aus einem Verkehrsunfall entfällt die Wartezeit.",
  },
  {
    id: "clause-3",
    number: 3,
    title: "Ausschlüsse",
    text: "Kein Versicherungsschutz besteht für die Wahrnehmung rechtlicher Interessen im Zusammenhang mit vorsätzlich begangenen Straftaten, mit dem Erwerb oder der Veräußerung von Grundstücken sowie für Streitigkeiten zwischen mitversicherten Personen desselben Vertrags.",
  },
  {
    id: "clause-4",
    number: 4,
    title: "Selbstbeteiligung und Anzeigepflicht",
    text: "Je Rechtsschutzfall trägt die versicherte Person eine Selbstbeteiligung von 250 EUR. Der Rechtsschutzfall ist dem Versicherer unverzüglich, spätestens innerhalb von vier Wochen nach Kenntnis, schriftlich anzuzeigen.",
  },
]

/** Fiktive Schadensmeldung zum Vorgang. */
const claimReport: ClaimReport = {
  reference: "RS-2026-04817",
  submittedAt: "2026-09-08",
  claimant: "M. Berger",
  body: "Die Versicherungsnehmerin hat ihren Rechtsschutzvertrag zum 01.07.2026 abgeschlossen. Am 25.08.2026 erhielt sie von ihrer Arbeitgeberin eine ordentliche Kündigung zum 30.09.2026, die sie für sozial ungerechtfertigt hält. Sie möchte fristgerecht eine Kündigungsschutzklage vor dem Arbeitsgericht erheben und bittet um Kostendeckung für die anwaltliche Vertretung. Der Streitwert wird auf drei Bruttomonatsgehälter (rund 12.600 EUR) geschätzt. Die schriftliche Meldung ging am 08.09.2026 bei uns ein. Anhaltspunkte für eine vorsätzliche Pflichtverletzung der Versicherungsnehmerin liegen nicht vor.",
}

/**
 * Mockhafte Deckungseinschätzung. Jede Citation verweist über `clauseId`
 * auf eine Klausel in `contractClauses`.
 */
const assessment: Assessment = {
  status: "unclear",
  confidence: 58,
  summary:
    "Der Sachverhalt fällt sachlich unter den Arbeitsrechts-Rechtsschutz, jedoch liegt der auslösende Zeitpunkt möglicherweise innerhalb der dreimonatigen Wartezeit. Die Deckung hängt davon ab, welcher Zeitpunkt als Eintritt des Rechtsschutzfalls gewertet wird.",
  citations: [
    {
      id: "cite-1",
      clauseId: "clause-1",
      quote:
        "Versicherungsschutz besteht für die Wahrnehmung rechtlicher Interessen der versicherten Person im Arbeits-, Miet- und allgemeinen Vertragsrecht.",
      reasoning:
        "Eine Kündigungsschutzklage ist eine arbeitsrechtliche Streitigkeit und damit grundsätzlich vom Deckungsumfang erfasst.",
    },
    {
      id: "cite-2",
      clauseId: "clause-2",
      quote:
        "Für Streitigkeiten aus dem Arbeits- und dem allgemeinen Vertragsrecht gilt eine Wartezeit von drei Monaten ab Versicherungsbeginn.",
      reasoning:
        "Versicherungsbeginn 01.07.2026, Wartezeitende 01.10.2026. Die Kündigung vom 25.08.2026 liegt innerhalb der Wartezeit – entscheidend ist, ob auf den Zugang der Kündigung oder auf die Klageerhebung abgestellt wird.",
    },
    {
      id: "cite-3",
      clauseId: "clause-4",
      quote:
        "Der Rechtsschutzfall ist dem Versicherer unverzüglich, spätestens innerhalb von vier Wochen nach Kenntnis, schriftlich anzuzeigen.",
      reasoning:
        "Kenntnis am 25.08.2026, Meldung am 08.09.2026 – die Vier-Wochen-Frist ist gewahrt, hieraus ergibt sich kein Deckungshindernis.",
    },
  ],
}

/** Fiktiver Demo-Vorgang für die Ansicht. */
export const demoCase: CoverageCase = {
  clauses: contractClauses,
  claimReport,
  assessment,
}
