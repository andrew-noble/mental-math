import { useState } from "react";
import questions from "../questions.json";
import NumberPad from "./NumberPad";
import EntryBar from "./EntryBar";
import Prompt from "./Prompt";
import "./App.css";

export default function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [currentEntry, setCurrentEntry] = useState("");

  function handleEntry(number) {
    setCurrentEntry((prev) => prev + number);
  }

  if (currentEntry.length == questions[currentQuestion].answer.length) {
    handleAnswer();
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
      <NumberPad handleEntry={handleEntry} />
    </>
  );
}
