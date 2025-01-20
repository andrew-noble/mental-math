import { useState } from "react";
import NumberPad from "./NumberPad";

export default function EntryArea({ checkAnswer }) {
  const [currentEntry, setCurrentEntry] = useState("");

  function handleChange(event) {
    setCurrentEntry(event.target.value);
  }

  function handleButtonClick(number) {
    setCurrentEntry((prev) => prev + number);
  }

  function handleBackspace() {
    setCurrentEntry((prev) => prev.slice(0, -1));
  }

  function handleSubmit() {
    checkAnswer(currentEntry);
    setCurrentEntry("");
  }

  return (
    <>
      <input
        autoFocus
        type="text"
        value={currentEntry}
        onChange={handleChange}
        onBlur={(e) => {
          e.target.focus();
        }}
        onKeyDown={(e) => {
          e.key === "Enter" ? handleSubmit() : null;
        }}
      />
      <NumberPad
        handleButtonClick={handleButtonClick}
        handleBackspace={handleBackspace}
        handleSubmit={handleSubmit}
      />
    </>
  );
}
