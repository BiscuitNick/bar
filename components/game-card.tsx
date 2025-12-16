import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { Game } from "@/lib/games"

interface GameCardProps {
  game: Game
}

export function GameCard({ game }: GameCardProps) {
  return (
    <Link href={game.href} className="group block">
      <Card className="h-full transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
        <CardHeader>
          <div className={`mb-2 flex size-12 items-center justify-center rounded-lg bg-gradient-to-br ${game.color} text-2xl`}>
            {game.icon}
          </div>
          <CardTitle className="text-xl group-hover:text-primary transition-colors">
            {game.name}
          </CardTitle>
          <CardDescription>{game.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <span className="text-sm font-medium text-primary">
            Play Now &rarr;
          </span>
        </CardContent>
      </Card>
    </Link>
  )
}
