"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import QuestionCard from "./QuestionCard";
import GlassButton from "./GlassButton";
import { isCorrect } from "@/lib/checkAnswer";

export default function ChallengeFlow({ questions }) {
  const router = useRouter();
  const [stage, setStage] = useState("intro"); // intro | questions | done
  const [index, setIndex] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [locked, setLocked] = useState(false);
  const [entering, setEntering] = useState(false);

  const current = questions[index];

  function handleAnswer(value) {
    const correct = isCorrect(current, value);
    setLocked(true);

    if (correct) {
      setFeedback({ status: "correct", message: current.correctResponse });
      setTimeout(() => {
        if (index + 1 < questions.length) {
          setIndex((i) => i + 1);
          setFeedback(null);
          setLocked(false);
        } else {
          setStage("done");
        }
      }, 1300);
    } else {
      setFeedback({ status: "wrong", message: current.wrongResponse });
      setTimeout(() => {
        setFeedback(null);
        setLocked(false);
      }, 1300);
    }
  }

  async function handleEnter() {
    setEntering(true);
    try {
      await fetch("/api/auth/gate", { method: "POST" });
    } finally {
      router.push("/home");
    }
  }

  if (stage === "intro") {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="glass-strong rounded-[28px] shadow-glass px-8 py-12 w-full max-w-sm text-center"
      >
        <p className="font-display italic text-2xl text-wine mb-3">Before you enter...</p>
        <p className="text-inkrose/70 mb-8">Three questions. Just to make sure it's really you. 👀</p>
        <GlassButton onClick={() => setStage("questions")}>Let's go</GlassButton>
      </motion.div>
    );
  }

  if (stage === "done") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="glass-strong rounded-[28px] shadow-glass px-8 py-12 w-full max-w-sm text-center"
      >
        <span className="text-4xl block mb-4">✨</span>
        <p className="font-display italic text-2xl text-wine mb-2">You remembered everything.</p>
        <p className="text-inkrose/70 mb-8">Welcome in. ♡</p>
        <GlassButton onClick={handleEnter} disabled={entering}>
          {entering ? "Opening..." : "Enter our world →"}
        </GlassButton>
      </motion.div>
    );
  }

  return (
    <div className="w-full max-w-md flex flex-col items-center">
      <div className="flex gap-2 mb-6">
        {questions.map((q, i) => (
          <span
            key={q.id}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === index ? "w-6 bg-rose" : i < index ? "w-2 bg-rose/60" : "w-2 bg-white/70"
            }`}
          />
        ))}
      </div>
      <AnimatePresence mode="wait">
        <QuestionCard question={current} onSubmit={handleAnswer} feedback={feedback} locked={locked} />
      </AnimatePresence>
    </div>
  );
}
