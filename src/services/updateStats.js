import { setItem, getItem } from "../services/localStorage";

export function updateUserStats(questionId, isCorrect, time) {
  const storageKey = `userStats_${questionId}`;

  // Get existing stats or initialize defaults
  const questionStats = getItem(storageKey) || {
    total: 0,
    correct: 0,
    averageTime: 0,
  };

  // Calculate new values
  const newTotal = questionStats.total + 1;
  const newCorrect = questionStats.correct + (isCorrect ? 1 : 0);
  const newAverageTime =
    (questionStats.averageTime * questionStats.total + time) / newTotal;

  // Create updated stats
  const updatedStats = {
    total: newTotal,
    correct: newCorrect,
    averageTime: newAverageTime,
  };

  // Save to localStorage
  setItem(storageKey, updatedStats);

  return updatedStats; // Return updated stats if needed
}
