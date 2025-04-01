import { useState, useEffect } from 'react';
import { Link as ScrollLink } from 'react-scroll';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Navigation items
  const navItems = ['About', 'Skills', 'Projects', 'Contact'];

  // Instant scroll settings
  const scrollSettings = {
    spy: true,
    smooth: false, // Disables smooth scrolling for instant movement
    offset: -70,
    duration: 0, // Ensures the scrolling happens instantly
    delay: 0, // Explicitly set delay to 0
    isDynamic: true,
    ignoreCancelEvents: false
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow py-3' : 'bg-[#DDA853] py-4'
      }`}>
      <div className="container mx-auto flex justify-between items-center px-4 md:px-12">
        {/* Logo / Name */}
        <ScrollLink
          to="hero"
          {...scrollSettings}
          className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold cursor-pointer ${isScrolled ? 'text-gray-900' : 'text-[#F5EEDC]'
            }`}
          style={{ fontFamily: '"Patrick Hand", cursive' }}
        >
          Mohamed Fiyaz
        </ScrollLink>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center justify-center">
          <ul className="flex space-x-6 lg:space-x-12">
            {navItems.map((item) => (
              <li key={item}>
                <ScrollLink
                  to={item.toLowerCase()}
                  {...scrollSettings}
                  className={`text-base lg:text-xl xl:text-2xl font-medium cursor-pointer transition-colors ${isScrolled ? 'text-gray-900 hover:text-gray-600' : 'text-[#F5EEDC] hover:text-gray-300'
                    }`}
                  style={{ fontFamily: '"Puritan", sans-serif' }}
                >
                  {item}
                </ScrollLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile Hamburger Menu Button */}
        <button
          onClick={toggleMenu}
          aria-label="Toggle menu"
          className="md:hidden flex flex-col justify-center items-center w-10 h-10 space-y-1.5 focus:outline-none"
        >
          <span className={`block w-6 h-0.5 transition-all duration-300 ${isScrolled ? 'bg-gray-900' : 'bg-[#F5EEDC]'
            } ${isMenuOpen ? 'transform rotate-45 translate-y-2' : ''}`}></span>
          <span className={`block w-6 h-0.5 transition-all duration-300 ${isScrolled ? 'bg-gray-900' : 'bg-[#F5EEDC]'
            } ${isMenuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`block w-6 h-0.5 transition-all duration-300 ${isScrolled ? 'bg-gray-900' : 'bg-[#F5EEDC]'
            } ${isMenuOpen ? 'transform -rotate-45 -translate-y-2' : ''}`}></span>
        </button>

        {/* Mobile Menu with Instant ScrollLinks */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-[#F5EEDC] shadow-lg md:hidden">
            <ul className="flex flex-col items-center py-2">
              {navItems.map((item) => (
                <li key={item} className="w-full border-b border-[#DDA853] border-opacity-20 last:border-b-0">
                  <ScrollLink
                    to={item.toLowerCase()}
                    {...scrollSettings}
                    onClick={closeMenu}
                    className="block py-4 text-center text-xl font-medium text-[#DDA853] hover:bg-[#DDA853] hover:text-[#F5EEDC] transition-colors"
                    style={{ fontFamily: '"Puritan", sans-serif' }}
                  >
                    {item}
                  </ScrollLink>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;