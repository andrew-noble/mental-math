export default function QuestionStat({
  question,
  total,
  correct,
  averageTime,
}) {
  const accuracyPct = (correct / total) * 100;

  return (
    <div>
      <p>{question.id}</p>
      <p>Accuracy (correct/total): {accuracyPct.toFixed(2)}%</p>
      <p>Average time: {averageTime}s</p>
    </div>
  );
}
