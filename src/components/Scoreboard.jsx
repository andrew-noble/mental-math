export default function Scoreboard({ score, streak }) {
  return (
    <div className="flex flex-row gap-4">
      <h3 className="text-black p-2 rounded m-2 text-xl font-bold">
        Score: {score}
      </h3>
      <h3 className="text-black p-2 rounded m-2 text-xl font-bold">
        Streak: {streak}
      </h3>
    </div>
  );
}
