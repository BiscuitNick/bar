# Task List: Retro Games Hub

## Orchestration Metadata

```yaml
project: retro-games-hub
version: 1.0.0
total_prs: 12
estimated_total_minutes: 385
```
---
## Dependency Block 1: Foundation (Parallel)

### PR-000: Lemegeton Setup
---
pr_id: PR-000
title: Lemegeton Setup
cold_state: completed
priority: high
complexity:
  score: 1
  estimated_minutes: 5
  suggested_model: haiku
  rationale: Simple configuration file setup
dependencies: []
estimated_files:
  - path: .lemegeton/config.yaml
    action: create
    description: Lemegeton configuration file
---
**Description:**
Initialize Lemegeton orchestration configuration for the project. Set up the necessary config files to enable multi-agent coordination and task tracking.

**Acceptance Criteria:**
- [ ] Lemegeton config file exists and is valid
- [ ] Project can be orchestrated via Lemegeton commands
---
### PR-001: Next.js 16 Project Scaffolding
---
pr_id: PR-001
title: Next.js 16 Project Scaffolding
cold_state: completed
priority: high
complexity:
  score: 2
  estimated_minutes: 15
  suggested_model: haiku
  rationale: Standard project initialization with create-next-app
dependencies: []
estimated_files:
  - path: package.json
    action: create
    description: Project dependencies and scripts
  - path: next.config.ts
    action: create
    description: Next.js configuration
  - path: tsconfig.json
    action: create
    description: TypeScript configuration
  - path: app/layout.tsx
    action: create
    description: Root layout component
  - path: app/page.tsx
    action: create
    description: Homepage placeholder
  - path: .gitignore
    action: modify
    description: Add Next.js specific ignores
---
**Description:**
Initialize a new Next.js 16 project using create-next-app with TypeScript and App Router. Configure the project structure according to best practices with the /app directory pattern.

**Acceptance Criteria:**
- [ ] Project initializes with `pnpm create next-app`
- [ ] TypeScript is properly configured
- [ ] App Router structure is in place
- [ ] Development server starts without errors
- [ ] Build completes successfully
---
## Dependency Block 2: Styling & Theming (Sequential from PR-001)

### PR-002: Tailwind CSS 4 and shadcn/ui Setup
---
pr_id: PR-002
title: Tailwind CSS 4 and shadcn/ui Setup
cold_state: completed
priority: high
complexity:
  score: 3
  estimated_minutes: 20
  suggested_model: haiku
  rationale: Configuration and component library setup
dependencies: [PR-001]
estimated_files:
  - path: tailwind.config.ts
    action: create
    description: Tailwind configuration with theme tokens
  - path: app/globals.css
    action: modify
    description: Global styles with Tailwind directives
  - path: components.json
    action: create
    description: shadcn/ui configuration
  - path: lib/utils.ts
    action: create
    description: Utility functions for cn() helper
  - path: components/ui/button.tsx
    action: create
    description: shadcn Button component
  - path: components/ui/card.tsx
    action: create
    description: shadcn Card component
---
**Description:**
Install and configure Tailwind CSS 4 with the new configuration format. Initialize shadcn/ui and install core components (Button, Card) needed for the homepage and game UIs.

**Acceptance Criteria:**
- [ ] Tailwind CSS 4 is installed and configured
- [ ] shadcn/ui is initialized with proper theming
- [ ] Button and Card components are available
- [ ] CSS custom properties are set up for theming
- [ ] Styles apply correctly in development
---
### PR-003: Light/Dark Theme System
---
pr_id: PR-003
title: Light/Dark Theme System
cold_state: completed
priority: high
complexity:
  score: 3
  estimated_minutes: 20
  suggested_model: haiku
  rationale: Theme provider setup with persistence
dependencies: [PR-002]
estimated_files:
  - path: components/theme-provider.tsx
    action: create
    description: next-themes provider wrapper
  - path: components/theme-toggle.tsx
    action: create
    description: Theme toggle button component
  - path: app/layout.tsx
    action: modify
    description: Wrap app with ThemeProvider
  - path: app/globals.css
    action: modify
    description: Add dark mode color variables
---
**Description:**
Implement a light/dark theme system using next-themes. Create a theme toggle component and ensure theme preference persists in localStorage. Configure CSS variables for both themes.

**Acceptance Criteria:**
- [ ] Theme provider wraps the application
- [ ] Toggle button switches between light and dark
- [ ] Theme persists across page reloads
- [ ] No flash of unstyled content on load
- [ ] All shadcn components respect theme
---
## Dependency Block 3: Homepage (Sequential from PR-003)

### PR-004: Homepage Layout with Game Cards
---
pr_id: PR-004
title: Homepage Layout with Game Cards
cold_state: completed
priority: high
complexity:
  score: 4
  estimated_minutes: 25
  suggested_model: sonnet
  rationale: UI design decisions and responsive layout
dependencies: [PR-003]
estimated_files:
  - path: app/page.tsx
    action: modify
    description: Homepage with game card grid
  - path: components/game-card.tsx
    action: create
    description: Reusable game card component
  - path: components/header.tsx
    action: create
    description: Site header with theme toggle
  - path: lib/games/index.ts
    action: create
    description: Game metadata and constants
---
**Description:**
Build the homepage layout featuring a header with the site title and theme toggle, and a responsive grid of game cards. Each card displays the game name, a brief description, and links to the game page.

**Acceptance Criteria:**
- [ ] Header displays site title and theme toggle
- [ ] Three game cards render in a responsive grid
- [ ] Cards show game name and description
- [ ] Cards link to /games/[game-name] routes
- [ ] Layout adapts to different screen sizes
- [ ] Hover states provide visual feedback
---
## Dependency Block 4: Games (Parallel, depend on PR-004)

### PR-005: Tetris Game Implementation
---
pr_id: PR-005
title: Tetris Game Implementation
cold_state: new
priority: high
complexity:
  score: 7
  estimated_minutes: 60
  suggested_model: opus
  rationale: Complex game logic with rotation systems and collision detection
dependencies: [PR-004]
estimated_files:
  - path: app/games/tetris/page.tsx
    action: create
    description: Tetris game page
  - path: components/games/tetris/tetris-board.tsx
    action: create
    description: Game board rendering component
  - path: components/games/tetris/tetris-piece.tsx
    action: create
    description: Tetromino piece component
  - path: lib/games/tetris/types.ts
    action: create
    description: TypeScript types for Tetris
  - path: lib/games/tetris/pieces.ts
    action: create
    description: Tetromino definitions and rotations
  - path: lib/games/tetris/game-logic.ts
    action: create
    description: Core game mechanics
  - path: hooks/use-tetris.ts
    action: create
    description: Game state management hook
---
**Description:**
Implement a fully playable Tetris game with all seven tetromino pieces, rotation system (SRS or simple), line clearing, scoring, and game over detection. Include next piece preview and pause functionality.

**Acceptance Criteria:**
- [ ] 10x20 game board renders correctly
- [ ] All 7 tetrominoes spawn and display
- [ ] Arrow keys move pieces left/right/down
- [ ] Up arrow rotates pieces with wall kicks
- [ ] Space bar performs hard drop
- [ ] Complete lines clear with animation
- [ ] Score tracks with line clear multipliers
- [ ] Next piece preview displays
- [ ] Game over triggers when pieces reach top
- [ ] High score saves to localStorage
---
### PR-006: Minesweeper Game Implementation
---
pr_id: PR-006
title: Minesweeper Game Implementation
cold_state: new
priority: high
complexity:
  score: 6
  estimated_minutes: 50
  suggested_model: sonnet
  rationale: Recursive reveal algorithm and state management
dependencies: [PR-004]
estimated_files:
  - path: app/games/minesweeper/page.tsx
    action: create
    description: Minesweeper game page
  - path: components/games/minesweeper/minesweeper-board.tsx
    action: create
    description: Game board grid component
  - path: components/games/minesweeper/minesweeper-cell.tsx
    action: create
    description: Individual cell component
  - path: lib/games/minesweeper/types.ts
    action: create
    description: TypeScript types for Minesweeper
  - path: lib/games/minesweeper/game-logic.ts
    action: create
    description: Board generation and reveal logic
  - path: hooks/use-minesweeper.ts
    action: create
    description: Game state management hook
---
**Description:**
Implement Minesweeper with three difficulty levels (Beginner, Intermediate, Expert). Include first-click safety guarantee, recursive cell revealing, flagging system, timer, and win/lose detection.

**Acceptance Criteria:**
- [ ] Difficulty selector with three presets
- [ ] Board generates with correct mine count
- [ ] Left-click reveals cells
- [ ] Right-click toggles flags
- [ ] First click is always safe
- [ ] Numbers show adjacent mine counts
- [ ] Empty cells cascade reveal neighbors
- [ ] Timer tracks elapsed time
- [ ] Mine counter shows remaining flags
- [ ] Win detected when all non-mines revealed
- [ ] Loss reveals all mines
---
### PR-007: Snake Game Implementation
---
pr_id: PR-007
title: Snake Game Implementation
cold_state: new
priority: high
complexity:
  score: 5
  estimated_minutes: 40
  suggested_model: sonnet
  rationale: Game loop timing and collision detection
dependencies: [PR-004]
estimated_files:
  - path: app/games/snake/page.tsx
    action: create
    description: Snake game page
  - path: components/games/snake/snake-board.tsx
    action: create
    description: Game board canvas component
  - path: lib/games/snake/types.ts
    action: create
    description: TypeScript types for Snake
  - path: lib/games/snake/game-logic.ts
    action: create
    description: Movement and collision logic
  - path: hooks/use-snake.ts
    action: create
    description: Game state management hook
---
**Description:**
Implement the classic Snake game with smooth movement, food spawning, collision detection, and progressive speed increase. Include score tracking and pause functionality.

**Acceptance Criteria:**
- [ ] Snake renders on grid-based board
- [ ] Arrow keys control direction
- [ ] Snake moves continuously in current direction
- [ ] Food spawns at random empty positions
- [ ] Snake grows when eating food
- [ ] Score increments on food consumption
- [ ] Speed increases as score grows
- [ ] Wall collision ends game
- [ ] Self-collision ends game
- [ ] High score saves to localStorage
- [ ] Pause/resume with spacebar or P key
---
## Dependency Block 5: Testing (Depends on game implementations)

### PR-008: Tetris Game Tests
---
pr_id: PR-008
title: Tetris Game Tests
cold_state: new
priority: medium
complexity:
  score: 5
  estimated_minutes: 35
  suggested_model: sonnet
  rationale: Testing game logic and user interactions
dependencies: [PR-005]
estimated_files:
  - path: __tests__/games/tetris/game-logic.test.ts
    action: create
    description: Unit tests for Tetris logic
  - path: __tests__/games/tetris/pieces.test.ts
    action: create
    description: Tests for piece definitions and rotations
  - path: __tests__/games/tetris/tetris-board.test.tsx
    action: create
    description: Component tests for Tetris board
---
**Description:**
Write comprehensive tests for Tetris game logic including piece rotation, collision detection, line clearing, and scoring. Include component tests for the game board rendering.

**Acceptance Criteria:**
- [ ] Tests for all 7 tetromino rotations
- [ ] Tests for collision detection
- [ ] Tests for line clearing logic
- [ ] Tests for score calculation
- [ ] Tests for game over detection
- [ ] Component renders correctly
- [ ] All tests pass
---
### PR-009: Minesweeper Game Tests
---
pr_id: PR-009
title: Minesweeper Game Tests
cold_state: new
priority: medium
complexity:
  score: 4
  estimated_minutes: 30
  suggested_model: sonnet
  rationale: Testing board generation and reveal algorithms
dependencies: [PR-006]
estimated_files:
  - path: __tests__/games/minesweeper/game-logic.test.ts
    action: create
    description: Unit tests for Minesweeper logic
  - path: __tests__/games/minesweeper/minesweeper-board.test.tsx
    action: create
    description: Component tests for Minesweeper board
---
**Description:**
Write tests for Minesweeper game logic including board generation, mine placement, adjacent count calculation, recursive reveal, and win/lose conditions.

**Acceptance Criteria:**
- [ ] Tests for board generation
- [ ] Tests for first-click safety
- [ ] Tests for adjacent mine counting
- [ ] Tests for recursive reveal
- [ ] Tests for flag toggling
- [ ] Tests for win/lose detection
- [ ] All tests pass
---
### PR-010: Snake Game Tests
---
pr_id: PR-010
title: Snake Game Tests
cold_state: new
priority: medium
complexity:
  score: 4
  estimated_minutes: 25
  suggested_model: sonnet
  rationale: Testing movement and collision logic
dependencies: [PR-007]
estimated_files:
  - path: __tests__/games/snake/game-logic.test.ts
    action: create
    description: Unit tests for Snake logic
  - path: __tests__/games/snake/snake-board.test.tsx
    action: create
    description: Component tests for Snake board
---
**Description:**
Write tests for Snake game logic including movement, direction changes, food consumption, growth mechanics, and collision detection.

**Acceptance Criteria:**
- [ ] Tests for snake movement
- [ ] Tests for direction changes
- [ ] Tests for food spawning
- [ ] Tests for snake growth
- [ ] Tests for wall collision
- [ ] Tests for self-collision
- [ ] Tests for speed progression
- [ ] All tests pass
---
## Dependency Block 6: Documentation (Final)

### PR-011: Architecture Documentation
---
pr_id: PR-011
title: Architecture Documentation
cold_state: new
priority: low
complexity:
  score: 3
  estimated_minutes: 30
  suggested_model: haiku
  rationale: Documentation based on implemented code
dependencies: [PR-005, PR-006, PR-007, PR-008, PR-009, PR-010]
estimated_files:
  - path: docs/architecture.md
    action: create
    description: Technical architecture documentation
  - path: README.md
    action: modify
    description: Project readme with setup instructions
---
**Description:**
Document the project architecture including component structure, game logic patterns, state management approach, and theming system. Update README with setup and development instructions.

**Acceptance Criteria:**
- [ ] Architecture diagram or description
- [ ] Component hierarchy documented
- [ ] Game logic patterns explained
- [ ] State management approach described
- [ ] README includes setup instructions
- [ ] README includes development commands
- [ ] README includes deployment guidance
---
### PR-012: Final Integration and Polish
---
pr_id: PR-012
title: Final Integration and Polish
cold_state: new
priority: medium
complexity:
  score: 4
  estimated_minutes: 30
  suggested_model: sonnet
  rationale: Integration testing and final refinements
dependencies: [PR-011]
estimated_files:
  - path: app/layout.tsx
    action: modify
    description: Final metadata and SEO
  - path: app/globals.css
    action: modify
    description: Final style adjustments
  - path: components/games/shared/game-header.tsx
    action: create
    description: Shared game header component
---
**Description:**
Final integration pass to ensure all games work together, consistent styling across components, proper navigation between pages, and SEO metadata. Polish any rough edges found during integration.

**Acceptance Criteria:**
- [ ] All games accessible from homepage
- [ ] Navigation works in all directions
- [ ] Theme consistent across all pages
- [ ] No console errors in production build
- [ ] Lighthouse score > 90 for performance
- [ ] All acceptance criteria from PRD met
