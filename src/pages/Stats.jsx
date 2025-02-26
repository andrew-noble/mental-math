import questions from "../questions.json";
import QuestionStat from "../components/QuestionStat";
import { getAllItems } from "../services/localStorage";

const questionList = questions.questions;

export default function Stats() {
  const allItems = getAllItems();
  const allStats = allItems.filter((item) => item.key.startsWith("userStats_"));

  //super fugly. this is, in effect, a join between stats and questions
  const stats = allStats.map((stat) => {
    const questionId = stat.key.split("_")[1];
    const data = JSON.parse(stat.value);
    const question = questionList.find((q) => q.id === parseInt(questionId));
    return {
      id: question.id,
      formattedQuestion: `${question.operand1} x ${question.operand2}`,
      total: data.total,
      correct: data.correct,
      averageTime: data.averageTime,
    };
  });

  if (stats.length === 0) {
    return (
      <div>
        <h1 className="flex justify-center">No stats yet</h1>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
        {stats.map((stat) => (
          <QuestionStat
            key={stat.id}
            formattedQuestion={stat.formattedQuestion}
            total={stat.total}
            correct={stat.correct}
            averageTime={stat.averageTime}
          />
        ))}
      </div>
      <h1 className="flex justify-center">
        (Only multiplication stats, for now.)
      </h1>
    </div>
  );
}
