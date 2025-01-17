import NumberButton from "./NumberButton";
import "./App.css";

export default function NumberPad({ handleNumberClick }) {
  return (
    <>
      <NumberButton number={1} handleNumberClick={handleNumberClick} />
      <NumberButton number={2} handleNumberClick={handleNumberClick} />
      <NumberButton number={3} handleNumberClick={handleNumberClick} />
      <NumberButton number={4} handleNumberClick={handleNumberClick} />
      <NumberButton number={5} handleNumberClick={handleNumberClick} />
      <NumberButton number={6} handleNumberClick={handleNumberClick} />
      <NumberButton number={7} handleNumberClick={handleNumberClick} />
      <NumberButton number={8} handleNumberClick={handleNumberClick} />
      <NumberButton number={9} handleNumberClick={handleNumberClick} />
      <NumberButton number={0} handleNumberClick={handleNumberClick} />
    </>
  );
}
