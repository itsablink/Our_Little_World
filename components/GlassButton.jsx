"use client";

export default function GlassButton({ children, onClick, type = "button", variant = "primary", className = "", disabled }) {
  const base = "px-7 py-3 rounded-full font-body font-semibold tracking-wide transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed";
  const styles = {
    primary: "bg-rose text-white shadow-glass hover:shadow-glow hover:-translate-y-0.5 active:translate-y-0",
    ghost: "glass text-wine hover:bg-white/70 hover:-translate-y-0.5 active:translate-y-0"
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${styles[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
