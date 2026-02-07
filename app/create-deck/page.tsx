import React from "react";

const CreateDeckPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <div className="mb-8 border-b border-gray-700 pb-4">
        <h1 className="text-3xl font-bold">Create Deck</h1>
      </div>

      <div className="max-w-xl mx-auto">
        <div className="mb-6">
          <label htmlFor="deckName" className="block text-lg font-medium text-white mb-2">
            Deck name
          </label>
          <input
            type="text"
            id="deckName"
            className="w-full px-4 py-2 bg-gray-800 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder=""
          />
        </div>

        <div className="mb-8">
          <label htmlFor="description" className="block text-lg font-medium text-white mb-2">
            Description
          </label>
          <textarea
            id="description"
            rows={5}
            className="w-full px-4 py-2 bg-gray-800 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder=""
          ></textarea>
        </div>

        <div className="flex justify-end">
          <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white font-medium">
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateDeckPage;
