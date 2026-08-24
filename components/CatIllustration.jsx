export default function CatIllustration({ className = "" }) {
  return (
    <svg
      viewBox="0 0 240 260"
      className={`cat-illustration ${className}`}
      aria-hidden="true"
    >
      {/* tail */}
      <path
        className="cat-tail"
        d="M60 210 C 20 200, 10 150, 35 120 C 45 108, 60 112, 58 126 C 42 145, 48 178, 74 192 Z"
        fill="#D9A878"
      />

      {/* back feet */}
      <ellipse cx="92" cy="238" rx="17" ry="11" fill="#FFF7F0" />
      <ellipse cx="148" cy="238" rx="17" ry="11" fill="#F1C9A8" />

      {/* body */}
      <ellipse cx="120" cy="185" rx="58" ry="52" fill="#F1C9A8" />
      <ellipse cx="120" cy="200" rx="34" ry="30" fill="#FFF7F0" />

      {/* tabby stripes on body */}
      <path d="M76 165 q10 -10 22 -4" stroke="#C89468" strokeWidth="6" strokeLinecap="round" fill="none" />
      <path d="M158 168 q-10 -10 -20 -5" stroke="#C89468" strokeWidth="6" strokeLinecap="round" fill="none" />

      {/* left arm (resting) */}
      <path
        d="M78 168 C 60 150, 55 120, 68 100 C 74 92, 86 96, 84 108 C 76 122, 78 148, 92 160 Z"
        fill="#F1C9A8"
      />
      <ellipse cx="70" cy="102" rx="13" ry="11" fill="#FFF7F0" />

      {/* right arm (waving) */}
      <g className="cat-paw-right">
        <path
          d="M162 168 C 180 150, 186 118, 172 98 C 166 90, 154 94, 156 106 C 164 120, 162 148, 148 160 Z"
          fill="#F1C9A8"
        />
        <ellipse cx="172" cy="100" rx="13" ry="11" fill="#FFF7F0" />
      </g>

      {/* animated head group */}
      <g className="cat-head">
        {/* head */}
        <circle cx="120" cy="110" r="54" fill="#F1C9A8" />

        {/* ears */}
        <path d="M78 78 L64 34 L104 66 Z" fill="#F1C9A8" />
        <path d="M84 70 L76 44 L100 62 Z" fill="#F6D6DA" />
        <path d="M162 78 L176 34 L136 66 Z" fill="#F1C9A8" />
        <path d="M156 70 L164 44 L140 62 Z" fill="#F6D6DA" />

        {/* forehead stripes */}
        <path d="M104 62 L112 82" stroke="#C89468" strokeWidth="5" strokeLinecap="round" />
        <path d="M120 58 L120 80" stroke="#C89468" strokeWidth="5" strokeLinecap="round" />
        <path d="M136 62 L128 82" stroke="#C89468" strokeWidth="5" strokeLinecap="round" />

        {/* cheeks blush */}
        <ellipse cx="86" cy="122" rx="11" ry="7" fill="#F6D6DA" opacity="0.8" />
        <ellipse cx="154" cy="122" rx="11" ry="7" fill="#F6D6DA" opacity="0.8" />

        {/* eyes */}
        <g className="cat-eyes">
          <ellipse cx="100" cy="108" rx="10" ry="12" fill="#4A2A30" />
          <ellipse cx="140" cy="108" rx="10" ry="12" fill="#4A2A30" />
          <circle cx="103" cy="103" r="3" fill="#FFF7F0" />
          <circle cx="143" cy="103" r="3" fill="#FFF7F0" />
        </g>

        {/* nose + mouth */}
        <path d="M116 122 L124 122 L120 128 Z" fill="#F53163" />
        <path d="M120 128 C 116 134, 108 134, 105 128" stroke="#4A2A30" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <path d="M120 128 C 124 134, 132 134, 135 128" stroke="#4A2A30" strokeWidth="2.5" fill="none" strokeLinecap="round" />

        {/* whiskers */}
        <path d="M70 116 L40 112" stroke="#FFFFFF" strokeWidth="2" opacity="0.8" />
        <path d="M70 124 L40 126" stroke="#FFFFFF" strokeWidth="2" opacity="0.8" />
        <path d="M170 116 L200 112" stroke="#FFFFFF" strokeWidth="2" opacity="0.8" />
        <path d="M170 124 L200 126" stroke="#FFFFFF" strokeWidth="2" opacity="0.8" />
      </g>
    </svg>
  );
}
