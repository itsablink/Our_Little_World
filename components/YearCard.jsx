"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function YearCard({ album, hasEvents }) {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="glass rounded-3xl overflow-hidden shadow-glass hover:shadow-[0_15px_35px_rgba(245,49,99,0.16)] border border-white/80 transition-shadow duration-300 text-left w-full max-w-xs flex flex-col"
    >
      <Link href={hasEvents ? `/photos/year/${album.id}` : "#"} className={hasEvents ? "" : "pointer-events-none"}>
        <div className="relative aspect-[4/3] bg-gradient-to-br from-blush/70 via-lilacsoft/80 to-cream flex items-center justify-center overflow-hidden group">
          <span className="font-display italic text-4xl text-wine/40 group-hover:text-rose/70 transition-colors duration-300 transform group-hover:scale-105">
            {album.label}
          </span>
          <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        <div className="px-5 py-4 bg-white/40 backdrop-blur-sm">
          <p className="font-display text-xl text-wine">{album.label}</p>
          <p className="text-sm text-inkrose/70 mt-1 leading-snug">{album.subtitle}</p>
          <p className="text-xs text-rose mt-3 font-semibold uppercase tracking-wide group-hover:translate-x-1 transition-transform">
            {hasEvents ? "Open year →" : "Nothing added yet"}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
