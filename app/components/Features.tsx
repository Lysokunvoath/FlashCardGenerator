const Features = () => {
  return (
    <div className="p-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-[#1f2937] p-6 rounded-lg text-center">
          <div className="w-20 h-20 mx-auto bg-yellow-400 rounded-lg transform -rotate-6"></div>
          <h2 className="mt-6 text-2xl font-bold">Create your flashcard</h2>
          <p className="mt-2 text-gray-400">Easily build custom deck to fit any subject</p>
        </div>
        <div className="bg-[#1f2937] p-6 rounded-lg text-center">
          <div className="w-20 h-20 mx-auto bg-gray-500 rounded-lg"></div>
          <h2 className="mt-6 text-2xl font-bold">Organize and manage</h2>
          <p className="mt-2 text-gray-400">
            Effortlessly categorized, edit and review your deck
          </p>
        </div>
        <div className="bg-[#1f2937] p-6 rounded-lg text-center">
          <div className="w-20 h-20 mx-auto bg-yellow-400 rounded-lg relative">
            <div className="absolute top-2 right-2 text-gray-800 text-xl">+</div>
            <div className="absolute bottom-2 left-2 text-gray-800 text-xl">x</div>
            <div className="absolute bottom-2 right-2 text-gray-800 text-xl">÷</div>
          </div>
          <h2 className="mt-6 text-2xl font-bold">Smart study mode</h2>
          <p className="mt-2 text-gray-400">The more you focus the more you learn</p>
        </div>
      </div>
    </div>
  );
};

export default Features;
