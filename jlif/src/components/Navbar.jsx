import { useState } from "react";
import { FaChevronDown, FaBars, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-[#003366] text-white px-6 py-4 flex items-center justify-between shadow-lg fixed top-0 left-0 w-full z-50">
      {/* Logo */}
      <Link to='/'>
      <div className="w-12 rounded-full">
        <img src="logo.png" className="rounded-3xl" alt="this is recabite logo" />
      </div>
      </Link>

      {/* Desktop Links */}
      <div className="hidden md:flex space-x-8 text-sm font-medium">
        <Link to="/services" className="hover:text-[#FF0000] transition-colors">Services</Link>
        <Link to="/solutions" className="hover:text-[#FF0000] transition-colors">Solutions</Link>
        <Link to="/about" className="hover:text-[#FF0000] transition-colors">About us</Link>
        <Link to="/contact" className="hover:text-[#FF0000] transition-colors">Contact</Link>
        <div
          className="relative"
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
        >
          <button className="flex items-center hover:text-[#FF0000] transition-colors">
            Resources <FaChevronDown size={14} className="ml-1" />
          </button>
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute mt-2 bg-white text-[#003366] rounded-lg shadow-lg py-2 w-40 z-50"
              >
                <Link to="/blog" className="block px-4 py-2 hover:bg-[#FF0000] hover:text-white transition-colors">Blog</Link>
                <Link to="/case-studies" className="block px-4 py-2 hover:bg-[#FF0000] hover:text-white transition-colors">Case Studies</Link>
                <Link to="/guides" className="block px-4 py-2 hover:bg-[#FF0000] hover:text-white transition-colors">Guides</Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Contact Button (Desktop) */}
      <div className="hidden md:block">
        <Link
          to="/store"
          className="bg-[#FF0000] text-white px-4 py-2 rounded-lg shadow-md hover:bg-white hover:text-[#FF0000] border border-[#FF0000] transition-colors"
        >
          Check our Store
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>
      </div>

      {/* Mobile Menu with Slide Animation */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3 }}
            className="absolute top-full left-0 w-full bg-[#003366] text-white flex flex-col items-start px-6 py-6 space-y-4 md:hidden shadow-md z-50"
          >
            <Link to="/services" className="hover:text-[#FF0000] transition-colors">Services</Link>
            <Link to="/solutions" className="hover:text-[#FF0000] transition-colors">Solutions</Link>
            <Link to="/about" className="hover:text-[#FF0000] transition-colors">About us</Link>
            <Link to="/contact" className="hover:text-[#FF0000] transition-colors">Contact</Link>

            {/* Resources Dropdown in Mobile */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center hover:text-[#FF0000] transition-colors"
            >
              Resources <FaChevronDown size={14} className="ml-1" />
            </button>
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="ml-4 flex flex-col space-y-2 overflow-hidden"
                >
                  <Link to="/blog" className="hover:text-[#FF0000] transition-colors">Blog</Link>
                  <Link to="/case-studies" className="hover:text-[#FF0000] transition-colors">Case Studies</Link>
                  <Link to="/guides" className="hover:text-[#FF0000] transition-colors">Guides</Link>
                </motion.div>
              )}
            </AnimatePresence>

            
            {/* Contact Button (Desktop) */}
      <div className="md:block">
        <Link
          to="/store"
          className="bg-[#FF0000] text-white px-4 py-2 rounded-lg shadow-md hover:bg-white hover:text-[#FF0000] border border-[#FF0000] transition-colors"
        >
          Check our Store
        </Link>
      </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
