import AccuracyReadout from "./AccuracyReadout";

export default function QuestionStat({
  formattedQuestion,
  total,
  correct,
  averageTime,
}) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-3 mb-2 w-fit">
      <div className="flex items-center gap-3">
        <h3 className="text-sm font-medium min-w-[60px]">
          {formattedQuestion}
        </h3>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-500">{averageTime}s</span>
          <span className="text-gray-400">•</span>
          <span className="text-gray-500">
            {correct}/{total}
          </span>
          <AccuracyReadout correct={correct} total={total} />
        </div>
      </div>
    </div>
  );
}
