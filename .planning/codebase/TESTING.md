# Testing Patterns

**Analysis Date:** 2026-01-22

## Test Framework

**Status:** Not configured

- No testing framework detected (Jest, Vitest, etc.)
- No test files found in codebase (`*.test.*`, `*.spec.*`)
- No test configuration files present

**Development setup:**
- `package.json` has no test scripts (only `dev`, `build`, `repair-spotify-links`)
- No test runners or assertion libraries in dependencies

## Test File Organization

**Location:** Not applicable - no tests currently

**Future recommendation:**
- Co-locate test files with source files: `ComponentName.tsx` + `ComponentName.test.tsx`
- Alternative: Separate `__tests__` directory per feature folder

**Naming Convention (recommended):**
- `*.test.ts` for unit tests
- `*.test.tsx` for component tests

## Test Structure

**Current state:** No existing test patterns to document

**Recommended patterns based on codebase structure:**

For components (based on `src/components/library/BookCard.tsx`):
```typescript
import { render, screen } from '@testing-library/react';
import { BookCard } from './BookCard';

describe('BookCard', () => {
  const mockBook = {
    id: '1',
    title: 'Test Book',
    author: 'Test Author',
    coverImage: 'http://example.com/cover.jpg',
    rating: 4,
  };

  it('renders book title and author on hover', () => {
    const handleClick = jest.fn();
    render(<BookCard book={mockBook} onClick={handleClick} />);

    expect(screen.getByText('Test Book')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    const { getByRole } = render(<BookCard book={mockBook} onClick={handleClick} />);

    getByRole('button').click();
    expect(handleClick).toHaveBeenCalled();
  });
});
```

## Mocking

**Framework needed:** Jest, Vitest, or similar

**Patterns to implement:**

For Sanity client mocking (from `src/sanity/client.ts`):
```typescript
jest.mock('@/sanity/client', () => ({
  client: {
    fetch: jest.fn(),
  },
  writeClient: {
    create: jest.fn(),
  },
  urlFor: jest.fn((source) => ({
    width: jest.fn().mockReturnThis(),
    url: jest.fn().mockReturnValue('mocked-url'),
  })),
}));
```

For React hooks (from `src/utils/useScrollLock.ts`):
```typescript
jest.mock('./scrollLock', () => ({
  lockScroll: jest.fn(),
  unlockScroll: jest.fn(),
}));
```

**What to Mock:**
- External API calls (Sanity client fetch/create)
- Browser APIs (scroll locking, window.open)
- Third-party service dependencies

**What NOT to Mock:**
- React hooks (useEffect, useState) - test behavior, not implementation
- Component internal state transitions
- Basic utility functions (transformations, formatting)

## Fixtures and Factories

**Test Data Pattern (recommended):**

Based on `src/components/library/types.ts`:
```typescript
// test/fixtures/books.ts
export const mockBook = (): Book => ({
  id: 'test-id',
  title: 'Test Book Title',
  author: 'Test Author',
  coverImage: 'http://example.com/cover.jpg',
  rating: 4,
  year: '2025',
  isFavorite: false,
  goodreadsUrl: 'https://goodreads.com/book/1',
  review: 'Great read',
  dateRead: '2025-01-22',
  dateStarted: '2025-01-15',
  dateFinished: '2025-01-22',
});

export const mockShelfBookData = (): ShelfBookData => ({
  _id: 'test-id',
  title: 'Test Book',
  author: 'Test Author',
  cover: {
    _type: 'image',
    asset: {
      _ref: 'image-123',
      _type: 'reference',
    },
  },
  rating: 4,
  year: '2025',
  isLibraryFavorite: false,
});
```

**Location:**
- `test/fixtures/` directory for reusable test data
- Or co-located with test files: `BookCard.test.tsx` with inline factories

## Coverage

**Requirements:** None currently enforced

**Recommended targets:**
- Utilities: 100% (e.g., `transformShelfBook`, `getCachedData`)
- Components: 80%+ (main interaction paths and edge cases)
- Pages: 60%+ (harder to test due to data fetching)

**View Coverage (future setup):**
```bash
npm run test -- --coverage
npm run test -- --coverage --watch
```

## Test Types

**Unit Tests:**
- Utilities: `transformShelfBook`, `getCachedData`, `formatReview`
- Scope: Pure functions, data transformations
- Approach: Direct input/output testing

Example for `transformShelfBook`:
```typescript
describe('transformShelfBook', () => {
  it('transforms Sanity shelfItem data to Book format', () => {
    const input = mockShelfBookData();
    const output = transformShelfBook(input);

    expect(output.title).toBe(input.title);
    expect(output.isFavorite).toBe(input.isLibraryFavorite);
  });

  it('falls back to externalCoverUrl when cover asset missing', () => {
    const input = { ...mockShelfBookData(), cover: undefined, externalCoverUrl: 'http://example.com/cover.jpg' };
    const output = transformShelfBook(input);

    expect(output.coverImage).toBe('http://example.com/cover.jpg');
  });
});
```

**Integration Tests:**
- Component + hooks: `BookDetailModal` with `useScrollLock`
- Component + data: `LibraryPage` with Sanity data fetching
- Approach: Test component behavior with mocked external dependencies

Example for `LibraryPage`:
```typescript
describe('LibraryPage', () => {
  it('fetches and displays books on mount', async () => {
    const mockBooks = [mockShelfBookData()];
    (client.fetch as jest.Mock).mockResolvedValue(mockBooks);

    render(<LibraryPage />);

    await waitFor(() => {
      expect(screen.getByText('Test Book Title')).toBeInTheDocument();
    });
  });

  it('filters books by year when year tab clicked', async () => {
    // Setup mocks and render
    // Simulate clicking year tab
    // Verify filtered books displayed
  });
});
```

**E2E Tests:**
- Framework: Not configured (Cypress, Playwright, etc.)
- Would test: Full user flows like add book suggestion, filter books, view details

## Common Patterns

**Async Testing:**

For data fetching (used in `LibraryPage.tsx`):
```typescript
it('handles book fetching with cache', async () => {
  const mockData = [mockShelfBookData()];
  (client.fetch as jest.Mock).mockResolvedValue(mockData);

  render(<LibraryPage />);

  // Wait for loading state to complete
  await waitFor(() => {
    expect(screen.queryByText('Loading books...')).not.toBeInTheDocument();
  });

  expect(screen.getByText('Test Book Title')).toBeInTheDocument();
});
```

For API mutations (used in `handleAddBook`):
```typescript
it('submits book suggestion to Sanity', async () => {
  const { writeClient } = await import('@/sanity/client');
  (writeClient.create as jest.Mock).mockResolvedValue({ _id: 'new-id' });

  // Trigger handleAddBook
  await act(async () => {
    // Perform action
  });

  expect(writeClient.create).toHaveBeenCalledWith(
    expect.objectContaining({
      _type: 'bookSuggestion',
      bookTitle: 'New Book',
      status: 'new',
    })
  );
});
```

**Error Testing:**

Pattern from `LibraryPage.tsx` error handling:
```typescript
it('handles fetch errors gracefully', async () => {
  const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
  (client.fetch as jest.Mock).mockRejectedValue(new Error('Network error'));

  render(<LibraryPage />);

  await waitFor(() => {
    expect(consoleSpy).toHaveBeenCalledWith('Error fetching books:', expect.any(Error));
  });

  // Verify fallback UI rendered
  expect(screen.getByText('No books on this shelf yet.')).toBeInTheDocument();

  consoleSpy.mockRestore();
});
```

**Modal Testing:**

Pattern from `BookDetailModal.tsx`:
```typescript
it('opens and closes modal with animation', () => {
  const onClose = jest.fn();
  const { rerender } = render(
    <BookDetailModal book={mockBook()} onClose={onClose} />
  );

  // Find close trigger (overlay click)
  screen.getByRole('dialog').parentElement?.click();

  // Animation state should trigger close callback
  expect(onClose).toHaveBeenCalled();
});
```

---

*Testing analysis: 2026-01-22*
