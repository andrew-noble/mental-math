import { useState } from "react";
import "./App.css";

export default function NumberButton({ number }) {
  const [isClicked, setIsClicked] = useState(false);
  const [count, setCount] = useState(0);
  function handleClick() {
    setIsClicked(!isClicked);
    setCount(count + 1);
  }

  return (
    <>
      <button onClick={() => handleClick()}>{number}</button>
      <p>{count}</p>
    </>
  );
}
