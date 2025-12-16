"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import type { Direction, GameState } from "@/lib/games/snake/types"
import { POINTS_PER_FOOD } from "@/lib/games/snake/types"
import {
  calculateSpeed,
  checkCollision,
  checkFoodCollision,
  createInitialState,
  generateFood,
  growSnake,
  isValidDirectionChange,
  moveSnake,
} from "@/lib/games/snake/game-logic"

const HIGH_SCORE_KEY = "snake-high-score"

function getStoredHighScore(): number {
  if (typeof window === "undefined") return 0
  const stored = localStorage.getItem(HIGH_SCORE_KEY)
  return stored ? parseInt(stored, 10) : 0
}

function setStoredHighScore(score: number): void {
  if (typeof window === "undefined") return
  localStorage.setItem(HIGH_SCORE_KEY, score.toString())
}

export function useSnake() {
  const [gameState, setGameState] = useState<GameState>(() =>
    createInitialState(0)
  )

  const gameLoopRef = useRef<NodeJS.Timeout | null>(null)
  const mounted = useRef(false)

  // Load high score on mount
  useEffect(() => {
    mounted.current = true
    const highScore = getStoredHighScore()
    setGameState((prev) => ({ ...prev, highScore }))
    return () => {
      mounted.current = false
    }
  }, [])

  const stopGameLoop = useCallback(() => {
    if (gameLoopRef.current) {
      clearInterval(gameLoopRef.current)
      gameLoopRef.current = null
    }
  }, [])

  const tick = useCallback(() => {
    setGameState((prev) => {
      if (prev.status !== "playing") return prev

      const direction = prev.nextDirection
      let newSnake: typeof prev.snake
      let newFood = prev.food
      let newScore = prev.score

      // Check if eating food
      const head = prev.snake[0]
      const nextHead = {
        x: head.x + (direction === "right" ? 1 : direction === "left" ? -1 : 0),
        y: head.y + (direction === "down" ? 1 : direction === "up" ? -1 : 0),
      }

      if (checkFoodCollision(nextHead, prev.food)) {
        newSnake = growSnake(prev.snake, direction)
        newScore = prev.score + POINTS_PER_FOOD
        newFood = generateFood(newSnake)
      } else {
        newSnake = moveSnake(prev.snake, direction)
      }

      // Check collision
      if (checkCollision(newSnake)) {
        const newHighScore = Math.max(prev.highScore, newScore)
        if (newHighScore > prev.highScore) {
          setStoredHighScore(newHighScore)
        }
        return {
          ...prev,
          status: "gameOver",
          highScore: newHighScore,
        }
      }

      return {
        ...prev,
        snake: newSnake,
        food: newFood,
        direction,
        score: newScore,
      }
    })
  }, [])

  // Game loop
  useEffect(() => {
    if (gameState.status !== "playing") {
      stopGameLoop()
      return
    }

    const speed = calculateSpeed(gameState.score)
    gameLoopRef.current = setInterval(tick, speed)

    return () => stopGameLoop()
  }, [gameState.status, gameState.score, tick, stopGameLoop])

  const changeDirection = useCallback((newDirection: Direction) => {
    setGameState((prev) => {
      if (prev.status !== "playing") return prev
      if (!isValidDirectionChange(prev.direction, newDirection)) return prev
      return { ...prev, nextDirection: newDirection }
    })
  }, [])

  const start = useCallback(() => {
    setGameState((prev) => {
      if (prev.status === "idle" || prev.status === "gameOver") {
        return { ...createInitialState(prev.highScore), status: "playing" }
      }
      if (prev.status === "paused") {
        return { ...prev, status: "playing" }
      }
      return prev
    })
  }, [])

  const pause = useCallback(() => {
    setGameState((prev) => {
      if (prev.status === "playing") {
        return { ...prev, status: "paused" }
      }
      return prev
    })
  }, [])

  const togglePause = useCallback(() => {
    setGameState((prev) => {
      if (prev.status === "playing") {
        return { ...prev, status: "paused" }
      }
      if (prev.status === "paused") {
        return { ...prev, status: "playing" }
      }
      return prev
    })
  }, [])

  const restart = useCallback(() => {
    stopGameLoop()
    setGameState((prev) => ({
      ...createInitialState(prev.highScore),
      status: "playing",
    }))
  }, [stopGameLoop])

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowUp":
        case "w":
          e.preventDefault()
          changeDirection("up")
          break
        case "ArrowDown":
        case "s":
          e.preventDefault()
          changeDirection("down")
          break
        case "ArrowLeft":
        case "a":
          e.preventDefault()
          changeDirection("left")
          break
        case "ArrowRight":
        case "d":
          e.preventDefault()
          changeDirection("right")
          break
        case " ":
          e.preventDefault()
          if (gameState.status === "idle" || gameState.status === "gameOver") {
            start()
          } else {
            togglePause()
          }
          break
        case "p":
        case "Escape":
          e.preventDefault()
          togglePause()
          break
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [gameState.status, changeDirection, start, togglePause])

  return {
    gameState,
    actions: {
      start,
      pause,
      togglePause,
      restart,
      changeDirection,
    },
  }
}
