import { useState } from "react";
import questionsMt from "../questions-mt.json";
import questionsPct from "../questions-pct.json";
import QuestionStat from "./QuestionStat";

export default function Stats(module) {
  const [activeModule, setActiveModule] = useState(module);

  //fix this later to use ui components like from shadcn rather than manual conditional rendering
  return (
    <div>
      {module === "multiplication" ? (
        <>
          <button onClick={() => setActiveModule("multiplication")}>
            Multiplication
          </button>
          {questionsMt.map((question) => (
            <QuestionStat key={question.id} question={question} />
          ))}
        </>
      ) : (
        <>
          <button onClick={() => setActiveModule("percentages")}>
            Percentages
          </button>
          {questionsPct.map((question) => (
            <QuestionStat key={question.id} question={question} />
          ))}
        </>
      )}
    </div>
  );
}
