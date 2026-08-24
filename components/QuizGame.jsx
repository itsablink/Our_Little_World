"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import QuestionCard from "./QuestionCard";
import GlassButton from "./GlassButton";
import { isCorrect } from "@/lib/checkAnswer";
import { groupQuestionsByLevel, pickForLevel } from "@/lib/questionBank";

const LEVELS = [
  { id: 1, title: "Cute Beginner", subtitle: "Warm-up round" },
  { id: 2, title: "You Better Know This", subtitle: "Getting personal" },
  { id: 3, title: "Memory Master", subtitle: "No pressure" },
  { id: 4, title: "Certified Us Historian", subtitle: "This is the real test" },
  { id: 5, title: "Final Boss", subtitle: "Good luck, Sweetu" }
];

// Each level draws 5 questions, randomly selected (and randomly ordered)
// from that level's own 10-question pool, freshly every attempt.
const QUESTIONS_PER_ROUND = 5;
const QUESTIONS_NEEDED_TO_UNLOCK = 5; // minimum pool size before a level is playable

function resultCopy(pct) {
  if (pct === 100) return { title: "Soulmate Certified", message: "Okayyy, you actually know me perfectly. ✨" };
  if (pct >= 80) return { title: "Pretty Impressive", message: "Not bad at all, Dudee. 🥹" };
  if (pct >= 60) return { title: "We need to talk 😂", message: "Close, but we're having a conversation later." };
  return { title: "Who are you again? 😭", message: "Sweetu, we need to fix this immediately." };
}

export default function QuizGame({ bank }) {
  const [stage, setStage] = useState("levels"); // levels | playing | result
  const [levelId, setLevelId] = useState(null);
  const [roundQuestions, setRoundQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [locked, setLocked] = useState(false);

  // Grouped once per bank: { level1: [...10 or fewer], level2: [...], ... }
  const questionBank = useMemo(() => groupQuestionsByLevel(bank), [bank]);

  function poolFor(id) {
    return questionBank[`level${id}`] || [];
  }

  function startLevel(id) {
    const pool = poolFor(id);
    if (pool.length < QUESTIONS_NEEDED_TO_UNLOCK) return; // not enough questions yet

    // Fresh independent random selection + order, every attempt.
    setRoundQuestions(pickForLevel(pool, QUESTIONS_PER_ROUND));
    setLevelId(id);
    setIndex(0);
    setScore(0);
    setFeedback(null);
    setLocked(false);
    setStage("playing");
  }

  function handleAnswer(value) {
    const current = roundQuestions[index];
    const correct = isCorrect(current, value);
    setLocked(true);
    if (correct) setScore((s) => s + 1);

    setFeedback({
      status: correct ? "correct" : "wrong",
      message: correct ? current.correctResponse : current.wrongResponse
    });

    setTimeout(() => {
      setFeedback(null);
      setLocked(false);
      if (index + 1 < roundQuestions.length) {
        setIndex((i) => i + 1);
      } else {
        setStage("result");
      }
    }, 1100);
  }

  const pct = useMemo(
    () => (roundQuestions.length ? Math.round((score / roundQuestions.length) * 100) : 0),
    [score, roundQuestions.length]
  );
  const result = resultCopy(pct);
  const level = LEVELS.find((l) => l.id === levelId);
  const nextLevel = LEVELS.find((l) => l.id === (levelId || 0) + 1);
  const nextLevelReady = nextLevel && poolFor(nextLevel.id).length >= QUESTIONS_NEEDED_TO_UNLOCK;

  if (stage === "levels") {
    return (
      <div className="w-full max-w-md flex flex-col items-center gap-4">
        <p className="font-display italic text-2xl text-wine mb-1">Think you know us?</p>
        <p className="text-xs text-inkrose/50 text-center max-w-xs -mt-2 mb-2">
          Each level picks 5 random questions from its own set of 10 — a different mix every time you play.
        </p>
        {LEVELS.map((l) => {
          const count = poolFor(l.id).length;
          const ready = count >= QUESTIONS_NEEDED_TO_UNLOCK;
          return (
            <button
              key={l.id}
              onClick={() => startLevel(l.id)}
              disabled={!ready}
              className="glass w-full rounded-2xl px-6 py-4 flex items-center justify-between hover:bg-white/70 transition-colors disabled:opacity-45 disabled:cursor-not-allowed disabled:hover:bg-transparent"
            >
              <span className="text-left">
                <span className="block font-display text-lg text-wine">
                  Level {l.id} — {l.title}
                </span>
                <span className="block text-xs text-inkrose/60">
                  {ready ? l.subtitle : `Add ${QUESTIONS_NEEDED_TO_UNLOCK - count} more questions to unlock`}
                </span>
              </span>
              <span className="text-rose">{ready ? "→" : "🔒"}</span>
            </button>
          );
        })}
        <Link href="/home" className="text-xs text-inkrose/50 uppercase tracking-widest mt-4 hover:text-inkrose">
          ← Back home
        </Link>
      </div>
    );
  }

  if (stage === "result") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-strong rounded-[28px] shadow-glass px-8 py-12 w-full max-w-sm text-center"
      >
        <p className="text-3xl mb-2">✨ {score}/{roundQuestions.length} ✨</p>
        <p className="font-display italic text-xl text-wine mb-2">{result.title}</p>
        <p className="text-inkrose/70 mb-8">{result.message}</p>
        <div className="flex flex-col gap-3">
          {nextLevelReady && (
            <GlassButton onClick={() => startLevel(nextLevel.id)}>
              Level {nextLevel.id} →
            </GlassButton>
          )}
          <GlassButton variant="ghost" onClick={() => setStage("levels")}>
            Back to levels
          </GlassButton>
        </div>
      </motion.div>
    );
  }

  const current = roundQuestions[index];

  return (
    <div className="w-full max-w-md flex flex-col items-center">
      <p className="text-xs uppercase tracking-widest text-rose font-semibold mb-4">
        Level {level.id} · {index + 1}/{roundQuestions.length}
      </p>
      <AnimatePresence mode="wait">
        <QuestionCard question={current} onSubmit={handleAnswer} feedback={feedback} locked={locked} />
      </AnimatePresence>
    </div>
  );
}
