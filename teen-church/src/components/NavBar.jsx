import React, { useState } from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="flex items-center justify-between p-2 sticky top-0 w-full z-20 bg-white shadow-md max-h-24">
      {/* Logo */}
      <Link to="/">
        <img src="/logo.jpg" className="nav-img" alt="Logo" />
      </Link>

      {/* Desktop Links */}
      <div className="hidden md:flex items-center ml-auto">
        <Link to="/events" className="nav-link">
          <i className="fa-solid fa-calendar-days pr-2"></i>Events
        </Link>
        <Link to="/announcements" className="nav-link">
          <i className="fa-solid fa-bullhorn pr-2"></i>Announcements
        </Link>
        <Link to="/album" className="nav-link">
          <i className="fa-solid fa-images pr-2"></i>Album
        </Link>
      </div>

      {/* Hamburger Button (mobile) */}
      <button onClick={() => setIsOpen(!isOpen)} className="nav-menu md:hidden">
        <i className="fa-solid fa-bars"></i>
      </button>

      {/* Mobile Vertical Menu */}
      <div
        className={`absolute top-full left-0 w-full bg-white shadow-lg flex flex-col items-start p-4 gap-3 transition-all duration-300 ease-in-out md:hidden ${
          isOpen
            ? "max-h-60 opacity-100 pointer-events-auto"
            : "max-h-0 opacity-0 pointer-events-none"
        }`}
      >
        <Link
          to="/events"
          className="w-full text-primary font-semibold py-2 rounded"
          onClick={() => setIsOpen(false)}
        >
          <i className="fa-solid fa-calendar-days pr-2"></i>Events
        </Link>
        <Link
          to="/announcements"
          className="w-full text-primary font-semibold py-2 rounded"
          onClick={() => setIsOpen(false)}
        >
          <i className="fa-solid fa-bullhorn pr-2"></i>Announcements
        </Link>
        <Link
          to="/album"
          className="w-full text-primary font-semibold py-2 rounded"
          onClick={() => setIsOpen(false)}
        >
          <i className="fa-solid fa-images pr-2"></i>Album
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
