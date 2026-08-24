"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

function isReady(url) {
  return Boolean(url) && !url.startsWith("REPLACE_WITH");
}

function formatDate(dateStr) {
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString(undefined, { day: "numeric", month: "long", year: "numeric" });
}

export default function LetterViewer({ letter, onClose, onPrev, onNext, hasPrev, hasNext }) {
  if (!letter) return null;
  const ready = isReady(letter.imageUrl);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 py-8"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          onClick={(e) => e.stopPropagation()}
          className="glass-strong rounded-3xl shadow-glass max-w-2xl w-full max-h-[85vh] flex flex-col overflow-hidden"
        >
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/40">
            <div>
              <p className="font-display text-lg text-wine">{letter.title}</p>
              <p className="text-xs text-inkrose/60">{formatDate(letter.date)}</p>
            </div>
            <button onClick={onClose} className="text-inkrose/60 hover:text-inkrose p-1" aria-label="Close">
              <X size={22} />
            </button>
          </div>

          <div className="flex-1 overflow-auto flex items-center justify-center bg-white/30 p-4">
            {ready ? (
              <img
                src={letter.imageUrl}
                alt={letter.title}
                className="max-w-full max-h-[60vh] object-contain rounded-xl shadow-glass"
              />
            ) : (
              <div className="text-center py-16 px-6">
                <p className="text-4xl mb-3">💌</p>
                <p className="text-inkrose/60 text-sm">This letter's photo hasn't been added yet.</p>
              </div>
            )}
          </div>

          {letter.description && (
            <p className="text-sm text-inkrose/70 px-5 py-3 border-t border-white/40 text-center">
              {letter.description}
            </p>
          )}

          {(hasPrev || hasNext) && (
            <div className="flex justify-between px-5 py-3 border-t border-white/40">
              <button
                onClick={onPrev}
                disabled={!hasPrev}
                className="flex items-center gap-1 text-xs uppercase tracking-widest text-rose font-semibold disabled:opacity-30"
              >
                <ChevronLeft size={16} /> Previous
              </button>
              <button
                onClick={onNext}
                disabled={!hasNext}
                className="flex items-center gap-1 text-xs uppercase tracking-widest text-rose font-semibold disabled:opacity-30"
              >
                Next <ChevronRight size={16} />
              </button>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
