import { useState } from "react";
import questions from "../questions.json";
import NumberPad from "./NumberPad";
import PromptBar from "./PromptBar";
import "./App.css";

export default function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [questionFormat, setQuestionFormat] = useState(0);
  const [currentEntry, setCurrentEntry] = useState("");
  const [score, setScore] = useState(0);

  function handleEntry(number) {
    setCurrentEntry((prev) => prev + number);
  }

  function handleAnswer() {
    let isCorrect = false;
    switch (questionFormat) {
      case 0:
        isCorrect = currentEntry === questions[currentQuestion].operand1;
        break;
      case 1:
        isCorrect = currentEntry === questions[currentQuestion].operand2;
        break;
      case 2:
        isCorrect = currentEntry === questions[currentQuestion].result;
        break;
    }

    isCorrect ? setScore((prev) => prev + 1) : null;

    //reset
    setCurrentEntry("");
    setCurrentQuestion(Math.floor(Math.random() * questions.length));
    setQuestionFormat(Math.floor(Math.random() * 3));
  }

  if (currentEntry.length == questions[currentQuestion].result.length) {
    handleAnswer();
  }

  return (
    <>
      <PromptBar
        currentQuestion={currentQuestion}
        questionFormat={questionFormat}
        currentEntry={currentEntry}
      />
      <NumberPad handleEntry={handleEntry} />
    </>
  );
}
