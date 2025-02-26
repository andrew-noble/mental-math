export default function AccuracyReadout({ correct, total }) {
  const size = 30; // Base size of the SVG
  const radius = size / 2; // Radius scales with size
  const center = size / 2; // Center point scales with size
  const strokeWidth = radius; // Full radius for stroke width
  const innerRadius = radius / 2; // Radius of the inner circle

  // Calculate the circumference of the circle
  const circumference = 2 * Math.PI * innerRadius;
  // Calculate the arc length based on the percentage
  const percentage = total > 0 ? correct / total : 0;
  const arcLength = percentage * circumference;

  return (
    <svg width={size} height={size}>
      {/* red background */}
      <circle
        cx={center}
        cy={center}
        r={radius}
        fill="rgba(239, 68, 68, 0.7)"
      />
      {/* green pie slice */}
      <circle
        cx={center}
        cy={center}
        r={innerRadius}
        fill="transparent"
        strokeWidth={strokeWidth}
        stroke="rgba(34, 197, 94, 0.7)"
        strokeDasharray={`${arcLength} ${circumference}`}
        transform={`rotate(-90 ${center} ${center})`}
      />
    </svg>
  );
}
