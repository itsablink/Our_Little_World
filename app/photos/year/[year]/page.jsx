import Link from "next/link";
import { notFound } from "next/navigation";
import FloatingHearts from "@/components/FloatingHearts";
import LogoutLink from "@/components/LogoutLink";
import SiteNav from "@/components/SiteNav";
import events from "@/data/events.json";
import { buildYearIndex } from "@/lib/photoIndex";

export function generateStaticParams() {
  const index = buildYearIndex(events);
  return Object.keys(index).map((year) => ({ year }));
}

export default function YearPage({ params }) {
  const year = Number(params.year);
  const index = buildYearIndex(events);
  const items = index[year];
  if (!items) notFound();

  const byCategory = {};
  for (const item of items) {
    if (!byCategory[item.categoryLabel]) byCategory[item.categoryLabel] = { emoji: item.categoryEmoji, items: [] };
    byCategory[item.categoryLabel].items.push(item);
  }

  return (
    <main className="relative min-h-screen flex flex-col items-center px-6 py-16 overflow-hidden">
      <FloatingHearts />
      <LogoutLink />
      <div className="relative z-10 mb-6">
        <SiteNav />
      </div>

      <h1 className="font-display italic text-3xl text-wine mb-2 relative z-10">{year}</h1>
      <p className="text-inkrose/60 text-sm mb-10 relative z-10">Everything from this year, across every category.</p>

      <div className="relative z-10 w-full max-w-lg flex flex-col gap-5">
        {Object.entries(byCategory).map(([categoryLabel, { emoji, items: catItems }]) => (
          <div key={categoryLabel} className="glass rounded-2xl px-5 py-4 shadow-glass">
            <p className="font-display text-lg text-wine mb-2">{emoji} {categoryLabel}</p>
            <div className="flex flex-col gap-1.5">
              {catItems.map((item) => (
                <a
                  key={item.driveUrl}
                  href={item.driveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between text-sm py-1 text-inkrose/80 hover:text-rose transition-colors"
                >
                  <span>{[...item.path, item.label].join(" → ")}</span>
                  <span className="text-rose text-xs font-semibold uppercase tracking-wide">Open →</span>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>

      <Link href="/home#timeline" className="text-xs text-inkrose/50 uppercase tracking-widest mt-10 hover:text-inkrose relative z-10">
        ← Back to Photos
      </Link>
    </main>
  );
}
