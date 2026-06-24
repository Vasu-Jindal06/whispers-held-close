import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/SiteShell";
import { WallCard } from "@/components/WallCard";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { categoryMap } from "./write";
import { WallItem } from "@/lib/wall-data";
import { MarginNote } from "@/components/MarginNote";

export const Route = createFileRoute("/wall")({
  head: () => ({
    meta: [
      { title: "Read the Wall — Letters Left Here" },
      { name: "description", content: "Browse the community archive — letters, confessions, advice, hopes, truths, and messages, all left by queer voices and allies." },
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

// Map DB categories to visual labels
const filterCategories = [
  { key: "all", label: "Everything" },
  { key: "letter", label: "Letters" },
  { key: "anonymous_confession", label: "Confessions" },
  { key: "younger_self", label: "Advice" },
  { key: "one_line_truth", label: "Truths" },
  { key: "hope_for_future", label: "Hopes" },
  { key: "message_to_family", label: "Family" },
  { key: "ally_experience", label: "Ally" },
];

function WallPage() {
  const [filter, setFilter] = useState<string>("all");
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<WallItem[]>([]);
  const [randomNote, setRandomNote] = useState<WallItem | null>(null);

  useEffect(() => {
    async function fetchWall() {
      setLoading(true);
      try {
        const [lettersRes, notesRes] = await Promise.all([
          supabase.from('letters').select('*').eq('status', 'approved').eq('allow_public_display', true),
          supabase.from('notes').select('*').eq('status', 'approved').eq('allow_public_display', true)
        ]);

        const lettersData = lettersRes.data || [];
        const notesData = notesRes.data || [];

        const tones = ["blush", "lavender", "teal", "gold", "paper", "lilac", "rose"];
        const attaches = ["paperclip", "tape", "tape-corner", "pin"];

        const mappedLetters: WallItem[] = lettersData.map(l => {
           // deterministically pseudo-random visual attributes based on id length/chars
           const idHash = l.id.split('').reduce((acc: number, char: string) => acc + char.charCodeAt(0), 0);
           return {
             id: l.id,
             kind: "letter",
             label: categoryMap[l.category] || "Archive Entry",
             title: l.title,
             body: l.body,
             author: l.display_name || "Anonymous",
             fullLetter: true,
             tone: tones[idHash % tones.length] as any,
             attach: attaches[idHash % attaches.length] as any,
             rotate: (idHash % 7) - 3, // -3 to 3
             featured: l.featured,
             created_at: l.created_at
           };
        });

        const mappedNotes: WallItem[] = notesData.map(n => {
           const idHash = n.id.split('').reduce((acc: number, char: string) => acc + char.charCodeAt(0), 0);
           return {
             id: n.id,
             kind: n.category || "confession", // we use category for filter matching
             label: categoryMap[n.category] || "Note",
             body: n.note_text,
             author: n.display_name || "Anonymous",
             tone: tones[idHash % tones.length] as any,
             attach: attaches[idHash % attaches.length] as any,
             rotate: (idHash % 7) - 3,
             featured: n.featured,
             created_at: n.created_at
           };
        });

        // Sort by created_at desc
        const combined = [...mappedLetters, ...mappedNotes].sort((a, b) => 
          new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime()
        );
        
        setItems(combined);
      } catch (e) {
        console.error("Error fetching wall:", e);
      } finally {
        setLoading(false);
      }
    }
    fetchWall();
  }, []);

  const filteredItems = useMemo(() => {
    let list = items;
    if (filter !== "all") {
       if (filter === "letter") list = list.filter(i => i.kind === "letter");
       else list = list.filter(i => i.kind === filter || (i.kind === "letter" && items.find(x => x.id === i.id)?.label === categoryMap[filter]));
    }
    return list;
  }, [filter, items]);

  const pickRandom = () => {
    if (filteredItems.length === 0) return;
    const pool = filteredItems;
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
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pt-6 pb-4 relative">
        <MarginNote text="read slowly." rotate={-1} className="-top-2 right-6" />
        <div className="flex flex-wrap items-center gap-2">
          {filterCategories.map((c) => (
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
        {loading ? (
          <div className="text-center py-20">
             <p className="text-ink-soft animate-pulse">Loading approved entries...</p>
          </div>
        ) : (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-7 [column-fill:_balance] grid-fade-in relative">
            <MarginNote text="left here anonymously" rotate={1.5} className="-left-10 top-1/3" />
            <MarginNote icon="heart" className="left-1/2 top-[45%]" />
            {filteredItems.map((item) => (
              <div key={item.id} className="break-inside-avoid mb-7">
                <WallCard item={item} />
              </div>
            ))}
          </div>
        )}

        {!loading && filteredItems.length === 0 && (
          <p className="text-center text-ink-soft py-20">No public entries yet. Be the first.</p>
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
