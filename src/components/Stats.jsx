import { useState } from "react";
import questions from "../questions.json";
import QuestionStat from "./QuestionStat";
import { getItem } from "../services/localStorage";

const questionList = questions.questions;

export default function Stats({ module }) {
  //get questions for the active module
  const moduleQuestions = questionList.filter((q) => q.type === module);

  const userStats = getItem("userStats") || {};

  //fix this later to use ui components like from shadcn rather than manual conditional rendering and state
  return (
    <div>
      {module === "multiplication" ? (
        <>
          {moduleQuestions.map((question) => (
            <QuestionStat
              key={question.id}
              question={question}
              total={userStats[question.id]?.total || 0}
              correct={userStats[question.id]?.correct || 0}
              averageTime={userStats[question.id]?.averageTime || 0}
            />
          ))}
        </>
      ) : (
        <>
          {moduleQuestions.map((question) => (
            <QuestionStat
              key={question.id}
              question={question}
              total={userStats[question.id]?.total || 0}
              correct={userStats[question.id]?.correct || 0}
              averageTime={userStats[question.id]?.averageTime || 0}
            />
          ))}
        </>
      )}
    </div>
  );
}
