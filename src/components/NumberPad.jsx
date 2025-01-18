import "./App.css";

export default function NumberPad({
  handleButtonClick,
  handleBackspace,
  handleSubmit,
}) {
  return (
    <>
      {Array.from({ length: 10 }, (_, i) => (
        <button key={i} onClick={() => handleButtonClick(i)}>
          {i}
        </button>
      ))}
      <button onClick={handleBackspace}>Backspace</button>
      <button onClick={handleSubmit}>Submit</button>
    </>
  );
}
