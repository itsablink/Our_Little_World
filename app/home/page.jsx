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
    <main className="relative">
      <LogoutLink />

      {/* Section 1 — Hero */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center overflow-hidden">
        <FloatingHearts />
        <p className="font-display italic text-lg text-rose mb-3">♡</p>
        <h1 className="font-display text-4xl md:text-6xl text-wine text-shadow-soft mb-4">
          Our Little World
        </h1>
        <p className="text-inkrose/70 max-w-md mb-8">
          A place where our memories live, Sweetu.
        </p>
        <div className="relative z-10 mb-10">
          <SiteNav />
        </div>
        <a href="#today" className="text-sm text-rose font-semibold uppercase tracking-widest animate-pulseSoft">
          Scroll down ↓
        </a>
      </section>

      {/* Today in Our Story */}
      <section id="today" className="px-6 pb-20">
        <TodayInOurStory events={events} diarySeed={diaryEntries} letters={letters} />
      </section>

      {/* Section 2 — Timeline intro */}
      <section id="timeline" className="px-6 py-20 text-center">
        <p className="font-display italic text-2xl text-wine mb-2">Every year, another chapter</p>
        <p className="text-inkrose/60 max-w-sm mx-auto">
          Tap a year to open almost everything we kept from it&gt;
        </p>
      </section>

      {/* Section 3 — Years */}
      <section className="px-6 pb-20">
        <div className="flex flex-wrap justify-center gap-6 max-w-4xl mx-auto">
          {albums.map((album) => (
            <YearCard key={album.id} album={album} hasEvents={Boolean(yearIndex[album.id])} />
          ))}
        </div>
      </section>

      {/* Section 4 — Events */}
      <section className="px-6 py-20 bg-white/30">
        <p className="font-display italic text-2xl text-wine text-center mb-2">Our Moments</p>
        <p className="text-inkrose/60 text-center max-w-sm mx-auto mb-10">
          The same memories, sorted a different way.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </section>

      {/* Section 5 — Play CTA */}
      <section className="px-6 py-24 text-center">
        <p className="text-3xl mb-4">🎮</p>
        <p className="font-display italic text-2xl text-wine mb-2">Want to play?</p>
        <p className="text-inkrose/60 mb-8">Think you know us?</p>
        <Link
          href="/quiz"
          className="inline-block px-8 py-3 rounded-full bg-rose text-white font-semibold shadow-glass hover:shadow-glow hover:-translate-y-0.5 transition-all duration-300"
        >
          Play
        </Link>
      </section>

      {/* Section 6 — Diary CTA */}
      <section className="px-6 py-24 text-center bg-white/30">
        <p className="text-3xl mb-4">📖</p>
        <p className="font-display italic text-2xl text-wine mb-2">Her Diary</p>
        <p className="text-inkrose/60 mb-8 max-w-sm mx-auto">A few pages, written just for us.</p>
        <Link
          href="/diary"
          className="inline-block px-8 py-3 rounded-full bg-rose text-white font-semibold shadow-glass hover:shadow-glow hover:-translate-y-0.5 transition-all duration-300"
        >
          Open Diary
        </Link>
      </section>

      {/* Section 7 — Letters CTA */}
      <section className="px-6 py-24 text-center">
        <p className="text-3xl mb-4">💌</p>
        <p className="font-display italic text-2xl text-wine mb-2">Letters</p>
        <p className="text-inkrose/60 mb-8 max-w-sm mx-auto">Handwritten letters and the messages we kept.</p>
        <Link
          href="/letters"
          className="inline-block px-8 py-3 rounded-full bg-rose text-white font-semibold shadow-glass hover:shadow-glow hover:-translate-y-0.5 transition-all duration-300"
        >
          Open Letters
        </Link>
      </section>

      {/* Section 8 — Anniversary message */}
      <section className="px-6 pb-24 pt-4 text-center">
        <p className="font-display italic text-inkrose/70 text-sm md:text-base leading-relaxed max-w-xl mx-auto">
          I know I might have left a lot of cute pics and clicks of us ofc. Tbh, it's kinda not possible to condense 4 complete years of us&gt; (thu thu thu🧿) to just a drive or website. But yaa here it is just a small gift to u sweetie —  Happy Anni Dudee&gt;❤️✨
          <br /><br />
          Let's keep growing together and expanding our happy memories to the fullest&gt;🧿
        </p>
      </section>
    </main>
  );
}
