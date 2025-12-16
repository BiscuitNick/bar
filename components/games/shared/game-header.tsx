import Link from "next/link"
import { ArrowLeft } from "lucide-react"

interface GameHeaderProps {
  title: string
  description?: string
}

export function GameHeader({ title, description }: GameHeaderProps) {
  return (
    <div className="mb-8 flex flex-col gap-4">
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Back to Games
        </Link>
      </div>
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        {description && (
          <p className="mt-2 text-muted-foreground">{description}</p>
        )}
      </div>
    </div>
  )
}
