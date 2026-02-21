"use client";
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, signOut } = useAuth();

  return (
    <nav className="flex items-center justify-between p-6 bg-gray-950 text-white">
      <Link href="/" className="flex items-center">
        <Image src="/file.svg" alt="Flashcard logo" width={40} height={40} />
        <div className="ml-2 text-xl font-bold">FlashCardGenerator</div>
      </Link>
      <div className="flex items-center space-x-4">
        {user ? (
          <>
            <Link href="/dashboard" className="px-4 py-2 hover:text-blue-500 transition-colors">
              Dashboard
            </Link>
            <button 
              onClick={signOut} 
              className="px-6 py-2 text-white bg-red-600 rounded-full hover:bg-red-700 transition-colors"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/login" className="px-6 py-2 border border-gray-600 rounded-full hover:bg-gray-800 transition-colors">
              Login
            </Link>
            <Link href="/signup" className="px-6 py-2 text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-colors">
              Sign up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
