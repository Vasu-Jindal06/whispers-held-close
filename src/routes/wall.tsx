import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/SiteShell";
import { WallCard } from "@/components/WallCard";
import { wallItems, categories } from "@/lib/wall-data";
import { useMemo, useState } from "react";

export const Route = createFileRoute("/wall")({
  head: () => ({
    meta: [
      { title: "Read the Wall — Letters Left Here" },
      { name: "description", content: "Browse the community archive — letters, confessions, advice, hopes, truths, and messages, all left by queer voices and allies." },
      { property: "og:title", content: "Read the Wall — Letters Left Here" },
      { property: "og:description", content: "A digital wall of pinned notes and letters from the Enactus Pride Month archive." },
    ],
  }),
  component: WallPage,
});

function WallPage() {
  const [filter, setFilter] = useState<string>("all");
  const items = useMemo(() => filter === "all" ? wallItems : wallItems.filter((i) => i.kind === filter), [filter]);

  return (
    <SiteShell>
      <section className="mx-auto max-w-6xl px-6 pt-16 pb-10 md:pt-24">
        <p className="eyebrow mb-4">The community wall</p>
        <h1 className="serif text-4xl md:text-6xl text-foreground leading-tight max-w-3xl">
          Read what others have left here.
        </h1>
        <p className="mt-5 text-ink-soft max-w-2xl leading-relaxed">
          Every voice on this wall agreed to be here. Some are named, most are not.
          Read slowly. Some of these took years to write down.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-2">
          {categories.map((c) => (
            <button
              key={c.key}
              onClick={() => setFilter(c.key)}
              className={`px-4 py-2 rounded-full text-sm border transition ${filter === c.key ? "bg-foreground text-background border-foreground" : "border-ink/20 text-ink-soft hover:text-foreground hover:border-foreground/50"}`}
            >
              {c.label}
            </button>
          ))}
          <Link to="/pin" className="ml-auto text-sm text-plum hover:text-foreground underline underline-offset-4">+ Add to the wall</Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="columns-1 md:columns-2 lg:columns-3 gap-7 [column-fill:_balance]">
          {items.map((item) => (
            <div key={item.id} className="break-inside-avoid mb-7">
              <WallCard item={item} />
            </div>
          ))}
        </div>

        {items.length === 0 && (
          <p className="text-center text-ink-soft py-20">Nothing pinned in this category yet. Be the first.</p>
        )}
      </section>

      <section className="bg-paper-deep/50 border-t border-border/60">
        <div className="mx-auto max-w-4xl px-6 py-20 text-center">
          <p className="hand text-2xl text-plum">your turn, if you want it.</p>
          <h2 className="serif text-3xl md:text-5xl text-foreground mt-3 leading-tight">
            The wall has space for one more.
          </h2>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/write" className="px-6 py-3.5 rounded-full bg-foreground text-background text-sm">Write a Letter</Link>
            <Link to="/pin" className="px-6 py-3.5 rounded-full border border-foreground/30 text-sm">Pin a Note</Link>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
