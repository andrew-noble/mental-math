import { useState } from "react";
import getQuestion from "../services/getQuestion";
import EntryArea from "./EntryArea";
import PromptBar from "./PromptBar";
import "./App.css";

export default function App() {
  const [question, setQuestion] = useState(getQuestion());

  function checkAnswer(answer) {
    answer = parseInt(answer);

    answer === question.expectedAnswer
      ? console.log("correct")
      : console.log("incorrect");

    //reset question
    setQuestion(getQuestion());
  }

  return (
    <>
      <PromptBar prompt={question.prompt} />
      <EntryArea checkAnswer={checkAnswer} />
    </>
  );
}
