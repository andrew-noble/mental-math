export default function FeedbackMessage({ feedback, onAnimationEnd }) {
  return (
    <div className="min-h-[50px]">
      {feedback && (
        <div
          className={`animate-floatUp rounded p-2 bg-${feedback.color}-300 h-[50px]`}
          onAnimationEnd={onAnimationEnd}
        >
          <p>{feedback.message}</p>
        </div>
      )}
    </div>
  );
}
