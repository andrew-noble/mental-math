import questions from "../questions.json";
import QuestionStat from "./QuestionStat";
import { getItem } from "../services/localStorage";

const questionList = questions.questions;

export default function Stats() {
  const userStats = getItem("userStats") || {};

  // Only get multiplication questions
  const reducedMultiplicationQuestions = questionList.filter(
    (q) => q.type === "multiplication" && q.id in userStats //only include mult questions that have been answered
  );

  //this is not ideal, refactor needed on data layer so that stats + questions exist closer or get joined via sql
  const reducedStats = reducedMultiplicationQuestions.map((question) => {
    return {
      id: question.id,
      formattedQuestion: `${question.operand1} x ${question.operand2}`,
      total: userStats[question.id]?.total || 0,
      correct: userStats[question.id]?.correct || 0,
      averageTime: userStats[question.id]?.averageTime || 0,
    };
  });

  return (
    <div>
      <h1>Stats (Only Multiplication for now -- other modules coming soon!)</h1>
      {reducedStats.map((question) => (
        <QuestionStat
          key={question.id}
          formattedQuestion={question.formattedQuestion}
          total={question.total}
          correct={question.correct}
          averageTime={question.averageTime}
        />
      ))}
    </div>
  );
}
