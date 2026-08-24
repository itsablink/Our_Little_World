"use client";

import { motion } from "framer-motion";

function formatDate(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString(undefined, { day: "numeric", month: "long", year: "numeric" });
}

export default function MessageMemoryCard({ memory, onOpen, onDelete }) {
  const preview = memory.message
    ? memory.message.length > 110
      ? `${memory.message.slice(0, 110)}…`
      : memory.message
    : "";

  const metaText = [formatDate(memory.date), memory.author ? `— ${memory.author}` : ""]
    .filter(Boolean)
    .join(" · ");

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className="glass rounded-2xl px-6 py-5 shadow-glass w-full max-w-sm flex flex-col gap-2.5 text-left"
    >
      <div className="flex items-center justify-between">
        <span className="text-xl">💬</span>
        {memory.author && (
          <span className="text-[10px] uppercase tracking-widest font-semibold text-rose bg-rose/10 px-2.5 py-1 rounded-full">
            {memory.author}
          </span>
        )}
      </div>

      <div>
        <p className="font-display text-lg text-wine">{memory.title}</p>
        {metaText && <p className="text-xs text-inkrose/60 mt-0.5">{metaText}</p>}
      </div>

      {preview && (
        <p className="text-xs text-inkrose/80 italic leading-relaxed whitespace-pre-wrap line-clamp-3 bg-white/40 p-3 rounded-xl">
          "{preview}"
        </p>
      )}

      <div className="flex items-center justify-between mt-1 pt-1 border-t border-wine/10">
        <button
          type="button"
          onClick={() => onOpen(memory)}
          className="text-xs text-rose font-semibold uppercase tracking-wide hover:underline"
        >
          Open Memory →
        </button>
        <button
          type="button"
          onClick={() => onDelete(memory.id)}
          className="text-xs text-inkrose/40 uppercase tracking-wide hover:text-rose transition-colors"
        >
          Delete
        </button>
      </div>
    </motion.div>
  );
}
