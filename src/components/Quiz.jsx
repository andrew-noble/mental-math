import { useState } from "react";
import getQuestion from "../services/getQuestion";
import EntryArea from "./EntryArea";
import PromptBar from "./PromptBar";
import { updateUserStats } from "../services/updateStats";
import FeedbackMessage from "./FeedbackMessage";
import Scoreboard from "./Scoreboard";

export default function Quiz({ module }) {
  const [question, setQuestion] = useState(getQuestion(module));
  const [feedback, setFeedback] = useState(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);

  const checkAnswer = (answer) => {
    answer = parseInt(answer);
    let isCorrect = answer === question.expectedAnswer;

    updateUserStats(question.id, isCorrect);

    if (isCorrect) {
      // console.log("correct");
      setScore((prev) => prev + 1);
      setStreak((prev) => prev + 1);
      setFeedback({ type: "correct", message: "Correct! 🎉", color: "green" });
    } else {
      // console.log("incorrect");
      setStreak(0);
      setFeedback({ type: "incorrect", message: "Incorrect 😥", color: "red" });
    }
    //reset question
    setQuestion(getQuestion(module));
  };

  const handleFeedbackAnimationEnd = () => {
    setFeedback(null);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen p-3">
      <FeedbackMessage
        feedback={feedback}
        onAnimationEnd={handleFeedbackAnimationEnd}
      />

      <PromptBar prompt={question.prompt} />

      <EntryArea
        checkAnswer={checkAnswer}
        expectedLength={question.expectedAnswer.toString().length}
      />

      <Scoreboard score={score} streak={streak} />
    </div>
  );
}
