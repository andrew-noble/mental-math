import { setItem, getItem } from "../services/localStorage";

export function updateUserStats(questionId, isCorrect, time) {
  let userStats = getItem("userStats");

  if (!userStats) {
    userStats = {};
  }

  if (!userStats[questionId]) {
    userStats[questionId] = { total: 0, correct: 0, averageTime: 0 };
  }

  const oldAverageTime = userStats[questionId].averageTime;
  const oldTotal = userStats[questionId].total;
  const oldCorrect = userStats[questionId].correct;

  const newAverageTime = (oldAverageTime * oldTotal + time) / (oldTotal + 1);
  const newTotal = oldTotal + 1;
  const newCorrect = oldCorrect + (isCorrect ? 1 : 0);

  userStats = {
    ...userStats,
    [questionId]: {
      total: newTotal,
      correct: newCorrect,
      averageTime: newAverageTime,
    },
  };

  setItem("userStats", userStats);
}
