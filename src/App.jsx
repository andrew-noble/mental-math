import { useState } from "react";
import getQuestion from "./services/getQuestion";
import EntryArea from "./components/EntryArea";
import PromptBar from "./components/PromptBar";

export default function App() {
  const [question, setQuestion] = useState(getQuestion());
  const [feedback, setFeedback] = useState(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);

  //future api call if we implement it
  // useEffect(() => {
  //   //necessary wrapper bc useEffect doesn't support async/await
  //   async function fetchData() {
  //     try {
  //       const result = await getAllQuestions();
  //       setTest(result.questions[0]);
  //     } catch (e) {
  //       console.log("Error fetching data from API: ", e);
  //     }
  //   }

  //   fetchData();
  // }, []);

  const checkAnswer = (answer) => {
    answer = parseInt(answer);

    if (answer === question.expectedAnswer) {
      console.log("correct");
      setScore((prev) => prev + 1);
      setStreak((prev) => prev + 1);
      setFeedback({ type: "correct", message: "Correct! 🎉", color: "green" });
    } else {
      console.log("incorrect");
      setStreak(0);
      setFeedback({ type: "incorrect", message: "Incorrect 😥", color: "red" });
    }
    //reset question
    setQuestion(getQuestion());
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen p-3">
      <div className="min-h-[50px]">
        {/* this wrapper div required to prevent animation from jolting rest of DOM */}
        {feedback ? (
          <div
            className={`animate-floatUp rounded p-2 bg-${feedback.color}-400 h-[50px]`}
            onAnimationEnd={() => setFeedback(null)}
          >
            <p>{feedback.message}</p>
          </div>
        ) : null}
      </div>

      <PromptBar prompt={question.prompt} />
      <EntryArea
        checkAnswer={checkAnswer}
        expectedLength={question.expectedAnswer.toString().length}
      />
      <div className="flex">
        <h3 className="bg-slate-300 text-black p-2 rounded m-2 text-xl font-bold">
          Score: {score}
        </h3>
        <h3 className="bg-slate-300 text-black p-2 rounded m-2 text-xl font-bold">
          Streak: {streak}
        </h3>
      </div>
    </div>
  );
}
