# Technology Stack

## Frontend Framework
- **Next.js 16.2.2** - React framework with App Router
- **React 19.2.4** - UI library
- **React DOM 19.2.4** - DOM rendering

## Styling
- **Tailwind CSS 4** - Utility-first CSS framework
- **Tailwind Merge** - Utility for conditionally combining Tailwind classes
- **Clsx** - Utility for constructing className strings

## State Management & Data Fetching
- React Server Components (App Router)
- Built-in Next.js data fetching
- Client-side React hooks for interactivity

## Code Editing
- **Monaco Editor 0.55.1** - Code editor component
- **@monaco-editor/react** - React wrapper for Monaco

## Data Visualization
- **Recharts 3.8.1** - Charting library built on React and D3

## Icons
- **Lucide React 1.7.0** - Icon library

## Development Tools
- **ESLint 9** - Linting utility
- **ESLint Config Next** - ESLint configuration for Next.js
- **PostCSS** - CSS processing
- **jsconfig.json** - TypeScript/JavaScript project configuration

## Build & Deployment
- **Next.js CLI** - Development server and build tool
- Vercel-optimized for deployment

## Web Workers
- Custom worker implementation (`src/lib/worker.js`, `src/lib/executor.worker.js`)
- Web Workers handled via `new URL(..., import.meta.url)` pattern

## Data
- Exercise data stored in `src/data/exercises.js`
- Mock user data in `src/lib/mock-user.js`

## Configuration
- Next.js configuration in `next.config.mjs`
- ESLint configuration in `eslint.config.mjs`
- PostCSS configuration in `postcss.config.mjs`
- Tailwind CSS configuration in `tailwind.config.cjs` (implied)