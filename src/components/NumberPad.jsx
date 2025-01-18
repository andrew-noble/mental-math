import NumberButton from "./NumberButton";
import "./App.css";

export default function NumberPad({ handleEntry }) {
  return (
    <>
      <NumberButton number={1} handleEntry={handleEntry} />
      <NumberButton number={2} handleEntry={handleEntry} />
      <NumberButton number={3} handleEntry={handleEntry} />
      <NumberButton number={4} handleEntry={handleEntry} />
      <NumberButton number={5} handleEntry={handleEntry} />
      <NumberButton number={6} handleEntry={handleEntry} />
      <NumberButton number={7} handleEntry={handleEntry} />
      <NumberButton number={8} handleEntry={handleEntry} />
      <NumberButton number={9} handleEntry={handleEntry} />
      <NumberButton number={0} handleEntry={handleEntry} />
    </>
  );
}
