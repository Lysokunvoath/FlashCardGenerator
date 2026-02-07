'use client';

import Link from 'next/link';
import React from 'react';
import { usePathname } from 'next/navigation';

interface SidebarProps { }

const Sidebar: React.FC<SidebarProps> = () => {
  const pathname = usePathname();

  const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125h9.75a1.125 1.125 0 001.125-1.125V9.75M3.75 6.21v12.39c0 .621.504 1.125 1.125 1.125h13.5a1.125 1.125 0 001.125-1.125V6.21M17.25 12.75V11.25H9.75v1.5h7.5z"
          />
        </svg>
      ) },
    { name: 'All deck', href: '/alldeck', icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 8.25h19.5V19.5a2.25 2.25 0 01-2.25 2.25H4.5A2.25 2.25 0 012.25 19.5V8.25zm0 0h2.25m-2.25 0h-2.25m0 0V6a2.25 2.25 0 012.25-2.25h3.375c.621 0 1.125.504 1.125 1.125v2.25m0 0h2.25m-2.25 0h-2.25m0 0V6a2.25 2.25 0 012.25-2.25h3.375c.621 0 1.125.504 1.125 1.125v2.25m0 0h2.25m-2.25 0h-2.25m0 0V6a2.25 2.25 0 012.25-2.25h3.375c.621 0 1.125.504 1.125 1.125v2.25"
          />
        </svg>
      ) },
    { name: 'Setting', href: '/settings', icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.325 4.317c.426-1.75 2.924-1.75 3.35 0a1.125 1.125 0 011.915.688 1.125 1.125 0 001.442 1.066c1.808-.54 3.635 1.345 3.095 3.155a1.125 1.125 0 010 2.08c.54 1.81-1.387 3.64-3.195 3.095a1.125 1.125 0 01-1.442 1.066 1.125 1.125 0 01-1.915.688c-.426 1.75-2.924 1.75-3.35 0a1.125 1.125 0 01-1.915-.688 1.125 1.125 0 00-1.442-1.066c-1.808.54-3.635-1.345-3.095-3.155a1.125 1.125 0 010-2.08c-.54-1.81 1.387-3.64 3.195-3.095a1.125 1.125 0 011.442-1.066 1.125 1.125 0 011.915-.688z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ) },
  ];

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white w-64 p-4 shadow-lg">
      <div className="flex items-center justify-center h-20 mb-8">
        <div className="text-2xl font-bold text-indigo-500">FLASHCARD</div>
      </div>

      <nav className="flex-grow">
        <ul>
          {navItems.map((item) => (
            <li key={item.name} className="mb-2">
              <Link href={item.href}>
                <div
                  className={`flex items-center p-3 rounded-lg text-lg hover:bg-gray-800 transition-colors
                    ${pathname === item.href ? 'bg-indigo-700 text-white' : 'text-gray-400'}`}
                >
                  <span className="mr-3">{item.icon}</span>
                  <span>{item.name}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-auto">
        <button
          className="flex items-center w-full p-3 rounded-lg text-lg text-red-500 hover:bg-gray-800 transition-colors"
          onClick={() => {
            console.log('Logging out...');
          }}
        >
          <span className="mr-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
              />
            </svg>
          </span>
          <span>Log out</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
