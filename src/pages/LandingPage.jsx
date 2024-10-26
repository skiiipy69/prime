import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Brain, Trophy, Clock, Users } from 'lucide-react';
import useQuestionStore from "../store/zustand"; // Updated import path

const LandingPage = () => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(null);
  const { auth } = useQuestionStore(); // Use the same auth store as other components
  
  // Check if user is logged in using the auth store instead of localStorage
  const isLoggedIn = !!auth?.email;

  const features = [
    {
      icon: <Brain className="w-8 h-8 text-purple-500" />,
      title: "Knowledge Testing",
      description: "Challenge yourself with various topics"
    },
    {
      icon: <Trophy className="w-8 h-8 text-yellow-500" />,
      title: "Earn Points",
      description: "Compete and earn achievements"
    },
    {
      icon: <Clock className="w-8 h-8 text-blue-500" />,
      title: "Time Based",
      description: "Test against the clock"
    },
    {
      icon: <Users className="w-8 h-8 text-green-500" />,
      title: "Community",
      description: "Compare with others"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-20 pb-12">
        <div className="text-center mb-16 space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Welcome to{' '}
            <Link to="/">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 animate-pulse">
                Quiz Vibe
              </span>
            </Link>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Test your knowledge, challenge your mind, and compete with others in this exciting quiz adventure!
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        {!isLoggedIn ? (
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
            <button
              onMouseEnter={() => setIsHovered('login')}
              onMouseLeave={() => setIsHovered(null)}
              onClick={() => navigate('/login')}
              className={`px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform
                ${isHovered === 'login' 
                  ? 'bg-purple-700 translate-y-1 scale-105' 
                  : 'bg-purple-600 hover:bg-purple-700'} 
                text-white shadow-lg hover:shadow-xl`}
            >
              Login to Start
            </button>
            
            <button
              onMouseEnter={() => setIsHovered('register')}
              onMouseLeave={() => setIsHovered(null)}
              onClick={() => navigate('/register')}
              className={`px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform
                ${isHovered === 'register' 
                  ? 'bg-pink-700 translate-y-1 scale-105' 
                  : 'bg-pink-600 hover:bg-pink-700'} 
                text-white shadow-lg hover:shadow-xl`}
            >
              Register Now
            </button>
          </div>
        ) : (
          <div className="flex justify-center mt-8">
            <button
              onClick={() => navigate('/home')}
              className="px-8 py-4 rounded-lg font-semibold text-lg bg-purple-600 hover:bg-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              Get Started
            </button>
          </div>
        )}

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: 'Active Users', value: '1000+' },
            { label: 'Questions', value: '5000+' },
            { label: 'Categories', value: '20+' },
            { label: 'Daily Quizzes', value: '50+' },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-purple-600">{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-20 py-6 bg-gradient-to-r from-purple-500 to-teal-400">
        <div className="text-center text-white">
          <p className="text-sm">© 2024 Quiz Vibe. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;