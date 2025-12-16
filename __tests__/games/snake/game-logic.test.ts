import { describe, it, expect } from "vitest"
import {
  createInitialSnake,
  generateFood,
  moveSnake,
  growSnake,
  checkCollision,
  checkFoodCollision,
  isValidDirectionChange,
  calculateSpeed,
  createInitialState,
} from "@/lib/games/snake/game-logic"
import {
  BOARD_SIZE,
  INITIAL_SPEED,
  MIN_SPEED,
  POINTS_PER_FOOD,
} from "@/lib/games/snake/types"

describe("createInitialSnake", () => {
  it("should create a snake with 3 segments", () => {
    const snake = createInitialSnake()
    expect(snake).toHaveLength(3)
  })

  it("should create snake in center of board", () => {
    const snake = createInitialSnake()
    const head = snake[0]
    const center = Math.floor(BOARD_SIZE / 2)

    expect(head.x).toBe(center)
    expect(head.y).toBe(center)
  })

  it("should create horizontal snake facing right", () => {
    const snake = createInitialSnake()
    // Head should be rightmost
    expect(snake[0].x).toBeGreaterThan(snake[1].x)
    expect(snake[1].x).toBeGreaterThan(snake[2].x)
    // All segments on same row
    expect(snake[0].y).toBe(snake[1].y)
    expect(snake[1].y).toBe(snake[2].y)
  })
})

describe("generateFood", () => {
  it("should generate food within board bounds", () => {
    const snake = createInitialSnake()
    const food = generateFood(snake)

    expect(food.x).toBeGreaterThanOrEqual(0)
    expect(food.x).toBeLessThan(BOARD_SIZE)
    expect(food.y).toBeGreaterThanOrEqual(0)
    expect(food.y).toBeLessThan(BOARD_SIZE)
  })

  it("should not generate food on snake", () => {
    const snake = createInitialSnake()
    const snakePositions = new Set(snake.map((s) => `${s.x},${s.y}`))

    for (let i = 0; i < 100; i++) {
      const food = generateFood(snake)
      expect(snakePositions.has(`${food.x},${food.y}`)).toBe(false)
    }
  })
})

describe("moveSnake", () => {
  it("should move snake right", () => {
    const snake = [
      { x: 5, y: 5 },
      { x: 4, y: 5 },
      { x: 3, y: 5 },
    ]
    const moved = moveSnake(snake, "right")

    expect(moved[0]).toEqual({ x: 6, y: 5 })
    expect(moved[1]).toEqual({ x: 5, y: 5 })
    expect(moved[2]).toEqual({ x: 4, y: 5 })
  })

  it("should move snake left", () => {
    const snake = [
      { x: 5, y: 5 },
      { x: 6, y: 5 },
      { x: 7, y: 5 },
    ]
    const moved = moveSnake(snake, "left")

    expect(moved[0]).toEqual({ x: 4, y: 5 })
  })

  it("should move snake up", () => {
    const snake = [
      { x: 5, y: 5 },
      { x: 5, y: 6 },
      { x: 5, y: 7 },
    ]
    const moved = moveSnake(snake, "up")

    expect(moved[0]).toEqual({ x: 5, y: 4 })
  })

  it("should move snake down", () => {
    const snake = [
      { x: 5, y: 5 },
      { x: 5, y: 4 },
      { x: 5, y: 3 },
    ]
    const moved = moveSnake(snake, "down")

    expect(moved[0]).toEqual({ x: 5, y: 6 })
  })

  it("should maintain snake length", () => {
    const snake = createInitialSnake()
    const moved = moveSnake(snake, "right")
    expect(moved).toHaveLength(snake.length)
  })
})

describe("growSnake", () => {
  it("should add segment to front of snake", () => {
    const snake = [
      { x: 5, y: 5 },
      { x: 4, y: 5 },
      { x: 3, y: 5 },
    ]
    const grown = growSnake(snake, "right")

    expect(grown).toHaveLength(4)
    expect(grown[0]).toEqual({ x: 6, y: 5 })
  })

  it("should keep all existing segments", () => {
    const snake = [
      { x: 5, y: 5 },
      { x: 4, y: 5 },
      { x: 3, y: 5 },
    ]
    const grown = growSnake(snake, "right")

    expect(grown[1]).toEqual({ x: 5, y: 5 })
    expect(grown[2]).toEqual({ x: 4, y: 5 })
    expect(grown[3]).toEqual({ x: 3, y: 5 })
  })
})

describe("checkCollision", () => {
  it("should detect wall collision on left", () => {
    const snake = [
      { x: -1, y: 5 },
      { x: 0, y: 5 },
      { x: 1, y: 5 },
    ]
    expect(checkCollision(snake)).toBe(true)
  })

  it("should detect wall collision on right", () => {
    const snake = [
      { x: BOARD_SIZE, y: 5 },
      { x: BOARD_SIZE - 1, y: 5 },
      { x: BOARD_SIZE - 2, y: 5 },
    ]
    expect(checkCollision(snake)).toBe(true)
  })

  it("should detect wall collision on top", () => {
    const snake = [
      { x: 5, y: -1 },
      { x: 5, y: 0 },
      { x: 5, y: 1 },
    ]
    expect(checkCollision(snake)).toBe(true)
  })

  it("should detect wall collision on bottom", () => {
    const snake = [
      { x: 5, y: BOARD_SIZE },
      { x: 5, y: BOARD_SIZE - 1 },
      { x: 5, y: BOARD_SIZE - 2 },
    ]
    expect(checkCollision(snake)).toBe(true)
  })

  it("should detect self collision", () => {
    const snake = [
      { x: 5, y: 5 },
      { x: 6, y: 5 },
      { x: 6, y: 6 },
      { x: 5, y: 6 },
      { x: 5, y: 5 }, // Collides with head
    ]
    expect(checkCollision(snake)).toBe(true)
  })

  it("should return false for valid position", () => {
    const snake = createInitialSnake()
    expect(checkCollision(snake)).toBe(false)
  })
})

describe("checkFoodCollision", () => {
  it("should return true when head is on food", () => {
    const head = { x: 5, y: 5 }
    const food = { x: 5, y: 5 }
    expect(checkFoodCollision(head, food)).toBe(true)
  })

  it("should return false when head is not on food", () => {
    const head = { x: 5, y: 5 }
    const food = { x: 6, y: 5 }
    expect(checkFoodCollision(head, food)).toBe(false)
  })
})

describe("isValidDirectionChange", () => {
  it("should allow perpendicular direction changes", () => {
    expect(isValidDirectionChange("right", "up")).toBe(true)
    expect(isValidDirectionChange("right", "down")).toBe(true)
    expect(isValidDirectionChange("up", "left")).toBe(true)
    expect(isValidDirectionChange("up", "right")).toBe(true)
  })

  it("should not allow opposite direction changes", () => {
    expect(isValidDirectionChange("right", "left")).toBe(false)
    expect(isValidDirectionChange("left", "right")).toBe(false)
    expect(isValidDirectionChange("up", "down")).toBe(false)
    expect(isValidDirectionChange("down", "up")).toBe(false)
  })

  it("should allow same direction", () => {
    expect(isValidDirectionChange("right", "right")).toBe(true)
    expect(isValidDirectionChange("up", "up")).toBe(true)
  })
})

describe("calculateSpeed", () => {
  it("should return initial speed at score 0", () => {
    expect(calculateSpeed(0)).toBe(INITIAL_SPEED)
  })

  it("should decrease speed as score increases", () => {
    const speed0 = calculateSpeed(0)
    const speed100 = calculateSpeed(100)
    expect(speed100).toBeLessThan(speed0)
  })

  it("should not go below minimum speed", () => {
    const speed = calculateSpeed(10000)
    expect(speed).toBeGreaterThanOrEqual(MIN_SPEED)
  })

  it("should decrease by correct amount per food", () => {
    const speed0 = calculateSpeed(0)
    const speed1Food = calculateSpeed(POINTS_PER_FOOD)
    expect(speed0 - speed1Food).toBe(5) // SPEED_INCREASE is 5
  })
})

describe("createInitialState", () => {
  it("should create state with idle status", () => {
    const state = createInitialState()
    expect(state.status).toBe("idle")
  })

  it("should create state with snake", () => {
    const state = createInitialState()
    expect(state.snake).toHaveLength(3)
  })

  it("should create state with food", () => {
    const state = createInitialState()
    expect(state.food).toBeDefined()
    expect(state.food.x).toBeGreaterThanOrEqual(0)
    expect(state.food.y).toBeGreaterThanOrEqual(0)
  })

  it("should create state with score 0", () => {
    const state = createInitialState()
    expect(state.score).toBe(0)
  })

  it("should preserve passed high score", () => {
    const state = createInitialState(500)
    expect(state.highScore).toBe(500)
  })

  it("should set initial direction to right", () => {
    const state = createInitialState()
    expect(state.direction).toBe("right")
    expect(state.nextDirection).toBe("right")
  })
})
