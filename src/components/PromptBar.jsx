import questions from "../questions.json";

export default function PromptBar({ currentQuestion, questionFormat }) {
  const question = questions[currentQuestion];

  if (questionFormat == 0) {
    return (
      <h1>
        {question.operand1} x {question.operand2} = __
      </h1>
    );
  } else if (questionFormat == 1) {
    return (
      <h1>
        {question.operand1} x __ = {question.result}
      </h1>
    );
  } else if (questionFormat == 2) {
    return (
      <h1>
        __ x {question.operand2} = {question.result}
      </h1>
    );
  }
}
