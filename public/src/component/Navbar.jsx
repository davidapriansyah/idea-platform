import homeLogo from "../assets/IDEA_logo.svg";
import { Link } from "react-router-dom";
export default function Navbar({ setPage }) {
  return (
    <>
      <nav className="sticky top-0 z-10 p-2 bg-gradient-to-r from-yellow-400 to-yellow-200 shadow-lg border-b-4 border-gray-300 rounded-b-2xl flex items-center justify-between">
        {/* Logo on the left */}
        <div className="flex items-center space-x-4">
          <img
            src={homeLogo}
            alt="Logo Idea"
            className="w-14 h-14 rounded-full border-2 border-black shadow-lg hover:scale-105 transition-transform"
          />
          <Link
            to="/"
            className="text-2xl font-extrabold text-black hover:text-gray-800 transition-colors duration-300"
          >
            Idea Platform
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            className="text-gray-800 focus:outline-none"
            aria-label="Toggle navigation"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
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
          </button>
        </div>
      </nav>
    </>
  );
}
