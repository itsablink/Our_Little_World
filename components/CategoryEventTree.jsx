"use client";

import { motion } from "framer-motion";

// Renders one level of a category's event tree. Groups (items with their own
// `events`) render as a labeled cluster; leaves (items with `year` +
// `driveUrl`) render as a clickable card that opens the Drive folder.
export default function CategoryEventTree({ items, depth = 0 }) {
  return (
    <div className={depth === 0 ? "grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl" : "flex flex-col gap-2 mt-2 pl-4 border-l border-wine/15 w-full"}>
      {items.map((item, i) =>
        item.events ? (
          <div key={item.label} className={depth === 0 ? "glass rounded-2xl px-5 py-4 shadow-glass" : ""}>
            <p className="font-display text-base text-wine mb-1">{item.label}</p>
            <CategoryEventTree items={item.events} depth={depth + 1} />
          </div>
        ) : (
          <motion.a
            key={`${item.label}-${item.year}`}
            href={item.driveUrl}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.04 }}
            whileHover={{ x: depth === 0 ? 0 : 4, y: depth === 0 ? -3 : 0 }}
            className={
              depth === 0
                ? "glass rounded-2xl px-5 py-4 shadow-glass flex items-center justify-between hover:bg-white/70 transition-colors"
                : "flex items-center justify-between text-sm py-1.5 hover:text-rose transition-colors"
            }
          >
            <span className={depth === 0 ? "font-display text-base text-wine" : "text-inkrose/80"}>
              {item.label} <span className="text-inkrose/50 text-xs">({item.year})</span>
            </span>
            <span className="text-rose text-xs font-semibold uppercase tracking-wide">Open →</span>
          </motion.a>
        )
      )}
    </div>
  );
}
