import { useState } from "react";
import getQuestion from "../services/getQuestion";
import EntryArea from "./EntryArea";
import PromptBar from "./PromptBar";
import "./App.css";

export default function App() {
  const [question, setQuestion] = useState(getQuestion());
  const [showCorrectMessage, setShowCorrectMessage] = useState(false);
  const [showIncorrectMessage, setShowIncorrectMessage] = useState(false);

  function checkAnswer(answer) {
    answer = parseInt(answer);

    if (answer === question.expectedAnswer) {
      console.log("correct");
      setShowCorrectMessage(true);
      setTimeout(() => setShowCorrectMessage(false), 250);
    } else {
      console.log("incorrect");
      setShowIncorrectMessage(true);
      setTimeout(() => setShowIncorrectMessage(false), 250);
    }
    //reset question
    setQuestion(getQuestion());
  }

  return (
    <>
      <PromptBar prompt={question.prompt} />
      <EntryArea checkAnswer={checkAnswer} />
      {showCorrectMessage ? <h3>Correct! 🎉</h3> : null}
      {showIncorrectMessage ? <h3>Incorrect 😥</h3> : null}
    </>
  );
}
