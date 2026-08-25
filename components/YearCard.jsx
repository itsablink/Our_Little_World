"use client";

import Link from "next/link";
import { motion } from "framer-motion";

function getDriveDirectImageUrl(url) {
  if (!url) return "";
  const match = url.match(/\/d\/([^/]+)/);
  if (match && match[1]) {
    return `https://lh3.googleusercontent.com/d/${match[1]}`;
  }
  return url;
}

export default function YearCard({ album, hasEvents }) {
  const imageUrl = getDriveDirectImageUrl(album.bgImage);

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="glass rounded-3xl overflow-hidden shadow-glass hover:shadow-[0_15px_35px_rgba(245,49,99,0.16)] border border-white/80 transition-shadow duration-300 text-left w-full max-w-xs flex flex-col group"
    >
      <Link href={hasEvents ? `/photos/year/${album.id}` : "#"} className={hasEvents ? "" : "pointer-events-none"}>
        <div className="relative aspect-[4/3] overflow-hidden flex items-center justify-center bg-gradient-to-br from-blush/70 via-lilacsoft/80 to-cream">
          {imageUrl && (
            <img
              src={imageUrl}
              alt={`${album.label} background`}
              loading="lazy"
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover transition-all duration-500 ease-out group-hover:scale-[1.05] group-hover:brightness-75 group-active:scale-[1.05] group-active:brightness-75"
            />
          )}
          {/* Subtle translucent overlay retaining cream/pink/lavender aesthetic */}
          <div className="absolute inset-0 bg-gradient-to-br from-blush/40 via-lilacsoft/30 to-cream/40 mix-blend-overlay transition-opacity duration-300 group-hover:opacity-80" />
          <div className="absolute inset-0 bg-wine/15 transition-opacity duration-300 group-hover:bg-wine/30" />

          {/* Year typography */}
          <span className="relative z-10 font-display italic text-4xl text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)] group-hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.8)] transition-all duration-300 transform group-hover:scale-105 select-none">
            {album.label}
          </span>
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
