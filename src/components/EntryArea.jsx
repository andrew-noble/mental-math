import { useState, useEffect } from "react";
import NumberPad from "./NumberPad";

export default function EntryArea({ checkAnswer, expectedLength }) {
  const [currentEntry, setCurrentEntry] = useState("");

  // keyboard handler attached to the window
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "Enter") return handleEnter(currentEntry);
      if (e.key === "Backspace") return handleBackspace();
      if (/^[0-9.]$/.test(e.key)) return addDigit(e.key);
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [currentEntry, expectedLength]);

  //click handler
  const handleButtonClick = (event) => {
    if (event.target.value === "Enter") return handleEnter(currentEntry);
    if (event.target.value === "Backspace") return handleBackspace();
    return addDigit(event.target.value);
  };

  // unified digit handler (confluence of keyboard and number pad input streams)
  const addDigit = (digit) => {
    setCurrentEntry((prev) => {
      if (digit === "." && prev.includes(".")) return prev; // prevent multiple decimals

      const newValue = prev + digit;

      // Auto-submit when length matches
      if (newValue.length === expectedLength) {
        setTimeout(() => handleEnter(newValue), 150);
      }

      return newValue;
    });
  };

  const handleBackspace = () => setCurrentEntry((prev) => prev.slice(0, -1));

  const handleEnter = (value) => {
    checkAnswer(value);
    setCurrentEntry("");
  };

  return (
    <>
      <div className="m-2 flex gap-2 justify-center">
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
            {currentEntry[i] || ""}
          </div>
        ))}
      </div>
      <NumberPad handleButtonClick={handleButtonClick} />
    </>
  );
}
