import { cn } from "@/lib/utils"
import type { Position } from "@/lib/games/snake/types"
import { BOARD_SIZE } from "@/lib/games/snake/types"

interface SnakeBoardProps {
  snake: Position[]
  food: Position
}

export function SnakeBoard({ snake, food }: SnakeBoardProps) {
  const snakeSet = new Set(snake.map((pos) => `${pos.x},${pos.y}`))
  const headKey = `${snake[0].x},${snake[0].y}`
  const foodKey = `${food.x},${food.y}`

  const cells = []
  for (let y = 0; y < BOARD_SIZE; y++) {
    for (let x = 0; x < BOARD_SIZE; x++) {
      const key = `${x},${y}`
      const isSnake = snakeSet.has(key)
      const isHead = key === headKey
      const isFood = key === foodKey

      cells.push(
        <div
          key={key}
          className={cn(
            "aspect-square w-4 sm:w-5",
            isHead && "bg-green-600 dark:bg-green-500 rounded-sm",
            isSnake && !isHead && "bg-green-500 dark:bg-green-400",
            isFood && "bg-red-500 rounded-full",
            !isSnake && !isFood && "bg-muted/50"
          )}
        />
      )
    }
  }

  return (
    <div
      className="grid gap-px border-2 border-border bg-border p-px"
      style={{ gridTemplateColumns: `repeat(${BOARD_SIZE}, 1fr)` }}
    >
      {cells}
    </div>
  )
}
