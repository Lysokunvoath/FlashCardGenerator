import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-20 text-center">
      <div className="container mx-auto">
        <h1 className="text-5xl font-bold mb-4">Learn Smarter, Not Harder</h1>
        <p className="text-xl mb-8">Create, study, and master your flashcards with ease.</p>
        <button className="bg-white text-blue-600 hover:bg-gray-100 font-bold py-3 px-8 rounded-full text-lg">
          Get Started
        </button>
      </div>
    </section>
  );
};

export default Hero;
