import { SOURCE_TEXT_CLASS } from "@/components/coverage-review/styles"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { formatIsoDate } from "@/lib/format"
import { t } from "@/lib/strings"
import { cn } from "@/lib/utils"
import type { ClaimReport } from "@/lib/types"

interface ClaimReportCardProps {
  claimReport: ClaimReport
}

/** Karte „Schadensmeldung" mit Kopfdaten und dem Meldungstext als Fließtext. */
export function ClaimReportCard({ claimReport }: ClaimReportCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t.sources.claimTitle}</CardTitle>
        <CardDescription>
          {claimReport.reference}
          {t.sources.metaSeparator}
          {claimReport.claimant}
          {t.sources.metaSeparator}
          {t.sources.receivedPrefix}
          {formatIsoDate(claimReport.submittedAt)}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p
          className={cn(
            SOURCE_TEXT_CLASS,
            "whitespace-pre-line text-foreground/85",
          )}
        >
          {claimReport.body}
        </p>
      </CardContent>
    </Card>
  )
}
