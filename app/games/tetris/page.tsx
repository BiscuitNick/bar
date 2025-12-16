"use client"

import Link from "next/link"
import { ArrowLeft, Pause, Play, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TetrisBoard } from "@/components/games/tetris/tetris-board"
import { TetrisPiece } from "@/components/games/tetris/tetris-piece"
import { useTetris } from "@/hooks/use-tetris"

export default function TetrisPage() {
  const { gameState, actions } = useTetris()

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
            <TetrisBoard board={gameState.board} currentPiece={gameState.currentPiece} />

            {/* Game Over Overlay */}
            {gameState.gameOver && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm">
                <h2 className="mb-4 text-3xl font-bold">Game Over</h2>
                <p className="mb-6 text-xl">Score: {gameState.score}</p>
                <Button onClick={actions.restart}>
                  <RotateCcw className="mr-2 size-4" />
                  Play Again
                </Button>
              </div>
            )}

            {/* Paused Overlay */}
            {gameState.isPaused && !gameState.gameOver && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm">
                <h2 className="mb-4 text-3xl font-bold">Paused</h2>
                <Button onClick={actions.togglePause}>
                  <Play className="mr-2 size-4" />
                  Resume
                </Button>
              </div>
            )}
          </div>

          {/* Side Panel */}
          <div className="flex flex-col gap-4">
            {/* Next Piece */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Next</CardTitle>
              </CardHeader>
              <CardContent className="flex items-center justify-center py-4">
                <TetrisPiece type={gameState.nextPiece} />
              </CardContent>
            </Card>

            {/* Stats */}
            <Card>
              <CardContent className="space-y-4 pt-6">
                <div>
                  <p className="text-sm text-muted-foreground">Score</p>
                  <p className="text-2xl font-bold">{gameState.score}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Level</p>
                  <p className="text-2xl font-bold">{gameState.level}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Lines</p>
                  <p className="text-2xl font-bold">{gameState.lines}</p>
                </div>
              </CardContent>
            </Card>

            {/* Controls */}
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={actions.togglePause}
                disabled={gameState.gameOver}
              >
                {gameState.isPaused ? <Play className="size-4" /> : <Pause className="size-4" />}
              </Button>
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
                <p><kbd className="rounded bg-muted px-1">←</kbd> <kbd className="rounded bg-muted px-1">→</kbd> Move</p>
                <p><kbd className="rounded bg-muted px-1">↑</kbd> Rotate</p>
                <p><kbd className="rounded bg-muted px-1">↓</kbd> Soft drop</p>
                <p><kbd className="rounded bg-muted px-1">Space</kbd> Hard drop</p>
                <p><kbd className="rounded bg-muted px-1">P</kbd> Pause</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
