export default function AccuracyReadout({ correct, total }) {
  const radius = 30;

  return (
    <svg>
      {/* red background */}
      <circle cx="50" cy="50" r={radius} fill="rgba(239, 68, 68, 0.7)" />
      {/* green pie slice */}
      <circle
        cx="50"
        cy="50"
        r={radius / 2}
        fill="transparent"
        strokeWidth={radius}
        stroke="rgba(34, 197, 94, 0.7)"
        strokeDasharray={`${(correct / total) * 100} 100`}
        transform="rotate(-90 50 50)"
      />
    </svg>
  );
}
