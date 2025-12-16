"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import type { Board, GameState, Tetromino } from "@/lib/games/tetris/types"
import {
  BOARD_HEIGHT,
  INITIAL_DROP_INTERVAL,
  LEVEL_SPEED_DECREASE,
  MIN_DROP_INTERVAL,
  POINTS,
} from "@/lib/games/tetris/types"
import { getRandomTetromino } from "@/lib/games/tetris/pieces"
import {
  calculateScore,
  clearLines,
  createEmptyBoard,
  createTetromino,
  hardDrop,
  isValidPosition,
  mergePieceToBoard,
  movePiece,
  rotatePiece,
} from "@/lib/games/tetris/game-logic"

export function useTetris() {
  const [gameState, setGameState] = useState<GameState>(() => ({
    board: createEmptyBoard(),
    currentPiece: null,
    nextPiece: getRandomTetromino(),
    score: 0,
    level: 1,
    lines: 0,
    gameOver: false,
    isPaused: false,
  }))

  const dropIntervalRef = useRef<NodeJS.Timeout | null>(null)

  const getDropInterval = useCallback((level: number) => {
    return Math.max(MIN_DROP_INTERVAL, INITIAL_DROP_INTERVAL - (level - 1) * LEVEL_SPEED_DECREASE)
  }, [])

  const spawnPiece = useCallback(() => {
    setGameState((prev) => {
      const newPiece = createTetromino(prev.nextPiece)

      if (!isValidPosition(prev.board, newPiece)) {
        return { ...prev, gameOver: true, currentPiece: null }
      }

      return {
        ...prev,
        currentPiece: newPiece,
        nextPiece: getRandomTetromino(),
      }
    })
  }, [])

  const lockPiece = useCallback(() => {
    setGameState((prev) => {
      if (!prev.currentPiece) return prev

      const newBoard = mergePieceToBoard(prev.board, prev.currentPiece)
      const { newBoard: clearedBoard, linesCleared } = clearLines(newBoard)
      const scoreGained = calculateScore(linesCleared, prev.level)
      const newLines = prev.lines + linesCleared
      const newLevel = Math.floor(newLines / 10) + 1

      return {
        ...prev,
        board: clearedBoard,
        currentPiece: null,
        score: prev.score + scoreGained,
        lines: newLines,
        level: newLevel,
      }
    })
  }, [])

  const moveLeft = useCallback(() => {
    setGameState((prev) => {
      if (!prev.currentPiece || prev.gameOver || prev.isPaused) return prev
      const moved = movePiece(prev.board, prev.currentPiece, -1, 0)
      return moved ? { ...prev, currentPiece: moved } : prev
    })
  }, [])

  const moveRight = useCallback(() => {
    setGameState((prev) => {
      if (!prev.currentPiece || prev.gameOver || prev.isPaused) return prev
      const moved = movePiece(prev.board, prev.currentPiece, 1, 0)
      return moved ? { ...prev, currentPiece: moved } : prev
    })
  }, [])

  const moveDown = useCallback(() => {
    setGameState((prev) => {
      if (!prev.currentPiece || prev.gameOver || prev.isPaused) return prev
      const moved = movePiece(prev.board, prev.currentPiece, 0, 1)
      if (moved) {
        return { ...prev, currentPiece: moved, score: prev.score + POINTS.SOFT_DROP }
      }
      return prev
    })
  }, [])

  const rotate = useCallback(() => {
    setGameState((prev) => {
      if (!prev.currentPiece || prev.gameOver || prev.isPaused) return prev
      const rotated = rotatePiece(prev.board, prev.currentPiece)
      return rotated ? { ...prev, currentPiece: rotated } : prev
    })
  }, [])

  const drop = useCallback(() => {
    setGameState((prev) => {
      if (!prev.currentPiece || prev.gameOver || prev.isPaused) return prev
      const { piece: droppedPiece, cellsDropped } = hardDrop(prev.board, prev.currentPiece)
      return {
        ...prev,
        currentPiece: droppedPiece,
        score: prev.score + cellsDropped * POINTS.HARD_DROP,
      }
    })
    lockPiece()
  }, [lockPiece])

  const togglePause = useCallback(() => {
    setGameState((prev) => {
      if (prev.gameOver) return prev
      return { ...prev, isPaused: !prev.isPaused }
    })
  }, [])

  const restart = useCallback(() => {
    setGameState({
      board: createEmptyBoard(),
      currentPiece: null,
      nextPiece: getRandomTetromino(),
      score: 0,
      level: 1,
      lines: 0,
      gameOver: false,
      isPaused: false,
    })
  }, [])

  // Auto drop
  useEffect(() => {
    if (gameState.gameOver || gameState.isPaused || !gameState.currentPiece) {
      if (dropIntervalRef.current) {
        clearInterval(dropIntervalRef.current)
        dropIntervalRef.current = null
      }
      return
    }

    const interval = getDropInterval(gameState.level)

    dropIntervalRef.current = setInterval(() => {
      setGameState((prev) => {
        if (!prev.currentPiece || prev.gameOver || prev.isPaused) return prev
        const moved = movePiece(prev.board, prev.currentPiece, 0, 1)
        if (moved) {
          return { ...prev, currentPiece: moved }
        }
        return prev
      })
    }, interval)

    return () => {
      if (dropIntervalRef.current) {
        clearInterval(dropIntervalRef.current)
      }
    }
  }, [gameState.gameOver, gameState.isPaused, gameState.level, gameState.currentPiece, getDropInterval])

  // Spawn piece when needed
  useEffect(() => {
    if (!gameState.currentPiece && !gameState.gameOver) {
      spawnPiece()
    }
  }, [gameState.currentPiece, gameState.gameOver, spawnPiece])

  // Check if piece should lock
  useEffect(() => {
    if (!gameState.currentPiece || gameState.gameOver || gameState.isPaused) return

    const canMoveDown = movePiece(gameState.board, gameState.currentPiece, 0, 1)
    if (!canMoveDown) {
      const lockTimeout = setTimeout(lockPiece, 500)
      return () => clearTimeout(lockTimeout)
    }
  }, [gameState.currentPiece, gameState.board, gameState.gameOver, gameState.isPaused, lockPiece])

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameState.gameOver) {
        if (e.key === "Enter" || e.key === " ") {
          restart()
        }
        return
      }

      switch (e.key) {
        case "ArrowLeft":
        case "a":
          e.preventDefault()
          moveLeft()
          break
        case "ArrowRight":
        case "d":
          e.preventDefault()
          moveRight()
          break
        case "ArrowDown":
        case "s":
          e.preventDefault()
          moveDown()
          break
        case "ArrowUp":
        case "w":
          e.preventDefault()
          rotate()
          break
        case " ":
          e.preventDefault()
          drop()
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
  }, [gameState.gameOver, moveLeft, moveRight, moveDown, rotate, drop, togglePause, restart])

  return {
    gameState,
    actions: {
      moveLeft,
      moveRight,
      moveDown,
      rotate,
      drop,
      togglePause,
      restart,
    },
  }
}
