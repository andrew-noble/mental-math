import { setItem, getItem } from "../services/localStorage";

export function updateUserStats(questionId, isCorrect) {
  let userStats = getItem("userStats");

  if (!userStats) {
    userStats = {};
  }

  if (!userStats[questionId]) {
    userStats[questionId] = { attempts: 0, correct: 0 };
  }

  userStats = {
    ...userStats,
    [questionId]: {
      attempts: userStats[questionId].attempts + 1,
      correct: userStats[questionId].correct + (isCorrect ? 1 : 0),
    },
  };
  setItem("userStats", userStats);
}
