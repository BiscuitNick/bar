import { describe, it, expect } from 'vitest'
import {
  createEmptyBoard,
  placeMines,
  revealCell,
  toggleFlag,
  checkWin,
} from '@/lib/games/minesweeper/game-logic'

describe('Minesweeper Game Logic', () => {
  describe('createEmptyBoard', () => {
    it('creates a board with correct dimensions', () => {
      const config = { rows: 5, cols: 5, mines: 5 }
      const board = createEmptyBoard(config)
      expect(board).toHaveLength(5)
      expect(board[0]).toHaveLength(5)
    })

    it('initializes cells correctly', () => {
      const config = { rows: 2, cols: 2, mines: 1 }
      const board = createEmptyBoard(config)
      const cell = board[0][0]
      expect(cell).toEqual({
        isMine: false,
        adjacentMines: 0,
        state: 'hidden'
      })
    })
  })

  describe('placeMines', () => {
    it('places correct number of mines', () => {
      const config = { rows: 5, cols: 5, mines: 5 }
      const board = createEmptyBoard(config)
      const boardWithMines = placeMines(board, config, 0, 0)
      
      let mineCount = 0
      boardWithMines.forEach(row => {
        row.forEach(cell => {
          if (cell.isMine) mineCount++
        })
      })
      expect(mineCount).toBe(5)
    })

    it('does not place mine at the first click location or neighbors', () => {
        // We use a large board with few mines to minimize chance of failure due to impossible constraints
        const config = { rows: 10, cols: 10, mines: 10 }
        const board = placeMines(createEmptyBoard(config), config, 5, 5)
        
        // 5,5 should be safe
        expect(board[5][5].isMine).toBe(false)
        // Neighbors should be safe too ideally, but let's check strict excluded logic in code
        // Code: Math.abs(row - excludeRow) <= 1 && Math.abs(col - excludeCol) <= 1
        expect(board[4][4].isMine).toBe(false)
        expect(board[4][5].isMine).toBe(false)
        expect(board[4][6].isMine).toBe(false)
        expect(board[5][4].isMine).toBe(false)
        expect(board[5][6].isMine).toBe(false)
        expect(board[6][4].isMine).toBe(false)
        expect(board[6][5].isMine).toBe(false)
        expect(board[6][6].isMine).toBe(false)
    })
  })

  describe('revealCell', () => {
    it('reveals a cell', () => {
        const config = { rows: 5, cols: 5, mines: 0 }
        let board = createEmptyBoard(config)
        board = revealCell(board, 0, 0)
        expect(board[0][0].state).toBe('revealed')
    })

    it('recursively reveals neighbors for empty cells', () => {
        const config = { rows: 3, cols: 3, mines: 0 }
        let board = createEmptyBoard(config)
        board = revealCell(board, 0, 0)
        
        board.forEach(row => {
            row.forEach(cell => {
                expect(cell.state).toBe('revealed')
            })
        })
    })
  })

  describe('toggleFlag', () => {
      it('toggles flag on hidden cell', () => {
          const config = { rows: 2, cols: 2, mines: 0 }
          let board = createEmptyBoard(config)
          board = toggleFlag(board, 0, 0)
          expect(board[0][0].state).toBe('flagged')
          
          board = toggleFlag(board, 0, 0)
          expect(board[0][0].state).toBe('hidden')
      })
      
      it('does not flag revealed cell', () => {
          const config = { rows: 2, cols: 2, mines: 0 }
          let board = createEmptyBoard(config)
          board[0][0].state = 'revealed'
          board = toggleFlag(board, 0, 0)
          expect(board[0][0].state).toBe('revealed')
      })
  })
  
  describe('checkWin', () => {
      it('returns true when all non-mine cells are revealed', () => {
          const config = { rows: 2, cols: 2, mines: 1 }
          let board = createEmptyBoard(config)
          // Manually set up a win state
          board[0][0].isMine = true
          board[0][1].isMine = false
          board[1][0].isMine = false
          board[1][1].isMine = false
          
          board[0][1].state = 'revealed'
          board[1][0].state = 'revealed'
          board[1][1].state = 'revealed'
          
          expect(checkWin(board)).toBe(true)
      })

      it('returns false when non-mine cells are hidden', () => {
        const config = { rows: 2, cols: 2, mines: 1 }
        let board = createEmptyBoard(config)
        board[0][0].isMine = true
        // Others are hidden non-mines
        expect(checkWin(board)).toBe(false)
      })
  })
})
