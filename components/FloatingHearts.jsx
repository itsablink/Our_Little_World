"use client";

const SVG_SHAPES = {
  heart: { path: "M2 1h2v1h2V1h2v2h-1v1h-1v1H6v1H5v-1H4V5H3V4H2V2z", viewBox: "0 0 8 8" },
  star: { path: "M4 0h1v3h3v1H5v3H4V4H1V3h3z", viewBox: "0 0 8 8" },
  sparkle: { path: "M4 0L5 3L8 4L5 5L4 8L3 5L0 4L3 3Z", viewBox: "0 0 8 8" }
};

// Distributed across the ENTIRE page height (0% to 100%) with negative animation delays
// so particles are IMMEDIATELY visible on page load and float continuously while scrolling down.
const ITEMS = [
  // Top / Hero section (0% - 20%)
  { id: 1, kind: "svg", shape: "heart", left: "5%", top: "3%", size: 14, delay: "-3s", duration: "18s", dx: "18px", color: "#F53163", opacity: 0.7 },
  { id: 2, kind: "emoji", text: "✨", left: "88%", top: "6%", size: 14, delay: "-7s", duration: "16s", dx: "-12px", opacity: 0.6 },
  { id: 3, kind: "svg", shape: "star", left: "22%", top: "10%", size: 12, delay: "-12s", duration: "20s", dx: "22px", color: "#E4C2C1", opacity: 0.65 },
  { id: 4, kind: "emoji", text: "💖", left: "76%", top: "14%", size: 13, delay: "-5s", duration: "19s", dx: "-18px", opacity: 0.55 },
  { id: 5, kind: "svg", shape: "sparkle", left: "44%", top: "18%", size: 13, delay: "-14s", duration: "17s", dx: "14px", color: "#D1A080", opacity: 0.6 },

  // Today in Our Story & Timeline Intro (20% - 40%)
  { id: 6, kind: "emoji", text: "🌸", left: "12%", top: "22%", size: 15, delay: "-9s", duration: "21s", dx: "-16px", opacity: 0.5 },
  { id: 7, kind: "svg", shape: "heart", left: "92%", top: "26%", size: 14, delay: "-2s", duration: "17s", dx: "20px", color: "#F53163", opacity: 0.7 },
  { id: 8, kind: "emoji", text: "💫", left: "30%", top: "30%", size: 13, delay: "-11s", duration: "22s", dx: "-14px", opacity: 0.55 },
  { id: 9, kind: "svg", shape: "star", left: "82%", top: "34%", size: 11, delay: "-6s", duration: "15s", dx: "16px", color: "#E4C2C1", opacity: 0.6 },
  { id: 10, kind: "emoji", text: "✨", left: "6%", top: "38%", size: 14, delay: "-15s", duration: "18s", dx: "-22px", opacity: 0.55 },

  // Years & Photo Moments (40% - 60%)
  { id: 11, kind: "svg", shape: "sparkle", left: "68%", top: "42%", size: 13, delay: "-4s", duration: "23s", dx: "15px", color: "#F53163", opacity: 0.65 },
  { id: 12, kind: "svg", shape: "heart", left: "24%", top: "46%", size: 13, delay: "-8s", duration: "19s", dx: "-15px", opacity: 0.6, color: "#D1A080" },
  { id: 13, kind: "emoji", text: "💕", left: "86%", top: "50%", size: 13, delay: "-10s", duration: "20s", dx: "10px", opacity: 0.55 },
  { id: 14, kind: "svg", shape: "star", left: "14%", top: "54%", size: 12, delay: "-13s", duration: "16s", dx: "-18px", color: "#E4C2C1", opacity: 0.65 },
  { id: 15, kind: "emoji", text: "✨", left: "74%", top: "58%", size: 14, delay: "-1s", duration: "18s", dx: "20px", opacity: 0.6 },

  // Quiz & Diary Sections (60% - 80%)
  { id: 16, kind: "svg", shape: "heart", left: "8%", top: "62%", size: 14, delay: "-16s", duration: "17s", dx: "-14px", color: "#F53163", opacity: 0.7 },
  { id: 17, kind: "emoji", text: "🌸", left: "90%", top: "66%", size: 14, delay: "-5s", duration: "21s", dx: "16px", opacity: 0.5 },
  { id: 18, kind: "svg", shape: "sparkle", left: "32%", top: "70%", size: 12, delay: "-18s", duration: "19s", dx: "-18px", color: "#D1A080", opacity: 0.6 },
  { id: 19, kind: "emoji", text: "💖", left: "64%", top: "74%", size: 14, delay: "-8s", duration: "17s", dx: "15px", opacity: 0.6 },
  { id: 20, kind: "svg", shape: "star", left: "18%", top: "78%", size: 13, delay: "-3s", duration: "22s", dx: "-20px", color: "#E4C2C1", opacity: 0.65 },

  // Letters & Anniversary Message (80% - 100%)
  { id: 21, kind: "emoji", text: "💫", left: "84%", top: "82%", size: 13, delay: "-12s", duration: "18s", dx: "18px", opacity: 0.55 },
  { id: 22, kind: "svg", shape: "heart", left: "10%", top: "86%", size: 15, delay: "-7s", duration: "20s", dx: "-16px", color: "#F53163", opacity: 0.7 },
  { id: 23, kind: "emoji", text: "✨", left: "72%", top: "90%", size: 14, delay: "-14s", duration: "16s", dx: "12px", opacity: 0.6 },
  { id: 24, kind: "svg", shape: "sparkle", left: "38%", top: "94%", size: 13, delay: "-2s", duration: "24s", dx: "-15px", color: "#D1A080", opacity: 0.65 },
  { id: 25, kind: "emoji", text: "💕", left: "91%", top: "97%", size: 13, delay: "-9s", duration: "19s", dx: "14px", opacity: 0.55 }
];

export default function FloatingHearts({ className = "" }) {
  return (
    <div className={`floating-hearts-layer ${className}`} aria-hidden="true">
      {ITEMS.map((item) => {
        const style = {
          position: "absolute",
          left: item.left,
          top: item.top,
          animation: `instantFloat ${item.duration} ease-in-out infinite alternate`,
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
