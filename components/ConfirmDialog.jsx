"use client";

import { motion, AnimatePresence } from "framer-motion";
import GlassButton from "./GlassButton";

export default function ConfirmDialog({ open, title, message, onConfirm, onCancel, confirmLabel = "Delete" }) {
  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-6"
        onClick={onCancel}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95 }}
          onClick={(e) => e.stopPropagation()}
          className="glass-strong rounded-3xl shadow-glass px-7 py-8 max-w-sm w-full text-center"
        >
          <p className="font-display italic text-lg text-wine mb-2">{title}</p>
          <p className="text-inkrose/70 text-sm mb-7">{message}</p>
          <div className="flex gap-3 justify-center">
            <GlassButton variant="ghost" onClick={onCancel}>Cancel</GlassButton>
            <GlassButton onClick={onConfirm}>{confirmLabel}</GlassButton>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
