import { useState } from "react";
import questions from "../questions.json";
import NumberPad from "./NumberPad";
import PromptBar from "./PromptBar";
import "./App.css";

export default function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [questionFormat, setQuestionFormat] = useState(0);

  function handleSubmit(answer) {
    switch (questionFormat) {
      case 0:
        isCorrect = answer === questions[currentQuestion].operand1;
        break;
      case 1:
        isCorrect = answer === questions[currentQuestion].operand2;
        break;
      case 2:
        isCorrect = answer === questions[currentQuestion].result;
        break;
    }

    isCorrect ? console.log("correct") : console.log("incorrect");

    //reset question
    setCurrentQuestion(Math.floor(Math.random() * questions.length));
    setQuestionFormat(Math.floor(Math.random() * 3));
  }

  return (
    <>
      <PromptBar
        currentQuestion={currentQuestion}
        questionFormat={questionFormat}
      />
      <EntryArea handleSubmit={handleSubmit} />
    </>
  );
}
