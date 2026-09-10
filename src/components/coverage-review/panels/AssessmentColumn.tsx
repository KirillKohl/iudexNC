import { STATUS_DISPLAY } from "@/components/coverage-review/status-display"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { clampConfidence } from "@/lib/constants"
import { formatPercent } from "@/lib/format"
import { t } from "@/lib/strings"
import { cn } from "@/lib/utils"
import type { CoverageStatus } from "@/lib/types"

interface AssessmentColumnProps {
  status: CoverageStatus
  confidence: number
  summary: string
}

/**
 * Inhalt der Spalte „Einschätzung": Status-Pille, Konfidenz-Anzeige und
 * Kurzbegründung. Die Aktionsleiste rendert CoverageReview daneben.
 */
export function AssessmentColumn({
  status,
  confidence,
  summary,
}: AssessmentColumnProps) {
  const { label, Icon, toneClasses } = STATUS_DISPLAY[status]
  const clampedConfidence = clampConfidence(confidence)

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t.assessment.title}</CardTitle>
        <CardDescription>{t.assessment.subtitle}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        <div
          className={cn(
            "flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium",
            toneClasses,
          )}
        >
          <Icon className="size-4 shrink-0" />
          <span>{label}</span>
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              {t.assessment.confidenceLabel}
            </span>
            <span className="font-medium tabular-nums">
              {formatPercent(clampedConfidence)}
            </span>
          </div>
          <Progress value={clampedConfidence} className="h-2.5" />
        </div>

        <Separator />

        <p className="text-sm leading-relaxed text-muted-foreground">{summary}</p>
      </CardContent>
    </Card>
  )
}
