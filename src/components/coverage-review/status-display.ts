import type { LucideIcon } from "lucide-react"
import { ShieldCheckIcon, ShieldQuestionIcon, ShieldXIcon } from "lucide-react"

import { t } from "@/lib/strings"
import type { CoverageStatus } from "@/lib/types"

/** Anzeige je Deckungsstatus: Label, Icon (nie Farbe allein) und Tonklassen. */
export interface StatusDisplay {
  label: string
  Icon: LucideIcon
  /** Token-basierte Flächen-/Text-/Rahmenklassen für die Status-Pille. */
  toneClasses: string
}

export const STATUS_DISPLAY: Record<CoverageStatus, StatusDisplay> = {
  covered: {
    label: t.assessment.statusLabels.covered,
    Icon: ShieldCheckIcon,
    toneClasses:
      "bg-status-covered-surface text-status-covered border-status-covered/35",
  },
  notCovered: {
    label: t.assessment.statusLabels.notCovered,
    Icon: ShieldXIcon,
    toneClasses:
      "bg-status-denied-surface text-status-denied border-status-denied/35",
  },
  unclear: {
    label: t.assessment.statusLabels.unclear,
    Icon: ShieldQuestionIcon,
    toneClasses:
      "bg-status-unclear-surface text-status-unclear border-status-unclear/40",
  },
}
