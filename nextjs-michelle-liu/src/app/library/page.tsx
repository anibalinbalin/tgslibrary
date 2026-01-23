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
      <div className="relative w-[120px] h-[180px] rounded-[4px] shadow-[0px_4px_12px_0px_rgba(0,0,0,0.1)] transition-all duration-200 ease-out group-hover:scale-[1.025] group-hover:-translate-y-3 group-hover:shadow-none overflow-hidden bg-gray-100">
        {book.coverImage ? (
          <img
            alt={book.title}
            className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[4px] size-full"
            src={book.coverImage}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center p-3 text-center bg-gray-100">
            <span className="font-['SF_Pro:Regular',sans-serif] text-[11px] text-gray-500 leading-tight line-clamp-4" style={{ fontVariationSettings: "'wdth' 100" }}>
              {book.title}
            </span>
          </div>
        )}
      </div>

      {/* Text content - appears on hover, centered below cover */}
      <div className="absolute left-1/2 -translate-x-1/2 top-[186px] w-[160px] flex flex-col gap-[3px] items-center text-center opacity-0 transition-opacity duration-200 ease-out group-hover:opacity-100">
        <div className="font-['SF_Pro:Regular',sans-serif] font-normal text-[18px] text-black" style={{ fontVariationSettings: "'wdth' 100" }}>
          <p className="leading-[22px] text-balance">{book.title}</p>
        </div>
        {book.author && (
          <div className="font-['SF_Pro:Regular',sans-serif] font-normal text-[15px] text-[rgba(0,0,0,0.5)]" style={{ fontVariationSettings: "'wdth' 100" }}>
            <p className="leading-[19px]">{book.author}</p>
          </div>
        )}
        {book.rating > 0 && (
          <p className="font-['DM_Sans:Medium','Noto_Sans_Symbols2:Regular',sans-serif] leading-[1.4] text-[15px] text-nowrap">
            <span className="text-gray-500">{"★".repeat(book.rating)}</span>
            <span className="text-gray-300">{"★".repeat(5 - book.rating)}</span>
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
        <Dialog.Backdrop className="fixed inset-0 z-40 bg-black/30" />
        <Dialog.Popup className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 content-stretch flex flex-col gap-[24px] sm:gap-[32px] md:gap-[40px] items-start p-[24px] sm:p-[40px] md:p-[60px] lg:p-[80px] xl:p-[100px] rounded-[16px] sm:rounded-[18px] md:rounded-[20px] w-[calc(100vw-32px)] sm:w-[calc(100vw-80px)] md:w-[min(800px,90vw)] max-h-[calc(100vh-32px)] sm:max-h-[90vh] overflow-y-auto bg-white">
          <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[16px] sm:rounded-[18px] md:rounded-[20px] shadow-[0px_4px_36px_0px_rgba(0,0,0,0.15)]" />

          <div className="content-stretch flex flex-col sm:flex-row gap-[32px] sm:gap-[36px] md:gap-[44px] items-start relative shrink-0 w-full">
            {book.goodreadsUrl ? (
              <a
                href={book.goodreadsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="h-[219px] relative shadow-[0px_4px_12px_0px_rgba(0,0,0,0.1)] shrink-0 w-[142.004px] group cursor-pointer mx-auto sm:mx-0"
              >
                <div className="absolute h-[219px] left-0 rounded-[6px] top-0 w-[142.004px] transition-transform duration-200 group-hover:rotate-[2.5deg] overflow-hidden bg-gray-100">
                  {book.coverImage ? (
                    <img alt={book.title} className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[6px] size-full" src={book.coverImage} />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center p-4 text-center bg-gray-100 rounded-[6px]">
                      <span className="font-['SF_Pro:Regular',sans-serif] text-[13px] text-gray-500 leading-tight" style={{ fontVariationSettings: "'wdth' 100" }}>
                        {book.title}
                      </span>
                    </div>
                  )}
                </div>
              </a>
            ) : (
              <div className="h-[219px] relative shadow-[0px_4px_12px_0px_rgba(0,0,0,0.1)] shrink-0 w-[142.004px] group mx-auto sm:mx-0">
                <div className="absolute h-[219px] left-0 rounded-[6px] top-0 w-[142.004px] overflow-hidden bg-gray-100">
                  {book.coverImage ? (
                    <img alt={book.title} className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[6px] size-full" src={book.coverImage} />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center p-4 text-center bg-gray-100 rounded-[6px]">
                      <span className="font-['SF_Pro:Regular',sans-serif] text-[13px] text-gray-500 leading-tight" style={{ fontVariationSettings: "'wdth' 100" }}>
                        {book.title}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="basis-0 content-stretch flex flex-col gap-[24px] sm:gap-[28px] md:gap-[32px] lg:gap-[36px] grow items-start min-h-px min-w-px relative shrink-0 w-full sm:w-auto">
              <div className="content-stretch flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal gap-[4px] items-start leading-[0] relative shrink-0 text-[24px] sm:text-[26px] md:text-[28px] max-w-full">
                <Dialog.Title style={{ fontVariationSettings: "'wdth' 100" }} className="flex flex-col justify-center relative shrink-0 text-black">
                  <p className="leading-[34px] text-balance">{book.title}</p>
                </Dialog.Title>
                {book.author && (
                  <div style={{ fontVariationSettings: "'wdth' 100" }} className="flex flex-col justify-center relative shrink-0 text-[rgba(0,0,0,0.4)]">
                    <p className="leading-[34px]">{book.author}</p>
                  </div>
                )}
              </div>

              <div className="content-stretch flex flex-col gap-[12px] sm:gap-[14px] md:gap-[16px] items-start relative shrink-0 w-full">
                {book.rating > 0 && (
                  <div className="content-stretch flex flex-col sm:flex-row gap-[8px] sm:gap-[24px] md:gap-[32px] lg:gap-[40px] items-start sm:items-center leading-[0] relative shrink-0 text-nowrap w-full">
                    <div style={{ fontVariationSettings: "'wdth' 100" }} className="flex flex-col font-['SF_Pro:Medium',sans-serif] font-[510] justify-center relative shrink-0 text-[rgba(0,0,0,0.4)] text-[15px] sm:text-[16px] md:text-[17px]">
                      <p className="leading-[22px] text-nowrap">{t('rating')}</p>
                    </div>
                    <p className="font-['DM_Sans:Medium','Noto_Sans_Symbols2:Regular',sans-serif] leading-[1.4] not-italic relative shrink-0 text-gray-500 text-[18px] sm:text-[19px] md:text-[20px] text-center">
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
                      className="font-['SF_Pro:Regular',sans-serif] font-normal text-[15px] sm:text-[16px] md:text-[17px] text-[#2883de] hover:underline"
                      style={{ fontVariationSettings: "'wdth' 100" }}
                    >
                      {t('viewOnBookshop')}
                    </a>
                  </div>
                )}

                {review && (
                  <div className="pt-[8px] sm:pt-[12px] w-full">
                    <p
                      className="font-['SF_Pro:Regular',sans-serif] font-normal text-[15px] sm:text-[16px] md:text-[17px] text-[rgba(0,0,0,0.7)] leading-[1.5] text-pretty"
                      style={{ fontVariationSettings: "'wdth' 100" }}
                    >
                      {review}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Close button */}
          <Dialog.Close
            aria-label="Close"
            className="absolute right-[16px] sm:right-[20px] md:right-[24px] top-[16px] sm:top-[20px] md:top-[24px] content-stretch flex gap-[8px] items-center justify-center rounded-[1000px] size-[32px] sm:size-[34px] md:size-[36px] transition-colors hover:bg-[rgba(0,0,0,0.05)]"
          >
            <div className="flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[18px] sm:text-[19px] md:text-[20px] text-[rgba(20,20,20,0.7)] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
              <p className="leading-[24px] sm:leading-[25px] md:leading-[26px]">×</p>
            </div>
          </Dialog.Close>
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
