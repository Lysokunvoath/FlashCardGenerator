import React from 'react';

const DeckCard: React.FC<{ title: string; cards: number }> = ({ title, cards }) => {
  const progress = 70; 
  return (
    <div className="bg-gray-800 rounded-lg p-4 shadow-md w-64">
      <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
      <div className="h-2 bg-gray-700 rounded-full mb-2">
        <div
          className="h-full bg-blue-500 rounded-full"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <div className="flex justify-between text-sm text-gray-400 mb-4">
        <span>Progress</span>
        <span>{cards} cards</span>
      </div>
      <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition-colors">
        Study now
      </button>
    </div>
  );
};

const DashboardPage: React.FC = () => {
  const progress = 70;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6 text-white">Dashboard</h1>
      
      <div className="bg-gray-900 rounded-lg p-6 shadow-xl mb-8 border border-blue-600">
        <h2 className="text-2xl font-semibold mb-4 text-white">You&apos;ve Completed {progress}% of your deck</h2>
        <div className="h-4 bg-gray-700 rounded-full">
          <div
            className="h-full bg-blue-500 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4 text-white">Recommended Deck today</h2>
        <div className="flex gap-6">
          <DeckCard title="Japanese" cards={10} />
          <DeckCard title="Japanese" cards={10} />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
