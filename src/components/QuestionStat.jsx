export default function QuestionStat({
  formattedQuestion,
  total,
  correct,
  averageTime,
}) {
  const accuracyPct = ((correct / total) * 100).toFixed(0);

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4 w-fit min-w-[300px]">
      <h3 className="text-lg font-semibold mb-3">{formattedQuestion}</h3>
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Accuracy</span>
          <span className="font-medium">{accuracyPct}%</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Correct/Total</span>
          <span className="font-medium">
            {correct}/{total}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Average Time</span>
          <span className="font-medium">{averageTime}s</span>
        </div>
      </div>
    </div>
  );
}
