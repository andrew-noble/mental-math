import { useState } from "react";
import getQuestion from "./services/getQuestion";
import EntryArea from "./components/EntryArea";
import PromptBar from "./components/PromptBar";

export default function App() {
  const [question, setQuestion] = useState(getQuestion());
  const [showCorrectMessage, setShowCorrectMessage] = useState(false);
  const [showIncorrectMessage, setShowIncorrectMessage] = useState(false);
  const [score, setScore] = useState(0);

  function checkAnswer(answer) {
    answer = parseInt(answer);

    if (answer === question.expectedAnswer) {
      setScore((prev) => prev + 1);
      setShowCorrectMessage(true);
      setTimeout(() => setShowCorrectMessage(false), 500);
    } else {
      console.log("incorrect");
      setShowIncorrectMessage(true);
      setTimeout(() => setShowIncorrectMessage(false), 500);
    }
    //reset question
    setQuestion(getQuestion());
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {showCorrectMessage ? (
        <p className="text-lg animate-floatUp">Correct! 🎉</p>
      ) : null}
      {showIncorrectMessage ? (
        <p className="text-lg animate-floatUp">Incorrect 😥</p>
      ) : null}
      <PromptBar prompt={question.prompt} />
      <EntryArea checkAnswer={checkAnswer} />
      <div className="bg-slate-300 text-black p-2 rounded">
        <h3>Score: {score}</h3>
      </div>
    </div>
  );
}
