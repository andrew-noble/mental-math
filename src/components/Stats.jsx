import { useState } from "react";
import questions from "../questions.json";
import QuestionStat from "./QuestionStat";

export default function Stats({ module }) {
  const [activeModule, setActiveModule] = useState(module);

  //get questions for the active module
  const moduleQuestions = questions.filter((q) => q.type === module);

  //fix this later to use ui components like from shadcn rather than manual conditional rendering and state
  return (
    <div>
      {module === "multiplication" ? (
        <>
          {moduleQuestions.map((question) => (
            <QuestionStat key={question.id} question={question} />
          ))}
        </>
      ) : (
        <>
          {moduleQuestions.map((question) => (
            <QuestionStat key={question.id} question={question} />
          ))}
        </>
      )}
    </div>
  );
}
