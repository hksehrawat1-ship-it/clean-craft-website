import React, { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { Filter } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Helmet } from "react-helmet-async";
import { useFAQs } from "@/hooks/use-faqs";
import { FAQAccordion } from "@/components/FAQAccordion";
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
  const { countryCode } = useParams(); // currently unused but you can extend later
  const { faqsByCategory, categories, isLoading, error } = useFAQs();

  // Console logs for debugging
  console.log("faqsByCategory:", faqsByCategory);
  console.log("categories:", categories);
  console.log("isLoading:", isLoading);
  console.log("error:", error);

  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Filter FAQs based on category selection
  const filteredFAQs = useMemo(() => {
    if (selectedCategory === "all") {
      return Object.values(faqsByCategory).flat();
    }
    return faqsByCategory[selectedCategory] ?? [];
  }, [faqsByCategory, selectedCategory]);

  // Pagination calculations
  const totalFAQs = filteredFAQs.length;
  const totalPages = Math.ceil(totalFAQs / PAGE_SIZE);

  // FAQs for the current page only
  const currentFAQs = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredFAQs.slice(start, start + PAGE_SIZE);
  }, [filteredFAQs, currentPage]);

  // Group current page FAQs by category (for FAQAccordion)
  const currentFAQsByCategory = useMemo(() => {
    if (selectedCategory !== "all") {
      return { [selectedCategory]: currentFAQs };
    }
    return currentFAQs.reduce((acc, faq) => {
      acc[faq.category] = acc[faq.category] || [];
      acc[faq.category].push(faq);
      return acc;
    }, {} as Record<string, typeof currentFAQs>);
  }, [currentFAQs, selectedCategory]);

  // When category changes, reset to page 1
  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    setCurrentPage(1);
  };

  // When page changes, scroll to top smoothly
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <Helmet>
        <title>Frequently Asked Questions - CleanCraft</title>
        <meta
          name="description"
          content="Find answers to common questions about our services and policies."
        />
      </Helmet>

      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-black mb-8 text-center">
          Frequently Asked <span className="text-primary">Questions</span>
        </h1>

        <p className="text-lg text-gray-600 text-center mb-12">
          Find answers to the most common questions about our services,
          policies, and more.
        </p>

        {/* Category Filter */}
        <div className="flex items-center justify-end mb-8 border-b pb-4">
          <div className="flex items-center">
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
                {categories.map((category) => (
                  <SelectItem
                    key={category}
                    value={category}
                    className="capitalize"
                  >
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Loading & Error states */}
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
                <span className="font-medium capitalize">
                  {selectedCategory}
                </span>
              </>
            )}
          </div>
        )}

        {/* FAQ Accordion */}
        {!isLoading && !error && (
          <div className="mb-12">
            {Object.keys(currentFAQsByCategory).length > 0 ? (
              <FAQAccordion faqsByCategory={currentFAQsByCategory} />
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <p className="text-gray-500">No FAQs found in this category.</p>
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
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                  className={
                    currentPage === 1
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                  href="#"
                />
              </PaginationItem>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <PaginationItem key={page}>
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
                  </PaginationItem>
                )
              )}

              <PaginationItem>
                <PaginationNext
                  onClick={() =>
                    handlePageChange(Math.min(totalPages, currentPage + 1))
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
  );
};

export default FaqPage;
