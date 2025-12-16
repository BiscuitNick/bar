# Product Requirements Document: Retro Games Hub

## 1. Product Overview

### Description
Retro Games Hub is a modern web application featuring classic arcade games built with Next.js 16. The application provides a clean, responsive homepage that serves as a game launcher for three beloved retro games: Tetris, Minesweeper, and Snake.

### Problem it Solves
Users seeking quick, casual gaming experiences often encounter ad-heavy, poorly designed web games. This app provides a polished, distraction-free gaming experience with modern web technologies and a beautiful UI.

### Target Users
- Casual gamers looking for quick entertainment
- Users wanting classic games without downloads or installations
- Developers looking for a reference implementation of browser-based games

### Success Criteria
- All three games are fully playable with keyboard controls
- Theme toggle works seamlessly between light and dark modes
- Games maintain smooth 60fps performance
- Responsive design works on desktop and tablet viewports

---

## 2. Functional Requirements

### Homepage
- Display a grid of game cards showing all available games
- Each card includes: game icon/preview, title, brief description
- Clicking a card navigates to the game page
- Theme toggle button in header for light/dark mode switching
- Persist theme preference in localStorage

### Tetris Game
- Standard 10x20 game board
- Seven tetromino pieces (I, O, T, S, Z, J, L)
- Controls: Arrow keys for movement, Up for rotation, Space for hard drop
- Score tracking with line clear multipliers
- Next piece preview
- Game over detection when pieces stack to top
- Pause/Resume functionality

### Minesweeper Game
- Three difficulty levels: Beginner (9x9, 10 mines), Intermediate (16x16, 40 mines), Expert (30x16, 99 mines)
- Left-click to reveal cell, right-click to flag
- First click is always safe (no mine)
- Timer tracking
- Mine counter showing remaining unflagged mines
- Win/lose detection with board reveal

### Snake Game
- Grid-based gameplay area
- Snake grows when eating food
- Game over on wall collision or self-collision
- Score based on food consumed
- Increasing speed as score increases
- Arrow keys for direction control
- Pause/Resume functionality

### Shared Game Features
- High score tracking per game (localStorage)
- Play again button on game over
- Return to homepage navigation
- Responsive layout adapting to screen size

---

## 3. Technical Requirements

### Technology Stack
- **Framework**: Next.js 16 (App Router)
- **UI Components**: shadcn/ui
- **Styling**: Tailwind CSS 4
- **Language**: TypeScript
- **State Management**: React hooks (useState, useReducer, useEffect)
- **Theme**: next-themes for dark/light mode

### Architecture
- `/app` directory structure using Next.js App Router
- `/components/ui` for shadcn/ui components
- `/components/games` for game-specific components
- `/lib/games` for game logic (separated from UI)
- `/hooks` for custom game hooks

### Performance Requirements
- Initial page load under 3 seconds on 3G
- Game animations at consistent 60fps
- No layout shift during theme changes
- Lazy loading for game components

### Security Considerations
- No external API calls (fully client-side)
- localStorage sanitization for high scores
- No user data collection

---

## 4. Non-Functional Requirements

### Scalability
- Static export capability for CDN deployment
- No server-side dependencies for game functionality

### Reliability
- Games continue functioning offline after initial load
- Graceful handling of localStorage unavailability

### Compatibility
- Modern browsers: Chrome, Firefox, Safari, Edge (latest 2 versions)
- Minimum viewport: 768px width (tablet and above)
- Keyboard-only operation support

### Accessibility
- Keyboard navigation for all interactive elements
- ARIA labels for game status announcements
- Sufficient color contrast in both themes
- Focus indicators visible

---

## 5. Acceptance Criteria

### General
- [ ] Application builds without errors
- [ ] All TypeScript types are properly defined
- [ ] Theme toggle switches between light and dark modes
- [ ] Theme preference persists across sessions
- [ ] Homepage displays all three game cards

### Tetris
- [ ] All seven tetromino pieces render correctly
- [ ] Pieces move left/right/down with arrow keys
- [ ] Pieces rotate with up arrow
- [ ] Hard drop works with spacebar
- [ ] Lines clear when complete
- [ ] Score updates correctly
- [ ] Game ends when pieces reach top
- [ ] High score saves to localStorage

### Minesweeper
- [ ] All three difficulty levels are selectable
- [ ] Cells reveal on left-click
- [ ] Flags toggle on right-click
- [ ] First click never hits a mine
- [ ] Numbers show adjacent mine counts
- [ ] Timer counts up during gameplay
- [ ] Game ends correctly on win/lose

### Snake
- [ ] Snake moves in response to arrow keys
- [ ] Snake grows when eating food
- [ ] Food spawns randomly after consumption
- [ ] Game ends on wall collision
- [ ] Game ends on self-collision
- [ ] Speed increases with score
- [ ] High score saves to localStorage

---

## 6. Out of Scope

- Mobile touch controls (keyboard only for MVP)
- Multiplayer functionality
- User accounts or cloud saves
- Sound effects or music
- Leaderboards beyond local high scores
- Additional games beyond the three specified
- PWA/offline-first functionality
- Gamepad/controller support
