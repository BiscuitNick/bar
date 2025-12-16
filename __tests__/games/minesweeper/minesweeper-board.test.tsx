import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { MinesweeperBoard } from '@/components/games/minesweeper/minesweeper-board'
import { createEmptyBoard } from '@/lib/games/minesweeper/game-logic'

describe('MinesweeperBoard', () => {
    const config = { rows: 3, cols: 3, mines: 1 }
    const emptyBoard = createEmptyBoard(config)
    
    it('renders correct number of cells', () => {
        render(
            <MinesweeperBoard 
                board={emptyBoard}
                status="playing"
                onCellClick={() => {}}
                onCellRightClick={() => {}}
            />
        )
        // 3x3 = 9 buttons
        const buttons = screen.getAllByRole('button')
        expect(buttons).toHaveLength(9)
    })
    
    it('calls onCellClick when clicked', () => {
        const handleClick = vi.fn()
        render(
            <MinesweeperBoard 
                board={emptyBoard}
                status="playing"
                onCellClick={handleClick}
                onCellRightClick={() => {}}
            />
        )
        
        const buttons = screen.getAllByRole('button')
        fireEvent.click(buttons[0])
        expect(handleClick).toHaveBeenCalledWith(0, 0)
    })
    
    it('calls onCellRightClick when right clicked', () => {
        const handleRightClick = vi.fn()
        render(
            <MinesweeperBoard 
                board={emptyBoard}
                status="playing"
                onCellClick={() => {}}
                onCellRightClick={handleRightClick}
            />
        )
        
        const buttons = screen.getAllByRole('button')
        fireEvent.contextMenu(buttons[0])
        expect(handleRightClick).toHaveBeenCalledWith(0, 0)
    })
})
