import { useState } from "react";
import "./App.css";

export default function NumberButton({ number, handleEntry }) {
  return (
    <>
      <button onClick={() => handleEntry(number)}>{number}</button>
    </>
  );
}
