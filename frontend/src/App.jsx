import { useState } from "react";
import getQuestion from "./services/getQuestion";
import EntryArea from "./components/EntryArea";
import PromptBar from "./components/PromptBar";

export default function App() {
  const [question, setQuestion] = useState(getQuestion());
  const [feedback, setFeedback] = useState(null);
  const [score, setScore] = useState(0);

  function checkAnswer(answer) {
    answer = parseInt(answer);

    if (answer === question.expectedAnswer) {
      setScore((prev) => prev + 1);
      setFeedback({ type: "correct", message: "Correct! 🎉", color: "green" });
    } else {
      setFeedback({ type: "incorrect", message: "Incorrect 😥", color: "red" });
    }
    //reset question
    setQuestion(getQuestion());
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen p-5">
      {feedback ? (
        <div
          className={`text-lg animate-floatUp rounded p-2 bg-${feedback.color}-400`}
          onAnimationEnd={() => setFeedback(null)}
        >
          <p>{feedback.message}</p>
        </div>
      ) : null}

      <PromptBar prompt={question.prompt} />
      <EntryArea checkAnswer={checkAnswer} />
      <div className="bg-slate-300 text-black p-2 rounded my-3">
        <h3>Score: {score}</h3>
      </div>
    </div>
  );
}
