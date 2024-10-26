import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Trophy, 
  Target, 
  Clock, 
  Brain, 
  ChartBar, 
  History,
  Award,
  Percent
} from 'lucide-react';
import { getUserStats } from '../api/firebase-quiz-service';
import { auth } from '../api/firebase';

const Dashboard = () => {
  const [userData, setUserData] = useState({
    name: "",
    totalQuizzes: 0,
    averageScore: 0,
    bestCategory: "",
    recentQuizzes: [],
    achievements: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadUserStats = async () => {
      try {
        const userId = auth.currentUser?.uid;
        if (!userId) throw new Error('User not authenticated');

        const stats = await getUserStats(userId);

        // Calculate achievements
        const achievements = [];
        if (stats.totalQuizzes >= 5) {
          achievements.push({
            id: 1,
            title: "Quick Learner",
            description: "Completed 5 quizzes",
            icon: Brain
          });
        }
        if (stats.recentQuizzes.some(quiz => quiz.score === 100)) {
          achievements.push({
            id: 2,
            title: "Perfect Score",
            description: "Achieved 100% in a quiz",
            icon: Award
          });
        }

        setUserData({
          name: auth.currentUser?.email?.split('@')[0] || "User",
          ...stats,
          achievements
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadUserStats();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-gray-800 rounded-xl p-6 mb-6 shadow-lg">
          <h1 className="text-3xl font-bold">
            <span className="text-purple-500">Welcome back,</span>{' '}
            <span className="text-teal-400">{userData.name}</span>
          </h1>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <StatCard 
            icon={Trophy} 
            title="Total Quizzes" 
            value={userData.totalQuizzes} 
          />
          <StatCard 
            icon={Percent} 
            title="Average Score" 
            value={`${userData.averageScore}%`} 
          />
          <StatCard 
            icon={ChartBar} 
            title="Best Category" 
            value={userData.bestCategory} 
          />
          <StatCard 
            icon={Target} 
            title="Next Level" 
            value="Pro Quizzer" 
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Quizzes */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                  <History size={20} />
                  Recent Quizzes
                </h2>
                <Link 
                  to="/home" 
                  className="text-purple-500 hover:text-purple-400 text-sm"
                >
                  Take New Quiz
                </Link>
              </div>
              <div className="space-y-4">
                {userData.recentQuizzes.map((quiz) => (
                  <div 
                    key={quiz.id}
                    className="bg-gray-700 rounded-lg p-4 flex justify-between items-center"
                  >
                    <div>
                      <h3 className="text-white font-medium">{quiz.category}</h3>
                      <p className="text-gray-400 text-sm">
                        {new Date(quiz.date).toLocaleDateString()} • {quiz.difficulty}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-teal-400">{quiz.score}%</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Achievements */}
          <div>
            <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
              <h2 className="text-xl font-semibold text-white flex items-center gap-2 mb-4">
                <Award size={20} />
                Achievements
              </h2>
              <div className="space-y-4">
                {userData.achievements.map((achievement) => {
                  const IconComponent = achievement.icon;
                  return (
                    <div 
                      key={achievement.id}
                      className="bg-gray-700 rounded-lg p-4 flex items-center gap-4"
                    >
                      <div className="bg-purple-500 p-2 rounded-lg">
                        <IconComponent size={20} className="text-white" />
                      </div>
                      <div>
                        <h3 className="text-white font-medium">{achievement.title}</h3>
                        <p className="text-gray-400 text-sm">{achievement.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// StatCard Component
const StatCard = ({ icon: Icon, title, value }) => (
  <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
    <div className="flex items-center gap-4">
      <div className="bg-purple-500 p-3 rounded-lg">
        <Icon size={24} className="text-white" />
      </div>
      <div>
        <p className="text-gray-400 text-sm">{title}</p>
        <p className="text-2xl font-bold text-white">{value}</p>
      </div>
    </div>
  </div>
);

export default Dashboard;
