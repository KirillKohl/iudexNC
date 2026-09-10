/** Zentrierter Seitencontainer mit maximaler Inhaltsbreite (App-Header + Ansicht). */
export const PAGE_CONTAINER = "mx-auto max-w-7xl"

/** Optionen für `scrollIntoView`, wenn eine verknüpfte Klausel fokussiert wird. */
export const SCROLL_INTO_VIEW_OPTIONS: ScrollIntoViewOptions = {
  behavior: "smooth",
  block: "center",
}

/** Zulässiger Bereich für `Assessment.confidence` in Prozent. */
export const CONFIDENCE_MIN = 0
export const CONFIDENCE_MAX = 100

/** Begrenzt einen Konfidenzwert defensiv auf {@link CONFIDENCE_MIN}–{@link CONFIDENCE_MAX}. */
export function clampConfidence(value: number): number {
  return Math.min(CONFIDENCE_MAX, Math.max(CONFIDENCE_MIN, value))
}
