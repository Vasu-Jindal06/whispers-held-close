import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/SiteShell";
import { WallCard } from "@/components/WallCard";
import { wallItems, categories, collections, collectionMembers, type WallItem } from "@/lib/wall-data";
import { useEffect, useMemo, useState } from "react";

export const Route = createFileRoute("/wall")({
  head: () => ({
    meta: [
      { title: "Read the Wall — Letters Left Here" },
      { name: "description", content: "Browse the community archive — letters, confessions, advice, hopes, truths, and messages, all left by queer voices and allies." },
      { property: "og:title", content: "Read the Wall — Letters Left Here" },
      { property: "og:description", content: "A digital wall of pinned notes and letters from the Enactus VIT Chennai Pride Month archive." },
    ],
  }),
  component: WallPage,
});

const toneBg: Record<string, string> = {
  blush: "bg-[color:color-mix(in_oklab,var(--blush)_30%,var(--card))]",
  lavender: "bg-[color:color-mix(in_oklab,var(--lavender)_28%,var(--card))]",
  teal: "bg-[color:color-mix(in_oklab,var(--teal)_22%,var(--card))]",
  gold: "bg-[color:color-mix(in_oklab,var(--gold)_28%,var(--card))]",
  paper: "bg-card",
};

function WallPage() {
  const [filter, setFilter] = useState<string>("all");
  const [collection, setCollection] = useState<string | null>(null);
  const [fadeKey, setFadeKey] = useState(0);
  const [randomNote, setRandomNote] = useState<WallItem | null>(null);

  const items = useMemo(() => {
    let list: WallItem[] = wallItems;
    if (collection) {
      const ids = new Set(collectionMembers[collection] ?? []);
      list = list.filter((i) => ids.has(i.id));
    }
    if (filter !== "all") list = list.filter((i) => i.kind === filter);
    return list;
  }, [filter, collection]);

  useEffect(() => { setFadeKey((k) => k + 1); }, [filter, collection]);

  const pickRandom = () => {
    const pool = wallItems;
    const next = pool[Math.floor(Math.random() * pool.length)];
    setRandomNote(next);
  };

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

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <button
            onClick={pickRandom}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-plum/40 text-sm text-plum hover:bg-plum/5 transition"
          >
            <span aria-hidden>↻</span> Read a random note
          </button>
          {collection && (
            <button onClick={() => setCollection(null)} className="text-sm text-ink-soft hover:text-foreground underline underline-offset-4">
              ← clear collection
            </button>
          )}
        </div>
      </section>

      {/* Collections row */}
      <section className="mx-auto max-w-6xl px-6 pb-2">
        <p className="eyebrow mb-3">Collections</p>
        <div className="flex gap-4 overflow-x-auto pb-4 -mx-6 px-6 snap-x">
          {collections.map((c) => {
            const active = collection === c.key;
            const count = (collectionMembers[c.key] ?? []).length;
            return (
              <button
                key={c.key}
                onClick={() => setCollection(active ? null : c.key)}
                className={`snap-start shrink-0 w-[220px] text-left p-5 rounded-sm paper-grain transition-all duration-200 ${toneBg[c.tone]} ${
                  active ? "ring-2 ring-plum/60 -translate-y-1" : "hover:-translate-y-1.5"
                }`}
                style={{
                  boxShadow: active
                    ? "0 18px 30px -16px color-mix(in oklab, var(--ink) 35%, transparent)"
                    : "0 8px 18px -12px color-mix(in oklab, var(--ink) 22%, transparent)",
                }}
              >
                <p className="hand text-sm text-plum">voices · {count}</p>
                <h3 className="serif text-lg text-foreground mt-1 leading-snug">{c.title}</h3>
                <p className="mt-2 text-xs text-ink-soft leading-relaxed">{c.description}</p>
              </button>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pt-6 pb-4">
        <div className="flex flex-wrap items-center gap-2">
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
        <div key={fadeKey} className="columns-1 md:columns-2 lg:columns-3 gap-7 [column-fill:_balance] grid-fade-in">
          {items.map((item) => (
            <div key={item.id} className="break-inside-avoid mb-7">
              <WallCard item={item} />
            </div>
          ))}
        </div>

        {items.length === 0 && (
          <p className="text-center text-ink-soft py-20">Nothing pinned here yet. Be the first.</p>
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

      {randomNote && (
        <RandomNotePanel item={randomNote} onAnother={pickRandom} onClose={() => setRandomNote(null)} />
      )}
    </SiteShell>
  );
}

function RandomNotePanel({ item, onAnother, onClose }: { item: WallItem; onAnother: () => void; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-ink/40 backdrop-blur-sm" onClick={onClose}>
      <div
        key={item.id}
        className="panel-up w-full md:max-w-lg bg-background rounded-t-2xl md:rounded-lg p-6 md:p-8 m-0 md:m-6 max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <span className="hand text-base text-plum">pulled from the pile</span>
          <button onClick={onClose} className="text-ink-soft hover:text-foreground text-sm" aria-label="Close">✕</button>
        </div>
        <WallCard item={{ ...item, rotate: 0 }} />
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <button onClick={onAnother} className="px-5 py-2.5 rounded-full border border-foreground/30 text-sm hover:bg-foreground/5">↻ Read another</button>
          <button onClick={onClose} className="text-sm text-plum underline underline-offset-4">Read the full wall →</button>
        </div>
      </div>
    </div>
  );
}
