import React from 'react';
import { Rocket, Menu } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <Rocket size={28} className="text-white" />
            <div>
              <h1 className="text-xl font-bold">StartupValidator.AI</h1>
              <p className="text-xs text-indigo-200">Turn Ideas into Validated Ventures</p>
            </div>
          </Link>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md hover:bg-indigo-700 focus:outline-none"
            >
              <Menu size={24} />
            </button>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex space-x-6">
            <Link to="/" className="hover:text-indigo-200 transition-colors">Home</Link>
            <Link to="/validate" className="hover:text-indigo-200 transition-colors">Validate</Link>
            <Link to="/forum" className="hover:text-indigo-200 transition-colors">Forum</Link>
            <Link to="/startup-news" className="hover:text-indigo-200 transition-colors">News</Link>
            <Link to="/funding-finder" className="hover:text-indigo-200 transition-colors">Grants</Link>
            <Link to="/about" className="hover:text-indigo-200 transition-colors">About</Link>


          </nav>
        </div>

        {/* Mobile navigation */}
        {isMenuOpen && (
          <nav className="mt-4 md:hidden flex flex-col space-y-2 pb-2">
            <Link
              to="/"
              className="px-3 py-2 rounded hover:bg-indigo-700 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/validate"
              className="px-3 py-2 rounded hover:bg-indigo-700 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Validate
            </Link>
            <Link
              to="/forum"
              className="px-3 py-2 rounded hover:bg-indigo-700 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Forum
            </Link>
            <Link
              to="/startup-news"
              className="px-3 py-2 rounded hover:bg-indigo-700 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              News
            </Link>
            <Link
              to="/about"
              className="px-3 py-2 rounded hover:bg-indigo-700 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
