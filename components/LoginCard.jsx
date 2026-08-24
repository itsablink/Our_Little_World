"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import GlassButton from "./GlassButton";

export default function LoginCard() {
  const router = useRouter();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, password })
      });
      const data = await res.json();

      if (data.ok) {
        if (typeof window !== "undefined") {
          window.sessionStorage.setItem("olw_tab_auth", "valid");
        }
        router.push("/challenge");
      } else {
        setError(data.message || "That's not it. Try again.");
      }
    } catch {
      setError("Something went wrong. Try again in a moment.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="glass-strong rounded-[28px] shadow-[0_20px_50px_rgba(245,49,99,0.14)] border border-white/80 px-8 py-10 w-full max-w-sm relative z-10 backdrop-blur-xl"
    >
      <div className="flex flex-col items-center mb-8">
        <span className="text-4xl mb-3 animate-pulseSoft filter drop-shadow-[0_4px_12px_rgba(245,49,99,0.3)]">
          ♡
        </span>
        <h1 className="font-display text-2xl italic text-wine tracking-wide">Welcome back</h1>
        <p className="text-xs text-inkrose/60 mt-1">Our Little World awaits ✨</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label htmlFor="id" className="text-xs uppercase tracking-widest text-rose font-semibold">
            User ID
          </label>
          <input
            id="id"
            type="text"
            autoComplete="username"
            value={id}
            onChange={(e) => setId(e.target.value)}
            required
            className="mt-1 w-full rounded-2xl bg-white/70 border border-white/90 px-4 py-3 text-inkrose placeholder:text-inkrose/40 focus:bg-white/95 focus:ring-2 focus:ring-rose/30 focus:border-rose/50 outline-none transition-all duration-300 shadow-inner"
            placeholder="Dudee>"
          />
        </div>

        <div>
          <label htmlFor="password" className="text-xs uppercase tracking-widest text-rose font-semibold">
            Password
          </label>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1 w-full rounded-2xl bg-white/70 border border-white/90 px-4 py-3 text-inkrose placeholder:text-inkrose/40 focus:bg-white/95 focus:ring-2 focus:ring-rose/30 focus:border-rose/50 outline-none transition-all duration-300 shadow-inner"
            placeholder="••••••••••"
          />
        </div>

        {error && (
          <p className="text-xs text-wine bg-blush/50 border border-rose/20 rounded-xl px-3 py-2 text-center">
            {error}
          </p>
        )}

        <GlassButton type="submit" disabled={loading} className="mt-2 self-center">
          {loading ? "Checking..." : "Enter →"}
        </GlassButton>
      </form>
    </motion.div>
  );
}
