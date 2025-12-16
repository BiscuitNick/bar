import { describe, it, expect } from "vitest"
import {
  TETROMINO_SHAPES,
  TETROMINO_TYPES,
  getRandomTetromino,
  rotateMatrix,
} from "@/lib/games/tetris/pieces"

describe("Tetromino Shapes", () => {
  it("should have 7 tetromino types", () => {
    expect(TETROMINO_TYPES).toHaveLength(7)
    expect(TETROMINO_TYPES).toEqual(["I", "O", "T", "S", "Z", "J", "L"])
  })

  it("should have shapes defined for all types", () => {
    TETROMINO_TYPES.forEach((type) => {
      expect(TETROMINO_SHAPES[type]).toBeDefined()
      expect(Array.isArray(TETROMINO_SHAPES[type])).toBe(true)
    })
  })

  it("should have square matrices for all shapes", () => {
    TETROMINO_TYPES.forEach((type) => {
      const shape = TETROMINO_SHAPES[type]
      const height = shape.length
      shape.forEach((row) => {
        expect(row.length).toBe(height)
      })
    })
  })

  it("O piece should be 2x2", () => {
    expect(TETROMINO_SHAPES.O).toHaveLength(2)
    expect(TETROMINO_SHAPES.O[0]).toHaveLength(2)
  })

  it("I piece should be 4x4", () => {
    expect(TETROMINO_SHAPES.I).toHaveLength(4)
    expect(TETROMINO_SHAPES.I[0]).toHaveLength(4)
  })

  it("T, S, Z, J, L pieces should be 3x3", () => {
    const threePieces = ["T", "S", "Z", "J", "L"] as const
    threePieces.forEach((type) => {
      expect(TETROMINO_SHAPES[type]).toHaveLength(3)
      expect(TETROMINO_SHAPES[type][0]).toHaveLength(3)
    })
  })
})

describe("getRandomTetromino", () => {
  it("should return a valid tetromino type", () => {
    for (let i = 0; i < 100; i++) {
      const type = getRandomTetromino()
      expect(TETROMINO_TYPES).toContain(type)
    }
  })
})

describe("rotateMatrix", () => {
  it("should rotate a 2x2 matrix 90 degrees clockwise", () => {
    const matrix = [
      [1, 2],
      [3, 4],
    ]
    const rotated = rotateMatrix(matrix)
    expect(rotated).toEqual([
      [3, 1],
      [4, 2],
    ])
  })

  it("should rotate a 3x3 matrix 90 degrees clockwise", () => {
    const matrix = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ]
    const rotated = rotateMatrix(matrix)
    expect(rotated).toEqual([
      [7, 4, 1],
      [8, 5, 2],
      [9, 6, 3],
    ])
  })

  it("should return to original after 4 rotations", () => {
    const original = TETROMINO_SHAPES.T.map((row) => [...row])
    let matrix = original
    for (let i = 0; i < 4; i++) {
      matrix = rotateMatrix(matrix)
    }
    expect(matrix).toEqual(original)
  })

  it("O piece should look the same after rotation", () => {
    const original = TETROMINO_SHAPES.O
    const rotated = rotateMatrix(original)
    expect(rotated).toEqual(original)
  })
})
