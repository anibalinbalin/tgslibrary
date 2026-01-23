# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal book library website built with Next.js 16 and Sanity CMS. Displays books from `shelfItem` documents in Sanity, filtered by `mediaType == "book"`.

## Commands

```bash
pnpm dev      # Start dev server (localhost:3000)
pnpm build    # Production build
pnpm lint     # ESLint
```

## Architecture

**Stack:** Next.js 16 (App Router) + React 19 + Tailwind CSS 4 + Sanity CMS

**Data Flow:**
1. `LibraryPage` (client component) fetches books via `client.fetch()` on mount
2. GROQ query: `*[_type == "shelfItem" && isPublished == true && mediaType == "book"]`
3. Raw `ShelfBookData` transformed to `Book` type via `transformBook()`
4. Cover images: prefer Sanity-uploaded `cover`, fallback to `externalCoverUrl`

**Key Files:**
- `src/app/page.tsx` - Re-exports LibraryPage
- `src/app/library/page.tsx` - Main library UI (BookCard, BookDetailModal)
- `src/sanity/client.ts` - Sanity client (projectId: `2h9xb6n1`, dataset: `production`)
- `src/sanity/image.ts` - `urlFor()` helper for Sanity image URLs

**Sanity Studio:** Located at `../studio-michelle-liu/` (same projectId)
- Schema: `schemaTypes/shelfItem.ts` defines book fields (title, author, cover, rating, review, etc.)

## Sanity Schema Notes

`shelfItem` document fields relevant to books:
- `mediaType`: "book" | "music" | "movie"
- `cover`: Sanity image asset
- `externalCoverUrl`: fallback URL string
- `isPublished`: boolean (filtered in queries)
- `isLibraryFavorite`: boolean for favorites shelf
- `goodreadsUrl`: external link

## Path Aliases

`@/*` → `./src/*` (configured in tsconfig.json)
