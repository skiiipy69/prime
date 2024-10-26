import { getFirestore, collection, addDoc, query, where, getDocs, orderBy, limit } from 'firebase/firestore';
import { auth } from './firebase';

const db = getFirestore();

export const saveQuizResult = async (quizData) => {
  try {
    const userId = auth.currentUser?.uid;
    if (!userId) throw new Error('User not authenticated');

    const quizResult = {
      userId,
      category: quizData.category || 'General',
      score: quizData.score,
      correctAnswers: quizData.trueAnswer,
      wrongAnswers: quizData.falseAnswer,
      difficulty: quizData.difficulty || 'medium',
      timestamp: new Date().toISOString(),
    };

    const docRef = await addDoc(collection(db, 'quizResults'), quizResult);
    return docRef.id;
  } catch (error) {
    console.error('Error saving quiz result:', error);
    throw error;
  }
};

export const getUserStats = async (userId) => {
  try {
    if (!userId) throw new Error('User ID is required');

    const resultsRef = collection(db, 'quizResults');
    const userResultsQuery = query(
      resultsRef,
      where('userId', '==', userId),
      orderBy('timestamp', 'desc')
    );

    const querySnapshot = await getDocs(userResultsQuery);
    const results = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    // Calculate statistics
    const totalQuizzes = results.length;
    const averageScore = results.length > 0 
      ? results.reduce((acc, curr) => acc + curr.score, 0) / totalQuizzes 
      : 0;

    // Get category scores
    const categoryScores = results.reduce((acc, curr) => {
      if (!acc[curr.category]) {
        acc[curr.category] = {
          total: 0,
          count: 0
        };
      }
      acc[curr.category].total += curr.score;
      acc[curr.category].count += 1;
      return acc;
    }, {});

    // Find best category
    let bestCategory = '';
    let bestAverage = 0;
    Object.entries(categoryScores).forEach(([category, data]) => {
      const average = data.total / data.count;
      if (average > bestAverage) {
        bestAverage = average;
        bestCategory = category;
      }
    });

    return {
      totalQuizzes,
      averageScore: Math.round(averageScore),
      bestCategory,
      recentQuizzes: results.slice(0, 3).map(result => ({
        id: result.id,
        category: result.category,
        score: result.score,
        date: result.timestamp,
        difficulty: result.difficulty
      }))
    };
  } catch (error) {
    console.error('Error getting user stats:', error);
    throw error;
  }
};