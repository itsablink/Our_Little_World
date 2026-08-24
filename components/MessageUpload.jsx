"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import GlassButton from "./GlassButton";
import { fileToDataUrl, uploadScreenshotApi } from "@/lib/messageStore";

export default function MessageUpload({ onSave, onCancel }) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [author, setAuthor] = useState("");
  const [screenshots, setScreenshots] = useState([]);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function handleFiles(e) {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    setBusy(true);
    try {
      const urls = await Promise.all(files.map((f) => uploadScreenshotApi(f)));
      setScreenshots((prev) => [...prev, ...urls]);
    } catch {
      setError("Couldn't read one of those files — try again.");
    } finally {
      setBusy(false);
    }
  }

  function removeShot(index) {
    setScreenshots((prev) => prev.filter((_, i) => i !== index));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim()) {
      setError("Give this memory a title.");
      return;
    }
    if (screenshots.length === 0) {
      setError("Add at least one screenshot.");
      return;
    }
    setError("");
    onSave({ title: title.trim(), date, author: author.trim(), screenshots });
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-strong rounded-[28px] shadow-glass px-7 py-8 w-full max-w-lg flex flex-col gap-4"
    >
      <p className="font-display italic text-2xl text-wine text-center mb-2">Save a Memory</p>

      <div>
        <label className="text-xs uppercase tracking-widest text-rose font-semibold">Title *</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="That birthday message"
          className="mt-1 w-full rounded-2xl bg-white/70 border border-white px-4 py-3 text-inkrose placeholder:text-inkrose/40 focus:bg-white/90 transition-colors"
        />
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
            placeholder="Biscoff"
            className="mt-1 w-full rounded-2xl bg-white/70 border border-white px-4 py-3 text-inkrose placeholder:text-inkrose/40 focus:bg-white/90 transition-colors"
          />
        </div>
      </div>

      <div>
        <label className="text-xs uppercase tracking-widest text-rose font-semibold">Screenshot(s) *</label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFiles}
          className="mt-1 w-full text-sm text-inkrose file:mr-3 file:rounded-full file:border-0 file:bg-rose file:text-white file:px-4 file:py-2 file:text-xs file:font-semibold file:uppercase file:tracking-wide"
        />
        {busy && <p className="text-xs text-inkrose/50 mt-1">Reading files…</p>}
        {screenshots.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {screenshots.map((src, i) => (
              <div key={i} className="relative">
                <img src={src} alt="" className="w-16 h-16 object-cover rounded-lg" />
                <button
                  type="button"
                  onClick={() => removeShot(i)}
                  className="absolute -top-1.5 -right-1.5 bg-wine text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {error && <p className="text-xs text-rose text-center">{error}</p>}

      <div className="flex gap-3 justify-center mt-2">
        <GlassButton type="submit">Save Memory</GlassButton>
        <GlassButton type="button" variant="ghost" onClick={onCancel}>Cancel</GlassButton>
      </div>
    </motion.form>
  );
}
