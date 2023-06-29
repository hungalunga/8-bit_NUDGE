import fs from "node:fs/promises";

const filename = "./data/math_questions.json";

export async function getQuestions() {
  const data = await fs.readFile(filename);
  const questions = JSON.parse(data);
  return questions;
}

export async function getAQuestion() {
  const data = await fs.readFile(filename);
  const questions = JSON.parse(data);
  const i = Math.floor(Math.random() * questions.length);
  const question = questions[i];
  return question;
}

export async function tenRandomQuestions() {
  const data = await fs.readFile(filename);
  const tenRandomQuestions = [];
  for(let i = 0; i < 3; i++) {
    const questions = JSON.parse(data);
    const randomIndex = Math.floor(Math.random() * questions.length);
    const randomQuestion = questions[randomIndex];
    console.log(randomQuestion);
    tenRandomQuestions.push(randomQuestion);
    console.log(tenRandomQuestions);
  }
  return tenRandomQuestions;
}