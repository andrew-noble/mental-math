export default function QuestionStat({
  formattedQuestion,
  total,
  correct,
  averageTime,
}) {
  const accuracyPct = (correct / total) * 100;

  return (
    <div>
      <p>{formattedQuestion}</p>
      <p>Accuracy (correct/total): {accuracyPct.toFixed(2)}%</p>
      <p>Average time: {averageTime}s</p>
    </div>
  );
}
