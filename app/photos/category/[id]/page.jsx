import Link from "next/link";
import { notFound } from "next/navigation";
import FloatingHearts from "@/components/FloatingHearts";
import LogoutLink from "@/components/LogoutLink";
import SiteNav from "@/components/SiteNav";
import CategoryEventTree from "@/components/CategoryEventTree";
import events from "@/data/events.json";
import { getCategoryById } from "@/lib/photoIndex";

export function generateStaticParams() {
  return events.map((c) => ({ id: c.id }));
}

export default function CategoryPage({ params }) {
  const category = getCategoryById(events, params.id);
  if (!category) notFound();

  return (
    <main className="relative min-h-screen flex flex-col items-center px-6 py-16 overflow-hidden">
      <FloatingHearts />
      <LogoutLink />
      <div className="relative z-10 mb-6">
        <SiteNav />
      </div>

      <p className="text-3xl mb-2 relative z-10">{category.emoji}</p>
      <h1 className="font-display italic text-3xl text-wine mb-2 relative z-10">{category.label}</h1>
      <p className="text-inkrose/60 text-sm mb-2 relative z-10">{category.subtitle}</p>
      {category.driveUrl && (
        <a
          href={category.driveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-rose font-semibold uppercase tracking-widest mb-8 relative z-10"
        >
          Open full {category.label} folder →
        </a>
      )}

      <div className="relative z-10 w-full flex justify-center">
        <CategoryEventTree items={category.events || []} />
      </div>

      <Link href="/home#timeline" className="text-xs text-inkrose/50 uppercase tracking-widest mt-10 hover:text-inkrose relative z-10">
        ← Back to Photos
      </Link>
    </main>
  );
}
