import { useState } from "react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

type ActionKind = "approve" | "escalate"

/**
 * Beide Entscheidungen sind folgenreich und prüfpflichtig und laufen daher
 * über denselben Bestätigungsdialog (Human-in-the-loop). `{ref}` wird in der
 * Erfolgsmeldung durch die Vorgangsnummer ersetzt.
 */
const ACTIONS: Record<
  ActionKind,
  {
    trigger: string
    title: string
    description: string
    confirmLabel: string
    success: string
  }
> = {
  approve: {
    trigger: "Genehmigen",
    title: "Genehmigung bestätigen",
    description:
      "Die Deckungszusage wird im Vorgang vermerkt und der antragstellenden Person mitgeteilt. Die Entscheidung kann nicht ohne Weiteres zurückgenommen werden.",
    confirmLabel: "Genehmigen",
    success: "Fall genehmigt – Vorgang {ref} abgeschlossen.",
  },
  escalate: {
    trigger: "Eskalieren",
    title: "Fall eskalieren",
    description:
      "Der Fall wird zur weiteren Prüfung an die Teamleitung weitergeleitet.",
    confirmLabel: "Eskalieren",
    success: "Fall an Teamleitung weitergeleitet – Vorgang {ref}.",
  },
}

interface ActionBarProps {
  claimReference: string
}

export function ActionBar({ claimReference }: ActionBarProps) {
  const [openAction, setOpenAction] = useState<ActionKind | null>(null)
  const active = openAction ? ACTIONS[openAction] : null

  function confirmAction() {
    if (!openAction) return
    const message = ACTIONS[openAction].success.replace("{ref}", claimReference)
    setOpenAction(null)
    toast.success(message)
  }

  return (
    <>
      <div className="flex flex-col gap-4 rounded-xl border bg-muted/40 p-5">
        <p className="text-sm text-muted-foreground">
          Entscheidung für Vorgang{" "}
          <span className="font-medium text-foreground">{claimReference}</span>
        </p>
        <div className="grid grid-cols-2 gap-2.5">
          <Button variant="outline" onClick={() => setOpenAction("escalate")}>
            {ACTIONS.escalate.trigger}
          </Button>
          <Button onClick={() => setOpenAction("approve")}>
            {ACTIONS.approve.trigger}
          </Button>
        </div>
      </div>

      <Dialog
        open={openAction !== null}
        onOpenChange={(open) => {
          if (!open) setOpenAction(null)
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{active?.title}</DialogTitle>
            <DialogDescription>{active?.description}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Abbrechen</Button>
            </DialogClose>
            <Button onClick={confirmAction}>{active?.confirmLabel}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
