"use client";
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signOut } from '../lib/auth';
import { createClientComponentClient } from '../lib/supabase/client';

const Navbar = () => {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();
  const supabase = createClientComponentClient();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        setUser(user);
      } catch (error) {
        setUser(null);
      }
    };
    fetchUser();
  }, [supabase]);

  const handleLogout = async () => {
    try {
      await signOut();
      setUser(null);
      router.push('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <nav className="flex items-center justify-between p-6">
      <div className="flex items-center">
        <Image src="/file.svg" alt="Flashcard logo" width={40} height={40} />
        <div className="ml-2 text-xl font-bold">FlashCardGenerator</div>
      </div>
      <div className="flex items-center space-x-4">
        {user ? (
          <button onClick={handleLogout} className="px-6 py-2 text-white bg-red-600 rounded-full hover:bg-red-700">
            Logout
          </button>
        ) : (
          <>
            <Link href="/login" className="px-6 py-2 border border-gray-600 rounded-full hover:bg-gray-800">
              Login
            </Link>
            <Link href="/signup" className="px-6 py-2 text-white bg-blue-600 rounded-full hover:bg-blue-700">
              Sign up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

