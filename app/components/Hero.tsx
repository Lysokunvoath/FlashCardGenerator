const Hero = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center p-8 text-center md:text-left">
      <div className="flex-1 md:mr-8">
        <h1 className="text-5xl font-bold leading-tight">Boost your learning with FlashCard</h1>
        <p className="mt-4 text-xl text-gray-400">
          Effortlessly create, manage and study flash card online. Tailor your
          learning your experience to master any subject.
        </p>
        <button className="mt-8 px-8 py-3 text-lg text-white bg-blue-600 rounded-full hover:bg-blue-700">
          Get started
        </button>
      </div>
      <div className="flex-1 mt-8 md:mt-0">
        <div className="relative w-full max-w-md mx-auto">
          <div className="w-full h-64 bg-gray-800 rounded-lg">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-3/4 h-3/4 bg-blue-500 rounded-lg">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-24 h-24 bg-blue-300 rounded-full opacity-50"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
