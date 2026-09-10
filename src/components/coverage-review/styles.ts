/**
 * Wiederverwendete Tailwind-Klassenbündel der Coverage-Review-Ansicht –
 * zentral, damit gleiche visuelle Rollen nicht mehrfach hartkodiert werden.
 */

/** Serifen-Typografie für Fließtext aus Originalquellen (Klausel, Schadensmeldung, Zitat). */
export const SOURCE_TEXT_CLASS = "font-serif text-[0.95rem] leading-relaxed"

/**
 * Scroll-Offset, damit eine hervorgehobene Klausel nicht unter dem
 * Spaltenkopf landet. Wert an der Kopf-/Spaltenhöhe ausgerichtet – bei
 * Änderungen dort mit anpassen.
 */
export const CLAUSE_SCROLL_ANCHOR = "scroll-mt-24"

/** Aktive Verknüpfung mit der ausgewählten Klausel. */
export const HIGHLIGHT_ACTIVE = "border-highlight bg-highlight-surface"
/** Ruhezustand einer Klausel in der Quellen-Spalte. */
export const HIGHLIGHT_INACTIVE_CLAUSE = "border-transparent bg-muted/40"
/** Ruhezustand eines Zitat-Buttons in der Belegstellen-Spalte. */
export const HIGHLIGHT_INACTIVE_CITATION = "border-border"
