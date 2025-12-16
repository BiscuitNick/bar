import { Header } from "@/components/header"
import { GameCard } from "@/components/game-card"
import { games } from "@/lib/games"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-12">
        <div className="mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Retro Games Hub
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Play classic retro games right in your browser. No downloads required!
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {games.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
