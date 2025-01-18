import questions from "../questions.json";

//eventually this will be a call to an API
export default function getQuestion() {
  const formatRandomizer = Math.floor(Math.random() * 3);
  const questionRandomizer = Math.floor(Math.random() * questions.length);
  const q = questions[questionRandomizer];
  let prompt;
  let expectedAnswer;

  switch (formatRandomizer) {
    case 0:
      prompt = `__ x ${q.operand2} = ${q.result}`;
      expectedAnswer = q.operand1;
      break;
    case 1:
      prompt = `${q.operand1} x __ = ${q.result}`;
      expectedAnswer = q.operand2;
      break;
    case 2:
      prompt = `${q.operand1} x ${q.operand2} = __`;
      expectedAnswer = q.result;
      break;
  }

  return { prompt, expectedAnswer };
}
