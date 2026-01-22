# Architecture

**Analysis Date:** 2026-01-22

## Pattern Overview

**Overall:** Client-rendered React SPA with Sanity CMS backend for content management.

**Key Characteristics:**
- Content-driven architecture: All book data stored in Sanity CMS, fetched at runtime
- Single-page application with client-side routing (React Router)
- Read-heavy UI with minimal write operations (book suggestions only)
- Client-side caching layer for performance optimization
- Responsive design with Tailwind CSS styling

## Layers

**Presentation Layer:**
- Purpose: React components rendering UI, handling user interactions
- Location: `src/components/library/`
- Contains: Page components (LibraryPage, BookCard, BookDetailModal), UI logic
- Depends on: Data layer (Sanity client), utility hooks
- Used by: Entry point (App.tsx)

**Data Layer:**
- Purpose: Manages Sanity CMS integration and data fetching
- Location: `src/sanity/`
- Contains: Client configuration, GROQ queries, in-memory caching
- Depends on: @sanity/client SDK, environment variables
- Used by: Presentation layer components

**Utility Layer:**
- Purpose: Shared helpers and hooks for cross-cutting concerns
- Location: `src/utils/`
- Contains: Scroll lock functionality (useScrollLock), cursor compatibility stubs
- Depends on: React hooks
- Used by: Components throughout the application

**Styles Layer:**
- Purpose: Global styling configuration
- Location: `src/styles/globals.css`, `src/index.css`
- Contains: Tailwind CSS base styles, custom animations, global utility classes
- Used by: All components via class utilities

## Data Flow

**Book Library Load:**

1. User opens application → `App.tsx` mounts
2. `LibraryPage` component initializes with loading state
3. useEffect triggers fetch logic in LibraryPage
4. Check in-memory cache via `getCachedData()` from `src/sanity/preload.ts`
5. If no cache hit, call Sanity client with queries:
   - `SHELF_BOOKS_QUERY` → fetch all published books from shelfItem documents
   - `BOOK_YEARS_QUERY` → fetch unique years for filter options
6. Transform raw Sanity data (ShelfBookData) to component format (Book) via `transformShelfBook()`
7. Render books in grid, filtered by active filter (favorites/all/year)
8. Cache results with 5-minute TTL for subsequent mounts

**Book Detail View:**

1. User clicks BookCard
2. `selectedBook` state updated with Book object
3. BookDetailModal renders with animation (overlay-in)
4. Modal handles close with animation (overlay-out) → resets selectedBook state

**Book Suggestion:**

1. User triggers AddBookModal (UI not fully rendered, handled via handleAddBook callback)
2. handleAddBook async function imports writeClient dynamically
3. Create bookSuggestion document with title, timestamp, status='new'
4. Success logged silently; errors caught and logged

**State Management:**

- Local component state: Books array, active filter, selected book, modals
- No global state management (no Redux/Context)
- Cache as temporary performance layer only
- Each component responsible for its own data fetching

## Key Abstractions

**Book (Type):**
- Purpose: Unified interface for book data across components
- Definition: `src/components/library/types.ts`
- Fields: id, title, author, coverImage, rating, year, isFavorite, goodreadsUrl, review, dates
- Used by: All library components for type safety

**ShelfBookData (Type):**
- Purpose: Maps Sanity shelfItem schema to TypeScript
- Definition: `src/components/library/types.ts`
- Maps Sanity fields (cover, externalCoverUrl, isLibraryFavorite) to component expectations

**Sanity Image URL Builder:**
- Purpose: Optimize image delivery with automatic format selection
- Location: `src/sanity/client.ts` (urlFor function)
- Applies: .auto('format').quality(75) to all image URLs
- Used by: transformShelfBook() when building coverImage URLs

**GROQ Queries:**
- Purpose: Encapsulate Sanity query logic in one place
- Location: `src/sanity/queries.ts`
- Patterns:
  - Filter by _type, isPublished, mediaType
  - Order by isFavorite desc, year desc, order asc
  - Use array::unique() for distinct years

**Cache System:**
- Purpose: In-memory caching with TTL to reduce Sanity API calls
- Location: `src/sanity/preload.ts`
- TTL: 5 minutes
- Methods: getCachedData(), setCachedData()
- Not currently used on initial load (but infrastructure in place)

## Entry Points

**Root Entry:**
- Location: `src/main.tsx`
- Triggers: Browser load
- Responsibilities: Create React root, wrap with BrowserRouter, render App, inject Analytics

**App Component:**
- Location: `src/App.tsx`
- Triggers: After root setup
- Responsibilities: Initialize cursor compatibility, define routes, render LibraryPage or 404

**LibraryPage:**
- Location: `src/components/library/LibraryPage.tsx`
- Triggers: Route "/" matches
- Responsibilities: Fetch books, manage filter state, render book grid, handle modals

## Error Handling

**Strategy:** Silent failure with console logging. No error boundaries or user-facing error messages currently implemented.

**Patterns:**
- Try-catch in fetchBooks() logs to console but doesn't block UI
- Image fallback: externalCoverUrl used if Sanity image not available
- Missing author defaults to 'Unknown Author'
- Missing rating defaults to 0

**Data Validation:**
- Sanity schema enforces required fields (mediaType)
- GROQ queries filter out unpublished items
- TypeScript types prevent invalid data flow in components

## Cross-Cutting Concerns

**Logging:**
- Console.log for debugging (friendly greeting on app load)
- Error logging in catch blocks (fetch failures, book suggestions)
- No centralized logging service

**Analytics:**
- Vercel Analytics injected at both main.tsx and App.tsx level
- Automatic performance and usage tracking

**Styling:**
- Tailwind CSS utility classes (no component libraries except Radix UI primitives)
- Custom SF Pro font family for typography
- Colors hardcoded inline (gray scale: #78716c, #a8a29e, #d6d3d1, #e7e5e4)

**Type Safety:**
- TypeScript strict mode (tsconfig.json)
- All components typed with interfaces/types
- Sanity data mapped to TypeScript types

---

*Architecture analysis: 2026-01-22*
