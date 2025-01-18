import "./App.css";

export default function NumberButton({ number, handleButtonClick }) {
  return (
    <>
      <button onClick={() => handleButtonClick(number)}>{number}</button>
    </>
  );
}
