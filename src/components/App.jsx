import { useState } from "react";
import questions from "../questions.json";
import NumberPad from "./NumberPad";
import EntryBar from "./EntryBar";
import Prompt from "./Prompt";
import "./App.css";

export default function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [currentEntry, setCurrentEntry] = useState("");

  function handleNumberClick(number) {
    setCurrentEntry(currentEntry + number);
    console.log(currentEntry, questions[currentQuestion].answer);

    if (currentEntry.length == questions[currentQuestion].answer.length) {
      handleAnswer();
    }
  }

  function handleAnswer() {
    if (currentEntry === questions[currentQuestion].answer) {
      console.log("correct");
      setCurrentEntry("");
      setCurrentQuestion(Math.floor(Math.random() * questions.length));
    } else {
      console.log("incorrect");
      setCurrentEntry("");
      setCurrentQuestion(Math.floor(Math.random() * questions.length));
    }
  }

  return (
    <>
      <Prompt currentQuestion={currentQuestion} />
      <EntryBar currentEntry={currentEntry} />
      <NumberPad handleNumberClick={handleNumberClick} />
    </>
  );
}
