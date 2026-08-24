"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function YearCard({ album, hasEvents }) {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="glass rounded-3xl overflow-hidden shadow-glass text-left w-full max-w-xs flex flex-col"
    >
      <Link href={hasEvents ? `/photos/year/${album.id}` : "#"} className={hasEvents ? "" : "pointer-events-none"}>
        <div className="relative aspect-[4/3] bg-gradient-to-br from-blush/60 via-lilacsoft to-cream flex items-center justify-center overflow-hidden">
          <span className="font-display italic text-3xl text-wine/50">{album.label}</span>
        </div>
        <div className="px-5 py-4">
          <p className="font-display text-xl text-wine">{album.label}</p>
          <p className="text-sm text-inkrose/70 mt-1">{album.subtitle}</p>
          <p className="text-xs text-rose mt-3 font-semibold uppercase tracking-wide">
            {hasEvents ? "Open year →" : "Nothing added yet"}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
