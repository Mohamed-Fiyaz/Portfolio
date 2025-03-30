import { useState, useEffect } from 'react';
import { Link as ScrollLink } from 'react-scroll';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow py-3' : 'bg-[#DDA853] py-4'
    }`}>
      <div className="container mx-auto flex justify-between items-center px-4 md:px-12">
        {/* Logo / Name */}
        <ScrollLink
          to="hero"
          spy={true}
          smooth={true}
          duration={500}
          className={`text-3xl md:text-4xl font-bold cursor-pointer ${
            isScrolled ? 'text-gray-900' : 'text-[#F5EEDC]'
          }`}
          style={{ fontFamily: '"Patrick Hand", cursive' }}
        >
          Mohamed Fiyaz
        </ScrollLink>
        
        {/* Navigation */}
        <nav className="hidden md:flex items-center justify-center">
          <ul className="flex space-x-12">
            {['About', 'Skills', 'Projects', 'Contact'].map((item) => (
              <li key={item}>
                <ScrollLink
                  to={item.toLowerCase()}
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={500}
                  className={`text-xl md:text-2xl font-medium cursor-pointer transition-colors ${
                    isScrolled ? 'text-gray-900 hover:text-gray-600' : 'text-[#F5EEDC] hover:text-gray-300'
                  }`}
                  style={{ fontFamily: '"Puritan", sans-serif' }}
                >
                  {item}
                </ScrollLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
