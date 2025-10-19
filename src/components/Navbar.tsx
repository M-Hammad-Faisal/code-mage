import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Youtube, Github, Linkedin, Heart } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { SITE, NAVIGATION } from '../site.config';
import { ASSETS } from '../utils/assets';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Check initial dark mode state
    const checkDarkMode = () => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    };

    checkDarkMode();

    // Listen for theme changes
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav
      className="shadow-sm border-b sticky top-0 z-50"
      style={{
        backgroundColor: isDarkMode ? '#1f2937' : '#ffffff',
        borderBottomColor: isDarkMode ? '#374151' : '#e0e7ff',
      }}
    >
      <div className="container-max">
        <div className="flex justify-between items-center h-16 px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <img
              src={ASSETS.LOGO}
              alt={`${SITE.brand} Logo`}
              className="w-8 h-8 rounded-lg group-hover:scale-110 transition-transform duration-200"
            />
            <span className="text-xl font-heading font-bold text-navy-800 dark:text-white">
              {SITE.brand}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex items-center space-x-6">
              {NAVIGATION.map(item => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    isActive(item.href)
                      ? 'text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400'
                      : 'text-navy-600 dark:text-white hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 dark:hover:text-red-400'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Social Icons */}
            <div className="flex items-center space-x-3">
              <a
                href={SITE.socials.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-navy-600 dark:text-white hover:text-red-600 dark:hover:text-red-400 transition-colors duration-200"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" />
              </a>
              <a
                href={SITE.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-navy-600 dark:text-white hover:text-red-600 dark:hover:text-red-400 transition-colors duration-200"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href={SITE.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-navy-600 dark:text-white hover:text-red-600 dark:hover:text-red-400 transition-colors duration-200"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href={SITE.socials.patreon}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-navy-600 dark:text-white hover:text-red-600 dark:hover:text-red-400 transition-colors duration-200"
                aria-label="Patreon"
              >
                <Heart className="w-5 h-5" />
              </a>
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md text-navy-600 dark:text-white hover:text-red-600 dark:hover:text-red-400 hover:bg-navy-100 dark:hover:bg-navy-700 focus:outline-none focus:ring-2 focus:ring-red-500"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t border-navy-100 dark:border-navy-700">
            <div
              className="px-2 pt-2 pb-3 space-y-1"
              style={{ backgroundColor: isDarkMode ? '#1f2937' : '#ffffff' }}
            >
              {NAVIGATION.map(item => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={closeMenu}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                    isActive(item.href)
                      ? 'text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400'
                      : 'text-navy-600 dark:text-white hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 dark:hover:text-red-400'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
