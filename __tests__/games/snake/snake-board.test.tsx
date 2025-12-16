import { describe, it, expect } from "vitest"
import { render } from "@testing-library/react"
import { SnakeBoard } from "@/components/games/snake/snake-board"
import { BOARD_SIZE } from "@/lib/games/snake/types"

describe("SnakeBoard", () => {
  const defaultSnake = [
    { x: 10, y: 10 },
    { x: 9, y: 10 },
    { x: 8, y: 10 },
  ]
  const defaultFood = { x: 15, y: 15 }

  it("should render the correct number of cells", () => {
    const { container } = render(
      <SnakeBoard snake={defaultSnake} food={defaultFood} />
    )

    const cells = container.querySelectorAll(".aspect-square")
    expect(cells.length).toBe(BOARD_SIZE * BOARD_SIZE)
  })

  it("should render snake head with different color", () => {
    const { container } = render(
      <SnakeBoard snake={defaultSnake} food={defaultFood} />
    )

    // Head is darker green (green-600)
    const headCells = container.querySelectorAll(".bg-green-600")
    expect(headCells.length).toBe(1)
  })

  it("should render snake body", () => {
    const { container } = render(
      <SnakeBoard snake={defaultSnake} food={defaultFood} />
    )

    // Body is lighter green (green-500) - 2 body segments
    const bodyCells = container.querySelectorAll(".bg-green-500")
    expect(bodyCells.length).toBe(2)
  })

  it("should render food as red cell", () => {
    const { container } = render(
      <SnakeBoard snake={defaultSnake} food={defaultFood} />
    )

    const foodCells = container.querySelectorAll(".bg-red-500")
    expect(foodCells.length).toBe(1)
  })

  it("should render empty cells", () => {
    const { container } = render(
      <SnakeBoard snake={defaultSnake} food={defaultFood} />
    )

    const emptyCells = container.querySelectorAll(".bg-muted\\/50")
    // Total cells - snake (3) - food (1)
    expect(emptyCells.length).toBe(BOARD_SIZE * BOARD_SIZE - 4)
  })

  it("should render with grid layout", () => {
    const { container } = render(
      <SnakeBoard snake={defaultSnake} food={defaultFood} />
    )

    const grid = container.querySelector(".grid")
    expect(grid).toBeTruthy()
  })

  it("should render food with rounded style", () => {
    const { container } = render(
      <SnakeBoard snake={defaultSnake} food={defaultFood} />
    )

    const roundedFood = container.querySelector(".rounded-full.bg-red-500")
    expect(roundedFood).toBeTruthy()
  })

  it("should handle snake at edge of board", () => {
    const edgeSnake = [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 2, y: 0 },
    ]
    const { container } = render(
      <SnakeBoard snake={edgeSnake} food={defaultFood} />
    )

    const headCells = container.querySelectorAll(".bg-green-600")
    expect(headCells.length).toBe(1)
  })

  it("should handle long snake", () => {
    const longSnake = Array.from({ length: 10 }, (_, i) => ({
      x: 10 - i,
      y: 10,
    }))
    const { container } = render(
      <SnakeBoard snake={longSnake} food={defaultFood} />
    )

    // 1 head + 9 body segments
    const headCells = container.querySelectorAll(".bg-green-600")
    const bodyCells = container.querySelectorAll(".bg-green-500")
    expect(headCells.length).toBe(1)
    expect(bodyCells.length).toBe(9)
  })
})
