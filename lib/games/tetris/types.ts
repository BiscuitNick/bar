export type TetrominoType = "I" | "O" | "T" | "S" | "Z" | "J" | "L"

export type Cell = TetrominoType | null

export type Board = Cell[][]

export interface Position {
  x: number
  y: number
}

export interface Tetromino {
  type: TetrominoType
  shape: number[][]
  position: Position
}

export interface GameState {
  board: Board
  currentPiece: Tetromino | null
  nextPiece: TetrominoType
  score: number
  level: number
  lines: number
  gameOver: boolean
  isPaused: boolean
}

export const BOARD_WIDTH = 10
export const BOARD_HEIGHT = 20
export const INITIAL_DROP_INTERVAL = 1000
export const MIN_DROP_INTERVAL = 100
export const LEVEL_SPEED_DECREASE = 100

export const POINTS = {
  SINGLE: 100,
  DOUBLE: 300,
  TRIPLE: 500,
  TETRIS: 800,
  SOFT_DROP: 1,
  HARD_DROP: 2,
} as const

export const COLORS: Record<TetrominoType, string> = {
  I: "bg-cyan-500",
  O: "bg-yellow-500",
  T: "bg-purple-500",
  S: "bg-green-500",
  Z: "bg-red-500",
  J: "bg-blue-500",
  L: "bg-orange-500",
}
