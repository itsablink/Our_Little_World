"use client";

const SVG_SHAPES = {
  heart: { path: "M2 1h2v1h2V1h2v2h-1v1h-1v1H6v1H5v-1H4V5H3V4H2V2z", viewBox: "0 0 8 8" },
  star: { path: "M4 0h1v3h3v1H5v3H4V4H1V3h3z", viewBox: "0 0 8 8" },
  sparkle: { path: "M4 0L5 3L8 4L5 5L4 8L3 5L0 4L3 3Z", viewBox: "0 0 8 8" }
};

const ITEMS = [
  { id: 1, kind: "svg", shape: "heart", left: "6%", size: 12, delay: "0s", duration: "16s", dx: "20px", color: "#F53163" },
  { id: 2, kind: "emoji", text: "✨", left: "14%", size: 14, delay: "2s", duration: "18s", dx: "-15px", opacity: 0.5 },
  { id: 3, kind: "svg", shape: "star", left: "22%", size: 10, delay: "4s", duration: "15s", dx: "25px", color: "#E4C2C1" },
  { id: 4, kind: "emoji", text: "💖", left: "33%", size: 13, delay: "1.5s", duration: "20s", dx: "-20px", opacity: 0.45 },
  { id: 5, kind: "svg", shape: "sparkle", left: "42%", size: 11, delay: "5s", duration: "17s", dx: "15px", color: "#D1A080" },
  { id: 6, kind: "emoji", text: "🌸", left: "52%", size: 14, delay: "3s", duration: "19s", dx: "-18px", opacity: 0.4 },
  { id: 7, kind: "svg", shape: "heart", left: "63%", size: 14, delay: "1s", duration: "16s", dx: "22px", color: "#F53163" },
  { id: 8, kind: "emoji", text: "💫", left: "73%", size: 13, delay: "6s", duration: "21s", dx: "-12px", opacity: 0.5 },
  { id: 9, kind: "svg", shape: "star", left: "83%", size: 9, delay: "2.5s", duration: "14s", dx: "18px", color: "#E4C2C1" },
  { id: 10, kind: "emoji", text: "✨", left: "91%", size: 14, delay: "4.5s", duration: "18s", dx: "-25px", opacity: 0.45 },
  { id: 11, kind: "svg", shape: "sparkle", left: "18%", size: 12, delay: "8s", duration: "22s", dx: "16px", color: "#F53163" },
  { id: 12, kind: "svg", shape: "heart", left: "77%", size: 11, delay: "7.5s", duration: "17s", dx: "-14px", opacity: 0.5, color: "#D1A080" }
];

/**
 * Tasteful, romantic floating background containing pixel hearts, stars,
 * sparkles, and subtle floating emojis. Purely decorative & lightweight.
 */
export default function FloatingHearts({ className = "" }) {
  return (
    <div className={`floating-hearts-layer ${className}`} aria-hidden="true">
      {ITEMS.map((item) => {
        const style = {
          position: "absolute",
          left: item.left,
          bottom: "-5%",
          animation: `drift ${item.duration} linear infinite`,
          animationDelay: item.delay,
          "--dx": item.dx,
          opacity: item.opacity || 0.65
        };

        if (item.kind === "emoji") {
          return (
            <span
              key={item.id}
              style={{
                ...style,
                fontSize: `${item.size}px`,
                userSelect: "none"
              }}
            >
              {item.text}
            </span>
          );
        }

        const shape = SVG_SHAPES[item.shape];
        return (
          <svg
            key={item.id}
            viewBox={shape.viewBox}
            width={item.size}
            height={item.size}
            style={style}
          >
            <path d={shape.path} fill={item.color} shapeRendering="crispEdges" />
          </svg>
        );
      })}
    </div>
  );
}
