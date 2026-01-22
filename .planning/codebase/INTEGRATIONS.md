# External Integrations

**Analysis Date:** 2026-01-22

## APIs & External Services

**Headless CMS:**
- Sanity - Content management for books/library, projects, about page, art pieces
  - SDK/Client: @sanity/client 7.13.2
  - Project ID: `am3v0x1c`
  - Dataset: `production`
  - Auth: Token via `VITE_SANITY_WRITE_TOKEN` env var
  - Read endpoint: `client.fetch()` (see `src/sanity/client.ts`)
  - Write endpoint: `writeClient` for mutations (see `src/sanity/client.ts` lines 11-17)
  - API version: `2026-01-06`
  - CDN: Enabled for read client, disabled for write client

**Video/Media:**
- Mux - Video hosting and streaming
  - SDK: @mux/mux-player 3.10.2, @mux/mux-player-react 3.10.2, mux-embed 5.14.0
  - Purpose: Video playback for project portfolios (see `src/components/project/Gallery.tsx`)
  - Protocol: HLS via hls.js 1.6.15

**Email Service:**
- Resend - Transactional email (dependency installed but usage not yet implemented)
  - SDK: resend 6.7.0
  - Purpose: For contact form or notifications (planned feature)

## Data Storage

**Databases:**
- Sanity CMS - Primary data store
  - Type: Headless CMS with GROQ query language
  - Connection: HTTP via @sanity/client
  - Client: @sanity/client (read) + writeClient for mutations
  - Schema types: Located in `studio-michelle-liu/schemaTypes/`
  - Key types:
    - `shelfItem` - Books in library (title, author, cover, rating, review, dates)
    - `experimentProject` - Project portfolios with media, testimonials, galleries
    - `artPiece` - Art portfolio pieces
    - `sketchbook` - Sketches and drawings
    - `mural` - Mural gallery items
    - `aboutPage` - About section content
    - `community`, `experience`, `loreItem` - Supporting content types

**File Storage:**
- Sanity asset storage - Images and media hosted by Sanity
  - Image URL builder: @sanity/image-url
  - Auto-formatting: VITE_BUILD_CDN_URL applied via `urlFor()` function
  - Default quality: 75 (see `src/sanity/client.ts` line 25)
  - Formats: Auto-optimized based on client capability

**Caching:**
- In-memory cache (application level)
  - Location: `src/sanity/preload.ts`
  - Purpose: Cache GROQ query results to reduce API calls
  - Usage: `getCachedData()` in `src/components/library/LibraryPage.tsx`

## Authentication & Identity

**Auth Provider:**
- Sanity token-based authentication
  - Implementation: Environment variable `VITE_SANITY_WRITE_TOKEN`
  - Scope: Write operations (mutations) only
  - Read operations: Public (no token required)
  - Location: `src/sanity/client.ts` lines 11-17

**User Management:**
- None detected - read-only public site (no user accounts)

## Monitoring & Observability

**Error Tracking:**
- No dedicated error tracking service detected
- Console error logging: `console.error()` in `src/components/library/LibraryPage.tsx` line 79

**Logs:**
- Browser console only
- Dev message: "✨ thanks for stopping by! say hi: michelletheresaliu@gmail.com" (see `src/main.tsx` line 9)

**Analytics:**
- Vercel Web Analytics
  - SDK: @vercel/analytics 1.6.1
  - Implementation: `<Analytics />` component
  - Location: `src/App.tsx` line 26, `src/main.tsx` line 14
  - Tracking: Page views, Core Web Vitals, user interactions

## CI/CD & Deployment

**Hosting:**
- Vercel (see `vercel.json`)
  - Framework: vite
  - Build command: `vite build` (see `package.json`)
  - Output: `dist/` directory

**CI Pipeline:**
- GitHub Actions (inferred from git history, not explicitly configured)
- Recent deployment: Vercel FirstDeployment (commit 98b439c)

**Build Configuration:**
```json
{
  "framework": "vite",
  "redirects": [
    { "source": "/home", "destination": "/", "permanent": true },
    { "source": "/work", "destination": "/", "permanent": true }
  ],
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```

## Environment Configuration

**Required env vars:**
- `VITE_SANITY_WRITE_TOKEN` - Sanity API token for mutations (see `src/sanity/client.ts`)
- Sanity projectId and dataset hardcoded: `am3v0x1c` / `production`

**Optional env vars:**
- None detected

**Secrets location:**
- `.env` - Local environment file (gitignored)
- `.env.local` - Local overrides (gitignored)
- `.env.*.local` - Environment-specific (gitignored)
- Vercel project settings for production secrets

## Webhooks & Callbacks

**Incoming:**
- None detected

**Outgoing:**
- Sanity webhooks not detected in current codebase
- Analytics tracking to Vercel (implicit via @vercel/analytics)

## API Query Examples

**Sanity GROQ Queries:**

Library books query:
```groq
*[_type == "shelfItem" && isPublished == true && mediaType == "book"]
  | order(isLibraryFavorite desc, year desc, order asc) {
    _id, title, author, cover, rating, year, review, dateRead, ...
  }
```

Query location: `src/sanity/queries.ts`

Image URL generation:
```typescript
urlFor(item.cover).width(400).quality(75).auto('format').url()
```

Location: `src/sanity/client.ts` lines 20-25

---

*Integration audit: 2026-01-22*
