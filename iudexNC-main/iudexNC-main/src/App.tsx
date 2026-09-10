import { CoverageReview } from "@/components/coverage-review/CoverageReview"
import { Toaster } from "@/components/ui/sonner"

function App() {
  return (
    // Ab lg: feste Fensterhöhe, die drei Spalten scrollen intern.
    // Darunter: normale Seitenhöhe, alles stapelt und scrollt als Ganzes.
    <div className="flex min-h-svh flex-col bg-background text-foreground lg:h-svh lg:overflow-hidden">
      <header className="shrink-0 border-b bg-card/40">
        <div className="mx-auto max-w-7xl px-5 py-5 sm:px-8">
          <h1 className="font-heading text-xl font-semibold">
            Deckungsprüfung Rechtsschutz
          </h1>
          <p className="text-sm text-muted-foreground">
            Sachbearbeitung – Leistungspflicht anhand von Vertrag und
            Schadensmeldung prüfen
          </p>
        </div>
      </header>

      <main className="flex-1 lg:min-h-0">
        <CoverageReview />
      </main>

      <Toaster />
    </div>
  )
}

export default App
