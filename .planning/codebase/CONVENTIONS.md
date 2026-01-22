# Coding Conventions

**Analysis Date:** 2026-01-22

## Naming Patterns

**Files:**
- PascalCase for component files (e.g., `BookCard.tsx`, `BookDetailModal.tsx`)
- camelCase for utility/hook files (e.g., `useScrollLock.ts`, `cursorCompat.ts`)
- Index files use lowercase `index.ts` for barrel exports
- Type-specific files use camelCase with `types.ts` suffix (e.g., `types.ts`)

**Functions:**
- PascalCase for React components (exported as named or default exports)
  - Example: `export function BookCard({ book, onClick }: BookCardProps)`
  - Example: `export default function LibraryPage()`
- camelCase for utility functions and hooks
  - Example: `export function transformShelfBook(item: ShelfBookData): Book`
  - Example: `export function getCachedData<T>(key: string): T | null`

**Variables:**
- camelCase for all variable declarations and state
  - Example: `const [books, setBooks] = useState<Book[]>([])`
  - Example: `const coverImageUrl = ''`
- UPPER_SNAKE_CASE for constants and queries
  - Example: `export const SHELF_BOOKS_QUERY = ...`
  - Example: `export const BOOK_YEARS_QUERY = ...`
  - Example: `const CACHE_TTL = 5 * 60 * 1000`

**Types/Interfaces:**
- PascalCase for all interfaces and types
  - Example: `interface BookCardProps`
  - Example: `interface Book`
  - Example: `export interface SanityImage`
  - Example: `type FilterOption = { ... }`

## Code Style

**Formatting:**
- No explicit formatter configured (Prettier not used)
- Code follows implicit 2-space indentation
- Semicolons present at end of statements
- Single quotes used in imports, template literals for dynamic strings

**Linting:**
- No ESLint configuration in main project root
- TypeScript strict mode enabled in `tsconfig.json`:
  - `"strict": true`
  - `"noFallthroughCasesInSwitch": true`
  - `"noUnusedLocals": false` (intentionally disabled)
  - `"noUnusedParameters": false` (intentionally disabled)

## Import Organization

**Order:**
1. External dependencies first (React, react-router-dom, third-party libs)
   - Example: `import { useState, useEffect } from "react"`
2. Path-aliased imports from `@/`
   - Example: `import { client, urlFor } from "@/sanity/client"`
3. Relative imports from project
   - Example: `import { BookCard } from "./BookCard"`
4. Type imports marked with `type` keyword
   - Example: `import type { Book, ShelfBookData } from "./types"`

**Path Aliases:**
- `@/*` → `./src/*` (defined in `tsconfig.json`)
- Used for imports like `@/sanity/client`, `@/components/library`

**Inline imports allowed:**
- Dynamic imports used for lazy behavior: `const { writeClient } = await import('@/sanity/client')`

## Error Handling

**Patterns:**
- Try-catch blocks with console.error logging
  - Example from `LibraryPage.tsx`:
    ```typescript
    try {
      // Fetch or operation
    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      setIsLoading(false);
    }
    ```
- Silent failures with logging (no user-facing error boundaries detected)
- Graceful fallbacks for optional data (optional chaining `?.`)
  - Example: `item.cover?.asset`
  - Example: `book.isFavorite || false`

**Error messages:**
- Descriptive console errors with context
- No custom error types or classes used

## Logging

**Framework:** console (no logging library)

**Patterns:**
- `console.error()` for errors
- Single console greeting in `main.tsx`: `console.log("✨ thanks for stopping by!")`
- No debug/info/warn logging in codebase

## Comments

**When to Comment:**
- Inline comments explain regex patterns and parsing logic
  - Example: `// Parse formatting: **bold**, *italic*, <b>bold</b>, <i>italic</i>, and --- horizontal lines`
- Comments document behavior at section boundaries
  - Example: `// Transform shelfItem book data to component format`
- Comments clarify design decisions
  - Example: `// Get cover image URL - prefer uploaded Sanity image, fallback to external URL`

**JSDoc/TSDoc:**
- Minimal usage; mainly on public utility functions and hooks
- Example from `useScrollLock.ts`:
  ```typescript
  /**
   * React hook for scroll locking - automatically locks on mount and unlocks on unmount.
   *
   * Usage:
   * ```
   * import { useScrollLock } from '../utils/useScrollLock';
   * ```
   */
  export function useScrollLock(enabled: boolean = true): void
  ```

## Function Design

**Size:** Functions keep logic contained to single responsibility
- Utility functions 8-35 lines (e.g., `transformShelfBook`, `getCachedData`)
- Components 25-330 lines (larger components have internal helper functions)
- Helper functions defined before main component: `export default function LibraryPage() { function fetchBooks() {...} }`

**Parameters:**
- Destructuring for component props: `export function BookCard({ book, onClick }: BookCardProps)`
- Explicit interfaces for component props (all props in `BookCardProps` interface)
- Generic types for caching: `export function getCachedData<T>(key: string): T | null`

**Return Values:**
- Explicit type annotations on function returns
- React components return JSX.Element (implicit)
- Utilities return explicitly typed values: `Book`, `boolean`, `null`, `React.ReactNode[]`
- Functions use optional parameters with `?` for optional data: `dateRead?: string`

## Module Design

**Exports:**
- Named exports for utilities and reusable functions
  - Example: `export function BookCard({ book, onClick }: BookCardProps)`
  - Example: `export const SHELF_BOOKS_QUERY = ...`
- Default exports for page components
  - Example: `export default function LibraryPage()`
  - Example: `export default function NotFound()`
- Mix used in same file (e.g., `BookCard.tsx` exports `BookCard`, `BookDetailModal.tsx` exports both)

**Barrel Files:**
- Index files export multiple items for convenience
  - Example: `src/components/library/index.ts` exports `LibraryPage`
- Used for component grouping, not enforced consistently

## TypeScript

**Configuration:**
- `target: "ES2020"`
- `moduleResolution: "bundler"`
- `jsx: "react-jsx"`
- `strict: true` (strict null checks, implicit any, etc.)

**Patterns:**
- Generic types for flexible data structures: `getCachedData<T>`, `client.fetch<ShelfBookData[]>`
- Interface-based prop typing (no inline prop types)
- Optional properties with `?`: `year?: string`, `dateRead?: string`
- Union types for filter options: `type FilterOption = { value: string; label: string; isFavorites?: boolean; isAll?: boolean }`

## Styling

**Framework:** Tailwind CSS with custom animations

**Patterns:**
- Utility-first approach with Tailwind classes
- Long inline class strings for component layout
  - Example: `className="relative flex flex-col items-center w-full md:w-[148px] lg:w-[160px] aspect-[1/2]"`
- Responsive modifiers: `md:`, `lg:`, `sm:`
- Custom animations defined in `src/index.css`:
  - `animate-modal-scale-in`, `animate-overlay-in`, `animate-shelf-item-fade-up`, etc.

**Custom CSS:**
- Custom Tailwind directives in `src/index.css`
- CSS animations with explicit keyframes (not Tailwind animation utilities)
- Custom utilities: `.shadow-default`, `.scrollbar-hide`
- Font configuration in `src/styles/globals.css`:
  - SF Pro and Figtree fonts applied globally
  - Custom font variation settings: `fontVariationSettings: "'wdth' 100"`

---

*Convention analysis: 2026-01-22*
