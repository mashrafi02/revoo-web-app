import React from 'react';
import { Link } from 'react-router-dom';


const NavBarAuth = () => {
  return (
    <nav className="w-full bg-transparent absolute z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-white">
          <img src="/images/Revoo.png" alt="app-logo" className="w-[100px]" />
        </Link>
      </div>
    </nav>
  )
}

export default NavBarAuth