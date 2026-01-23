# PRD: TGS Design System Inheritance

## Introduction

Migrate the michelle-liu book library project to inherit the complete styling system from the TGS Next.js project. This ensures visual consistency across projects with shared fonts (including custom Fugue), OKLCH color system, terracotta accent, border-radius tokens, shadows, animations, and shadcn/ui component library.

## Goals

- Establish identical visual identity between TGS and michelle-liu projects
- Port Fugue custom font + Geist/Roboto Mono font stack
- Implement OKLCH-based color system with terracotta (#D39885) accent
- Standardize border-radius tokens (0.625rem base)
- Port shadcn/ui component primitives (Button, Card, Dialog, Input, etc.)
- Update existing components (BookCard, BookDetailModal) to use new design tokens
- Add missing animations (marquee, modal, card-fade-up, etc.)

## User Stories

### US-001: Copy Fugue font file
**Description:** As a developer, I need the Fugue font file in the michelle-liu project so typography matches TGS.

**Acceptance Criteria:**
- [ ] Copy `fugue_regular.woff2` from TGS `public/fonts/` to michelle-liu `public/fonts/`
- [ ] Verify font file loads without 404

---

### US-002: Update layout.tsx with TGS font stack
**Description:** As a developer, I need the same font registration as TGS so all fonts are available via CSS variables.

**Acceptance Criteria:**
- [ ] Register Fugue via `next/font/local` with `--font-sans` variable
- [ ] Register Geist Sans via `next/font/google` with `--font-geist-sans`
- [ ] Register Geist Mono with `--font-geist-mono` and `--font-mono`
- [ ] Register Roboto Mono with `--font-roboto-mono`
- [ ] Apply all font variables to `<body>` className
- [ ] Body uses `font-sans antialiased` as default
- [ ] Typecheck passes

---

### US-003: Migrate globals.css to TGS design tokens
**Description:** As a developer, I need the TGS CSS variables and base styles so colors/radius/shadows are consistent.

**Acceptance Criteria:**
- [ ] Add `@theme inline` block with all TGS CSS variables:
  - OKLCH colors (background, foreground, primary, secondary, muted, accent, destructive)
  - Dark mode variants
  - `--color-terracotta: #D39885`
  - Sidebar color variables
  - Border radius tokens (--radius, --radius-sm/md/lg/xl)
- [ ] Add `@layer base` with border/outline defaults and body styling
- [ ] Add all TGS animations (marquee, modal-backdrop-in, modal-content-in, card-fade-up, celebration-pulse, shimmer)
- [ ] Add `.clip-school-levels` utility if needed
- [ ] Remove Figtree Google Font import (replaced by Fugue)
- [ ] Typecheck passes

---

### US-004: Create lib/utils.ts with cn() helper
**Description:** As a developer, I need the `cn()` utility function for merging Tailwind classes.

**Acceptance Criteria:**
- [ ] Create `src/lib/utils.ts`
- [ ] Export `cn()` using `clsx` and `tailwind-merge`
- [ ] Typecheck passes

---

### US-005: Install required dependencies
**Description:** As a developer, I need CVA and tailwind-merge for component variants.

**Acceptance Criteria:**
- [ ] Install `class-variance-authority`
- [ ] Install `tailwind-merge`
- [ ] Install `clsx` (if not present)
- [ ] Verify imports work

---

### US-006: Port Button component
**Description:** As a user, I want buttons styled consistently with TGS including the terracotta variant.

**Acceptance Criteria:**
- [ ] Create `src/components/ui/button.tsx`
- [ ] Implement all variants: default, destructive, outline, secondary, ghost, link, terracotta
- [ ] Implement all sizes: default, sm, lg, icon, icon-sm, icon-lg
- [ ] Use CVA for variant management
- [ ] Include focus-visible ring styling
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

---

### US-007: Port Card component
**Description:** As a user, I want card containers styled with TGS patterns (rounded-xl, shadow-sm, border).

**Acceptance Criteria:**
- [ ] Create `src/components/ui/card.tsx`
- [ ] Implement Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter
- [ ] Use `rounded-xl border shadow-sm` base styling
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

---

### US-008: Port Dialog component
**Description:** As a user, I want modals styled with TGS patterns (overlay, animations, close button).

**Acceptance Criteria:**
- [ ] Create `src/components/ui/dialog.tsx`
- [ ] Implement Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose
- [ ] Use Radix UI Dialog primitives (or @base-ui/react if already installed)
- [ ] Include backdrop animation (bg-black/50, fade-in)
- [ ] Include content animation (zoom-in-95, fade-in)
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

---

### US-009: Port Input component
**Description:** As a user, I want form inputs styled consistently with TGS.

**Acceptance Criteria:**
- [ ] Create `src/components/ui/input.tsx`
- [ ] Use `h-10 rounded-md border border-input bg-background` styling
- [ ] Include focus-visible ring
- [ ] Include disabled state styling
- [ ] Typecheck passes

---

### US-010: Port Label component
**Description:** As a developer, I need Label component for form accessibility.

**Acceptance Criteria:**
- [ ] Create `src/components/ui/label.tsx`
- [ ] Use `text-sm font-medium` styling
- [ ] Include peer-disabled opacity
- [ ] Typecheck passes

---

### US-011: Port Select component
**Description:** As a user, I want dropdown selects styled with TGS patterns.

**Acceptance Criteria:**
- [ ] Create `src/components/ui/select.tsx`
- [ ] Implement Select, SelectTrigger, SelectValue, SelectContent, SelectItem
- [ ] Use portal for content positioning
- [ ] Include animations (zoom-in, fade-in)
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

---

### US-012: Port Checkbox component
**Description:** As a user, I want checkboxes styled with TGS patterns.

**Acceptance Criteria:**
- [ ] Create `src/components/ui/checkbox.tsx`
- [ ] Use `h-4 w-4 rounded-sm border border-primary` styling
- [ ] Include checked state (bg-primary)
- [ ] Include focus-visible ring
- [ ] Typecheck passes

---

### US-013: Port Textarea component
**Description:** As a user, I want textarea inputs styled consistently.

**Acceptance Criteria:**
- [ ] Create `src/components/ui/textarea.tsx`
- [ ] Use `min-h-16 rounded-md border border-input` styling
- [ ] Include focus-visible ring
- [ ] Typecheck passes

---

### US-014: Update BookCard to use design tokens
**Description:** As a user, I want book cards to use the new design system (shadows, radius, hover states).

**Acceptance Criteria:**
- [ ] Update BookCard to use `rounded-xl` (TGS radius)
- [ ] Use `shadow-sm` for base, enhanced shadow on hover
- [ ] Use design token colors (`bg-card`, `text-card-foreground`)
- [ ] Apply `transition-all duration-200` for hover
- [ ] Use terracotta accent for interactive elements if applicable
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

---

### US-015: Update BookDetailModal to use Dialog component
**Description:** As a user, I want the book detail modal to use the new Dialog component styling.

**Acceptance Criteria:**
- [ ] Refactor BookDetailModal to use new Dialog primitives (or update styling to match)
- [ ] Use `bg-black/50` overlay
- [ ] Use `rounded-lg shadow-lg` content styling
- [ ] Include modal animations (fade-in, zoom-in-95)
- [ ] Close button positioned top-4 right-4
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

---

### US-016: Update page typography
**Description:** As a user, I want page headings and text to use the Fugue font and TGS typography scale.

**Acceptance Criteria:**
- [ ] Headings use `font-sans` (Fugue)
- [ ] Apply TGS heading sizes: `text-4xl`, `text-3xl md:text-4xl lg:text-5xl`
- [ ] Body text uses appropriate sizes (`text-base`, `text-lg`, `text-sm`)
- [ ] Use `font-light` for decorative quotes if any
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

---

### US-017: Add index export for UI components
**Description:** As a developer, I need a barrel export for easy component imports.

**Acceptance Criteria:**
- [ ] Create `src/components/ui/index.ts`
- [ ] Export all UI components
- [ ] Typecheck passes

## Functional Requirements

- FR-1: Fugue font file must be served from `/fonts/fugue_regular.woff2`
- FR-2: All color values must use OKLCH color space matching TGS
- FR-3: Border radius must use CSS variable tokens (not hardcoded pixels)
- FR-4: All interactive elements must have focus-visible ring (`ring-[3px]`)
- FR-5: Buttons must support terracotta variant with `bg-white/90 text-terracotta`
- FR-6: Cards must use `rounded-xl border shadow-sm` pattern
- FR-7: Modals must use portal rendering with backdrop overlay
- FR-8: Dark mode must be supported via `.dark` class and CSS variables
- FR-9: All hover transitions must use `transition-all duration-200`
- FR-10: Typography must follow TGS hierarchy (6xl > 4xl > 3xl > base > sm)

## Non-Goals

- No changes to Sanity CMS integration or data fetching
- No changes to book data structure or queries
- No new features or functionality beyond styling
- No internationalization changes
- No SEO or metadata changes
- No changes to routing structure

## Design Considerations

**Font Files Required:**
- `public/fonts/fugue_regular.woff2` (copy from TGS)

**Color Palette:**
| Token | Light | Dark |
|-------|-------|------|
| background | oklch(1 0 0) | oklch(0.141 0.005 285.823) |
| foreground | oklch(0.141 0.005 285.823) | oklch(0.985 0 0) |
| primary | oklch(0.21 0.006 285.885) | oklch(0.985 0 0) |
| terracotta | #D39885 | #D39885 |

**Border Radius Scale:**
| Token | Value |
|-------|-------|
| --radius | 0.625rem |
| --radius-sm | calc(var(--radius) - 4px) |
| --radius-md | calc(var(--radius) - 2px) |
| --radius-lg | var(--radius) |
| --radius-xl | calc(var(--radius) + 4px) |

## Technical Considerations

- Requires `@radix-ui/react-dialog` or equivalent for Dialog (check if @base-ui/react already provides this)
- CVA requires TypeScript generics support
- Font loading uses Next.js `next/font` system for optimal performance
- Tailwind v4 uses `@theme inline` instead of `tailwind.config.js`

## Success Metrics

- Visual diff between TGS and michelle-liu shows consistent styling
- All UI components pass accessibility audit (focus states, contrast)
- No TypeScript errors
- Lighthouse performance score unchanged or improved
- All existing functionality preserved

## Open Questions

- Should we also port Accordion, Popover, HoverCard components? (not currently used but available in TGS)
- Dark mode toggle needed or just respect system preference?
- Any book-specific color accents beyond terracotta?
