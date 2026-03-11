import { Link } from 'react-router-dom';
import { useState } from 'react';

const NavBar = () =>{
     const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-950 border-b border-gray-800">

      <div className="max-w-7xl mx-auto px-6">

        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <div className="flex items-center space-x-2">

            <span className="text-xl font-bold text-white">
              Verifeye
            </span>

          </div>


          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 text-gray-300">

            <Link to="/" className="hover:text-white transition">
              Home
            </Link>

            <Link to="/DetectNews" className="hover:text-white transition">
              Detect News
            </Link>

            <Link to="/About" className="hover:text-white transition">
              About
            </Link>

          </div>


          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">

            <Link className="text-gray-300 hover:text-white border-3 border-green-500" to="/Login" role='button'>
              Login
            </Link>

            <Link className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg" to="SignUp" role='button'>
              Sign Up
            </Link>

          </div>


          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-300"
          >

            {isOpen ? "✕" : "☰"}

          </button>

        </div>

      </div>


      {/* Mobile Menu */}

      {isOpen && (

        <div className="md:hidden px-6 pb-4 space-y-4 text-gray-300">

          <Link to="/" className="block hover:text-white">
            Home
          </Link>

          <Link to="/NewsForm" className="block hover:text-white">
            Detect News
          </Link>

          <Link to="/About" className="block hover:text-white">
            About
          </Link>

          <Link className="block text-left hover:text-white border-3 border-green-500" to="/Login">
            Login
          </Link>

          <Link className="bg-blue-600 text-white px-4 py-2 rounded-lg" to="SignUp">
            Sign Up
          </Link>

        </div>

      )}

    </nav>
    )
}

export default NavBar