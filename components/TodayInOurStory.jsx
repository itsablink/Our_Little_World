"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { getEntries } from "@/lib/diaryStore";
import { getMemories, fetchMemoriesFromApi } from "@/lib/messageStore";
import { getAllLeafEvents } from "@/lib/photoIndex";

function formatDate(dateStr) {
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString(undefined, { day: "numeric", month: "long", year: "numeric" });
}

export default function TodayInOurStory({ events, diarySeed, letters }) {
  const [feature, setFeature] = useState(null);

  useEffect(() => {
    async function loadPool() {
      const pool = [];

      getAllLeafEvents(events).forEach((leaf) => {
        pool.push({
          kind: "photo",
          emoji: leaf.categoryEmoji || "📸",
          title: `${leaf.label} (${leaf.year})`,
          subtitle: `${leaf.categoryLabel} memories`,
          href: leaf.driveUrl,
          external: true
        });
      });

      getEntries(diarySeed).forEach((entry) => {
        pool.push({
          kind: "diary",
          emoji: "📖",
          title: "A diary entry",
          subtitle: `${entry.heading} — ${formatDate(entry.date)}`,
          href: "/diary",
          external: false
        });
      });

      (letters || []).forEach((letter) => {
        pool.push({
          kind: "letter",
          emoji: "💌",
          title: letter.title || "A handwritten letter",
          subtitle: letter.description || "A memory in words",
          href: "/letters",
          external: false
        });
      });

      const messageMemories = await fetchMemoriesFromApi();
      const activeMemories = messageMemories && messageMemories.length > 0 ? messageMemories : getMemories([]);

      activeMemories.forEach((memory) => {
        pool.push({
          kind: "message",
          emoji: "💬",
          title: memory.title || "A special message",
          subtitle: memory.author ? `Message from ${memory.author}` : "A preserved memory in words",
          href: "/letters?tab=messages",
          external: false
        });
      });

      if (pool.length > 0) {
        setFeature(pool[Math.floor(Math.random() * pool.length)]);
      }
    }

    loadPool();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!feature) return null;

  const inner = (
    <>
      <p className="text-xs uppercase tracking-widest text-rose font-semibold mb-3">Today in Our Story ❤️</p>
      <p className="text-2xl mb-2">{feature.emoji}</p>
      <p className="font-display italic text-xl text-wine mb-2">{feature.title}</p>
      <p className="text-inkrose/70 text-sm mb-5">{feature.subtitle}</p>
      <span className="text-xs text-rose font-semibold uppercase tracking-widest">Revisit it →</span>
    </>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="glass-strong rounded-3xl shadow-glass px-7 py-8 max-w-md mx-auto text-center"
    >
      {feature.external ? (
        <a href={feature.href} target="_blank" rel="noopener noreferrer">{inner}</a>
      ) : (
        <Link href={feature.href}>{inner}</Link>
      )}
    </motion.div>
  );
}
