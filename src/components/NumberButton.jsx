import { useState } from "react";
import "./App.css";

export default function NumberButton({ number, handleNumberClick }) {
  return (
    <>
      <button onClick={() => handleNumberClick(number)}>{number}</button>
    </>
  );
}
