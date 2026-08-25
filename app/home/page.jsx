import Link from "next/link";
import FloatingHearts from "@/components/FloatingHearts";
import YearCard from "@/components/YearCard";
import EventCard from "@/components/EventCard";
import LogoutLink from "@/components/LogoutLink";
import SiteNav from "@/components/SiteNav";
import TodayInOurStory from "@/components/TodayInOurStory";
import albums from "@/data/albums.json";
import events from "@/data/events.json";
import diaryEntries from "@/data/diary.json";
import letters from "@/data/letters.json";
import { buildYearIndex } from "@/lib/photoIndex";

export default function HomePage() {
  const yearIndex = buildYearIndex(events);

  return (
    <main className="relative overflow-hidden w-full min-h-screen">
      {/* Persistent Animated Full-Page Background */}
      <FloatingHearts />
      <LogoutLink />

      {/* Section 1 — Hero */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center z-10">
        <p className="font-display italic text-xl text-rose mb-3 animate-pulseSoft filter drop-shadow-[0_2px_8px_rgba(245,49,99,0.3)]">
          ♡
        </p>
        <h1 className="font-display text-4xl md:text-6xl text-wine text-shadow-soft tracking-tight mb-4">
          Our Little World
        </h1>
        <p className="text-inkrose/80 text-base md:text-lg max-w-md mb-8 leading-relaxed font-body">
          A place where our memories live, Sweetu. ✨
        </p>
        <div className="relative z-10 mb-10">
          <SiteNav />
        </div>
        <a href="#today" className="text-xs text-rose font-semibold uppercase tracking-widest animate-pulseSoft hover:opacity-80 transition-opacity">
          Scroll down ↓
        </a>
      </section>

      {/* Today in Our Story */}
      <section id="today" className="px-6 pb-20 relative z-10">
        <TodayInOurStory events={events} diarySeed={diaryEntries} letters={letters} />
      </section>

      {/* Section 2 — Timeline intro */}
      <section id="timeline" className="px-6 py-16 text-center relative z-10">
        <p className="font-display italic text-2xl md:text-3xl text-wine mb-2">Every year, another chapter</p>
        <p className="text-inkrose/60 text-sm max-w-sm mx-auto font-body">
          Tap a year to open almost everything we kept from it ›
        </p>
      </section>

      {/* Section 3 — Years */}
      <section className="px-6 pb-20 relative z-10">
        <div className="flex flex-wrap justify-center gap-6 max-w-4xl mx-auto">
          {albums.map((album) => (
            <YearCard key={album.id} album={album} hasEvents={Boolean(yearIndex[album.id])} />
          ))}
        </div>
      </section>

      {/* Section 4 — Events */}
      <section className="px-6 py-20 bg-white/30 backdrop-blur-sm relative z-10 border-y border-white/60">
        <p className="font-display italic text-2xl md:text-3xl text-wine text-center mb-2">Our Moments</p>
        <p className="text-inkrose/60 text-sm text-center max-w-sm mx-auto mb-10 font-body">
          The same memories, sorted a different way.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </section>

      {/* Section 5 — Play CTA */}
      <section className="px-6 py-20 text-center relative z-10">
        <p className="text-3xl mb-3">🎮</p>
        <p className="font-display italic text-2xl text-wine mb-1">Want to play?</p>
        <p className="text-inkrose/60 text-sm mb-6">Think you know us?</p>
        <Link
          href="/quiz"
          className="inline-block px-8 py-3 rounded-full bg-rose text-white font-semibold shadow-glass hover:shadow-[0_10px_25px_rgba(245,49,99,0.35)] hover:-translate-y-0.5 transition-all duration-300 tracking-wide text-sm"
        >
          Play Quiz →
        </Link>
      </section>

      {/* Section 6 — Diary CTA */}
      <section className="px-6 py-20 text-center bg-white/30 backdrop-blur-sm relative z-10 border-y border-white/60">
        <p className="text-3xl mb-3">📖</p>
        <p className="font-display italic text-2xl text-wine mb-1">Her Diary</p>
        <p className="text-inkrose/60 text-sm mb-6 max-w-sm mx-auto">A few pages, written just for us.</p>
        <Link
          href="/diary"
          className="inline-block px-8 py-3 rounded-full bg-rose text-white font-semibold shadow-glass hover:shadow-[0_10px_25px_rgba(245,49,99,0.35)] hover:-translate-y-0.5 transition-all duration-300 tracking-wide text-sm"
        >
          Open Diary →
        </Link>
      </section>

      {/* Section 7 — Letters CTA */}
      <section className="px-6 py-20 text-center relative z-10">
        <p className="text-3xl mb-3">💌</p>
        <p className="font-display italic text-2xl text-wine mb-1">Letters & Messages</p>
        <p className="text-inkrose/60 text-sm mb-6 max-w-sm mx-auto">Handwritten letters and the special texts we kept.</p>
        <Link
          href="/letters"
          className="inline-block px-8 py-3 rounded-full bg-rose text-white font-semibold shadow-glass hover:shadow-[0_10px_25px_rgba(245,49,99,0.35)] hover:-translate-y-0.5 transition-all duration-300 tracking-wide text-sm"
        >
          Open Letters & Messages →
        </Link>
      </section>

      {/* Section 8 — Anniversary message frame */}
      <section className="px-6 pb-24 pt-8 text-center relative z-10 flex justify-center">
        <div className="glass-strong rounded-[32px] shadow-[0_20px_50px_rgba(245,49,99,0.12)] border border-white/80 px-8 py-10 max-w-xl text-center backdrop-blur-xl relative overflow-hidden">
          <div className="flex justify-center mb-3">
            <span className="text-2xl animate-pulseSoft">💖</span>
          </div>
          <p className="font-display italic text-inkrose/85 text-base md:text-lg leading-relaxed mb-4 text-balance">
            "I know I might have left a lot of cute pics and clicks of us ofc. Tbh, it's kinda not possible to condense 4 complete years of <span className="inline-block">us › (thu thu thu🧿)</span> to just a drive or website. But yaa here it is just a small gift to u sweetie — <span className="inline-block">Happy Anni Dudee › ❤️✨"</span>
          </p>
          <div className="h-px bg-wine/15 w-1/2 mx-auto my-4" />
          <p className="font-display italic text-wine font-semibold text-sm md:text-base text-balance">
            Let's keep growing together and expanding our happy memories to the <span className="inline-block">fullest › 🧿</span>
          </p>
        </div>
      </section>
    </main>
  );
}
