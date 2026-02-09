'use client';

import React from 'react';
import Link from 'next/link';

const ViewDeckPage: React.FC = () => {
  const deckName = "Deck 1";
  const deckDescription = "This deck is about Web dev";
  const progress = 70;
  const totalCards = 10;
  const question = "What is API?";

  return (
    <div className="flex-1 p-8 bg-gray-900 text-white min-h-screen">
      <div className="flex items-center mb-6">
        <Link href="/dashboard">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 mr-4 cursor-pointer"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h17.25"
            />
          </svg>
        </Link>
        <h1 className="text-2xl font-bold">{deckName}</h1>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Description</h2>
        <p className="text-gray-400">{deckDescription}</p>
      </div>

      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-semibold">Progress</h2>
          <span className="text-gray-400">{progress}% complete</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2.5">
          <div
            className="bg-indigo-600 h-2.5 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Question</h2>
          <div className="flex items-center text-gray-400">
            <span className="mr-4">{totalCards} cards</span>
            <Link href="/createcard">
              <button className="flex items-center px-4 py-2 bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 mr-1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
                <span>Add question</span>
              </button>
            </Link>
          </div>
        </div>

        <div className="flex items-center justify-between bg-gray-800 p-4 rounded-lg mb-4">
          <span className="text-lg">{question}</span>
          <div className="flex items-center space-x-4">
            <button className="text-red-500 hover:text-red-700">
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
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.679-.114 1.022-.165m-1.022.165a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.14-2.006-2.293a1.154 1.154 0 00-1.168 0 2.123 2.123 0 01-1.168 0c-1.096.153-2.006 1.113-2.006 2.293v.916m7.5 0h-7.5"
                />
              </svg>
            </button>
            <button className="text-gray-400 hover:text-white">
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
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="mt-auto pt-8">
        <Link href="/flashcard">
          <button className="w-full py-3 bg-indigo-700 rounded-lg text-xl font-semibold hover:bg-indigo-800 transition-colors">
            Study now
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ViewDeckPage;
