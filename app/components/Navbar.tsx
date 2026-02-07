import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between p-6">
      <div className="flex items-center">
        <Image src="/file.svg" alt="Flashcard logo" width={40} height={40} />
        <div className="ml-2 text-xl font-bold">FlashCardGenerator</div>
      </div>
      <div className="flex items-center space-x-4">
        <Link href="/login" className="px-6 py-2 border border-gray-600 rounded-full hover:bg-gray-800">
          Login
        </Link>
        <Link href="/signup" className="px-6 py-2 text-white bg-blue-600 rounded-full hover:bg-blue-700">
          Sign up
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
