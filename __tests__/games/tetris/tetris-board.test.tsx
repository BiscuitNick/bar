import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { TetrisBoard } from "@/components/games/tetris/tetris-board"
import { createEmptyBoard, createTetromino } from "@/lib/games/tetris/game-logic"
import { BOARD_WIDTH, BOARD_HEIGHT } from "@/lib/games/tetris/types"

describe("TetrisBoard", () => {
  it("should render the correct number of cells", () => {
    const board = createEmptyBoard()
    const { container } = render(<TetrisBoard board={board} currentPiece={null} />)

    const cells = container.querySelectorAll(".aspect-square")
    expect(cells.length).toBe(BOARD_WIDTH * BOARD_HEIGHT)
  })

  it("should render with empty board", () => {
    const board = createEmptyBoard()
    const { container } = render(<TetrisBoard board={board} currentPiece={null} />)

    expect(container.firstChild).toBeTruthy()
  })

  it("should render board with blocks", () => {
    const board = createEmptyBoard()
    // Place some blocks
    board[19][0] = "T"
    board[19][1] = "T"
    board[19][2] = "T"

    const { container } = render(<TetrisBoard board={board} currentPiece={null} />)

    // Check that colored cells exist (bg-purple for T pieces)
    const purpleCells = container.querySelectorAll(".bg-purple-500")
    expect(purpleCells.length).toBe(3)
  })

  it("should render current piece", () => {
    const board = createEmptyBoard()
    const piece = createTetromino("I")
    piece.position = { x: 3, y: 5 }

    const { container } = render(<TetrisBoard board={board} currentPiece={piece} />)

    // I piece is cyan
    const cyanCells = container.querySelectorAll(".bg-cyan-500")
    expect(cyanCells.length).toBeGreaterThan(0)
  })

  it("should render different piece colors", () => {
    const board = createEmptyBoard()
    // Place different colored blocks
    board[19][0] = "I" // cyan
    board[19][1] = "O" // yellow
    board[19][2] = "T" // purple
    board[19][3] = "S" // green
    board[19][4] = "Z" // red
    board[19][5] = "J" // blue
    board[19][6] = "L" // orange

    const { container } = render(<TetrisBoard board={board} currentPiece={null} />)

    expect(container.querySelectorAll(".bg-cyan-500").length).toBe(1)
    expect(container.querySelectorAll(".bg-yellow-500").length).toBe(1)
    expect(container.querySelectorAll(".bg-purple-500").length).toBe(1)
    expect(container.querySelectorAll(".bg-green-500").length).toBe(1)
    expect(container.querySelectorAll(".bg-red-500").length).toBe(1)
    expect(container.querySelectorAll(".bg-blue-500").length).toBe(1)
    expect(container.querySelectorAll(".bg-orange-500").length).toBe(1)
  })
})
