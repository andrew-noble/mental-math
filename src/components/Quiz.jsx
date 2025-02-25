import { useState, useRef, useEffect } from "react";
import getQuestion from "../services/getQuestion";
import EntryArea from "./EntryArea";
import PromptBar from "./PromptBar";
import { updateUserStats } from "../services/updateStats";
import FeedbackMessage from "./FeedbackMessage";
import Scoreboard from "./Scoreboard";
import Stopwatch from "../services/stopwatch";
import StartModal from "./StartModal";

export default function Quiz({ module }) {
  const [isStarted, setIsStarted] = useState(false);
  const [question, setQuestion] = useState(getQuestion(module));
  const [feedback, setFeedback] = useState(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);

  //set up stopwatch (useRef is used to persist the stopwatch instance across renders)
  const stopwatchRef = useRef(null);

  //this useEffect is to ensure the stopwatch is stopped when user navigates away from the quiz
  useEffect(() => {
    stopwatchRef.current = new Stopwatch();

    return () => stopwatchRef.current.stop();
  }, []);

  const handleStart = () => {
    setIsStarted(true);
    stopwatchRef.current.start();
    console.log("Timer started");
  };

  const checkAnswer = (answer) => {
    answer = parseInt(answer);
    let isCorrect = answer === question.expectedAnswer;

    const time = stopwatchRef.current.formatTime(
      stopwatchRef.current.getElapsedTime()
    );
    updateUserStats(question.id, isCorrect, time);

    if (isCorrect) {
      // console.log("correct");
      setScore((prev) => prev + 1);
      setStreak((prev) => prev + 1);
      setFeedback({
        type: "correct",
        message: "Correct! 🎉",
        color: "green",
        time: time,
      });
    } else {
      // console.log("incorrect");
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
    <div className="flex flex-col items-center justify-center h-full p-3">
      <StartModal isVisible={!isStarted} onClose={handleStart} />
      <div
        className={`transition-filter duration-300 ${
          !isStarted ? "filter blur-sm" : ""
        } flex flex-col items-center justify-center`}
      >
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
