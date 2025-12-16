"use client"

import Link from "next/link"
import { ArrowLeft, Pause, Play, RotateCcw, Trophy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SnakeBoard } from "@/components/games/snake/snake-board"
import { useSnake } from "@/hooks/use-snake"

export default function SnakePage() {
  const { gameState, actions } = useSnake()

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

        <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-start lg:justify-center">
          {/* Game Board */}
          <div className="relative">
            <SnakeBoard snake={gameState.snake} food={gameState.food} />

            {/* Idle Overlay */}
            {gameState.status === "idle" && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm">
                <h2 className="mb-4 text-2xl font-bold">Snake</h2>
                <Button onClick={actions.start}>
                  <Play className="mr-2 size-4" />
                  Start Game
                </Button>
                <p className="mt-4 text-sm text-muted-foreground">
                  Press Space to start
                </p>
              </div>
            )}

            {/* Paused Overlay */}
            {gameState.status === "paused" && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm">
                <h2 className="mb-4 text-2xl font-bold">Paused</h2>
                <Button onClick={actions.togglePause}>
                  <Play className="mr-2 size-4" />
                  Resume
                </Button>
              </div>
            )}

            {/* Game Over Overlay */}
            {gameState.status === "gameOver" && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm">
                <h2 className="mb-2 text-2xl font-bold">Game Over!</h2>
                <p className="mb-4 text-xl">Score: {gameState.score}</p>
                {gameState.score === gameState.highScore && gameState.score > 0 && (
                  <p className="mb-4 flex items-center gap-2 text-yellow-500">
                    <Trophy className="size-5" />
                    New High Score!
                  </p>
                )}
                <Button onClick={actions.restart}>
                  <RotateCcw className="mr-2 size-4" />
                  Play Again
                </Button>
              </div>
            )}
          </div>

          {/* Side Panel */}
          <div className="flex flex-col gap-4">
            {/* Score */}
            <Card>
              <CardContent className="space-y-4 pt-6">
                <div>
                  <p className="text-sm text-muted-foreground">Score</p>
                  <p className="text-3xl font-bold">{gameState.score}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">High Score</p>
                  <p className="text-xl font-bold text-yellow-500">
                    {gameState.highScore}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Controls */}
            <div className="flex gap-2">
              {gameState.status === "playing" ? (
                <Button variant="outline" size="icon" onClick={actions.pause}>
                  <Pause className="size-4" />
                </Button>
              ) : (
                <Button variant="outline" size="icon" onClick={actions.start}>
                  <Play className="size-4" />
                </Button>
              )}
              <Button variant="outline" size="icon" onClick={actions.restart}>
                <RotateCcw className="size-4" />
              </Button>
            </div>

            {/* Instructions */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Controls</CardTitle>
              </CardHeader>
              <CardContent className="space-y-1 text-sm text-muted-foreground">
                <p>
                  <kbd className="rounded bg-muted px-1">↑</kbd>{" "}
                  <kbd className="rounded bg-muted px-1">↓</kbd>{" "}
                  <kbd className="rounded bg-muted px-1">←</kbd>{" "}
                  <kbd className="rounded bg-muted px-1">→</kbd> Move
                </p>
                <p>
                  <kbd className="rounded bg-muted px-1">Space</kbd> Start / Pause
                </p>
                <p>
                  <kbd className="rounded bg-muted px-1">P</kbd> Pause
                </p>
              </CardContent>
            </Card>

            {/* Tips */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-1 text-sm text-muted-foreground">
                <p>Eat the red food to grow</p>
                <p>Don't hit the walls or yourself</p>
                <p>Speed increases as you score!</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
