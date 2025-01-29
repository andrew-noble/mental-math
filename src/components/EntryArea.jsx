import { useState } from "react";
import NumberPad from "./NumberPad";

export default function EntryArea({ checkAnswer, expectedLength }) {
  const [currentEntry, setCurrentEntry] = useState("");

  const handleChange = (event) => {
    const newValue = event.target.value;
    setCurrentEntry(newValue);

    if (newValue.length === expectedLength) {
      handleSubmit(newValue);
    }
  };

  const handleBackspace = () => {
    setCurrentEntry((prev) => prev.slice(0, -1));
  };

  const handleSubmit = (currentEntry) => {
    checkAnswer(currentEntry);
    setCurrentEntry("");
  };

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
          e.key === "Enter" ? handleSubmit(currentEntry) : null;
        }}
        inputMode="none"
      />
      <NumberPad
        handleButtonClick={handleChange}
        handleBackspace={handleBackspace}
        handleSubmit={handleSubmit}
      />
    </>
  );
}
