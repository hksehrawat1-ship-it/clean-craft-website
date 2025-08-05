import React, { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { Filter } from "lucide-react";

import EnhancedNavbar from "@/components/EnhancedNavbar";
import Footer from "@/components/Footer";
import { useFAQs } from "@/hooks/use-faqs";
import { FAQAccordion } from "@/components/FAQAccordion";
import { EnhancedSEO } from "@/components/EnhancedSEO";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const PAGE_SIZE = 10;

const FaqPage: React.FC = () => {
  const { countryCode } = useParams();
  const { faqsByCategory, categories, isLoading, error } = useFAQs(countryCode);

  const [selectedCategory, setSelectedCategory] = useState<string>("home");
  const [currentPage, setCurrentPage] = useState<number>(1);

  const filteredFAQs = useMemo(() => {
    if (selectedCategory === "all") {
      return Object.values(faqsByCategory).flat();
    }
    return faqsByCategory[selectedCategory] ?? [];
  }, [faqsByCategory, selectedCategory]);

  const totalFAQs = filteredFAQs.length;
  const totalPages = Math.ceil(totalFAQs / PAGE_SIZE);

  const currentFAQs = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredFAQs.slice(start, start + PAGE_SIZE);
  }, [filteredFAQs, currentPage]);

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getPageNumbers = () => {
    const delta = 2;
    const pages: (number | string)[] = [];

    const range = (start: number, end: number) =>
      Array.from({ length: end - start + 1 }, (_, i) => start + i);

    if (totalPages <= 7) return range(1, totalPages);

    const left = Math.max(2, currentPage - delta);
    const right = Math.min(totalPages - 1, currentPage + delta);

    pages.push(1);
    if (left > 2) pages.push("...");
    pages.push(...range(left, right));
    if (right < totalPages - 1) pages.push("...");
    pages.push(totalPages);

    return pages;
  };

  return (
    <>
      <EnhancedSEO
        slug="/faq"
        pageType="Organization"
        defaultTitle="Frequently Asked Questions | CleanCraft"
        defaultDescription="Find answers to common questions about CleanCraft’s services, scheduling, payments, and more."
        customKeywords={[
          "CleanCraft FAQs",
          "laundry questions",
          "dry cleaning help",
          "pickup delivery info",
        ]}
      />

      <div className="min-h-screen flex flex-col bg-white">
        <EnhancedNavbar />

        <main className="flex-1">
          <div className="container mx-auto px-4 py-16 md:py-24">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-black mb-8 text-center">
                FAQs - Your Questions{" "}
                <span className="text-primary">Answered</span>
              </h1>

              <p className="text-lg text-gray-600 text-center mb-12">
                Find answers to the most common questions about our services,
                policies, and more.
              </p>

              {/* Filter */}
              <div className="flex items-center justify-end mb-8 border-b pb-4">
                <div className="flex items-center border border-[#7c7777] rounded-[18px] px-3 py-2 transition-colors duration-200 hover:border-primary focus-within:ring-2 focus-within:ring-primary">
                  <Filter className="mr-2 h-4 w-4 text-gray-500" />
                  <span className="mr-3 text-sm font-medium">Filter by:</span>
                  <Select
                    value={selectedCategory}
                    onValueChange={handleCategoryChange}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories
                        .filter((category) => category.toLowerCase() !== "all")
                        .map((category) => (
                          <SelectItem
                            key={category}
                            value={category}
                            className="capitalize"
                          >
                            {category.charAt(0).toUpperCase() +
                              category.slice(1)}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Loading / Error */}
              {isLoading && (
                <p className="text-center text-gray-500">Loading FAQs...</p>
              )}
              {error && (
                <p className="text-center text-red-500">
                  Failed to load FAQs. Please try again later.
                </p>
              )}

              {/* Results summary */}
              {!isLoading && !error && (
                <div className="mb-6 text-sm text-gray-500">
                  Showing {currentFAQs.length} of {totalFAQs} questions
                  {selectedCategory !== "all" && (
                    <>
                      {" "}
                      in{" "}
                      <span className="font-medium">
                        {selectedCategory.charAt(0).toUpperCase() +
                          selectedCategory.slice(1)}
                      </span>
                    </>
                  )}
                </div>
              )}

              {/* Accordion */}
              {!isLoading && !error && (
                <div className="mb-12">
                  {currentFAQs.length > 0 ? (
                    <FAQAccordion faqs={currentFAQs} />
                  ) : (
                    <div className="text-center py-12 bg-gray-50 rounded-lg">
                      <p className="text-gray-500">
                        No FAQs found in this category.
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Pagination */}
              {!isLoading && !error && totalPages > 1 && (
                <Pagination className="mt-8">
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={() =>
                          handlePageChange(Math.max(1, currentPage - 1))
                        }
                        className={
                          currentPage === 1
                            ? "pointer-events-none opacity-50"
                            : "cursor-pointer"
                        }
                        href="#"
                      />
                    </PaginationItem>

                    {getPageNumbers().map((page, index) => (
                      <PaginationItem key={index}>
                        {typeof page === "number" ? (
                          <PaginationLink
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              handlePageChange(page);
                            }}
                            isActive={page === currentPage}
                          >
                            {page}
                          </PaginationLink>
                        ) : (
                          <span className="px-2 text-gray-400 select-none">
                            …
                          </span>
                        )}
                      </PaginationItem>
                    ))}

                    <PaginationItem>
                      <PaginationNext
                        onClick={() =>
                          handlePageChange(
                            Math.min(totalPages, currentPage + 1)
                          )
                        }
                        className={
                          currentPage === totalPages
                            ? "pointer-events-none opacity-50"
                            : "cursor-pointer"
                        }
                        href="#"
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              )}
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default FaqPage;
