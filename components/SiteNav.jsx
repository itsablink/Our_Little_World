import Link from "next/link";

const LINKS = [
  { href: "/home#timeline", label: "Photos", emoji: "📸" },
  { href: "/quiz", label: "Quiz", emoji: "🎮" },
  { href: "/diary", label: "Diary", emoji: "📖" },
  { href: "/letters", label: "Letters", emoji: "💌" }
];

export default function SiteNav() {
  return (
    <nav className="glass shadow-glass rounded-full px-3 py-2 flex gap-1 flex-wrap justify-center">
      {LINKS.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs uppercase tracking-widest font-semibold text-wine hover:bg-white/60 transition-colors"
        >
          <span>{link.emoji}</span>
          <span>{link.label}</span>
        </Link>
      ))}
    </nav>
  );
}
