import { useEffect, useRef } from "react"

import {
  CLAUSE_SCROLL_ANCHOR,
  HIGHLIGHT_ACTIVE,
  HIGHLIGHT_INACTIVE_CLAUSE,
  SOURCE_TEXT_CLASS,
} from "@/components/coverage-review/styles"
import { SCROLL_INTO_VIEW_OPTIONS } from "@/lib/constants"
import { formatClauseLabel } from "@/lib/format"
import { cn } from "@/lib/utils"
import type { Clause } from "@/lib/types"

interface ClauseItemProps {
  clause: Clause
  isActive: boolean
}

/**
 * Eine Klausel. Bei `isActive` farblich hervorgehoben, per `aria-current` für
 * assistive Technik ausgezeichnet und in den sichtbaren Bereich des
 * Spalten-Scrollcontainers gescrollt.
 */
export function ClauseItem({ clause, isActive }: ClauseItemProps) {
  const ref = useRef<HTMLLIElement>(null)

  useEffect(() => {
    if (isActive) {
      ref.current?.scrollIntoView(SCROLL_INTO_VIEW_OPTIONS)
    }
  }, [isActive])

  return (
    <li
      ref={ref}
      aria-current={isActive ? "true" : undefined}
      className={cn(
        CLAUSE_SCROLL_ANCHOR,
        "rounded-lg border px-4 py-3",
        isActive ? HIGHLIGHT_ACTIVE : HIGHLIGHT_INACTIVE_CLAUSE,
      )}
    >
      <p className="text-sm font-medium">{formatClauseLabel(clause)}</p>
      <p className={cn(SOURCE_TEXT_CLASS, "mt-1.5 text-foreground/85")}>
        {clause.text}
      </p>
    </li>
  )
}
