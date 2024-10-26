import { auth } from "../config/firebase";
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth";
import { 
  getFirestore, 
  doc, 
  setDoc, 
  getDoc,
  serverTimestamp 
} from 'firebase/firestore';

const db = getFirestore();

// Create user profile in Firestore
async function createUserProfile(user) {
  try {
    const userRef = doc(db, 'users', user.uid);
    await setDoc(userRef, {
      email: user.email,
      createdAt: serverTimestamp(),
      quizStats: {
        totalQuizzes: 0,
        averageScore: 0,
        bestCategory: null,
        totalCorrectAnswers: 0,
        totalWrongAnswers: 0
      },
      achievements: []
    });
    return true;
  } catch (error) {
    console.error('Error creating user profile:', error);
    throw error;
  }
}

// Get user profile from Firestore
export async function getUserProfile(userId) {
  try {
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);
    
    if (userSnap.exists()) {
      return userSnap.data();
    } else {
      throw new Error('User profile not found');
    }
  } catch (error) {
    console.error('Error getting user profile:', error);
    throw error;
  }
}

// Registration handler
export async function handleRegister(email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    
    // Create user profile in Firestore
    await createUserProfile(userCredential.user);
    
    return userCredential.user;
  } catch (error) {
    console.error('Registration error:', error);
    throw { message: error.message };
  }
}

// Login handler
export async function handleLogin(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    
    // Get user profile
    const userProfile = await getUserProfile(userCredential.user.uid);
    
    return {
      user: userCredential.user,
      profile: userProfile
    };
  } catch (error) {
    console.error('Login error:', error);
    throw { message: error.message };
  }
}

// Logout handler
export async function handleLogout() {
  try {
    await signOut(auth);
    return true;
  } catch (error) {
    console.error('Logout error:', error);
    throw { message: error.message };
  }
}

// Update user stats after quiz
export async function updateUserStats(userId, quizResult) {
  try {
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);
    
    if (!userSnap.exists()) {
      throw new Error('User profile not found');
    }
    
    const userData = userSnap.data();
    const currentStats = userData.quizStats || {
      totalQuizzes: 0,
      averageScore: 0,
      totalCorrectAnswers: 0,
      totalWrongAnswers: 0
    };
    
    // Calculate new stats
    const newTotalQuizzes = currentStats.totalQuizzes + 1;
    const newTotalCorrect = currentStats.totalCorrectAnswers + quizResult.trueAnswer;
    const newTotalWrong = currentStats.totalWrongAnswers + quizResult.falseAnswer;
    
    // Calculate new average score
    const newAverageScore = (
      (currentStats.averageScore * currentStats.totalQuizzes + quizResult.score) / 
      newTotalQuizzes
    );
    
    // Update user profile
    await setDoc(userRef, {
      ...userData,
      quizStats: {
        totalQuizzes: newTotalQuizzes,
        averageScore: Math.round(newAverageScore * 100) / 100,
        bestCategory: quizResult.category, // You might want to implement more complex logic here
        totalCorrectAnswers: newTotalCorrect,
        totalWrongAnswers: newTotalWrong,
        lastQuizDate: serverTimestamp()
      }
    }, { merge: true });
    
    return true;
  } catch (error) {
    console.error('Error updating user stats:', error);
    throw error;
  }
}

// Check for achievements and update if necessary
export async function checkAndUpdateAchievements(userId) {
  try {
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);
    
    if (!userSnap.exists()) {
      throw new Error('User profile not found');
    }
    
    const userData = userSnap.data();
    const stats = userData.quizStats;
    const currentAchievements = userData.achievements || [];
    const newAchievements = [];
    
    // Check for achievements
    if (stats.totalQuizzes >= 5 && !currentAchievements.includes('FIVE_QUIZZES')) {
      newAchievements.push('FIVE_QUIZZES');
    }
    
    if (stats.averageScore >= 80 && !currentAchievements.includes('HIGH_SCORER')) {
      newAchievements.push('HIGH_SCORER');
    }
    
    // If new achievements were earned, update the user profile
    if (newAchievements.length > 0) {
      await setDoc(userRef, {
        ...userData,
        achievements: [...currentAchievements, ...newAchievements]
      }, { merge: true });
    }
    
    return newAchievements;
  } catch (error) {
    console.error('Error checking achievements:', error);
    throw error;
  }
}