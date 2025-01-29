import { useState, useEffect } from "react";
import NumberPad from "./NumberPad";

export default function EntryArea({ checkAnswer, expectedLength }) {
  const [currentEntry, setCurrentEntry] = useState("");

  useEffect(() => {
    // Add global keyboard listener
    const handleKeyPress = (e) => {
      if (e.key === "Enter") {
        handleSubmit(currentEntry);
      } else {
        handleChange(e);
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    // Clean up
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [currentEntry]); // Don't forget dependencies

  const handleChange = (event) => {
    let newValue;

    switch (event.type) {
      case "click":
        newValue = currentEntry + event.target.value;
        break;
      case "keydown":
        newValue = currentEntry + event.key;
    }

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
