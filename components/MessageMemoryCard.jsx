"use client";

import { motion } from "framer-motion";

function formatDate(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString(undefined, { day: "numeric", month: "long", year: "numeric" });
}

export default function MessageMemoryCard({ memory, onOpen, onDelete }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className="glass rounded-2xl px-6 py-5 shadow-glass w-full max-w-sm flex flex-col gap-2"
    >
      <p className="font-display text-lg text-wine">{memory.title}</p>
      <p className="text-xs text-inkrose/60">
        {[formatDate(memory.date), memory.author].filter(Boolean).join(" · ")}
      </p>
      <p className="text-xs text-inkrose/50">
        {memory.screenshots?.length || 0} screenshot{memory.screenshots?.length === 1 ? "" : "s"}
      </p>
      <div className="flex gap-3 mt-1">
        <button onClick={() => onOpen(memory)} className="text-xs text-rose font-semibold uppercase tracking-wide">
          Open →
        </button>
        <button onClick={() => onDelete(memory.id)} className="text-xs text-inkrose/40 uppercase tracking-wide hover:text-rose">
          Delete
        </button>
      </div>
    </motion.div>
  );
}
