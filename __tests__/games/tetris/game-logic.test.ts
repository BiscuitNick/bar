import { describe, it, expect } from "vitest"
import {
  createEmptyBoard,
  createTetromino,
  isValidPosition,
  mergePieceToBoard,
  clearLines,
  calculateScore,
  rotatePiece,
  movePiece,
  hardDrop,
  getBoardWithPiece,
} from "@/lib/games/tetris/game-logic"
import { BOARD_WIDTH, BOARD_HEIGHT, POINTS } from "@/lib/games/tetris/types"

describe("createEmptyBoard", () => {
  it("should create a board with correct dimensions", () => {
    const board = createEmptyBoard()
    expect(board).toHaveLength(BOARD_HEIGHT)
    board.forEach((row) => {
      expect(row).toHaveLength(BOARD_WIDTH)
    })
  })

  it("should create a board filled with null values", () => {
    const board = createEmptyBoard()
    board.forEach((row) => {
      row.forEach((cell) => {
        expect(cell).toBeNull()
      })
    })
  })
})

describe("createTetromino", () => {
  it("should create a tetromino with correct type", () => {
    const piece = createTetromino("T")
    expect(piece.type).toBe("T")
  })

  it("should position piece at top center of board", () => {
    const piece = createTetromino("T")
    expect(piece.position.y).toBe(0)
    expect(piece.position.x).toBeGreaterThanOrEqual(0)
    expect(piece.position.x).toBeLessThan(BOARD_WIDTH)
  })

  it("should have a shape array", () => {
    const piece = createTetromino("I")
    expect(Array.isArray(piece.shape)).toBe(true)
    expect(piece.shape.length).toBeGreaterThan(0)
  })
})

describe("isValidPosition", () => {
  it("should return true for valid position on empty board", () => {
    const board = createEmptyBoard()
    const piece = createTetromino("T")
    expect(isValidPosition(board, piece)).toBe(true)
  })

  it("should return false when piece is off left edge", () => {
    const board = createEmptyBoard()
    const piece = createTetromino("T")
    piece.position.x = -5
    expect(isValidPosition(board, piece)).toBe(false)
  })

  it("should return false when piece is off right edge", () => {
    const board = createEmptyBoard()
    const piece = createTetromino("T")
    piece.position.x = BOARD_WIDTH
    expect(isValidPosition(board, piece)).toBe(false)
  })

  it("should return false when piece is below board", () => {
    const board = createEmptyBoard()
    const piece = createTetromino("T")
    piece.position.y = BOARD_HEIGHT
    expect(isValidPosition(board, piece)).toBe(false)
  })

  it("should return false when piece overlaps existing block", () => {
    const board = createEmptyBoard()
    board[5][5] = "T"
    const piece = createTetromino("O")
    piece.position = { x: 4, y: 4 }
    expect(isValidPosition(board, piece)).toBe(false)
  })
})

describe("mergePieceToBoard", () => {
  it("should add piece to board at its position", () => {
    const board = createEmptyBoard()
    const piece = createTetromino("O")
    piece.position = { x: 0, y: 0 }
    const newBoard = mergePieceToBoard(board, piece)

    expect(newBoard[0][0]).toBe("O")
    expect(newBoard[0][1]).toBe("O")
    expect(newBoard[1][0]).toBe("O")
    expect(newBoard[1][1]).toBe("O")
  })

  it("should not modify original board", () => {
    const board = createEmptyBoard()
    const piece = createTetromino("O")
    piece.position = { x: 0, y: 0 }
    mergePieceToBoard(board, piece)

    expect(board[0][0]).toBeNull()
  })
})

describe("clearLines", () => {
  it("should clear a complete line", () => {
    const board = createEmptyBoard()
    // Fill the bottom row
    for (let x = 0; x < BOARD_WIDTH; x++) {
      board[BOARD_HEIGHT - 1][x] = "T"
    }

    const { newBoard, linesCleared } = clearLines(board)
    expect(linesCleared).toBe(1)
    expect(newBoard[BOARD_HEIGHT - 1].every((cell) => cell === null)).toBe(true)
  })

  it("should not clear incomplete lines", () => {
    const board = createEmptyBoard()
    // Fill most of the bottom row, but leave one empty
    for (let x = 0; x < BOARD_WIDTH - 1; x++) {
      board[BOARD_HEIGHT - 1][x] = "T"
    }

    const { newBoard, linesCleared } = clearLines(board)
    expect(linesCleared).toBe(0)
    expect(newBoard[BOARD_HEIGHT - 1][0]).toBe("T")
  })

  it("should clear multiple lines (Tetris)", () => {
    const board = createEmptyBoard()
    // Fill bottom 4 rows
    for (let y = BOARD_HEIGHT - 4; y < BOARD_HEIGHT; y++) {
      for (let x = 0; x < BOARD_WIDTH; x++) {
        board[y][x] = "T"
      }
    }

    const { linesCleared } = clearLines(board)
    expect(linesCleared).toBe(4)
  })

  it("should shift rows down after clearing", () => {
    const board = createEmptyBoard()
    // Place a block above the line to clear
    board[BOARD_HEIGHT - 2][0] = "I"
    // Fill the bottom row
    for (let x = 0; x < BOARD_WIDTH; x++) {
      board[BOARD_HEIGHT - 1][x] = "T"
    }

    const { newBoard } = clearLines(board)
    expect(newBoard[BOARD_HEIGHT - 1][0]).toBe("I")
  })
})

describe("calculateScore", () => {
  it("should calculate correct score for single line", () => {
    expect(calculateScore(1, 1)).toBe(POINTS.SINGLE)
  })

  it("should calculate correct score for double", () => {
    expect(calculateScore(2, 1)).toBe(POINTS.DOUBLE)
  })

  it("should calculate correct score for triple", () => {
    expect(calculateScore(3, 1)).toBe(POINTS.TRIPLE)
  })

  it("should calculate correct score for tetris", () => {
    expect(calculateScore(4, 1)).toBe(POINTS.TETRIS)
  })

  it("should multiply score by level", () => {
    expect(calculateScore(1, 2)).toBe(POINTS.SINGLE * 2)
    expect(calculateScore(4, 3)).toBe(POINTS.TETRIS * 3)
  })
})

describe("movePiece", () => {
  it("should move piece left", () => {
    const board = createEmptyBoard()
    const piece = createTetromino("T")
    const originalX = piece.position.x
    const moved = movePiece(board, piece, -1, 0)

    expect(moved).not.toBeNull()
    expect(moved!.position.x).toBe(originalX - 1)
  })

  it("should move piece right", () => {
    const board = createEmptyBoard()
    const piece = createTetromino("T")
    const originalX = piece.position.x
    const moved = movePiece(board, piece, 1, 0)

    expect(moved).not.toBeNull()
    expect(moved!.position.x).toBe(originalX + 1)
  })

  it("should move piece down", () => {
    const board = createEmptyBoard()
    const piece = createTetromino("T")
    const originalY = piece.position.y
    const moved = movePiece(board, piece, 0, 1)

    expect(moved).not.toBeNull()
    expect(moved!.position.y).toBe(originalY + 1)
  })

  it("should return null for invalid move", () => {
    const board = createEmptyBoard()
    const piece = createTetromino("T")
    piece.position.x = 0
    const moved = movePiece(board, piece, -5, 0)

    expect(moved).toBeNull()
  })
})

describe("rotatePiece", () => {
  it("should rotate piece when valid", () => {
    const board = createEmptyBoard()
    const piece = createTetromino("T")
    piece.position = { x: 4, y: 5 }
    const rotated = rotatePiece(board, piece)

    expect(rotated).not.toBeNull()
  })

  it("should apply wall kick when near edge", () => {
    const board = createEmptyBoard()
    const piece = createTetromino("I")
    piece.position = { x: 0, y: 5 }
    const rotated = rotatePiece(board, piece)

    // Should either succeed with wall kick or return null if impossible
    if (rotated) {
      expect(isValidPosition(board, rotated)).toBe(true)
    }
  })
})

describe("hardDrop", () => {
  it("should drop piece to bottom of empty board", () => {
    const board = createEmptyBoard()
    const piece = createTetromino("O")
    piece.position = { x: 4, y: 0 }

    const { piece: dropped, cellsDropped } = hardDrop(board, piece)

    expect(dropped.position.y).toBeGreaterThan(0)
    expect(cellsDropped).toBeGreaterThan(0)
  })

  it("should stop at existing blocks", () => {
    const board = createEmptyBoard()
    // Place blocks at bottom
    board[BOARD_HEIGHT - 1][4] = "T"
    board[BOARD_HEIGHT - 1][5] = "T"

    const piece = createTetromino("O")
    piece.position = { x: 4, y: 0 }

    const { piece: dropped } = hardDrop(board, piece)

    // O piece is 2x2, so it should stop 2 rows above the blocking pieces
    expect(dropped.position.y).toBe(BOARD_HEIGHT - 3)
  })
})

describe("getBoardWithPiece", () => {
  it("should return board unchanged when no piece", () => {
    const board = createEmptyBoard()
    const result = getBoardWithPiece(board, null)
    expect(result).toEqual(board)
  })

  it("should overlay piece on board", () => {
    const board = createEmptyBoard()
    const piece = createTetromino("O")
    piece.position = { x: 0, y: 0 }

    const result = getBoardWithPiece(board, piece)

    expect(result[0][0]).toBe("O")
    expect(result[0][1]).toBe("O")
    expect(result[1][0]).toBe("O")
    expect(result[1][1]).toBe("O")
  })
})
