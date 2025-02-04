import questionsMt from "../questions-mt.json";
import questionsPct from "../questions-pct.json";

const moduleToFileMap = {
  multiplication: questionsMt,
  percentages: questionsPct,
};

//eventually this will be a call to an API
export default function getQuestion(module) {
  const formatRandomizer = Math.floor(Math.random() * 3);

  const questionRandomizer = Math.floor(
    Math.random() * moduleToFileMap[module].length
  );

  const q = moduleToFileMap[module][questionRandomizer];
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

  return { prompt, expectedAnswer };
}
