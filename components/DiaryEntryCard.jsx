"use client";

import { motion } from "framer-motion";

function formatDate(dateStr) {
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString(undefined, { day: "numeric", month: "long", year: "numeric" });
}

export default function DiaryEntryCard({ entry, onOpen }) {
  const preview = entry.body.length > 120 ? `${entry.body.slice(0, 120)}…` : entry.body;

  return (
    <motion.button
      type="button"
      onClick={() => onOpen(entry)}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.35 }}
      className="glass rounded-2xl px-6 py-5 text-left w-full shadow-glass"
    >
      <p className="text-xs uppercase tracking-widest text-rose font-semibold mb-1">{formatDate(entry.date)}</p>
      <p className="font-display text-lg text-wine mb-1">{entry.heading}</p>
      <p className="text-sm text-inkrose/70 leading-relaxed">{preview}</p>
    </motion.button>
  );
}
