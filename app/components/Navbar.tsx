import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-gray-800 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <a href="/" className="text-xl font-bold">FlashCardGenerator</a>
        <div>
          <a href="/login" className="mr-4 hover:text-gray-300">Login</a>
          <a href="/signup" className="hover:text-gray-300">Sign Up</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
