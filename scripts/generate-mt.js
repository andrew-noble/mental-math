const fs = require("fs");

let count = 0;
let list = [];

for (let i = 2; i < 13; i++) {
  for (let j = 2; j < 13; j++) {
    const obj = {
      id: count,
      type: "multiplication",
      operand1: i,
      operand2: j,
      result: i * j,
    };
    list.push(obj);
    count++;
  }
}

// Convert the list to JSON (formatted for readability)
const jsonOutput = JSON.stringify(list, null, 2);

// Write the JSON string directly to a file
fs.writeFileSync("../src/questions-mt.json", jsonOutput, "utf-8");

console.log("Successfully written JSON to output.json");
