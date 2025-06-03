
import { Link } from "react-router-dom";
import { useState } from "react";
import React from "react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { name: "Home", href: "/" },
  {
    name: "Learning",
    dropdown: [
      { name: "Courses", href: "/learning/courses" },
      { name: "Book", href: "/learning/book" },
    ],
  },
  { name: "Policies", href: "/policies" },
];

const Header = () => {
  const [learningOpen, setLearningOpen] = useState(false);
  const learningTimeout = React.useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (learningTimeout.current) clearTimeout(learningTimeout.current);
    setLearningOpen(true);
  };
  const handleMouseLeave = () => {
    learningTimeout.current = setTimeout(() => setLearningOpen(false), 150);
  };

  return (
    <header className="w-full bg-white sticky top-0 z-50 shadow-card border-b border-gray-100">
      <div className="max-w-[1440px] mx-auto flex items-center justify-between px-6 md:px-[100px] h-16">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 min-w-[220px] h-16">
          <img
            src="/cleancraft-logo.svg"
            alt="Clean Craft Logo"
            className="h-12 w-auto object-contain"
          />
        </Link>
        
        {/* Navigation */}
        <nav className="flex-1 flex justify-center">
          <ul className="flex gap-8">
            <li>
              <Link
                to="/"
                className="text-body-md font-medium text-gray-700 hover:text-brand-blue transition-colors"
              >
                Home
              </Link>
            </li>
            <li className="relative">
              <div
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  className="text-body-md font-medium text-gray-700 hover:text-brand-blue transition-colors flex items-center focus:outline-none"
                  onClick={() => setLearningOpen((open) => !open)}
                  type="button"
                >
                  Learning
                  <svg
                    className="ml-1 w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {learningOpen && (
                  <ul className="absolute left-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-elevation-2 py-2 z-50">
                    <li>
                      <Link
                        to="/learning/courses"
                        className="block px-4 py-2 text-body-sm text-gray-700 hover:bg-gray-50 hover:text-brand-blue transition-colors"
                      >
                        Courses
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/learning/book"
                        className="block px-4 py-2 text-body-sm text-gray-700 hover:bg-gray-50 hover:text-brand-blue transition-colors"
                      >
                        Book
                      </Link>
                    </li>
                  </ul>
                )}
              </div>
            </li>
          </ul>
        </nav>
        
        {/* Actions */}
        <div className="flex items-center gap-3 min-w-[160px] justify-end">
          <Button
            variant="outline"
            size="sm"
            className="text-brand-blue border-brand-blue hover:bg-brand-blue/5"
          >
            Login
          </Button>
          <Button
            size="sm"
            className="bg-brand-blue text-white hover:bg-brand-blue-dark"
          >
            Book Now
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
