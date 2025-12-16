export interface Position {
  x: number
  y: number
}

export type Direction = "up" | "down" | "left" | "right"

export type GameStatus = "idle" | "playing" | "paused" | "gameOver"

export interface GameState {
  snake: Position[]
  food: Position
  direction: Direction
  nextDirection: Direction
  status: GameStatus
  score: number
  highScore: number
}

export const BOARD_SIZE = 20
export const CELL_SIZE = 20
export const INITIAL_SPEED = 150
export const MIN_SPEED = 50
export const SPEED_INCREASE = 5
export const POINTS_PER_FOOD = 10

export const DIRECTION_VECTORS: Record<Direction, Position> = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
}

export const OPPOSITE_DIRECTIONS: Record<Direction, Direction> = {
  up: "down",
  down: "up",
  left: "right",
  right: "left",
}
