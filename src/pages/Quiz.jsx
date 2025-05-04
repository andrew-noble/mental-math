import { useState, useRef, useEffect } from "react";
import getQuestion from "../services/getQuestion";
import EntryArea from "../components/EntryArea";
import PromptBar from "../components/PromptBar";
import { updateUserStats } from "../services/updateStats";
import FeedbackMessage from "../components/FeedbackMessage";
import Scoreboard from "../components/Scoreboard";
import Stopwatch from "../services/stopwatch";

export default function Quiz({ module }) {
  const [question, setQuestion] = useState(getQuestion(module));
  const [feedback, setFeedback] = useState(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);

  //set up stopwatch (useRef is used to persist the stopwatch instance across renders)
  const stopwatchRef = useRef(null);

  //this useEffect is to ensure the stopwatch is stopped when user navigates away from the quiz
  useEffect(() => {
    stopwatchRef.current = new Stopwatch();
    stopwatchRef.current.start();

    return () => stopwatchRef.current.stop();
  }, []);

  const checkAnswer = (answer) => {
    answer = parseInt(answer);
    let isCorrect = answer === question.expectedAnswer;

    let time = stopwatchRef.current.formatTimeToString(
      stopwatchRef.current.getElapsedTime()
    );

    time > 10 ? (time = 5) : time; //clamp time to 5 seconds bc people prolly idle

    updateUserStats(question.id, isCorrect, time);

    if (isCorrect) {
      setScore((prev) => prev + 1);
      setStreak((prev) => prev + 1);
      setFeedback({
        type: "correct",
        message: "Correct! 🎉",
        color: "green",
        time: time,
      });
    } else {
      setStreak(0);
      setFeedback({
        type: "incorrect",
        message: "Incorrect 😥",
        color: "red",
        time: null,
      });
    }
    //reset question
    setQuestion(getQuestion(module));
    stopwatchRef.current.restart();
  };

  const handleFeedbackAnimationEnd = () => {
    document.querySelector(".animate-floatUp").style.opacity = 0; //hack to prevent animation flicker
    setFeedback(null);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="flex flex-col items-center justify-center">
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
    </div>
  );
}
