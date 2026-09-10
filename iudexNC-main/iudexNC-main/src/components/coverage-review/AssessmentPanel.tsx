import type { ComponentType } from "react"
import { ShieldCheckIcon, ShieldQuestionIcon, ShieldXIcon } from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import type { Assessment, CoverageStatus } from "@/lib/types"

/**
 * Darstellung je Status: Label, Lucide-Icon (nie Farbe allein) und die
 * token-basierten Flächen-/Textklassen. Ein manuell gesetzter Status ließe
 * sich hier ohne weitere Änderung abbilden.
 */
const STATUS_DISPLAY: Record<
  CoverageStatus,
  { label: string; Icon: ComponentType<{ className?: string }>; className: string }
> = {
  covered: {
    label: "Gedeckt",
    Icon: ShieldCheckIcon,
    className:
      "bg-status-covered-surface text-status-covered border-status-covered/35",
  },
  not_covered: {
    label: "Nicht gedeckt",
    Icon: ShieldXIcon,
    className:
      "bg-status-denied-surface text-status-denied border-status-denied/35",
  },
  unclear: {
    label: "Unklar",
    Icon: ShieldQuestionIcon,
    className:
      "bg-status-unclear-surface text-status-unclear border-status-unclear/40",
  },
}

interface AssessmentPanelProps {
  status: CoverageStatus
  assessment: Assessment
}

/**
 * Inhalt der Spalte „Einschätzung": Status, Konfidenz-Anzeige und
 * Kurzbegründung. Die Aktionsleiste sitzt in derselben Spalte, wird aber in
 * CoverageReview daneben gerendert.
 */
export function AssessmentPanel({ status, assessment }: AssessmentPanelProps) {
  const { label, Icon, className } = STATUS_DISPLAY[status]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Deckungseinschätzung</CardTitle>
        <CardDescription>Automatischer Prüfvorschlag</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        <div
          className={cn(
            "flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium",
            className,
          )}
        >
          <Icon className="size-4 shrink-0" />
          <span>{label}</span>
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Konfidenz</span>
            <span className="font-medium tabular-nums">
              {assessment.confidence}%
            </span>
          </div>
          <Progress value={assessment.confidence} className="h-2.5" />
        </div>

        <Separator />

        <p className="text-sm leading-relaxed text-muted-foreground">
          {assessment.summary}
        </p>
      </CardContent>
    </Card>
  )
}
