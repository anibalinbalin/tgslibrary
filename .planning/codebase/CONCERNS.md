# Codebase Concerns

**Analysis Date:** 2026-01-22

## Tech Debt

**Untyped Sanity Image Utility:**
- Issue: `urlFor()` function in `src/sanity/client.ts` accepts `any` type parameter instead of properly typed source
- Files: `src/sanity/client.ts:23`
- Impact: Reduces type safety; can pass invalid image sources without TS catching errors
- Fix approach: Import and use `SanityImageSource` type from Sanity, create proper interface for urlFor parameter

**Unhandled Promise Rejections in AddBookModal:**
- Issue: Error from `writeClient.create()` in `src/components/library/LibraryPage.tsx:98-105` is logged but user sees no feedback if submission fails
- Files: `src/components/library/LibraryPage.tsx:95-107`
- Impact: Silent failures - user submits suggestion, sees thank you message, but it never saves
- Fix approach: Add error state to modal, show error UI, prevent auto-close on failure

**Missing Environment Variable Validation:**
- Issue: `VITE_SANITY_WRITE_TOKEN` in `src/sanity/client.ts:17` is used directly without checking if it exists at runtime
- Files: `src/sanity/client.ts:12-18`
- Impact: App loads successfully but writeClient mutations fail silently when token is undefined
- Fix approach: Add validation on client creation, throw error or provide helpful message if token missing

**Cache with No Invalidation Strategy:**
- Issue: `src/sanity/preload.ts` maintains 5-minute TTL cache but no explicit cache invalidation on user actions
- Files: `src/sanity/preload.ts:6-7`
- Impact: After adding a book suggestion, page doesn't reflect new data until cache expires or user manually refreshes
- Fix approach: Add `clearCache()` function, call it after successful bookSuggestion submission

## Known Bugs

**Modal Auto-Close Race Condition:**
- Symptoms: If user submits book quickly after opening modal, thank you state may not show before close
- Files: `src/components/library/AddBookModal.tsx:13-23`
- Trigger: Rapid click on send button immediately after typing
- Workaround: Short delay before submission (2s timeout exists but may be hit too soon)

**Hardcoded Goodreads URL:**
- Symptoms: Link is hardcoded to specific user ID and won't work if requirements change
- Files: `src/components/library/LibraryPage.tsx:163`
- Trigger: User clicks Goodreads link
- Workaround: None - requires code change

**Console Errors Not Visible in Production:**
- Symptoms: Errors logged with `console.error()` in LibraryPage but no user-facing error UI exists
- Files: `src/components/library/LibraryPage.tsx:79, 105` and others
- Trigger: Network failure, Sanity API error
- Workaround: Check browser console manually

## Security Considerations

**API Token Exposure in Repository:**
- Risk: `.cursorrules` file contains hardcoded TMDb API key and read access token in repo
- Files: `.cursorrules:7-12`
- Current mitigation: None - file is tracked in git
- Recommendations: Move secrets to `.env` or GitHub secrets, use `dotenv` to load them, never commit `.cursorrules` with real keys

**Sanity Write Token in Frontend:**
- Risk: `VITE_SANITY_WRITE_TOKEN` exposes mutation capability from browser; anyone can see token in network requests
- Files: `src/sanity/client.ts:17`
- Current mitigation: Token is read from env var (some obfuscation)
- Recommendations: Move write operations to backend API layer with proper authentication, restrict Sanity token to specific schemas/mutations only

## Performance Bottlenecks

**N+1 Queries on Modal Open:**
- Problem: Each book modal shows dates and requires parsing with date formatting on every render
- Files: `src/components/library/BookDetailModal.tsx:175-298`
- Cause: Date formatting happens in JSX on every render instead of transformation layer
- Improvement path: Memoize date formatting in Book interface, move to `transformShelfBook()` function

**Unoptimized Image Loading:**
- Problem: Book cover images loaded synchronously with no lazy loading or progressive enhancement
- Files: `src/components/library/BookCard.tsx:16-20` and `BookDetailModal.tsx:98-102`
- Cause: Native `<img>` without loading="lazy" or blur placeholders
- Improvement path: Add `loading="lazy"` attribute, implement LQIP (low-quality image placeholder) with Sanity blur hash

**Review Text Parsing on Every Render:**
- Problem: `formatReview()` in BookDetailModal regexes through entire review text every render
- Files: `src/components/library/BookDetailModal.tsx:11-58`
- Cause: No memoization of formatting results
- Improvement path: Memoize or pre-parse reviews server-side, cache formatted HTML

## Fragile Areas

**Book Data Transformation Logic:**
- Files: `src/components/library/LibraryPage.tsx:12-35`
- Why fragile: Multiple schema support (legacy `book` and current `shelfItem`) makes transformation error-prone; any schema change breaks filtering
- Safe modification: Extract `transformShelfBook` to separate utility file, add unit tests covering null/undefined fields
- Test coverage: No tests - verify manually

**Filter State Management:**
- Files: `src/components/library/LibraryPage.tsx:37-93`
- Why fragile: Filter logic uses string matching on year values; if Sanity schema changes year format, filters silently fail
- Safe modification: Add TypeScript enums for filter types, validate year format in transformation
- Test coverage: No tests for filtering logic

**Date Parsing with No Validation:**
- Files: `src/components/library/BookDetailModal.tsx:175, 180, 288, 293`
- Why fragile: Directly calls `new Date()` on dateRead/dateStarted/dateFinished without checking valid ISO format
- Safe modification: Add date validation in `transformShelfBook`, throw on invalid format instead of silent NaN
- Test coverage: No tests for date edge cases (missing dates, invalid formats)

## Scaling Limits

**In-Memory Cache No Size Limit:**
- Current capacity: All books stored in memory indefinitely (constrained only by 5min TTL)
- Limit: 1000+ books would consume megabytes of memory; no eviction policy
- Scaling path: Switch to indexed-db for larger caches, or remove client-side caching entirely and rely on Sanity CDN

**Sanity Read API Rate Limit:**
- Current capacity: Standard Sanity plan allows 100 req/sec
- Limit: Mobile users with repeated filter clicks could hit limits on reload
- Scaling path: Implement request debouncing, add pagination for large shelves

## Dependencies at Risk

**Sanity Client Version Mismatch:**
- Risk: `@sanity/client@7.13.2` and `@sanity/image-url@2.0.2` may have breaking changes in v8+
- Impact: Mutations/queries will fail if Sanity releases major version
- Migration plan: Set up automated dependency update tests, track Sanity changelog

**Radix UI Dependencies Bloat:**
- Risk: Many radix-ui packages imported but likely unused (no accordion, alert-dialog, etc. in active code)
- Impact: Unused bundle weight, maintenance burden
- Migration plan: Audit `package.json` and remove unused @radix-ui packages

## Missing Critical Features

**No Error Boundary:**
- Problem: React errors in components crash entire app; no fallback UI
- Blocks: Can't safely handle Sanity query failures, malformed book data
- Add: Implement React Error Boundary in App.tsx, show user-friendly error page

**No Form Validation on Book Suggestion:**
- Problem: User can submit empty strings or only whitespace
- Blocks: Sanity ends up with junk data
- Add: Add trim() check (exists), max length validation, rate limiting per session

**No Loading State for Book Mutations:**
- Problem: User submitting book suggestion has no feedback other than modal auto-close
- Blocks: Can't distinguish between success and failure
- Add: Show spinner during submission, disable button, handle error state

**No Analytics for Missing Books:**
- Problem: Can't track which books users suggest, no insight into gaps
- Blocks: CMS admin can't prioritize adding requested books
- Add: Log suggestions to analytics or email notifications to admin

## Test Coverage Gaps

**LibraryPage Component:**
- What's not tested: Filter logic (favorites/year), cache hit/miss behavior, error handling
- Files: `src/components/library/LibraryPage.tsx`
- Risk: Filter state changes could silently fail; years with no books break silently
- Priority: High

**Book Data Transformation:**
- What's not tested: Null author fallback, missing cover image handling, dateStarted without dateFinished
- Files: `src/components/library/LibraryPage.tsx:12-35`
- Risk: Malformed Sanity data causes rendering errors
- Priority: High

**Modal Animations:**
- What's not tested: Overlay and modal enter/exit animations, timing of auto-close
- Files: `src/components/library/BookDetailModal.tsx`, `AddBookModal.tsx`
- Risk: Animation timing issues on slow devices, users may interact before modal fully closes
- Priority: Medium

**Sanity Client Initialization:**
- What's not tested: Missing VITE_SANITY_WRITE_TOKEN behavior, CDN vs non-CDN differences
- Files: `src/sanity/client.ts`
- Risk: Write operations silently fail in production if token is missing
- Priority: Critical

---

*Concerns audit: 2026-01-22*
