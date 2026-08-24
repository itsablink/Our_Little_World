"use client";

import { motion } from "framer-motion";
import GlassButton from "./GlassButton";

function formatDate(dateStr) {
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString(undefined, { day: "numeric", month: "long", year: "numeric" });
}

export default function DiaryEntryView({ entry, onBack, onEdit, onDelete }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="glass-strong rounded-[28px] shadow-glass px-8 py-12 w-full max-w-lg text-center"
    >
      <p className="text-3xl mb-4">♡</p>
      <p className="text-xs uppercase tracking-widest text-rose font-semibold mb-3">{formatDate(entry.date)}</p>
      <p className="font-display italic text-2xl text-wine mb-6">{entry.heading}</p>
      <div className="h-px bg-wine/15 mb-6" />
      <p className="text-inkrose/80 leading-loose whitespace-pre-wrap text-left font-body">{entry.body}</p>
      <div className="h-px bg-wine/15 mt-8 mb-6" />
      <div className="flex flex-wrap gap-3 justify-center">
        <GlassButton variant="ghost" onClick={onBack}>← Back to diary</GlassButton>
        <GlassButton variant="ghost" onClick={onEdit}>Edit</GlassButton>
        <GlassButton variant="ghost" onClick={onDelete}>Delete</GlassButton>
      </div>
    </motion.div>
  );
}
