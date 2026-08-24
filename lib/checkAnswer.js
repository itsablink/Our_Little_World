function normalize(str) {
  return String(str).trim().toLowerCase();
}

export function isCorrect(question, given) {
  if (question.type === "choice") {
    return normalize(given) === normalize(question.answer);
  }
  const pool = [question.answer, ...(question.acceptableAnswers || [])].filter(Boolean);
  return pool.some((candidate) => normalize(candidate) === normalize(given));
}
