export default function FeedbackMessage({ feedback, onAnimationEnd }) {
  return (
    <div className="min-h-[50px]">
      {feedback && (
        <div
          className={`animate-floatUp rounded p-2 bg-${feedback.color}-300 h-[30px]`}
          onAnimationEnd={onAnimationEnd}
        >
          <p>{feedback.message}</p>
          {feedback.time && <p>{feedback.time}ms</p>}
        </div>
      )}
    </div>
  );
}
