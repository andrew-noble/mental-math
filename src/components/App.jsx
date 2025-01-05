import { useState } from "react";
import NumberButton from "./NumberButton";
import "./App.css";

export default function App() {
  return (
    <>
      <NumberButton number={1} />
      <NumberButton number={2} />
    </>
  );
}
