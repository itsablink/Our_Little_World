"use client";

const SVG_SHAPES = {
  heart: { path: "M2 1h2v1h2V1h2v2h-1v1h-1v1H6v1H5v-1H4V5H3V4H2V2z", viewBox: "0 0 8 8" },
  star: { path: "M4 0h1v3h3v1H5v3H4V4H1V3h3z", viewBox: "0 0 8 8" },
  sparkle: { path: "M4 0L5 3L8 4L5 5L4 8L3 5L0 4L3 3Z", viewBox: "0 0 8 8" }
};

// Distributed across the screen height & width with negative animation delays
// so particles are IMMEDIATELY visible on page load and float continuously.
const ITEMS = [
  { id: 1, kind: "svg", shape: "heart", left: "5%", top: "12%", size: 13, delay: "-3s", duration: "18s", dx: "18px", color: "#F53163", opacity: 0.7 },
  { id: 2, kind: "emoji", text: "✨", left: "14%", top: "35%", size: 14, delay: "-7s", duration: "16s", dx: "-12px", opacity: 0.6 },
  { id: 3, kind: "svg", shape: "star", left: "24%", top: "65%", size: 11, delay: "-12s", duration: "20s", dx: "22px", color: "#E4C2C1", opacity: 0.65 },
  { id: 4, kind: "emoji", text: "💖", left: "33%", top: "20%", size: 13, delay: "-5s", duration: "19s", dx: "-18px", opacity: 0.5 },
  { id: 5, kind: "svg", shape: "sparkle", left: "44%", top: "80%", size: 12, delay: "-14s", duration: "17s", dx: "14px", color: "#D1A080", opacity: 0.6 },
  { id: 6, kind: "emoji", text: "🌸", left: "54%", top: "42%", size: 14, delay: "-9s", duration: "21s", dx: "-16px", opacity: 0.45 },
  { id: 7, kind: "svg", shape: "heart", left: "64%", top: "15%", size: 15, delay: "-2s", duration: "17s", dx: "20px", color: "#F53163", opacity: 0.75 },
  { id: 8, kind: "emoji", text: "💫", left: "74%", top: "70%", size: 13, delay: "-11s", duration: "22s", dx: "-14px", opacity: 0.55 },
  { id: 9, kind: "svg", shape: "star", left: "84%", top: "28%", size: 10, delay: "-6s", duration: "15s", dx: "16px", color: "#E4C2C1", opacity: 0.6 },
  { id: 10, kind: "emoji", text: "✨", left: "92%", top: "58%", size: 14, delay: "-15s", duration: "18s", dx: "-22px", opacity: 0.5 },
  { id: 11, kind: "svg", shape: "sparkle", left: "18%", top: "85%", size: 12, delay: "-4s", duration: "23s", dx: "15px", color: "#F53163", opacity: 0.65 },
  { id: 12, kind: "svg", shape: "heart", left: "78%", top: "45%", size: 12, delay: "-8s", duration: "19s", dx: "-15px", opacity: 0.55, color: "#D1A080" },
  { id: 13, kind: "emoji", text: "💕", left: "10%", top: "50%", size: 12, delay: "-10s", duration: "20s", dx: "10px", opacity: 0.5 },
  { id: 14, kind: "svg", shape: "star", left: "68%", top: "88%", size: 11, delay: "-13s", duration: "16s", dx: "-18px", color: "#E4C2C1", opacity: 0.6 }
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
