# System Architecture

## Overview
Logic.dev is a Next.js application built with the App Router architecture, designed to help users practice and improve their programming logic through JavaScript exercises.

## Architectural Patterns

### 1. App Router (Next.js 13+)
- Uses file-system based routing with `app/` directory
- Route segments map directly to URL paths
- Supports Server Components, Client Components, and Streaming

### 2. Component-Based Architecture
- React components organized by feature/domain
- Separation of concerns: UI components, layout components, data components
- Reusable component library in `src/components/`

### 3. Data Flow
- Server Components fetch data at build/request time
- Client Components handle interactivity and state
- Mock data layer for development (`src/lib/mock-user.js`)
- Exercise data stored in `src/data/exercises.js`

### 4. State Management
- React `useState` hooks for local component state
- No external state management library (Redux, Zustand, etc.) - relies on React's built-in state
- Data passed via props from parent to child components

### 5. Styling Architecture
- Tailwind CSS for utility-first styling
- Custom CSS classes in `globals.css`
- Component-scoped styling with Tailwind classes
- Dark mode support through color variables

### 6. Web Worker Pattern
- Custom Web Worker implementation for code execution
- Workers loaded via `new URL(..., import.meta.url)` pattern
- Separation of UI thread from computation-heavy tasks

## Key Architectural Decisions

### 1. Next.js App Router
- Chose App Router over Pages Router for newer React features
- Enables Server Components for better performance
- File-system routing eliminates need for separate routing configuration

### 2. Monaco Editor Integration
- Selected Monaco for code editing experience similar to VS Code
- Provides syntax highlighting, autocompletion, and error detection
- Wrapped in React component for seamless integration

### 3. Modular Component Organization
- Dashboard components grouped under `src/components/dashboard/`
- Layout components for consistent structure
- Reusable UI patterns (cards, charts, lists)

### 4. Data Mocking Strategy
- Mock data layer allows UI development without backend
- Easy to replace with real API calls later
- Consistent data shapes between mock and real implementations

### 5. Dark/Futuristic Theme
- Purple/blue gradient color scheme for modern feel
- Dark background (`#0a0a0c`) with accent colors
- Glass morphism effects and blur backgrounds
- Animated elements for engaging user experience

## Integration Points

### 1. External APIs
- Currently uses mock data, designed for easy API integration
- Exercise data could come from CMS or custom API
- User progress and achievements would require backend

### 2. Third-Party Services
- Monaco Editor for code editing
- Recharts for data visualization
- Lucide for icons
- Tailwind CSS for styling

### 3. Build & Deployment
- Optimized for Vercel deployment
- Next.js built-in optimizations (image, font, code splitting)
- Static generation where possible, SSR for dynamic content

## Scalability Considerations

### 1. Frontend Scaling
- Component reusability reduces duplication
- Lazy loading potential for heavy components
- Code splitting through dynamic imports (Next.js automatic)

### 2. Data Management
- Current mock data approach scales to real API
- Exercise data structure allows easy expansion
- User data would require proper authentication and storage

### 3. Performance
- Server Components reduce client-side JavaScript
- Streaming capabilities for progressive loading
- Optimized image and font loading through Next.js

## Security Considerations
- Client-side code execution in Web Workers (sandboxed)
- No direct eval() or dangerous code execution in main thread
- Content Security Policy would need configuration for production
- User-generated content (if added) would require sanitization

## Technology Rationale

### Why Next.js?
- React framework with excellent performance optimizations
- Built-in routing, SSR, SSG, and API routes
- Excellent developer experience and documentation
- Vercel integration for seamless deployment

### Why Tailwind CSS?
- Utility-first approach speeds up development
- Consistent design system through constrained values
- No CSS specificity conflicts
- Excellent responsiveness controls

### Why Monaco Editor?
- Industry-standard code editor (same as VS Code)
- Rich feature set out of the box
- Good performance and customization options
- Familiar interface for developers

### Why Recharts?
- Built specifically for React
- Declarative API charts
- Good customization options
- Active maintenance and community