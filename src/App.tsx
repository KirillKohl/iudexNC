import { CoverageReview } from "@/components/coverage-review/CoverageReview"
import { Toaster } from "@/components/ui/sonner"
import { PAGE_CONTAINER } from "@/lib/constants"
import { demoCase } from "@/lib/mock-data"
import { t } from "@/lib/strings"
import { cn } from "@/lib/utils"

function App() {
  return (
    // Ab lg: feste Fensterhöhe, die drei Spalten scrollen intern.
    // Darunter: normale Seitenhöhe, alles stapelt und scrollt als Ganzes.
    <div className="flex min-h-svh flex-col bg-background text-foreground lg:h-svh lg:overflow-hidden">
      <header className="shrink-0 border-b bg-card/40">
        <div className={cn(PAGE_CONTAINER, "px-5 py-5 sm:px-8")}>
          <h1 className="font-heading text-xl font-semibold">{t.app.title}</h1>
          <p className="text-sm text-muted-foreground">{t.app.subtitle}</p>
        </div>
      </header>

      <main className="flex-1 lg:min-h-0">
        <CoverageReview coverageCase={demoCase} />
      </main>

      <Toaster />
    </div>
  )
}

export default App
