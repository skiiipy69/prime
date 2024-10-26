import React from 'react';

const HowToPlay = () => {
  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-gray-800 p-8 rounded-xl shadow-lg">
        <h1 className="text-4xl font-bold text-center mb-8">
          <span className="text-purple-500">How to</span>{' '}
          <span className="text-teal-400">Play</span>
        </h1>

        <div className="space-y-8 text-gray-300">
          {/* Step 1 */}
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-semibold text-white flex items-center gap-2">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-500 text-white text-sm">
                1
              </span>
              Select Your Quiz Type
            </h2>
            <p className="ml-10">
              Choose from various categories like Science, History, Sports, and more. Pick what interests you the most!
            </p>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-semibold text-white flex items-center gap-2">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-500 text-white text-sm">
                2
              </span>
              Choose Difficulty Level
            </h2>
            <p className="ml-10">
              Select your preferred difficulty level: Easy, Medium, or Hard. Each level offers increasingly challenging questions.
            </p>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-semibold text-white flex items-center gap-2">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-500 text-white text-sm">
                3
              </span>
              Answer Questions
            </h2>
            <p className="ml-10">
              Each quiz consists of 5 multiple-choice questions. Read each question carefully and select the answer you think is correct.
            </p>
          </div>

          {/* Step 4 */}
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-semibold text-white flex items-center gap-2">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-500 text-white text-sm">
                4
              </span>
              Review Your Score
            </h2>
            <p className="ml-10">
              After completing all questions, you'll see your final score and have the option to review your answers.
            </p>
          </div>

          {/* Tips Section */}
          <div className="mt-12 bg-gray-700 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-teal-400 mb-4">Pro Tips</h3>
            <ul className="list-disc list-inside space-y-2">
              <li>Take your time reading each question</li>
              <li>Use the process of elimination for tough questions</li>
              <li>Trust your first instinct</li>
              <li>Try different categories to expand your knowledge</li>
              <li>Challenge yourself with harder difficulties as you improve</li>
            </ul>
          </div>

          {/* Ready to Play Button */}
          <div className="text-center mt-8">
            <button
              onClick={() => window.location.href = '/home'}
              className="px-8 py-3 bg-purple-500 text-white rounded-full font-semibold hover:bg-purple-600 transition-colors duration-300"
            >
              Ready to Play!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowToPlay;