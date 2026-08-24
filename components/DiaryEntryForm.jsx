"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import GlassButton from "./GlassButton";

export default function DiaryEntryForm({ initialEntry, onSave, onCancel }) {
  const isEdit = Boolean(initialEntry);
  const [date, setDate] = useState(initialEntry?.date || "");
  const [heading, setHeading] = useState(initialEntry?.heading || "");
  const [body, setBody] = useState(initialEntry?.body || "");
  const [errors, setErrors] = useState({});

  function validate() {
    const next = {};
    if (!date) next.date = "Pick a date for this entry.";
    if (!heading.trim()) next.heading = "Give it a heading.";
    if (!body.trim()) next.body = "Write something before saving.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    onSave({ date, heading: heading.trim(), body: body.trim() });
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="glass-strong rounded-[28px] shadow-glass px-7 py-8 w-full max-w-lg flex flex-col gap-4"
    >
      <p className="font-display italic text-2xl text-wine text-center mb-2">{isEdit ? "Edit Entry" : "New Entry"}</p>

      <div>
        <label className="text-xs uppercase tracking-widest text-rose font-semibold">Date *</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="mt-1 w-full rounded-2xl bg-white/70 border border-white px-4 py-3 text-inkrose focus:bg-white/90 transition-colors"
        />
        {errors.date && <p className="text-xs text-rose mt-1">{errors.date}</p>}
      </div>

      <div>
        <label className="text-xs uppercase tracking-widest text-rose font-semibold">Heading *</label>
        <input
          type="text"
          value={heading}
          onChange={(e) => setHeading(e.target.value)}
          placeholder="A Very Good Day"
          className="mt-1 w-full rounded-2xl bg-white/70 border border-white px-4 py-3 text-inkrose placeholder:text-inkrose/40 focus:bg-white/90 transition-colors font-display italic"
        />
        {errors.heading && <p className="text-xs text-rose mt-1">{errors.heading}</p>}
      </div>

      <div>
        <label className="text-xs uppercase tracking-widest text-rose font-semibold">Body *</label>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Today felt different..."
          rows={7}
          className="mt-1 w-full rounded-2xl bg-white/70 border border-white px-4 py-3 text-inkrose placeholder:text-inkrose/40 focus:bg-white/90 transition-colors leading-relaxed resize-none"
        />
        {errors.body && <p className="text-xs text-rose mt-1">{errors.body}</p>}
      </div>

      <div className="flex gap-3 justify-center mt-2">
        <GlassButton type="submit">{isEdit ? "Save changes" : "Save entry"}</GlassButton>
        <GlassButton type="button" variant="ghost" onClick={onCancel}>Cancel</GlassButton>
      </div>
    </motion.form>
  );
}
