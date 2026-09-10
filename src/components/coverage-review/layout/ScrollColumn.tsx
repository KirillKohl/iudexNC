import { useId, type ReactNode } from "react"

interface ScrollColumnProps {
  title: string
  children: ReactNode
}

/**
 * Eine Layout-Spalte: feste Überschrift, darunter ein ab dem lg-Breakpoint
 * unabhängig scrollbarer Inhaltsbereich. Block-Flow (`space-y`) statt Flex,
 * damit die Karten trotz `overflow:hidden` ihre natürliche Höhe behalten und
 * der Container scrollt. Unter lg stapeln die Spalten und die Seite scrollt
 * als Ganzes.
 */
export function ScrollColumn({ title, children }: ScrollColumnProps) {
  const headingId = useId()

  return (
    <section
      aria-labelledby={headingId}
      className="flex min-h-0 flex-col gap-4 lg:h-full"
    >
      <h2
        id={headingId}
        className="shrink-0 font-heading text-lg font-semibold"
      >
        {title}
      </h2>
      <div className="space-y-5 lg:min-h-0 lg:flex-1 lg:overflow-y-auto lg:pr-1">
        {children}
      </div>
    </section>
  )
}
