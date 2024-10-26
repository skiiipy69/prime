import useQuestionStore from "../../store/zustand";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import AnimateProvider from "../../components/AnimateProvider/AnimateProvider";
import Question from "../../components/Questions/Questions";
import { updateUserStats, checkAndUpdateAchievements } from "../../api/firebase";

function Success() {
  const {
    trueAnswer,
    falseAnswer,
    resetQuestion,
    setTimeStamp,
    question: allQuestion,
    user, // Assuming you store user data in your store
    category // Assuming you store the current quiz category
  } = useQuestionStore();
  
  const navigate = useNavigate();
  const [achievements, setAchievements] = useState([]);
  const [saving, setSaving] = useState(true);
  
  const score = (trueAnswer * 100) / 5;
  const indxColor =
    score >= 80 ? "#10b981" : score >= 60 ? "#F59E0B" : "#dc2626";

  useEffect(() => {
    const saveQuizResults = async () => {
      try {
        // Save quiz results and update user stats
        await updateUserStats(user.id, {
          score,
          trueAnswer,
          falseAnswer,
          category: category || 'General'
        });

        // Check for new achievements
        const newAchievements = await checkAndUpdateAchievements(user.id);
        if (newAchievements.length > 0) {
          setAchievements(newAchievements);
        }
      } catch (error) {
        console.error('Error saving quiz results:', error);
      } finally {
        setSaving(false);
        setTimeStamp(0);
      }
    };

    saveQuizResults();
  }, []);

  const handleClick = () => {
    resetQuestion();
    navigate("/dashboard");
  };

  return (
    <AnimateProvider className="flex flex-col space-y-10 md:max-w-xl md:mx-auto">
      <h3 className="text-lg text-center text-neutral-900 font-bold md:text-xl">
        Your Final score is
      </h3>

      <h1
        style={{
          background: indxColor,
        }}
        className={`text-5xl font-bold mx-auto p-5 rounded-full bg-red-500 md:text-6xl text-neutral-100`}
      >
        {score}
      </h1>

      <div className="text-xs md:text-sm text-neutral-600 font-medium flex flex-col space-y-1">
        <p className="flex justify-between">
          Correct Answer <span className="text-green-600">{trueAnswer}</span>
        </p>
        <p className="flex justify-between">
          Wrong Answer <span className="text-red-600">{falseAnswer}</span>
        </p>
        <p className="flex justify-between">
          Answer Submitted{" "}
          <span className="text-purple-600">{trueAnswer + falseAnswer}</span>
        </p>
      </div>

      {/* New Achievements Section */}
      {achievements.length > 0 && (
        <div className="bg-purple-100 rounded-lg p-4">
          <h4 className="text-purple-800 font-semibold mb-2">
            🎉 New Achievements Unlocked!
          </h4>
          <ul className="space-y-1">
            {achievements.map((achievement, index) => (
              <li key={index} className="text-purple-600 text-sm">
                {achievement}
              </li>
            ))}
          </ul>
        </div>
      )}

      <button
        onClick={handleClick}
        disabled={saving}
        className="grid place-items-center text-neutral-50 bg-purple-500 rounded-full py-2 hover:text-neutral-50 text-sm font-semibold disabled:bg-purple-300"
      >
        {saving ? "Saving results..." : "Back to dashboard"}
      </button>

      {/* Summary */}
      <h3 className="text-center text-neutral-600 font-semibold md:text-lg pt-[100px]">
        Answer
      </h3>
      {allQuestion.map((question, i) => (
        <Question
          key={i}
          singleQuestion={question}
          id={i + 1}
          summary={true}
          trueAnswer={question.correct_answer}
        />
      ))}
    </AnimateProvider>
  );
}

export default Success;