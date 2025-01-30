import { useState } from "react";
import getQuestion from "./services/getQuestion";
import EntryArea from "./components/EntryArea";
import PromptBar from "./components/PromptBar";

export default function App() {
  const [question, setQuestion] = useState(getQuestion());
  const [feedback, setFeedback] = useState(null);
  const [score, setScore] = useState(0);

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
      setScore((prev) => prev + 1);
      setFeedback({ type: "correct", message: "Correct! 🎉", color: "green" });
    } else {
      setFeedback({ type: "incorrect", message: "Incorrect 😥", color: "red" });
    }
    //reset question
    setQuestion(getQuestion());
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen p-3">
      {feedback ? (
        <div
          className={`animate-floatUp rounded p-2 bg-${feedback.color}-400 h-auto`}
          onAnimationEnd={() => setFeedback(null)}
        >
          <p>{feedback.message}</p>
        </div>
      ) : (
        <div className="h-min-35"></div>
      )}

      <PromptBar prompt={question.prompt} />
      <EntryArea
        checkAnswer={checkAnswer}
        expectedLength={question.expectedAnswer.toString().length}
      />
      <div className="flex bg-slate-300 text-black p-2 rounded my-2 text-xl font-bold">
        <h3>Score: {score}</h3>
      </div>
    </div>
  );
}
