"use client";

import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () =>{
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header
      className="sticky top-0 z-50 bg-white dark:border-gray-700"
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-2 text-black-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <span className="font-bold text-xl">JobFinder</span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                location.pathname === "/"
                  ? "text-black-600"
                  : "text-white-600"
              }`}
            >
              Jobs
            </Link>
            <Link
              to="/favorites"
              className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                location.pathname === "/favorites"
                  ? "text-black-600"
                  : "text-white-600"
              }`}
            >
              Saved Jobs
            </Link>
          </nav>

          <div className="flex items-center space-x-2">
            <button
              className="md:hidden p-2 rounded-full border border-gray-300 dark:border-gray-600"
              onClick={toggleMenu}
            >
              {isMenuOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden border-t dark:border-gray-700">
          <div className="container mx-auto px-4 py-3 space-y-2">
            <Link
              to="/"
              className={`block py-2 text-sm font-medium ${
                location.pathname === "/"
                  ? "text-blue-600"
                  : "text-gray-600 dark:text-gray-300"
              }`}
            >
              Jobs
            </Link>
            <Link
              to="/favorites"
              className={`block py-2 text-sm font-medium ${
                location.pathname === "/favorites"
                  ? "text-blue-600"
                  : "text-gray-600 dark:text-gray-300"
              }`}
            >
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
                Saved Jobs
              </div>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
