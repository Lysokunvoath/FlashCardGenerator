import React from "react";
import { PlusIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const Card = () => (
  <div className="bg-gray-800 p-4 rounded-lg shadow-md w-full max-w-sm">
    <h3 className="text-xl font-semibold mb-4 text-white">Japanese</h3>
    <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
      <span>Progress</span>
      <span>10 cards</span>
    </div>
    <div className="w-full bg-gray-700 rounded-full h-2 mb-4">
      <div className="bg-blue-500 h-2 rounded-full" style={{ width: "50%" }}></div>
    </div>
    <button className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-md text-white font-medium">
      Study now
    </button>
  </div>
);

const AllDeckPage: React.FC = () => {

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">All deck</h1>
        <Link href="/create-deck">
          <button className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white font-medium">
            <PlusIcon className="h-5 w-5 mr-2" />
            Add deck
          </button>
        </Link>
      </div>

      <div className="mb-8">
        <div className="relative">
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-10 pr-4 py-2 bg-gray-800 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
};

export default AllDeckPage;
