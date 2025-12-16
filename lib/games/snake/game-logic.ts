import type { Direction, GameState, Position } from "./types"
import {
  BOARD_SIZE,
  DIRECTION_VECTORS,
  INITIAL_SPEED,
  MIN_SPEED,
  OPPOSITE_DIRECTIONS,
  POINTS_PER_FOOD,
  SPEED_INCREASE,
} from "./types"

export function createInitialSnake(): Position[] {
  const centerX = Math.floor(BOARD_SIZE / 2)
  const centerY = Math.floor(BOARD_SIZE / 2)
  return [
    { x: centerX, y: centerY },
    { x: centerX - 1, y: centerY },
    { x: centerX - 2, y: centerY },
  ]
}

export function generateFood(snake: Position[]): Position {
  const occupied = new Set(snake.map((pos) => `${pos.x},${pos.y}`))

  let food: Position
  do {
    food = {
      x: Math.floor(Math.random() * BOARD_SIZE),
      y: Math.floor(Math.random() * BOARD_SIZE),
    }
  } while (occupied.has(`${food.x},${food.y}`))

  return food
}

export function moveSnake(snake: Position[], direction: Direction): Position[] {
  const head = snake[0]
  const vector = DIRECTION_VECTORS[direction]

  const newHead: Position = {
    x: head.x + vector.x,
    y: head.y + vector.y,
  }

  return [newHead, ...snake.slice(0, -1)]
}

export function growSnake(snake: Position[], direction: Direction): Position[] {
  const head = snake[0]
  const vector = DIRECTION_VECTORS[direction]

  const newHead: Position = {
    x: head.x + vector.x,
    y: head.y + vector.y,
  }

  return [newHead, ...snake]
}

export function checkCollision(snake: Position[]): boolean {
  const head = snake[0]

  // Wall collision
  if (head.x < 0 || head.x >= BOARD_SIZE || head.y < 0 || head.y >= BOARD_SIZE) {
    return true
  }

  // Self collision
  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      return true
    }
  }

  return false
}

export function checkFoodCollision(head: Position, food: Position): boolean {
  return head.x === food.x && head.y === food.y
}

export function isValidDirectionChange(
  currentDirection: Direction,
  newDirection: Direction
): boolean {
  return OPPOSITE_DIRECTIONS[currentDirection] !== newDirection
}

export function calculateSpeed(score: number): number {
  const speedReduction = Math.floor(score / POINTS_PER_FOOD) * SPEED_INCREASE
  return Math.max(MIN_SPEED, INITIAL_SPEED - speedReduction)
}

export function createInitialState(highScore: number = 0): GameState {
  const snake = createInitialSnake()
  return {
    snake,
    food: generateFood(snake),
    direction: "right",
    nextDirection: "right",
    status: "idle",
    score: 0,
    highScore,
  }
}
