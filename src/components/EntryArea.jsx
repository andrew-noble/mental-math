import { useState } from "react";
import NumberPad from "./NumberPad";

export default function EntryArea({ handleSubmit }) {
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

  return (
    <>
      <form onSubmit={() => handleSubmit(currentEntry)}>
        <input type="text" value={currentEntry} onChange={handleChange} />
      </form>
      <NumberPad
        handleButtonClick={handleButtonClick}
        handleBackspace={handleBackspace}
        handleSubmit={() => handleSubmit(currentEntry)}
      />
    </>
  );
}
