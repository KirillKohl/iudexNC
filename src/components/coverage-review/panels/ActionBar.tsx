import { useState } from "react"
import { toast } from "sonner"

import { ConfirmDialog } from "@/components/coverage-review/ConfirmDialog"
import { Button } from "@/components/ui/button"
import { t } from "@/lib/strings"
import type { ActionKind } from "@/lib/types"

interface ActionBarProps {
  caseReference: string
}

/**
 * Trigger-Leiste für die beiden folgenreichen Entscheidungen. Beide sind
 * prüfpflichtig und laufen über denselben Bestätigungsdialog
 * (Human-in-the-loop); Erfolg wird per Toast gemeldet.
 */
export function ActionBar({ caseReference }: ActionBarProps) {
  const [openAction, setOpenAction] = useState<ActionKind | null>(null)
  const currentAction = openAction ? t.actions[openAction] : null

  function confirmAction() {
    if (!currentAction) return
    setOpenAction(null)
    toast.success(currentAction.success(caseReference))
  }

  return (
    <>
      <div className="flex flex-col gap-4 rounded-xl border bg-muted/40 p-5">
        <p className="text-sm text-muted-foreground">
          {t.actions.decisionPrefix}
          <span className="font-medium text-foreground">{caseReference}</span>
        </p>
        <div className="grid grid-cols-2 gap-2.5">
          <Button variant="outline" onClick={() => setOpenAction("escalate")}>
            {t.actions.escalate.trigger}
          </Button>
          <Button onClick={() => setOpenAction("approve")}>
            {t.actions.approve.trigger}
          </Button>
        </div>
      </div>

      <ConfirmDialog
        open={openAction !== null}
        onOpenChange={(open) => {
          if (!open) setOpenAction(null)
        }}
        title={currentAction?.title}
        description={currentAction?.description}
        confirmLabel={currentAction?.confirmLabel}
        cancelLabel={t.actions.cancel}
        onConfirm={confirmAction}
      />
    </>
  )
}
