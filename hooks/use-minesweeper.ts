"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import type { Difficulty, GameState, GameStatus } from "@/lib/games/minesweeper/types"
import { DIFFICULTY_CONFIGS } from "@/lib/games/minesweeper/types"
import {
  checkWin,
  countFlags,
  createEmptyBoard,
  placeMines,
  revealAllMines,
  revealCell,
  toggleFlag,
} from "@/lib/games/minesweeper/game-logic"

export function useMinesweeper(initialDifficulty: Difficulty = "easy") {
  const [gameState, setGameState] = useState<GameState>(() => {
    const config = DIFFICULTY_CONFIGS[initialDifficulty]
    return {
      board: createEmptyBoard(config),
      difficulty: initialDifficulty,
      status: "idle",
      minesRemaining: config.mines,
      timeElapsed: 0,
      firstClick: true,
    }
  })

  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const startTimer = useCallback(() => {
    if (timerRef.current) return
    timerRef.current = setInterval(() => {
      setGameState((prev) => ({
        ...prev,
        timeElapsed: prev.timeElapsed + 1,
      }))
    }, 1000)
  }, [])

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
  }, [])

  useEffect(() => {
    return () => stopTimer()
  }, [stopTimer])

  const handleCellClick = useCallback(
    (row: number, col: number) => {
      setGameState((prev) => {
        if (prev.status === "won" || prev.status === "lost") return prev
        if (prev.board[row][col].state !== "hidden") return prev

        let newBoard = prev.board
        let newStatus: GameStatus = prev.status
        let isFirstClick = prev.firstClick

        // First click - place mines avoiding clicked area
        if (prev.firstClick) {
          const config = DIFFICULTY_CONFIGS[prev.difficulty]
          newBoard = placeMines(prev.board, config, row, col)
          isFirstClick = false
          startTimer()
        }

        // Reveal the cell
        newBoard = revealCell(newBoard, row, col)

        // Check if hit mine
        if (newBoard[row][col].isMine) {
          newBoard = revealAllMines(newBoard)
          newStatus = "lost"
          stopTimer()
        } else if (checkWin(newBoard)) {
          newStatus = "won"
          stopTimer()
        } else if (prev.status === "idle") {
          newStatus = "playing"
        }

        return {
          ...prev,
          board: newBoard,
          status: newStatus,
          firstClick: isFirstClick,
        }
      })
    },
    [startTimer, stopTimer]
  )

  const handleCellRightClick = useCallback((row: number, col: number) => {
    setGameState((prev) => {
      if (prev.status === "won" || prev.status === "lost") return prev
      if (prev.board[row][col].state === "revealed") return prev

      const newBoard = toggleFlag(prev.board, row, col)
      const config = DIFFICULTY_CONFIGS[prev.difficulty]
      const flagCount = countFlags(newBoard)

      return {
        ...prev,
        board: newBoard,
        minesRemaining: config.mines - flagCount,
      }
    })
  }, [])

  const changeDifficulty = useCallback(
    (difficulty: Difficulty) => {
      stopTimer()
      const config = DIFFICULTY_CONFIGS[difficulty]
      setGameState({
        board: createEmptyBoard(config),
        difficulty,
        status: "idle",
        minesRemaining: config.mines,
        timeElapsed: 0,
        firstClick: true,
      })
    },
    [stopTimer]
  )

  const restart = useCallback(() => {
    stopTimer()
    const config = DIFFICULTY_CONFIGS[gameState.difficulty]
    setGameState({
      board: createEmptyBoard(config),
      difficulty: gameState.difficulty,
      status: "idle",
      minesRemaining: config.mines,
      timeElapsed: 0,
      firstClick: true,
    })
  }, [gameState.difficulty, stopTimer])

  return {
    gameState,
    actions: {
      handleCellClick,
      handleCellRightClick,
      changeDifficulty,
      restart,
    },
  }
}
