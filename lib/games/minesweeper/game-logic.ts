import type { Board, Cell, Difficulty, DifficultyConfig } from "./types"
import { DIFFICULTY_CONFIGS } from "./types"

export function createEmptyBoard(config: DifficultyConfig): Board {
  return Array(config.rows)
    .fill(null)
    .map(() =>
      Array(config.cols)
        .fill(null)
        .map(() => ({
          isMine: false,
          adjacentMines: 0,
          state: "hidden" as const,
        }))
    )
}

export function placeMines(
  board: Board,
  config: DifficultyConfig,
  excludeRow: number,
  excludeCol: number
): Board {
  const newBoard = board.map((row) => row.map((cell) => ({ ...cell })))
  let minesPlaced = 0

  while (minesPlaced < config.mines) {
    const row = Math.floor(Math.random() * config.rows)
    const col = Math.floor(Math.random() * config.cols)

    // Don't place mine on first click or where mine already exists
    const isExcluded =
      Math.abs(row - excludeRow) <= 1 && Math.abs(col - excludeCol) <= 1

    if (!newBoard[row][col].isMine && !isExcluded) {
      newBoard[row][col].isMine = true
      minesPlaced++
    }
  }

  return calculateAdjacentMines(newBoard)
}

function calculateAdjacentMines(board: Board): Board {
  const rows = board.length
  const cols = board[0].length

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (board[row][col].isMine) continue

      let count = 0
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          if (dr === 0 && dc === 0) continue
          const newRow = row + dr
          const newCol = col + dc
          if (
            newRow >= 0 &&
            newRow < rows &&
            newCol >= 0 &&
            newCol < cols &&
            board[newRow][newCol].isMine
          ) {
            count++
          }
        }
      }
      board[row][col].adjacentMines = count
    }
  }

  return board
}

export function revealCell(board: Board, row: number, col: number): Board {
  const rows = board.length
  const cols = board[0].length
  const newBoard = board.map((r) => r.map((c) => ({ ...c })))

  function reveal(r: number, c: number) {
    if (r < 0 || r >= rows || c < 0 || c >= cols) return
    if (newBoard[r][c].state !== "hidden") return

    newBoard[r][c].state = "revealed"

    // If cell has no adjacent mines, reveal neighbors
    if (newBoard[r][c].adjacentMines === 0 && !newBoard[r][c].isMine) {
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          if (dr !== 0 || dc !== 0) {
            reveal(r + dr, c + dc)
          }
        }
      }
    }
  }

  reveal(row, col)
  return newBoard
}

export function toggleFlag(board: Board, row: number, col: number): Board {
  const newBoard = board.map((r) => r.map((c) => ({ ...c })))
  const cell = newBoard[row][col]

  if (cell.state === "hidden") {
    cell.state = "flagged"
  } else if (cell.state === "flagged") {
    cell.state = "hidden"
  }

  return newBoard
}

export function revealAllMines(board: Board): Board {
  return board.map((row) =>
    row.map((cell) => ({
      ...cell,
      state: cell.isMine ? "revealed" : cell.state,
    }))
  )
}

export function checkWin(board: Board): boolean {
  for (const row of board) {
    for (const cell of row) {
      // If there's a non-mine cell that's not revealed, game not won
      if (!cell.isMine && cell.state !== "revealed") {
        return false
      }
    }
  }
  return true
}

export function countFlags(board: Board): number {
  let count = 0
  for (const row of board) {
    for (const cell of row) {
      if (cell.state === "flagged") {
        count++
      }
    }
  }
  return count
}
