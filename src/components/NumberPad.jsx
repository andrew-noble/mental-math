import NumberButton from "./NumberButton";
import "./App.css";

export default function NumberPad({
  handleButtonClick,
  handleBackspace,
  handleSubmit,
}) {
  return (
    <>
      <NumberButton number={1} handleButtonClick={handleButtonClick} />
      <NumberButton number={2} handleButtonClick={handleButtonClick} />
      <NumberButton number={3} handleButtonClick={handleButtonClick} />
      <NumberButton number={4} handleButtonClick={handleButtonClick} />
      <NumberButton number={5} handleButtonClick={handleButtonClick} />
      <NumberButton number={6} handleButtonClick={handleButtonClick} />
      <NumberButton number={7} handleButtonClick={handleButtonClick} />
      <NumberButton number={8} handleButtonClick={handleButtonClick} />
      <NumberButton number={9} handleButtonClick={handleButtonClick} />
      <NumberButton number={0} handleButtonClick={handleButtonClick} />
      <button onClick={handleBackspace}>Backspace</button>
      <button onClick={handleSubmit}>Submit</button>
    </>
  );
}
