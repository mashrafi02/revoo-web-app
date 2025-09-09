import { useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

function Hamburger() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden">
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="text-white text-2xl focus:outline-none"
      >
        <FiMenu />
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-gray-900 text-white transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out z-50`}
      >
        {/* Close Button */}
        <div className="flex justify-end p-4">
          <button
            onClick={() => setIsOpen(false)}
            className="text-white text-2xl"
          >
            <FiX />
          </button>
        </div>

        {/* Nav Links */}
        <nav className="flex flex-col space-y-4 px-6">
          <Link
            to="/"
            className="hover:text-green-400 transition"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/popular"
            className="hover:text-green-400 transition"
            onClick={() => setIsOpen(false)}
          >
            Popular Movies
          </Link>
          <Link
            to="/search"
            className="hover:text-green-400 transition"
            onClick={() => setIsOpen(false)}
          >
            Search
          </Link>
          <Link
            to="/about"
            className="hover:text-green-400 transition"
            onClick={() => setIsOpen(false)}
          >
            About
          </Link>
        </nav>
      </div>
    </div>
  );
}

export default Hamburger;
