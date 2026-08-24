// Groups the flat question array into { level1: [...], level2: [...], ... level5: [...] }
// per the recommended data structure. A question's `level` field (1-5) decides
// which bucket it lands in; questions without a level default to level 1.
export function groupQuestionsByLevel(questions) {
  const bank = { level1: [], level2: [], level3: [], level4: [], level5: [] };
  for (const q of questions) {
    const key = `level${q.level || 1}`;
    if (!bank[key]) bank[key] = [];
    bank[key].push(q);
  }
  return bank;
}

// Fisher-Yates shuffle. Never mutates the input array.
export function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Selects `count` questions from a single level's pool: shuffle, then take
// the first `count`. This randomizes both WHICH questions are chosen and the
// ORDER they're shown in. Never mutates the source array, so the full pool
// is always available again on the next attempt.
export function pickForLevel(levelQuestions, count = 5) {
  return shuffleArray(levelQuestions).slice(0, Math.min(count, levelQuestions.length));
}

// Generates one full game attempt: independently shuffles + selects `count`
// questions from EVERY level in the bank. Levels are never mixed together.
export function generateGameQuestions(questionBank, count = 5) {
  const selected = {};
  for (const level of Object.keys(questionBank)) {
    selected[level] = pickForLevel(questionBank[level], count);
  }
  return selected;
}

// Combines the selected levels into one sequential array, in level order
// (1 -> 2 -> 3 -> 4 -> 5). Only call this AFTER selection/shuffling has
// already happened per level — never flatten first and randomize after.
export function flattenSelectedGame(selected, levelOrder = [1, 2, 3, 4, 5]) {
  return levelOrder.flatMap((n) => selected[`level${n}`] || []);
}
