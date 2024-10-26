import React, { useState } from 'react';
import { Brain, Target, Users, Sparkles, Book, Trophy } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useQuestionStore from "../store/zustand";

const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="flex flex-col items-center p-6 bg-gray-800 rounded-xl shadow-lg transition-transform duration-300 hover:scale-105">
    <div className="p-3 bg-purple-500 rounded-full mb-4">
      <Icon size={24} className="text-white" />
    </div>
    <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
    <p className="text-gray-300 text-center">{description}</p>
  </div>
);

const TeamMember = ({ name, role, title, imageSrc }) => (
  <div className="flex flex-col items-center p-6 bg-gray-800 rounded-xl">
    <div className="w-24 h-24 mb-4 rounded-full overflow-hidden">
      <img
        src={imageSrc || "/api/placeholder/96/96"}
        alt={name}
        className="w-full h-full object-cover"
      />
    </div>
    <h3 className="text-xl font-bold text-white mb-1">{name}</h3>
    <p className="text-teal-400">{role}</p>
    <p className="text-gray-300">{title}</p> {/* Add the title here */}
  </div>
);

const AboutUs = () => {
  const navigate = useNavigate();
  const { auth } = useQuestionStore();
  const [isHovered, setIsHovered] = useState(null);
  
  const isLoggedIn = !!auth?.email;

  const features = [
    {
      icon: Brain,
      title: "Knowledge Enhancement",
      description: "Expand your knowledge through engaging quizzes across various topics"
    },
    {
      icon: Target,
      title: "Personalized Learning",
      description: "Adaptive difficulty levels that match your growing expertise"
    },
    {
      icon: Users,
      title: "Community Driven",
      description: "Connect with fellow learners and share your quiz achievements"
    },
    {
      icon: Sparkles,
      title: "Interactive Experience",
      description: "Engaging interface with real-time feedback and explanations"
    },
    {
      icon: Book,
      title: "Diverse Topics",
      description: "Wide range of subjects from science to pop culture"
    },
    {
      icon: Trophy,
      title: "Achievement System",
      description: "Earn badges and track your progress as you learn"
    }
  ];

  const team = [
    {
      name: "Zouhair Elabassi",
      role: "Founder & CEO",
      title: "ALX Africa Software Engineering Student",
      imageSrc: "./zouhair.jpg" 
    },
    {
      name: "Mohammed Dad",
      role: "Co-Founder",
      title: "ALX Africa Software Engineering Student",
      imageSrc: "./dad.JPG"
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          <span className="text-purple-500">About</span>{' '}
          <span className="text-teal-400">QuizVibe</span>
        </h1>
        <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto">
          Empowering learners through interactive quizzes and knowledge challenges.
          Join our community of curious minds and embark on a journey of discovery.
        </p>
      </div>

      {/* Mission Section */}
      <div className="max-w-7xl mx-auto mb-20">
        <div className="bg-gradient-to-r from-purple-500/10 to-teal-400/10 rounded-2xl p-8 md:p-12">
          <h2 className="text-3xl font-bold text-white mb-6 text-center">Our Mission</h2>
          <p className="text-gray-300 text-lg text-center max-w-4xl mx-auto">
            At QuizVibe, we believe learning should be engaging, interactive, and fun. 
            Our mission is to create an innovative learning platform that combines 
            the power of quizzes with modern technology to make education accessible 
            and enjoyable for everyone.
          </p>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto mb-20">
        <h2 className="text-3xl font-bold text-white mb-12 text-center">What Makes Us Special</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>

      {/* Team Section - Updated to center two members */}
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-12 text-center">Meet Our Team</h2>
        <div className="max-w-3xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-items-center">
            {team.map((member, index) => (
              <TeamMember key={index} {...member} />
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto mt-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-800 rounded-xl p-8 text-center">
            <div className="text-4xl font-bold text-purple-500 mb-2">100K+</div>
            <div className="text-gray-300">Active Users</div>
          </div>
          <div className="bg-gray-800 rounded-xl p-8 text-center">
            <div className="text-4xl font-bold text-teal-400 mb-2">5000+</div>
            <div className="text-gray-300">Quizzes Available</div>
          </div>
          <div className="bg-gray-800 rounded-xl p-8 text-center">
            <div className="text-4xl font-bold text-purple-500 mb-2">50+</div>
            <div className="text-gray-300">Topic Categories</div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto mt-20 text-center">
        <h2 className="text-3xl font-bold text-white mb-6">Ready to Start Learning?</h2>
        <p className="text-gray-300 mb-8">Join thousands of learners expanding their knowledge daily</p>
        
        {!isLoggedIn ? (
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onMouseEnter={() => setIsHovered('login')}
              onMouseLeave={() => setIsHovered(null)}
              onClick={() => navigate('/login')}
              className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 transform
                ${isHovered === 'login' 
                  ? 'bg-purple-600 translate-y-1 scale-105' 
                  : 'bg-purple-500 hover:bg-purple-600'} 
                text-white shadow-lg hover:shadow-xl`}
            >
              Login to Start
            </button>
            
            <button
              onMouseEnter={() => setIsHovered('register')}
              onMouseLeave={() => setIsHovered(null)}
              onClick={() => navigate('/register')}
              className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 transform
                ${isHovered === 'register' 
                  ? 'bg-teal-500 translate-y-1 scale-105' 
                  : 'bg-teal-400 hover:bg-teal-500'} 
                text-white shadow-lg hover:shadow-xl`}
            >
              Register Now
            </button>
          </div>
        ) : (
          <button
            onClick={() => navigate('/home')}
            className="px-8 py-3 bg-purple-500 text-white font-semibold rounded-full hover:bg-teal-400 transition-colors duration-300 shadow-lg hover:shadow-xl"
          >
            Get Started Now
          </button>
        )}
      </div>
    </div>
  );
};

export default AboutUs;
