import React, { useState } from 'react';
import { Link } from "react-router-dom";
import useQuestionStore from "../../store/zustand";
import { Menu, X, Home, Info, Phone, BookOpen, LogOut, User } from 'lucide-react';

const NavLink = ({ to, children, icon: Icon }) => (
  <Link
    to={to}
    className="flex items-center gap-2 px-4 py-2 text-gray-300 rounded-lg transition-all duration-300 hover:bg-gray-800 hover:text-teal-400"
  >
    {Icon && <Icon size={18} />}
    {children}
  </Link>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { auth, logoutUser } = useQuestionStore();
  const isAuthenticated = !!auth?.email;

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="sticky top-0 z-50 w-full bg-gray-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link 
              to="/" 
              className="flex items-center gap-2 transition-transform duration-300 hover:scale-105"
              aria-label="QuizVibe Home"
            >
              <span className="text-2xl md:text-3xl font-extrabold tracking-tight">
                <span className="text-purple-500">Quiz</span>
                <span className="text-teal-400">Vibe</span>
              </span>
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
            </Link>
          </div>

          {/* Desktop Navigation - Centered */}
          <div className="hidden md:flex flex-1 justify-center">
            <div className="flex items-center gap-4">
              <NavLink to="/" icon={Home}>Home</NavLink>
              <NavLink to="/about" icon={Info}>About</NavLink>
              <NavLink to="/contact" icon={Phone}>Contact</NavLink>
              {isAuthenticated && (
                <>
                  <NavLink to="/dashboard" icon={User}>Dashboard</NavLink>
                  <NavLink to="/howtoplay" icon={BookOpen}>How To Play</NavLink>
                </>
              )}
            </div>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-4 flex-shrink-0">
            {isAuthenticated ? (
              <button
                onClick={logoutUser}
                className="flex items-center gap-2 px-5 py-2 text-white font-semibold rounded-full bg-purple-500 transition-all duration-300 hover:bg-teal-400 hover:shadow-lg"
              >
                <LogOut size={18} />
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-5 py-2 text-teal-400 font-semibold border-2 border-teal-400 rounded-full transition-all duration-300 hover:bg-teal-400 hover:text-gray-900"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-5 py-2 text-white font-semibold rounded-full bg-purple-500 transition-all duration-300 hover:bg-purple-600 hover:shadow-lg"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden ml-auto">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800"
              aria-expanded={isOpen}
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        } overflow-hidden`}
      >
        <div className="px-4 pt-2 pb-4 space-y-2 bg-gray-900">
          <NavLink to="/" icon={Home}>Home</NavLink>
          <NavLink to="/about" icon={Info}>About</NavLink>
          <NavLink to="/contact" icon={Phone}>Contact</NavLink>
          {isAuthenticated && (
            <>
              <NavLink to="/dashboard" icon={User}>Dashboard</NavLink>
              <NavLink to="/howtoplay" icon={BookOpen}>How To Play</NavLink>
            </>
          )}
          
          <div className="pt-4 space-y-2">
            {isAuthenticated ? (
              <button
                onClick={logoutUser}
                className="w-full flex items-center justify-center gap-2 px-5 py-2 text-white font-semibold rounded-full bg-purple-500 transition-all duration-300 hover:bg-teal-400"
              >
                <LogOut size={18} />
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block w-full text-center px-5 py-2 text-teal-400 font-semibold border-2 border-teal-400 rounded-full transition-all duration-300 hover:bg-teal-400 hover:text-gray-900"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block w-full text-center px-5 py-2 text-white font-semibold rounded-full bg-purple-500 transition-all duration-300 hover:bg-purple-600"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;