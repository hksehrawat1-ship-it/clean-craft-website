import { Link } from "react-router-dom";
import { useState } from "react";
import React from "react";

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
    <header className="w-full bg-white sticky top-0 z-50 shadow">
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
          <ul className="flex gap-10">
            <li>
              <Link
                to="/"
                className="text-base font-medium text-black hover:text-[#1355A3] transition-colors"
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
                  className="text-base font-medium text-black hover:text-[#1355A3] transition-colors flex items-center focus:outline-none"
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
                  <ul className="absolute left-0 mt-2 w-40 bg-white border rounded shadow-lg py-2 z-50">
                    <li>
                      <Link
                        to="/learning/courses"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        Courses
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/learning/book"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
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
          <a
            href="#login"
            className="header-login-button px-5 py-1.5"
          >
            Login
          </a>
          <a
            href="#book"
            className="header-book-button px-5 py-1.5"
          >
            Book Now
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
