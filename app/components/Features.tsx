import React from 'react';

const Features: React.FC = () => {
  return (
    <section className="py-16 bg-gray-100 text-gray-800">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-12">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-2xl font-bold mb-4">Customizable Flashcards</h3>
            <p className="text-gray-600">Create flashcards tailored to your learning style with rich text and images.</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-2xl font-bold mb-4">Spaced Repetition</h3>
            <p className="text-gray-600">Optimize your learning with an intelligent spaced repetition algorithm.</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-2xl font-bold mb-4">Progress Tracking</h3>
            <p className="text-gray-600">Monitor your learning journey and see your knowledge grow over time.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
