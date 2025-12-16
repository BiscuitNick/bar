"use client"

import Link from "next/link"
import { ArrowLeft, Bomb, Clock, Flag, RotateCcw, Trophy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MinesweeperBoard } from "@/components/games/minesweeper/minesweeper-board"
import { useMinesweeper } from "@/hooks/use-minesweeper"
import type { Difficulty } from "@/lib/games/minesweeper/types"

const difficulties: { value: Difficulty; label: string }[] = [
  { value: "easy", label: "Easy" },
  { value: "medium", label: "Medium" },
  { value: "hard", label: "Hard" },
]

export default function MinesweeperPage() {
  const { gameState, actions } = useMinesweeper()

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8">
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            Back to Games
          </Link>
        </div>

        <div className="flex flex-col items-center gap-8">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-3xl font-bold">Minesweeper</h1>
            <p className="mt-2 text-muted-foreground">
              Click to reveal cells. Right-click to flag mines.
            </p>
          </div>

          {/* Difficulty Selector */}
          <div className="flex gap-2">
            {difficulties.map((d) => (
              <Button
                key={d.value}
                variant={gameState.difficulty === d.value ? "default" : "outline"}
                size="sm"
                onClick={() => actions.changeDifficulty(d.value)}
              >
                {d.label}
              </Button>
            ))}
          </div>

          {/* Stats Bar */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Bomb className="size-5" />
              <span className="text-xl font-bold">{gameState.minesRemaining}</span>
            </div>
            <Button variant="outline" size="icon" onClick={actions.restart}>
              <RotateCcw className="size-4" />
            </Button>
            <div className="flex items-center gap-2">
              <Clock className="size-5" />
              <span className="text-xl font-bold tabular-nums">
                {formatTime(gameState.timeElapsed)}
              </span>
            </div>
          </div>

          {/* Game Board */}
          <div className="relative">
            <MinesweeperBoard
              board={gameState.board}
              status={gameState.status}
              onCellClick={actions.handleCellClick}
              onCellRightClick={actions.handleCellRightClick}
            />

            {/* Game Over Overlay */}
            {gameState.status === "lost" && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm">
                <Bomb className="mb-4 size-12 text-red-500" />
                <h2 className="mb-2 text-2xl font-bold">Game Over!</h2>
                <p className="mb-4 text-muted-foreground">You hit a mine</p>
                <Button onClick={actions.restart}>
                  <RotateCcw className="mr-2 size-4" />
                  Try Again
                </Button>
              </div>
            )}

            {/* Win Overlay */}
            {gameState.status === "won" && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm">
                <Trophy className="mb-4 size-12 text-yellow-500" />
                <h2 className="mb-2 text-2xl font-bold">You Won!</h2>
                <p className="mb-4 text-muted-foreground">
                  Time: {formatTime(gameState.timeElapsed)}
                </p>
                <Button onClick={actions.restart}>
                  <RotateCcw className="mr-2 size-4" />
                  Play Again
                </Button>
              </div>
            )}
          </div>

          {/* Instructions */}
          <Card className="max-w-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">How to Play</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p>
                <strong>Left click</strong> to reveal a cell
              </p>
              <p>
                <strong>Right click</strong> to flag/unflag a potential mine
              </p>
              <p>Numbers show how many mines are adjacent to that cell</p>
              <p>Reveal all non-mine cells to win!</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
