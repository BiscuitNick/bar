# Architecture Documentation

## Overview

Retro Games Hub is a web application that allows users to play classic retro games directly in their browser. The application is built with performance, accessibility, and maintainability in mind, using modern web technologies.

## Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/) / [Shadcn UI](https://ui.shadcn.com/)
- **State Management**: React Hooks (local state + custom hooks)
- **Testing**: [Vitest](https://vitest.dev/) + [React Testing Library](https://testing-library.com/)

## Project Structure

The project follows a modular structure where each game is self-contained in terms of logic and components, while sharing common UI elements.

```
/
├── app/                  # Next.js App Router pages
│   ├── games/            # Game routes
│   │   ├── minesweeper/  # /games/minesweeper
│   │   ├── snake/        # /games/snake
│   │   └── tetris/       # /games/tetris
│   └── page.tsx          # Landing page
├── components/           # React components
│   ├── games/            # Game-specific components (Boards, Cells, Pieces)
│   └── ui/               # Shared UI components (Buttons, Cards)
├── hooks/                # Custom React hooks
│   ├── use-minesweeper.ts
│   ├── use-snake.ts
│   └── use-tetris.ts
├── lib/                  # Business logic and utilities
│   ├── games/            # Pure game logic (no React dependencies)
│   └── utils.ts          # Helper functions
├── public/               # Static assets
└── __tests__/            # Test files
```

## Game Implementation Pattern

Each game follows a strict Separation of Concerns (SoC) pattern:

### 1. Pure Logic (`lib/games/*`)
Game rules and state transitions are implemented as pure TypeScript functions. This makes the core logic testable without a DOM or React environment.
- **Input**: Current state + Action
- **Output**: New state

### 2. State Management (`hooks/*`)
Custom hooks connect the pure logic with React state. They handle:
- Game loop (using `requestAnimationFrame` or `setInterval`)
- User input handling (keyboard events)
- State persistence (if applicable)

### 3. UI Presentation (`components/games/*`)
Components are largely presentational, receiving state via props and emitting events.
- **Board Components**: Render the game grid.
- **Cell/Piece Components**: Render individual game elements.

## Theming

The application supports light and dark modes using `next-themes`. The theme toggle is available globally in the header.

## Testing Strategy

- **Unit Tests**: Focus on `lib/games` to ensure game rules are correct.
- **Component Tests**: Focus on `components/games` to ensure correct rendering and interaction handling.
