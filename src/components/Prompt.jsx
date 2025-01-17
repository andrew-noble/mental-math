import questions from "../questions.json";

export default function Prompt({ currentQuestion }) {
  const question = questions[currentQuestion];

  return (
    <h1>
      {question.factor_1} x {question.factor_2}
    </h1>
  );
}
