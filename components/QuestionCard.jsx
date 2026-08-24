"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GlassButton from "./GlassButton";

export default function QuestionCard({ question, onSubmit, feedback, locked }) {
  const [choice, setChoice] = useState("");
  const [text, setText] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (locked) return;
    const value = question.type === "choice" ? choice : text;
    if (!value) return;
    onSubmit(value);
  }

  function handleChoice(opt) {
    if (locked) return;
    setChoice(opt);
    onSubmit(opt);
  }

  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -24 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="glass-strong rounded-[28px] shadow-glass px-7 py-8 w-full max-w-md"
    >
      <p className="font-display text-xl text-wine leading-snug mb-6 text-center">
        {question.question}
      </p>

      {question.type === "choice" ? (
        <div className="flex flex-col gap-3">
          {question.options.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => handleChoice(opt)}
              disabled={locked}
              className={`rounded-2xl px-4 py-3 text-left border transition-all duration-200 disabled:opacity-50
                ${choice === opt ? "bg-rose text-white border-rose" : "bg-white/60 border-white text-inkrose hover:bg-white/85"}`}
            >
              {opt}
            </button>
          ))}
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            disabled={locked}
            placeholder="Type your answer..."
            className="w-full rounded-2xl bg-white/70 border border-white px-4 py-3 text-inkrose placeholder:text-inkrose/40 focus:bg-white/90 transition-colors disabled:opacity-50"
          />
          <GlassButton type="submit" disabled={locked} className="self-center">
            Submit
          </GlassButton>
        </form>
      )}

      <AnimatePresence mode="wait">
        {feedback && (
          <motion.p
            key={feedback.message}
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              x: feedback.status === "wrong" ? [0, -6, 6, -4, 4, 0] : 0
            }}
            transition={{ duration: feedback.status === "wrong" ? 0.4 : 0.5 }}
            className={`mt-5 text-center rounded-xl px-4 py-3 text-sm font-medium
              ${feedback.status === "correct" ? "bg-blush/50 text-wine" : "bg-lilacsoft text-wine"}`}
          >
            {feedback.message}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
