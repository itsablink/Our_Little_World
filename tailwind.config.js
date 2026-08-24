/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        cream: "#FEF2F2",
        blush: "#E4C2C1",
        rose: "#F53163",
        wine: "#8A4A52",
        lilac: "#D1A080",
        lilacsoft: "#ECDCC7",
        inkrose: "#5C2E33"
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"]
      },
      boxShadow: {
        glass: "0 8px 32px rgba(107, 63, 76, 0.12)",
        glow: "0 0 40px rgba(243, 182, 192, 0.45)"
      },
      backdropBlur: {
        xs: "2px"
      },
      keyframes: {
        floaty: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-14px) rotate(4deg)" }
        },
        drift: {
          "0%": { transform: "translate(0,0) rotate(0deg)", opacity: "0" },
          "10%": { opacity: "0.9" },
          "90%": { opacity: "0.9" },
          "100%": { transform: "translate(var(--dx), -120vh) rotate(20deg)", opacity: "0" }
        },
        pulseSoft: {
          "0%, 100%": { opacity: "0.6", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.04)" }
        },
        blobDrift: {
          "0%, 100%": { transform: "translate(0px, 0px) scale(1)" },
          "33%": { transform: "translate(40px, -46px) scale(1.12)" },
          "66%": { transform: "translate(-32px, 32px) scale(0.94)" }
        },
        catBob: {
          "0%, 100%": { transform: "translateY(0px) rotate(-2deg)" },
          "50%": { transform: "translateY(-10px) rotate(2deg)" }
        }
      },
      animation: {
        floaty: "floaty 6s ease-in-out infinite",
        drift: "drift 14s linear infinite",
        pulseSoft: "pulseSoft 3s ease-in-out infinite",
        blobDrift: "blobDrift 24s ease-in-out infinite",
        catBob: "catBob 6s ease-in-out infinite"
      }
    }
  },
  plugins: []
};
