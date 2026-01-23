'use client';

import { useState, useEffect } from "react";
import { Dialog } from "@base-ui/react/dialog";
import { client } from "../../sanity/client";
import { urlFor } from "../../sanity/image";
import { useLanguage } from "../../i18n/LanguageContext";
import { LanguageToggle } from "../../components/LanguageToggle";

// Query for shelf items that are books
const SHELF_BOOKS_QUERY = `
  *[_type == "shelfItem" && isPublished == true && mediaType == "book"] | order(order asc) {
    _id,
    title,
    author,
    cover,
    externalCoverUrl,
    rating,
    year,
    goodreadsUrl,
    review,
    review_en
  }
`;

// Types for shelf item books
interface ShelfBookData {
  _id: string;
  title: string;
  author?: string;
  cover?: {
    _type: "image";
    asset: {
      _ref: string;
      _type: "reference";
    };
  };
  externalCoverUrl?: string;
  rating?: number;
  year?: string;
  goodreadsUrl?: string;
  review?: string;
  review_en?: string;
}

interface Book {
  id: string;
  title: string;
  author: string;
  coverImage: string;
  rating: number;
  year?: string;
  goodreadsUrl?: string;
  review?: string;
  review_en?: string;
}

// Transform Sanity shelf item to component format
function transformBook(item: ShelfBookData): Book {
  // Get cover image URL - prefer uploaded image, fallback to external URL
  let coverImageUrl = '';
  if (item.cover?.asset) {
    coverImageUrl = urlFor(item.cover).width(400).url();
  } else if (item.externalCoverUrl) {
    coverImageUrl = item.externalCoverUrl;
  }

  return {
    id: item._id,
    title: item.title,
    author: item.author || '',
    coverImage: coverImageUrl,
    rating: item.rating || 0,
    year: item.year,
    goodreadsUrl: item.goodreadsUrl,
    review: item.review,
    review_en: item.review_en,
  };
}

// BookCard Component
function BookCard({ book, onClick }: { book: Book; onClick: () => void }) {
  return (
    <div className="relative cursor-pointer group" onClick={onClick}>
      {/* Book cover */}
      <div className="relative w-[120px] h-[180px] rounded-xl shadow-sm transition-all duration-200 ease-out group-hover:scale-[1.025] group-hover:-translate-y-3 group-hover:shadow-lg overflow-hidden bg-muted">
        {book.coverImage ? (
          <img
            alt={book.title}
            className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-xl size-full"
            src={book.coverImage}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center p-3 text-center bg-muted">
            <span className="font-sans text-[11px] text-muted-foreground leading-tight line-clamp-4">
              {book.title}
            </span>
          </div>
        )}
      </div>

      {/* Text content - appears on hover, centered below cover */}
      <div className="absolute left-1/2 -translate-x-1/2 top-[186px] w-[160px] flex flex-col gap-[3px] items-center text-center opacity-0 transition-all duration-200 ease-out group-hover:opacity-100">
        <div className="font-sans font-normal text-[18px] text-foreground">
          <p className="leading-[22px] text-balance">{book.title}</p>
        </div>
        {book.author && (
          <div className="font-sans font-normal text-[15px] text-muted-foreground">
            <p className="leading-[19px]">{book.author}</p>
          </div>
        )}
        {book.rating > 0 && (
          <p className="font-sans leading-[1.4] text-[15px] text-nowrap">
            <span className="text-muted-foreground">{"★".repeat(book.rating)}</span>
            <span className="text-muted-foreground/40">{"★".repeat(5 - book.rating)}</span>
          </p>
        )}
      </div>
    </div>
  );
}

// BookDetailModal Component
function BookDetailModal({ book, open, onOpenChange }: { book: Book | null; open: boolean; onOpenChange: (open: boolean) => void }) {
  const { t, lang } = useLanguage();
  const review = book ? (lang === 'en' ? (book.review_en || book.review) : book.review) : null;

  if (!book) return null;

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-40 bg-black/50 animate-modal-backdrop-in" />
        <Dialog.Popup className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 content-stretch flex flex-col gap-[24px] sm:gap-[32px] md:gap-[40px] items-start p-[24px] sm:p-[40px] md:p-[60px] lg:p-[80px] xl:p-[100px] rounded-lg w-[calc(100vw-32px)] sm:w-[calc(100vw-80px)] md:w-[min(800px,90vw)] max-h-[calc(100vh-32px)] sm:max-h-[90vh] overflow-y-auto bg-background shadow-lg animate-modal-content-in">
          <div aria-hidden="true" className="absolute border border-border inset-0 pointer-events-none rounded-lg" />

          <div className="content-stretch flex flex-col sm:flex-row gap-[32px] sm:gap-[36px] md:gap-[44px] items-start relative shrink-0 w-full">
            {book.goodreadsUrl ? (
              <a
                href={book.goodreadsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="h-[219px] relative shadow-sm shrink-0 w-[142.004px] group cursor-pointer mx-auto sm:mx-0"
              >
                <div className="absolute h-[219px] left-0 rounded-md top-0 w-[142.004px] transition-transform duration-200 group-hover:rotate-[2.5deg] overflow-hidden bg-muted">
                  {book.coverImage ? (
                    <img alt={book.title} className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-md size-full" src={book.coverImage} />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center p-4 text-center bg-muted rounded-md">
                      <span className="text-[13px] text-muted-foreground leading-tight">
                        {book.title}
                      </span>
                    </div>
                  )}
                </div>
              </a>
            ) : (
              <div className="h-[219px] relative shadow-sm shrink-0 w-[142.004px] group mx-auto sm:mx-0">
                <div className="absolute h-[219px] left-0 rounded-md top-0 w-[142.004px] overflow-hidden bg-muted">
                  {book.coverImage ? (
                    <img alt={book.title} className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-md size-full" src={book.coverImage} />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center p-4 text-center bg-muted rounded-md">
                      <span className="text-[13px] text-muted-foreground leading-tight">
                        {book.title}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="basis-0 content-stretch flex flex-col gap-[24px] sm:gap-[28px] md:gap-[32px] lg:gap-[36px] grow items-start min-h-px min-w-px relative shrink-0 w-full sm:w-auto">
              <div className="content-stretch flex flex-col gap-[4px] items-start leading-[0] relative shrink-0 text-[24px] sm:text-[26px] md:text-[28px] max-w-full">
                <Dialog.Title className="flex flex-col justify-center relative shrink-0 text-foreground font-sans">
                  <p className="leading-[34px] text-balance">{book.title}</p>
                </Dialog.Title>
                {book.author && (
                  <div className="flex flex-col justify-center relative shrink-0 text-muted-foreground">
                    <p className="leading-[34px]">{book.author}</p>
                  </div>
                )}
              </div>

              <div className="content-stretch flex flex-col gap-[12px] sm:gap-[14px] md:gap-[16px] items-start relative shrink-0 w-full">
                {book.rating > 0 && (
                  <div className="content-stretch flex flex-col sm:flex-row gap-[8px] sm:gap-[24px] md:gap-[32px] lg:gap-[40px] items-start sm:items-center leading-[0] relative shrink-0 text-nowrap w-full">
                    <div className="flex flex-col font-medium justify-center relative shrink-0 text-muted-foreground text-[15px] sm:text-[16px] md:text-[17px]">
                      <p className="leading-[22px] text-nowrap">{t('rating')}</p>
                    </div>
                    <p className="leading-[1.4] relative shrink-0 text-muted-foreground text-[18px] sm:text-[19px] md:text-[20px] text-center">
                      {"★".repeat(book.rating)}{"☆".repeat(5 - book.rating)}
                    </p>
                  </div>
                )}

                {book.goodreadsUrl && (
                  <div className="content-stretch flex flex-col sm:flex-row gap-[8px] sm:gap-[24px] md:gap-[32px] lg:gap-[40px] items-start sm:items-center relative shrink-0 w-full">
                    <a
                      href={book.goodreadsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[15px] sm:text-[16px] md:text-[17px] text-primary hover:underline"
                    >
                      {t('viewOnBookshop')}
                    </a>
                  </div>
                )}

                {review && (
                  <div className="pt-[8px] sm:pt-[12px] w-full">
                    <p className="text-[15px] sm:text-[16px] md:text-[17px] text-foreground/70 leading-[1.5] text-pretty">
                      {review}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Language toggle and Close button */}
          <div className="absolute right-4 top-4 flex items-center gap-3">
            <LanguageToggle />
            <Dialog.Close
              aria-label="Close"
              className="flex items-center justify-center rounded-full size-9 transition-colors hover:bg-muted text-muted-foreground hover:text-foreground"
            >
              <span className="text-xl leading-none">×</span>
            </Dialog.Close>
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default function LibraryPage() {
  const { t } = useLanguage();
  const [books, setBooks] = useState<Book[]>([]);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch books from Sanity
  useEffect(() => {
    async function fetchBooks() {
      try {
        const booksData = await client.fetch<ShelfBookData[]>(SHELF_BOOKS_QUERY);
        setBooks(booksData.map(transformBook));
      } catch (error) {
        console.error('Error fetching books:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchBooks();
  }, []);

  return (
    <>
      <div className="relative min-h-screen w-full bg-white">
        {/* Header */}
        <div className="pt-[32px] px-[60px]">
          <div className="flex justify-between items-start pb-[32px]">
            <div className="flex flex-col gap-2 items-start">
              <p className="font-['SF_Pro:Regular',sans-serif] font-normal leading-[34px] text-[28px] text-black text-balance" style={{ fontVariationSettings: "'wdth' 100" }}>
                {t('library')}
              </p>
              <p className="font-['SF_Pro:Regular',sans-serif] font-normal leading-[22px] text-[17px] text-[rgba(0,0,0,0.4)] text-pretty" style={{ fontVariationSettings: "'wdth' 100" }}>
                {books.length} {t('books')}
              </p>
            </div>
            <LanguageToggle />
          </div>
        </div>

        {/* Bookshelf Grid */}
        <div className="px-[60px] pb-[100px]">
          <div>
            {isLoading ? (
              <div className="flex flex-wrap gap-x-[32px] gap-y-[80px]">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="w-[120px] h-[180px] rounded-[4px] bg-gray-100 animate-pulse" />
                ))}
              </div>
            ) : books.length === 0 ? (
              <div className="flex items-center justify-center min-h-[300px]">
                <p className="font-['SF_Pro:Regular',sans-serif] text-[18px] text-[rgba(0,0,0,0.4)]">
                  {t('emptyShelf')}
                </p>
              </div>
            ) : (
              <div className="flex flex-wrap gap-x-[32px] gap-y-[80px]">
                {books.map((book) => (
                  <BookCard key={book.id} book={book} onClick={() => setSelectedBook(book)} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Book Detail Modal */}
      <BookDetailModal
        book={selectedBook}
        open={!!selectedBook}
        onOpenChange={(open) => !open && setSelectedBook(null)}
      />
    </>
  );
}
