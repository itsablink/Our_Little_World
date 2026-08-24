"use client";

import { motion } from "framer-motion";

function formatDate(dateStr) {
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" });
}

function isReady(url) {
  return Boolean(url) && !url.startsWith("REPLACE_WITH");
}

export default function LetterCard({ letter, onOpen }) {
  const ready = isReady(letter.imageUrl);

  return (
    <motion.button
      type="button"
      onClick={() => onOpen(letter)}
      whileHover={{ y: -6, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="glass rounded-2xl overflow-hidden shadow-glass text-left w-full max-w-xs flex flex-col"
    >
      <div className="aspect-[4/3] bg-gradient-to-br from-blush/60 via-lilacsoft to-cream flex items-center justify-center overflow-hidden">
        {ready ? (
          <img src={letter.imageUrl} alt={letter.title} className="w-full h-full object-cover" />
        ) : (
          <span className="text-3xl">💌</span>
        )}
      </div>
      <div className="px-5 py-4">
        <p className="font-display text-lg text-wine">{letter.title}</p>
        <p className="text-xs text-inkrose/60 mt-1">{formatDate(letter.date)}</p>
        {letter.description && <p className="text-sm text-inkrose/70 mt-2">{letter.description}</p>}
        <p className="text-xs text-rose mt-3 font-semibold uppercase tracking-wide">
          {ready ? "Open Letter →" : "Photo coming soon"}
        </p>
      </div>
    </motion.button>
  );
}
