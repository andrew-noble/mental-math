import questions from "../questions.json";

//this will require some refactoring... basically all it does now it format the question

//eventually this will be a call to an API
export default function getQuestion(module) {
  //get only the questions for the active module
  console.log(questions.questions);
  const moduleQuestions = questions.questions.filter((q) => q.type === module);

  const formatRandomizer = Math.floor(Math.random() * 3);

  const questionRandomizer = Math.floor(Math.random() * moduleQuestions.length);

  const q = moduleQuestions[questionRandomizer];
  let prompt;
  let expectedAnswer;
  const symbol = q.type === "multiplication" ? "x" : "% of";

  switch (formatRandomizer) {
    case 0:
      prompt = `__ ${symbol} ${q.operand2} = ${q.result}?`;
      expectedAnswer = q.operand1;
      break;
    case 1:
      prompt = `__ ${symbol} ${q.operand1} = ${q.result}?`;
      expectedAnswer = q.operand2;
      break;
    case 2:
      prompt = `${q.operand1} ${symbol} ${q.operand2} = __?`;
      expectedAnswer = q.result;
      break;
  }

  return { id: q.id, prompt, expectedAnswer };
}
