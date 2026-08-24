"use client";

import { motion } from "framer-motion";
import GlassButton from "./GlassButton";

function formatDate(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString(undefined, { day: "numeric", month: "long", year: "numeric" });
}

export default function MessageViewer({ memory, onBack, onEdit, onDelete }) {
  if (!memory) return null;

  const dateFormatted = formatDate(memory.date);
  const authorBadge = memory.author ? `— ${memory.author}` : "";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.35 }}
      className="glass-strong rounded-[28px] shadow-glass px-8 py-10 w-full max-w-lg text-center flex flex-col items-center"
    >
      <span className="text-3xl mb-2">💬</span>
      
      {dateFormatted || authorBadge ? (
        <p className="text-xs uppercase tracking-widest text-rose font-semibold mb-2">
          {[dateFormatted, authorBadge].filter(Boolean).join(" ")}
        </p>
      ) : null}

      <h2 className="font-display italic text-2xl text-wine mb-6">{memory.title}</h2>
      
      <div className="h-px bg-wine/15 w-full mb-6" />

      <div className="w-full text-left font-body text-inkrose/85 leading-relaxed whitespace-pre-wrap bg-white/50 p-6 rounded-2xl border border-white/60 shadow-inner">
        {memory.message}
      </div>

      {memory.note && (
        <div className="w-full text-left mt-4 text-xs text-wine/80 italic bg-blush/30 p-3.5 rounded-xl border border-rose/10">
          <span className="font-semibold not-italic text-rose">Note: </span>
          {memory.note}
        </div>
      )}

      <div className="h-px bg-wine/15 w-full mt-8 mb-6" />

      <div className="flex flex-wrap gap-3 justify-center">
        <GlassButton variant="ghost" onClick={onBack}>
          ← Back to messages
        </GlassButton>
        {onEdit && (
          <GlassButton variant="ghost" onClick={onEdit}>
            Edit
          </GlassButton>
        )}
        {onDelete && (
          <GlassButton variant="ghost" onClick={onDelete}>
            Delete
          </GlassButton>
        )}
      </div>
    </motion.div>
  );
}
