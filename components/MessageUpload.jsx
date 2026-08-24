"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import GlassButton from "./GlassButton";

export default function MessageUpload({ initialMemory, onSave, onCancel }) {
  const isEdit = Boolean(initialMemory);
  const [title, setTitle] = useState(initialMemory?.title || "");
  const [date, setDate] = useState(initialMemory?.date || "");
  const [author, setAuthor] = useState(initialMemory?.author || "");
  const [message, setMessage] = useState(initialMemory?.message || "");
  const [note, setNote] = useState(initialMemory?.note || "");
  const [errors, setErrors] = useState({});

  function validate() {
    const next = {};
    if (!title.trim()) next.title = "Give this memory a title.";
    if (!message.trim()) next.message = "Paste or write the message content.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    onSave({
      title: title.trim(),
      date,
      author: author.trim(),
      message: message.trim(),
      note: note.trim()
    });
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-strong rounded-[28px] shadow-glass px-7 py-8 w-full max-w-lg flex flex-col gap-4"
    >
      <p className="font-display italic text-2xl text-wine text-center mb-2">
        💬 {isEdit ? "Edit Special Memory" : "Add a Special Memory"}
      </p>

      <div>
        <label className="text-xs uppercase tracking-widest text-rose font-semibold">Title *</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="One of those messages"
          className="mt-1 w-full rounded-2xl bg-white/70 border border-white px-4 py-3 text-inkrose placeholder:text-inkrose/40 focus:bg-white/90 transition-colors"
        />
        {errors.title && <p className="text-xs text-rose mt-1">{errors.title}</p>}
      </div>

      <div className="flex gap-3">
        <div className="flex-1">
          <label className="text-xs uppercase tracking-widest text-rose font-semibold">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-1 w-full rounded-2xl bg-white/70 border border-white px-4 py-3 text-inkrose focus:bg-white/90 transition-colors"
          />
        </div>
        <div className="flex-1">
          <label className="text-xs uppercase tracking-widest text-rose font-semibold">Who wrote it</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Biscoff / Dudee"
            className="mt-1 w-full rounded-2xl bg-white/70 border border-white px-4 py-3 text-inkrose placeholder:text-inkrose/40 focus:bg-white/90 transition-colors"
          />
        </div>
      </div>

      <div>
        <label className="text-xs uppercase tracking-widest text-rose font-semibold">Message *</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Paste or write the heartfelt message here..."
          rows={7}
          className="mt-1 w-full rounded-2xl bg-white/70 border border-white px-4 py-3 text-inkrose placeholder:text-inkrose/40 focus:bg-white/90 transition-colors leading-relaxed whitespace-pre-wrap resize-none font-body"
        />
        {errors.message && <p className="text-xs text-rose mt-1">{errors.message}</p>}
      </div>

      <div>
        <label className="text-xs uppercase tracking-widest text-rose font-semibold">Note (optional)</label>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="One of those messages I'll always remember ❤️"
          rows={2}
          className="mt-1 w-full rounded-2xl bg-white/70 border border-white px-4 py-2.5 text-xs text-inkrose placeholder:text-inkrose/40 focus:bg-white/90 transition-colors leading-relaxed resize-none"
        />
      </div>

      <div className="flex gap-3 justify-center mt-2">
        <GlassButton type="submit">{isEdit ? "Save changes ❤️" : "Save Memory ❤️"}</GlassButton>
        <GlassButton type="button" variant="ghost" onClick={onCancel}>Cancel</GlassButton>
      </div>
    </motion.form>
  );
}
