"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function EventCard({ event }) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="glass rounded-2xl shadow-glass text-center overflow-hidden"
    >
      <Link href={`/photos/category/${event.id}`} className="px-5 py-6 flex flex-col items-center gap-2">
        <span className="text-3xl">{event.emoji}</span>
        <p className="font-display text-lg text-wine">{event.label}</p>
        <p className="text-xs text-inkrose/60">{event.subtitle}</p>
      </Link>
    </motion.div>
  );
}
