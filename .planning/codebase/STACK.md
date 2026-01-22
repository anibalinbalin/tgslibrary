# Technology Stack

**Analysis Date:** 2026-01-22

## Languages

**Primary:**
- TypeScript 5.9.3 - Full codebase (src/, studio-michelle-liu/)
- JSX/TSX - React component files

**Secondary:**
- CSS - Global styles and Tailwind CSS
- JavaScript - Build scripts and Node configuration

## Runtime

**Environment:**
- Node.js 24.10.0 (or compatible)

**Package Manager:**
- pnpm 10.18.2 - Primary package manager
- Lockfile: `pnpm-lock.yaml` (present)

## Frameworks

**Core:**
- React 18.3.1 - UI library for main app
- React Router DOM 7.11.0 - Client-side routing (see `src/App.tsx`)
- React 19.1 - Sanity studio (`studio-michelle-liu/`)
- Next.js 16.1.0 - Alternative backend implementation (`nextjs-michelle-liu/`, secondary)

**Styling:**
- Tailwind CSS 4.1.18 - Utility-first CSS framework
- @tailwindcss/vite 4.1.18 - Vite integration
- TailwindCSS PostCSS 4 - PostCSS plugin (in nextjs-michelle-liu)

**Build/Dev:**
- Vite 6.3.5 - Build tool and dev server (primary)
- @vitejs/plugin-react-swc 3.10.2 - Fast React compilation via SWC

**UI Component Library:**
- Radix UI (v1.x) - Unstyled, accessible components:
  - @radix-ui/react-accordion
  - @radix-ui/react-dialog
  - @radix-ui/react-dropdown-menu
  - @radix-ui/react-popover
  - @radix-ui/react-select
  - @radix-ui/react-tabs
  - And 20+ additional Radix UI primitives

**Testing/Validation:**
- tesseract.js 7.0.0 - OCR for image text recognition
- input-otp 1.4.2 - OTP input component
- class-variance-authority 0.7.1 - Component variant system

## Key Dependencies

**Critical:**
- @sanity/client 7.13.2 - Headless CMS client for data fetching (see `src/sanity/client.ts`)
- @sanity/image-url 2.0.2 - Dynamic image URL building for Sanity assets
- @portabletext/react 6.0.0 - Portable Text (GROQ) rendering
- react-hook-form 7.55.0 - Form state management (see `src/components/library/AddBookModal.tsx`)

**Media & Display:**
- @mux/mux-player 3.10.2 - Video player for embedded media
- @mux/mux-player-react 3.10.2 - React wrapper for Mux player
- mux-embed 5.14.0 - Mux embeds SDK
- hls.js 1.6.15 - HLS video streaming protocol
- framer-motion 12.25.0 - Animation library

**Data & Utilities:**
- recharts 2.15.2 - React charting library
- embla-carousel-react 8.6.0 - Carousel/slider component
- lucide-react 0.487.0 - Icon library
- cmdk 1.1.1 - Command palette component
- sonner 2.0.3 - Toast notifications
- clsx & tailwind-merge - Utility for conditional CSS classes

**Image & Screenshots:**
- modern-screenshot 4.6.7 - Screenshot generation

**Analytics:**
- @vercel/analytics 1.6.1 - Vercel Web Analytics (see `src/App.tsx`, `src/main.tsx`)

**Email:**
- resend 6.7.0 - Email sending SDK (dependency installed, usage TBD)

**UX Enhancements:**
- next-themes 0.4.6 - Theme management (light/dark mode)
- react-resizable-panels 2.1.7 - Resizable panel layouts
- react-day-picker 8.10.1 - Date picker component
- vaul 1.1.2 - Drawer component
- styled-components 6.1.18 - CSS-in-JS (Sanity studio only)

## Configuration

**Environment:**
- Vite loads env vars via `import.meta.env.VITE_*` pattern
- Required env var: `VITE_SANITY_WRITE_TOKEN` (see `src/sanity/client.ts` line 13)
- Environment files: `.env`, `.env.local`, `.env.*.local` (see .gitignore)

**Build:**
- `vite.config.ts` - Vite configuration with React SWC, Tailwind CSS, path aliases
- Path alias: `@/*` → `./src/*`
- TypeScript: ES2020 target, strict mode enabled
- Sanity config: `studio-michelle-liu/sanity.config.ts` with projectId `am3v0x1c`, dataset `production`

**Framework-specific:**
- Vite port: 3000 (dev server)
- Output directory: `dist/`
- TSConfig: `tsconfig.json` with bundler module resolution

## Platform Requirements

**Development:**
- Node.js 24.x recommended
- pnpm 10.18.2
- Modern browser with ES2020 support
- Vite dev server (port 3000)

**Production:**
- Deployment target: Vercel (see `vercel.json` framework: "vite")
- Vercel redirects legacy routes: `/home` → `/`, `/work` → `/`
- Vercel rewrite: `/(.*) → /` (SPA fallback for React Router)

---

*Stack analysis: 2026-01-22*
