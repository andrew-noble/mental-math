import { useState } from "react";
import NumberPad from "./NumberPad";

export default function EntryArea({ checkAnswer, expectedLength }) {
  const [currentEntry, setCurrentEntry] = useState("");

  const handleChange = (event) => {
    const newValue = event.target.value;
    setCurrentEntry(newValue);

    if (newValue.length === expectedLength) {
      setTimeout(() => {
        //short delay so user can see their correct answer
        handleSubmit(newValue);
      }, 150);
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
      <div className="mt-2 flex gap-2 justify-center">
        {Array.from({ length: expectedLength }).map((_, i) => (
          <div
            key={i}
            className={`
              w-10 h-10 
              border-2 
              flex items-center justify-center
              font-bold
              ${
                i < currentEntry.length
                  ? "border-blue-500 text-blue-500"
                  : "border-gray-300"
              }
            `}
          >
            {currentEntry[i]}
          </div>
        ))}
      </div>
      <NumberPad
        handleButtonClick={handleChange}
        handleBackspace={handleBackspace}
        handleSubmit={handleSubmit}
      />
    </>
  );
}
