"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export default function MessageViewer({ memory, onClose }) {
  const [index, setIndex] = useState(0);
  if (!memory) return null;

  const shots = memory.screenshots || [];

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
          onClick={(e) => e.stopPropagation()}
          className="glass-strong rounded-3xl shadow-glass max-w-2xl w-full max-h-[85vh] flex flex-col overflow-hidden"
        >
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/40">
            <div>
              <p className="font-display text-lg text-wine">{memory.title}</p>
              <p className="text-xs text-inkrose/60">
                {[memory.date, memory.author].filter(Boolean).join(" · ")}
              </p>
            </div>
            <button onClick={onClose} className="text-inkrose/60 hover:text-inkrose p-1" aria-label="Close">
              <X size={22} />
            </button>
          </div>

          <div className="flex-1 overflow-auto flex items-center justify-center bg-white/30 p-4">
            {shots[index] && (
              <img
                src={shots[index]}
                alt={memory.title}
                className="max-w-full max-h-[60vh] object-contain rounded-xl shadow-glass"
              />
            )}
          </div>

          {shots.length > 1 && (
            <div className="flex justify-between items-center px-5 py-3 border-t border-white/40">
              <button
                onClick={() => setIndex((i) => Math.max(0, i - 1))}
                disabled={index === 0}
                className="flex items-center gap-1 text-xs uppercase tracking-widest text-rose font-semibold disabled:opacity-30"
              >
                <ChevronLeft size={16} /> Previous
              </button>
              <span className="text-xs text-inkrose/50">{index + 1} / {shots.length}</span>
              <button
                onClick={() => setIndex((i) => Math.min(shots.length - 1, i + 1))}
                disabled={index === shots.length - 1}
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
