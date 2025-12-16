export interface Game {
  id: string
  name: string
  description: string
  icon: string
  color: string
  href: string
}

export const games: Game[] = [
  {
    id: "tetris",
    name: "Tetris",
    description: "Classic block-stacking puzzle game. Clear lines and score points!",
    icon: "🧱",
    color: "from-cyan-500 to-blue-600",
    href: "/games/tetris",
  },
  {
    id: "minesweeper",
    name: "Minesweeper",
    description: "Uncover the grid without hitting mines. Use logic to survive!",
    icon: "💣",
    color: "from-green-500 to-emerald-600",
    href: "/games/minesweeper",
  },
  {
    id: "snake",
    name: "Snake",
    description: "Guide the snake to eat food and grow longer. Don't hit the walls!",
    icon: "🐍",
    color: "from-orange-500 to-red-600",
    href: "/games/snake",
  },
]
