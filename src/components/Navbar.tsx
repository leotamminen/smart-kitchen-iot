import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, ChefHat } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
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

  const navLinkClass = ({ isActive }: { isActive: boolean }) => {
    return `px-4 py-2 rounded-md transition-all duration-300 ${
      isActive 
        ? 'text-white bg-blue-600 hover:bg-blue-700' 
        : 'text-gray-700 hover:bg-gray-100'
    }`;
  };

  return (
    <nav className={`sticky top-0 z-50 w-full transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-md' : 'bg-white/80 backdrop-blur-md'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <NavLink to="/" className="flex items-center">
              <ChefHat className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">Smart Kitchen</span>
            </NavLink>
          </div>
          
          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              <NavLink to="/" className={navLinkClass}>Home</NavLink>
              <NavLink to="/devices" className={navLinkClass}>Devices</NavLink>
              <NavLink to="/documentation" className={navLinkClass}>Documentation</NavLink>
              <NavLink to="/simulation" className={navLinkClass}>Simulation</NavLink>
            </div>
          </div>
          
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
            >
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg rounded-b-lg">
          <NavLink 
            to="/" 
            className={({ isActive }) => 
              `block px-3 py-2 rounded-md ${isActive ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`
            }
            onClick={() => setIsOpen(false)}
          >
            Home
          </NavLink>
          <NavLink 
            to="/devices" 
            className={({ isActive }) => 
              `block px-3 py-2 rounded-md ${isActive ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`
            }
            onClick={() => setIsOpen(false)}
          >
            Devices
          </NavLink>
          <NavLink 
            to="/documentation" 
            className={({ isActive }) => 
              `block px-3 py-2 rounded-md ${isActive ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`
            }
            onClick={() => setIsOpen(false)}
          >
            Documentation
          </NavLink>
          <NavLink 
            to="/simulation" 
            className={({ isActive }) => 
              `block px-3 py-2 rounded-md ${isActive ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`
            }
            onClick={() => setIsOpen(false)}
          >
            Simulation
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;