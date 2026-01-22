# Codebase Structure

**Analysis Date:** 2026-01-22

## Directory Layout

```
project-root/
├── src/                               # React application source
│   ├── components/
│   │   ├── library/                   # Book library feature
│   │   │   ├── LibraryPage.tsx        # Main page, state management
│   │   │   ├── BookCard.tsx           # Individual book grid item
│   │   │   ├── BookDetailModal.tsx    # Book details overlay
│   │   │   ├── AddBookModal.tsx       # Book suggestion form
│   │   │   ├── icons.tsx              # SVG icons for UI
│   │   │   ├── types.ts               # TypeScript interfaces
│   │   │   ├── index.ts               # Barrel export
│   │   │   └── goodreads_library_export.csv  # Data source reference
│   │   └── NotFound.tsx               # 404 page
│   ├── sanity/                        # CMS integration
│   │   ├── client.ts                  # Sanity client config, image builder
│   │   ├── queries.ts                 # GROQ queries
│   │   ├── preload.ts                 # In-memory cache utility
│   │   └── types.ts                   # Sanity schema type mappings
│   ├── utils/                         # Shared utilities
│   │   ├── cursorCompat.ts            # Cursor compatibility (stub)
│   │   ├── scrollLock.ts              # Scroll lock implementation
│   │   └── useScrollLock.ts           # Hook for scroll lock
│   ├── styles/                        # Global styling
│   │   └── globals.css                # Tailwind + custom animations
│   ├── App.tsx                        # Route configuration
│   ├── main.tsx                       # React root setup
│   ├── index.css                      # Base styles
│   ├── vite-env.d.ts                  # Vite type definitions
│   └── Attributions.md                # License attributions
├── studio-michelle-liu/               # Sanity CMS studio (separate package)
│   ├── schemaTypes/
│   │   ├── shelfItem.ts               # Books/music/movies document type
│   │   ├── bookSuggestion.ts          # User book suggestions
│   │   └── index.ts                   # Schema exports
│   ├── structure.ts                   # CMS UI structure
│   └── sanity.config.ts               # CMS config
├── public/                            # Static assets (favicon, etc.)
├── dist/                              # Build output (Vite)
├── vite.config.ts                     # Vite build config
├── tsconfig.json                      # TypeScript config
├── package.json                       # Dependencies
└── index.html                         # HTML entry point
```

## Directory Purposes

**src/:**
- Purpose: All React application source code
- Contains: Components, hooks, utilities, styles, CMS integration
- Entry point: `main.tsx`

**src/components/library/:**
- Purpose: Book library feature (homepage)
- Contains: Page component, sub-components, types, icons
- Exported via: `index.ts` barrel file
- Key file: `LibraryPage.tsx` manages all state and data fetching

**src/sanity/:**
- Purpose: Sanity CMS integration layer
- Contains: Client instantiation, GROQ queries, caching, type definitions
- Used by: All components that need book data
- Config: Connects to project ID "am3v0x1c", dataset "production"

**src/utils/:**
- Purpose: Reusable helper functions and hooks
- Contains: Scroll lock implementation, cursor compatibility
- Pattern: Utilities are imported directly by components

**src/styles/:**
- Purpose: Global CSS and Tailwind configuration
- Contains: Base styles, custom animations (overlay-in, overlay-out)
- Applied to: All components via class names

**studio-michelle-liu/:**
- Purpose: Separate Sanity CMS studio (headless CMS management interface)
- Contains: Schema type definitions, CMS structure configuration
- Not built with main app: Deployed separately to Sanity cloud
- Schemas: shelfItem (books/music/movies), bookSuggestion (user input)

## Key File Locations

**Entry Points:**
- `src/main.tsx`: React root creation, BrowserRouter setup
- `src/App.tsx`: Route definitions, cursor initialization
- `src/components/library/LibraryPage.tsx`: Main page component, data fetching

**Configuration:**
- `vite.config.ts`: Build configuration, path aliases (@/ = ./src)
- `tsconfig.json`: TypeScript strict mode, target ES2020
- `src/sanity/client.ts`: Sanity project ID, dataset, API version

**Core Logic:**
- `src/components/library/LibraryPage.tsx`: Data fetching, state management, filtering
- `src/components/library/types.ts`: Book and ShelfBookData type definitions
- `src/sanity/queries.ts`: GROQ queries for fetching books and years
- `src/components/library/BookDetailModal.tsx`: Review text formatting, modal animation

**Styling:**
- `src/styles/globals.css`: Tailwind base, custom animations, font definitions
- `src/index.css`: Component base styles
- Colors embedded in component className strings (no CSS variables)

**Testing:**
- Not found (no test files in repository)

## Naming Conventions

**Files:**
- Components: PascalCase (LibraryPage.tsx, BookCard.tsx, BookDetailModal.tsx)
- Utilities: camelCase (cursorCompat.ts, scrollLock.ts, useScrollLock.ts)
- Types: kebab-case filename (types.ts) or PascalCase exports (Book interface)
- Queries: UPPERCASE (SHELF_BOOKS_QUERY, BOOK_YEARS_QUERY)

**Directories:**
- Feature directories: lowercase (library/, sanity/, utils/, styles/)
- Schema types: lowercase (shelfItem, bookSuggestion)

**Functions/Hooks:**
- React components: PascalCase (LibraryPage, BookCard, BookDetailModal)
- React hooks: camelCase starting with 'use' (useScrollLock)
- Utility functions: camelCase (transformShelfBook, getCachedData, urlFor)
- Types/Interfaces: PascalCase (Book, ShelfBookData, FilterOption)

**Variables:**
- State variables: camelCase (books, activeFilter, selectedBook)
- Constants: UPPERCASE for non-React exports (SHELF_BOOKS_QUERY)
- CSS classes: kebab-case (animate-overlay-in, text-[#78716c])

## Where to Add New Code

**New Feature (e.g., Music/Movies shelf):**
- Primary code: Create `src/components/{feature}/` directory with page component
- Data fetching: Add queries to `src/sanity/queries.ts`
- Types: Add interfaces to `src/components/{feature}/types.ts`
- Routes: Add Route to `src/App.tsx`
- Example: Music shelf would follow pattern of LibraryPage → MusicPage

**New Component/Module:**
- Feature components: `src/components/{feature}/ComponentName.tsx`
- Shared/utility components: `src/components/ComponentName.tsx` (if shared across features)
- UI primitives: Import from Radix UI or create in feature directory

**Utilities:**
- Shared helpers: `src/utils/{utility}.ts`
- Hooks: `src/utils/use{HookName}.ts`
- Type utilities: `src/utils/types.ts` (if multiple features need them)

**Styling:**
- Global styles: `src/styles/globals.css`
- Component-scoped styles: Inline className strings (no CSS modules currently used)
- Custom animations: Add to `src/styles/globals.css` with @keyframes

**Sanity Integration:**
- New CMS schemas: Add to `studio-michelle-liu/schemaTypes/` (requires separate schema deployment)
- New queries: Add to `src/sanity/queries.ts`
- Data transformations: Add to component or create utility function

## Special Directories

**dist/:**
- Purpose: Vite build output
- Generated: Yes (by `npm run build`)
- Committed: No (in .gitignore)
- Contains: Minified JS, CSS, assets

**node_modules/:**
- Purpose: npm dependencies
- Generated: Yes (by `npm install` or `pnpm install`)
- Committed: No (in .gitignore)

**studio-michelle-liu/:**
- Purpose: Sanity CMS studio (headless content management)
- Separate package: Has its own package.json, node_modules, tsconfig
- Deployment: Sanity cloud (not part of main app build)
- Schemas: Define content structure used by `src/sanity/queries.ts`

## Build & Deploy Configuration

**Vite Configuration:**
- Build target: `esnext`
- Output directory: `dist/`
- Dev server port: 3000
- Plugin: React SWC for fast compilation
- Plugin: Tailwind CSS vite integration
- Path alias: `@/` → `./src/`
- Extensive module aliases for dependency deduplication

**TypeScript Configuration:**
- Target: ES2020
- Module: ES2020
- Strict mode enabled
- lib: ES2020, DOM, DOM.Iterable

## Code Patterns & Standards

**Import Organization:**
- React imports first
- Third-party dependencies (React Router, Sanity)
- Local imports (components, sanity, utils, types)
- Relative paths use `@/` alias for src imports

**Component Pattern:**
```typescript
import { useState, useEffect } from "react";
import type { ComponentProps } from "./types";

export default function ComponentName() {
  const [state, setState] = useState(initialValue);

  useEffect(() => {
    // Side effects
  }, [dependencies]);

  return (
    <div>
      {/* JSX */}
    </div>
  );
}
```

**Data Fetching Pattern:**
- useEffect in components
- Promise.all for parallel queries
- Try-catch with error logging
- Loading state managed locally

**Styling Pattern:**
- Tailwind CSS utility classes
- clsx() for conditional classes
- Inline style prop for dynamic gradients/backgrounds
- No styled-components or CSS modules

---

*Structure analysis: 2026-01-22*
