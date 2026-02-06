"use client";
import Link from 'next/link';
import React from 'react';

interface SidebarProps {
  activePath?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ activePath }) => {
  const navItems = [
    { name: 'Dashboard', href: '/', icon: '🏠' },
    { name: 'All deck', href: '/decks', icon: '🗃️' },
    { name: 'Setting', href: '/settings', icon: '⚙️' },
  ];

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white w-64 p-4 shadow-lg">
      <div className="flex items-center justify-center h-20 mb-8">
        <div className="text-2xl font-bold text-blue-400">FLASHCARD</div>
      </div>

      <nav className="flex-grow">
        <ul>
          {navItems.map((item) => (
            <li key={item.name} className="mb-2">
              <Link href={item.href}>
                <div
                  className={`flex items-center p-3 rounded-lg text-lg hover:bg-gray-700 transition-colors
                    ${activePath === item.href ? 'bg-gray-700 text-blue-300' : ''}`}
                >
                  <span className="mr-3 text-xl">{item.icon}</span>
                  <span>{item.name}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-auto">
        <button
          className="flex items-center w-full p-3 rounded-lg text-lg text-red-500 hover:bg-gray-700 transition-colors"
          onClick={() => {
            console.log('Logging out...');
          }}
        >
          <span className="mr-3 text-xl">🚪</span>
          <span>Log out</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
