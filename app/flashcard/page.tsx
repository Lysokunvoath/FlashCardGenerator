import Link from 'next/link';
import React from 'react';

export default function FlashcardPage() {
  return (
    <div className="flex flex-col h-full bg-gray-950 text-white">
      <div className="flex items-center p-4 border-b border-gray-700">
        <Link href="/viewdeck">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 cursor-pointer text-gray-400 hover:text-white transition-colors"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
        </Link>
        <h1 className="text-xl font-semibold ml-4">Japanese</h1>
      </div>

      <div className="flex-1 flex items-center justify-center p-4">
        <div className="bg-gray-800 rounded-lg shadow-xl p-8 relative w-full max-w-2xl h-96 flex flex-col justify-center items-center">
          <button className="absolute top-4 right-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg flex items-center space-x-2 transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
              />
            </svg>
            <span>Answer</span>
          </button>
          <p className="text-3xl font-bold text-white text-center">
            What does 母 mean ?
          </p>
        </div>
      </div>
    </div>
  );
}
