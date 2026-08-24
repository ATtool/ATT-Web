import { useState } from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-blue-900 text-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-yellow-400">
          Adventist Tamil Tool
        </Link>

        {/* Hamburger Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white text-3xl md:hidden"
        >
          {isOpen ? '✕' : '☰'}
        </button>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-6 text-sm font-medium">
          <li><Link to="/" className="hover:text-yellow-400">Home</Link></li>
          <li><Link to="/tamil-bible" className="hover:text-yellow-400">Tamil Bible</Link></li>
          <li><Link to="/songs" className="hover:text-yellow-400">Songs</Link></li>
          <li><Link to="/devotion" className="hover:text-yellow-400">Devotion</Link></li>
          <li><Link to="/sermons" className="hover:text-yellow-400">Sermons</Link></li>
          <li><Link to="/books" className="hover:text-yellow-400">Books</Link></li>
        </ul>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="md:hidden bg-blue-800 px-4 pb-4 flex flex-col gap-3 text-sm font-medium">
          <li><Link to="/" onClick={() => setIsOpen(false)} className="block py-2 hover:text-yellow-400">Home</Link></li>
          <li><Link to="/tamil-bible" onClick={() => setIsOpen(false)} className="block py-2 hover:text-yellow-400">Tamil Bible</Link></li>
          <li><Link to="/songs" onClick={() => setIsOpen(false)} className="block py-2 hover:text-yellow-400">Songs</Link></li>
          <li><Link to="/devotion" onClick={() => setIsOpen(false)} className="block py-2 hover:text-yellow-400">Devotion</Link></li>
          <li><Link to="/sermons" onClick={() => setIsOpen(false)} className="block py-2 hover:text-yellow-400">Sermons</Link></li>
          <li><Link to="/books" onClick={() => setIsOpen(false)} className="block py-2 hover:text-yellow-400">Books</Link></li>
        </ul>
      )}
    </nav>
  )
}

export default Navbar