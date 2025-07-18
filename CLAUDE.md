# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an "Executive Protection" landing page project built with React, TypeScript, and Vite. It's a single-page application featuring multiple sections including banner, issues, good points, muscle crew, movie, schedule, interview, Q&A, recruitment, and entry subsections.

## Build and Development Commands

- **Development server**: `npm run dev` (runs on port 3000 with host 0.0.0.0)
- **Production build**: `npm run build`

## Architecture

### Tech Stack
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite with React plugin
- **Styling**: TailwindCSS with custom color variables and shadcn/ui components
- **UI Components**: Radix UI primitives (@radix-ui/react-*)

### Project Structure
- **Entry Point**: `src/index.tsx` renders Layout with LandingPage inside
- **Layout**: `src/components/layout/` contains Header, Footer, and Layout wrapper with fixed positioning
- **Screens**: `src/screens/index.tsx` orchestrates all page sections in order
- **Sections**: `src/screens/sections/` contains individual subsection components
- **UI Components**: `src/components/ui/` contains reusable shadcn/ui components

### Key Architecture Patterns
- Layout wrapper provides consistent structure with Header/Footer and fixed right-side floating element
- LandingPage component renders all sections sequentially as a single-page layout
- All sections are self-contained components imported from `src/screens/sections/`
- Uses absolute imports with `@` alias pointing to `src/` directory
- Custom CSS variables for theming (mainyellow-neon, subblack, textwhite, etc.)

### Styling System
- TailwindCSS configuration includes custom color palette and font families
- CSS variables defined for consistent theming
- Uses both Tailwind utilities and shadcn/ui component system
- Dark mode support configured via class-based approach

### Dependencies
- Core UI: React, React DOM, React Router DOM
- Component Library: Radix UI primitives with shadcn/ui styling
- Utilities: class-variance-authority, clsx, tailwind-merge for conditional styling
- Icons: Lucide React for iconography