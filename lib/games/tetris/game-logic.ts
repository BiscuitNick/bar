import type { Board, Cell, Position, Tetromino, TetrominoType } from "./types"
import { BOARD_HEIGHT, BOARD_WIDTH, POINTS } from "./types"
import { getRandomTetromino, rotateMatrix, TETROMINO_SHAPES } from "./pieces"

export function createEmptyBoard(): Board {
  return Array(BOARD_HEIGHT)
    .fill(null)
    .map(() => Array(BOARD_WIDTH).fill(null))
}

export function createTetromino(type: TetrominoType): Tetromino {
  const shape = TETROMINO_SHAPES[type]
  return {
    type,
    shape: shape.map((row) => [...row]),
    position: {
      x: Math.floor((BOARD_WIDTH - shape[0].length) / 2),
      y: 0,
    },
  }
}

export function isValidPosition(
  board: Board,
  piece: Tetromino,
  position: Position = piece.position
): boolean {
  for (let y = 0; y < piece.shape.length; y++) {
    for (let x = 0; x < piece.shape[y].length; x++) {
      if (piece.shape[y][x]) {
        const newX = position.x + x
        const newY = position.y + y

        if (newX < 0 || newX >= BOARD_WIDTH || newY >= BOARD_HEIGHT) {
          return false
        }

        if (newY >= 0 && board[newY][newX]) {
          return false
        }
      }
    }
  }
  return true
}

export function mergePieceToBoard(board: Board, piece: Tetromino): Board {
  const newBoard = board.map((row) => [...row])

  for (let y = 0; y < piece.shape.length; y++) {
    for (let x = 0; x < piece.shape[y].length; x++) {
      if (piece.shape[y][x]) {
        const boardY = piece.position.y + y
        const boardX = piece.position.x + x
        if (boardY >= 0 && boardY < BOARD_HEIGHT && boardX >= 0 && boardX < BOARD_WIDTH) {
          newBoard[boardY][boardX] = piece.type
        }
      }
    }
  }

  return newBoard
}

export function clearLines(board: Board): { newBoard: Board; linesCleared: number } {
  const newBoard: Board = []
  let linesCleared = 0

  for (let y = 0; y < BOARD_HEIGHT; y++) {
    if (board[y].every((cell) => cell !== null)) {
      linesCleared++
    } else {
      newBoard.push([...board[y]])
    }
  }

  while (newBoard.length < BOARD_HEIGHT) {
    newBoard.unshift(Array(BOARD_WIDTH).fill(null))
  }

  return { newBoard, linesCleared }
}

export function calculateScore(linesCleared: number, level: number): number {
  const basePoints = {
    1: POINTS.SINGLE,
    2: POINTS.DOUBLE,
    3: POINTS.TRIPLE,
    4: POINTS.TETRIS,
  }[linesCleared] || 0

  return basePoints * level
}

export function rotatePiece(board: Board, piece: Tetromino): Tetromino | null {
  const rotatedShape = rotateMatrix(piece.shape)
  const rotatedPiece: Tetromino = {
    ...piece,
    shape: rotatedShape,
  }

  // Wall kick attempts
  const kicks = [
    { x: 0, y: 0 },
    { x: -1, y: 0 },
    { x: 1, y: 0 },
    { x: 0, y: -1 },
    { x: -2, y: 0 },
    { x: 2, y: 0 },
  ]

  for (const kick of kicks) {
    const newPosition = {
      x: piece.position.x + kick.x,
      y: piece.position.y + kick.y,
    }
    if (isValidPosition(board, rotatedPiece, newPosition)) {
      return {
        ...rotatedPiece,
        position: newPosition,
      }
    }
  }

  return null
}

export function movePiece(
  board: Board,
  piece: Tetromino,
  dx: number,
  dy: number
): Tetromino | null {
  const newPosition = {
    x: piece.position.x + dx,
    y: piece.position.y + dy,
  }

  if (isValidPosition(board, piece, newPosition)) {
    return {
      ...piece,
      position: newPosition,
    }
  }

  return null
}

export function hardDrop(board: Board, piece: Tetromino): { piece: Tetromino; cellsDropped: number } {
  let cellsDropped = 0
  let currentPiece = piece

  while (true) {
    const newPosition = {
      x: currentPiece.position.x,
      y: currentPiece.position.y + 1,
    }

    if (isValidPosition(board, currentPiece, newPosition)) {
      currentPiece = { ...currentPiece, position: newPosition }
      cellsDropped++
    } else {
      break
    }
  }

  return { piece: currentPiece, cellsDropped }
}

export function getGhostPosition(board: Board, piece: Tetromino): Position {
  const { piece: ghostPiece } = hardDrop(board, piece)
  return ghostPiece.position
}

export function getBoardWithPiece(board: Board, piece: Tetromino | null): Cell[][] {
  if (!piece) return board

  const displayBoard = board.map((row) => [...row])

  for (let y = 0; y < piece.shape.length; y++) {
    for (let x = 0; x < piece.shape[y].length; x++) {
      if (piece.shape[y][x]) {
        const boardY = piece.position.y + y
        const boardX = piece.position.x + x
        if (boardY >= 0 && boardY < BOARD_HEIGHT && boardX >= 0 && boardX < BOARD_WIDTH) {
          displayBoard[boardY][boardX] = piece.type
        }
      }
    }
  }

  return displayBoard
}
