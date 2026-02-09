'use client';

import React from 'react';

const CreateCardPage: React.FC = () => {
  return (
    <div className="flex-1 p-8 bg-gray-900 text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Create flash card</h1>
      <hr className="border-gray-700 mb-8" />

      <div className="space-y-6 max-w-2xl">
        <div>
          <label htmlFor="question" className="block text-xl font-medium text-gray-300 mb-2">
            Question
          </label>
          <input
            type="text"
            id="question"
            name="question"
            className="w-full p-3 rounded-lg bg-gray-800 border border-blue-500 focus:ring-blue-500 focus:border-blue-500 text-white text-lg"
            placeholder=""
          />
        </div>

        <div>
          <label htmlFor="answer" className="block text-xl font-medium text-gray-300 mb-2">
            Answer
          </label>
          <textarea
            id="answer"
            name="answer"
            rows={4}
            className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:ring-blue-500 focus:border-blue-500 text-white text-lg"
            placeholder=""
          ></textarea>
        </div>

        <div className="flex justify-between items-center">
          <button className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            Add more
          </button>
          <button className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white text-lg font-semibold transition-colors">
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateCardPage;
