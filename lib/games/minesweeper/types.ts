export type CellState = "hidden" | "revealed" | "flagged"

export interface Cell {
  isMine: boolean
  adjacentMines: number
  state: CellState
}

export type Board = Cell[][]

export type Difficulty = "easy" | "medium" | "hard"

export interface DifficultyConfig {
  rows: number
  cols: number
  mines: number
}

export const DIFFICULTY_CONFIGS: Record<Difficulty, DifficultyConfig> = {
  easy: { rows: 9, cols: 9, mines: 10 },
  medium: { rows: 16, cols: 16, mines: 40 },
  hard: { rows: 16, cols: 30, mines: 99 },
}

export type GameStatus = "idle" | "playing" | "won" | "lost"

export interface GameState {
  board: Board
  difficulty: Difficulty
  status: GameStatus
  minesRemaining: number
  timeElapsed: number
  firstClick: boolean
}

export const NUMBER_COLORS: Record<number, string> = {
  1: "text-blue-600 dark:text-blue-400",
  2: "text-green-600 dark:text-green-400",
  3: "text-red-600 dark:text-red-400",
  4: "text-purple-600 dark:text-purple-400",
  5: "text-amber-700 dark:text-amber-500",
  6: "text-cyan-600 dark:text-cyan-400",
  7: "text-gray-800 dark:text-gray-200",
  8: "text-gray-600 dark:text-gray-400",
}
