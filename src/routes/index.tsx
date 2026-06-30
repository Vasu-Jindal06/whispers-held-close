import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/SiteShell";
import { WallCard } from "@/components/WallCard";
import { wallItems, voicesBeyond, marqueeLines } from "@/lib/wall-data";
import { useEffect, useState } from "react";
import paperclipImg from "@/assets/paperclip.png";
import stampImg from "@/assets/stamp.png";
import flowerImg from "@/assets/flower.png";
import qConnectImg from "@/assets/qconnect-logo.png";
import { supabase } from "@/integrations/supabase/client";
import { categoryMap } from "./write";
import type { WallItem } from "@/lib/wall-data";
import { MarginNote } from "@/components/MarginNote";
import { PaperPlaneAmbient } from "@/components/PaperPlaneAmbient";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Letters Left Here — An Enactus VIT Chennai Pride Archive" },
      { name: "description", content: "A quiet digital archive of queer voices. Write a letter, pin a note, or read the wall. Share only what feels safe." },
      { property: "og:title", content: "Letters Left Here — An Enactus VIT Chennai Pride Archive" },
      { property: "og:description", content: "Anonymous, consent-first storytelling for Pride Month — hosted by Enactus VIT Chennai." },
    ],
  }),
  component: HomePage,
});

const rotatingLines = [
  "I thought I had to wait to be brave.",
  "I'm still figuring it out.",
  "I wish my family knew this wasn't a phase.",
  "Some truths are easier to write than say aloud.",
  "I came out to my dog first. He took it well.",
  "Questioning is a whole identity, too.",
];

const trustCards = [
  { title: "You can stay anonymous", body: "No name required. Ever. You decide what gets attached to your words." },
  { title: "You choose where it appears", body: "Website archive, social, print, or kept entirely private — your call, line by line." },
  { title: "You don't need a full story", body: "One sentence is enough. A fragment is enough. Showing up is enough." },
  { title: "You don't need to be 'out'", body: "Closeted, questioning, somewhere in between — this space holds you the same." },
  { title: "Nothing posts without consent", body: "Every submission is reviewed and only published with the permissions you set." },
  { title: "You can ask us to remove it", body: "Change your mind tomorrow, next month, in a year. Write to us — we'll take it down." },
];

const categories = [
  { title: "Coming out story", prompt: "The version you've told. Or the one you never have." },
  { title: "Acceptance / rejection", prompt: "Who held you, who didn't, who surprised you." },
  { title: "To my younger self", prompt: "What do you wish someone had told you sooner?" },
  { title: "Message to family", prompt: "What do you wish they understood?" },
  { title: "Anonymous confession", prompt: "Something you've never said aloud." },
  { title: "Ally experience", prompt: "What you learned, what you unlearned." },
  { title: "Myth to debunk", prompt: "What do people always get wrong?" },
  { title: "Hope for the future", prompt: "What would 'better' actually look like?" },
];

function HomePage() {
  return (
    <SiteShell>
      <Hero />
      <MarginNote icon="stars" className="left-[20%] -mt-8" />
      <Marquee />
      <TrustBlock />
      <CategoriesBlock />
      <ArchivePreview />
      <FinalCTA />
      <VoicesBeyond />
      <WhyBlock />
      <CollaboratorsBlock />
      <MarginNote icon="stars" className="left-[30%] -mt-10" opacity={40} />
    </SiteShell>
  );
}

function Marquee() {
  const items = [...marqueeLines, ...marqueeLines];
  return (
    <section className="bg-paper-deep/60 border-y border-border/50 overflow-hidden marquee-pause">
      <div className="marquee-mask py-5">
        <div className="marquee-track flex gap-10 whitespace-nowrap w-max">
          {items.map((line, i) => (
            <span key={i} className="serif italic text-lg md:text-xl text-ink/80 inline-flex items-center gap-10">
              "{line}"
              <span aria-hidden className="text-plum/60">·</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function Hero() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % rotatingLines.length), 3800);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative mx-auto max-w-6xl px-6 pt-16 pb-24 md:pt-24 md:pb-32 overflow-hidden">
      <PaperPlaneAmbient />
      <div className="grid md:grid-cols-12 gap-10 md:gap-12 items-start relative z-10">
        {/* LEFT — editorial copy */}
        <div className="md:col-span-7">
          <p className="eyebrow mb-6">An Enactus VIT Chennai Pride Archive · 2026</p>
          <h1 className="serif text-5xl md:text-7xl leading-[1.02] tracking-tight text-foreground">
            Some truths are <em className="text-plum">easier to write</em> than say aloud.
          </h1>
          <p className="mt-7 max-w-xl text-lg text-ink-soft leading-relaxed">
            Letters Left Here is a quiet digital archive of queer voices — coming out
            stories, anonymous confessions, advice to younger selves, messages to family,
            and small hopes for what comes next. You can write a letter, pin a note,
            or simply read the wall.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3 relative">
            {/* Left side stickers */}
            <div className="absolute -left-12 -top-6 text-plum opacity-60 rotate-[-15deg] pointer-events-none">
               <span className="text-2xl">❀</span>
            </div>
            <img src={flowerImg} alt="" className="absolute -left-20 bottom-0 w-16 opacity-40 mix-blend-multiply rotate-[25deg] pointer-events-none" />

            {/* Links */}
            <Link to="/write" className="relative px-6 py-3.5 rounded-full bg-foreground text-background text-sm font-medium hover:opacity-90 transition z-10">
              Write a Letter
            </Link>
            <Link to="/pin" className="relative px-6 py-3.5 rounded-full border border-foreground/30 text-foreground text-sm font-medium hover:bg-foreground/5 transition z-10 bg-background/50 backdrop-blur-sm">
              Pin a Note
            </Link>
            <Link to="/wall" className="relative px-6 py-3.5 rounded-full text-foreground text-sm font-medium hover:bg-foreground/5 transition z-10 bg-background/50 backdrop-blur-sm">
              Read the Wall →
            </Link>

            {/* Right side stickers */}
            <div className="absolute -right-6 top-1 text-gold opacity-80 rotate-[10deg] pointer-events-none">
               <span className="text-3xl">✧</span>
            </div>
            <img src={stampImg} alt="" className="absolute -right-16 -bottom-8 w-14 opacity-50 mix-blend-multiply rotate-[-20deg] pointer-events-none" />
            <div className="absolute -right-24 top-2 rotate-[5deg] opacity-70 pointer-events-none">
               <span className="archive-stamp !text-[0.5rem] !border-plum/40 !text-plum/80">PRIDE 2026</span>
            </div>
          </div>
          <Link to="/privacy" className="inline-block mt-5 text-sm text-ink-soft hover:text-foreground underline underline-offset-4 decoration-dotted">
            How privacy works →
          </Link>
        </div>

        {/* RIGHT — tactile archive collage */}
        <div className="md:col-span-5 relative min-h-[520px] md:min-h-[600px]">
          <MarginNote text="some things are easier to write" rotate={-1.5} icon="arrow" className="-right-16 top-[28%]" />
          {/* back kraft envelope */}
          <div
            className="absolute top-16 right-0 w-[80%] h-52 rounded-sm paper-grain paper-settle"
            style={{
              transform: "rotate(-7deg)",
              ['--rot' as never]: "-7deg",
              background: "color-mix(in oklab, var(--gold) 35%, #d9c39a)",
              boxShadow: "0 20px 40px -28px color-mix(in oklab, var(--ink) 40%, transparent), inset 0 0 0 1px color-mix(in oklab, var(--ink) 8%, transparent)",
              animationDelay: "0ms",
            }}
            aria-hidden
          >
            {/* envelope flap */}
            <div
              className="absolute top-0 left-0 right-0 h-1/2"
              style={{ clipPath: "polygon(0 0, 100% 0, 50% 100%)", background: "color-mix(in oklab, var(--gold) 50%, #b89a6a)", opacity: 0.55 }}
            />
            <span className="hand text-base text-ink/60 absolute bottom-4 left-5">to: you</span>
          </div>

          {/* lined paper strip behind */}
          <div
            className="absolute top-4 right-12 w-[55%] h-32 paper-grain ruled-paper torn-bottom paper-settle"
            style={{
              transform: "rotate(5deg)",
              ['--rot' as never]: "5deg",
              background: "color-mix(in oklab, var(--paper-deep) 90%, white)",
              boxShadow: "0 12px 28px -20px color-mix(in oklab, var(--ink) 30%, transparent)",
              animationDelay: "80ms",
            }}
            aria-hidden
          >
            <span className="hand text-sm text-plum/70 absolute top-2 left-3">only written, never sent</span>
          </div>

          {/* main featured letter */}
          <article
            className="absolute top-0 left-0 w-[88%] paper-card paper-grain p-7 md:p-8 paper-settle stack-lift"
            style={{ transform: "rotate(-1.5deg)", ['--rot' as never]: "-1.5deg", animationDelay: "160ms" }}
          >
            <img
              src={paperclipImg}
              alt=""
              aria-hidden
              className="pointer-events-none absolute -top-7 left-8 w-11 md:w-12 rotate-[16deg] drop-shadow-[0_4px_6px_rgba(0,0,0,0.2)] select-none"
            />
            <img
              src={stampImg}
              alt=""
              aria-hidden
              loading="lazy"
              className="pointer-events-none absolute -top-3 right-3 w-16 opacity-75 mix-blend-multiply select-none"
            />
            {/* postmark circle */}
            <div
              aria-hidden
              className="pointer-events-none absolute bottom-6 right-5 w-20 h-20 rounded-full opacity-25 label-press"
              style={{
                border: "1.5px dashed color-mix(in oklab, var(--plum) 70%, transparent)",
                color: "var(--plum)",
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center text-[0.5rem] tracking-[0.2em] text-center leading-tight">
                PRIDE<br/>ARCHIVE<br/>2026
              </div>
            </div>
            <span className="hand text-base text-plum">left here anonymously</span>
            <p key={idx} className="serif text-2xl md:text-[1.7rem] mt-3 leading-snug text-foreground float-in">
              "{rotatingLines[idx]}"
            </p>
            <div className="mt-5 pt-3 border-t border-dashed border-ink/15 flex justify-between text-[0.7rem] text-ink-soft">
              <span>archive entry · 026</span>
              <span className="hand text-sm text-plum">shared with permission</span>
            </div>
          </article>

          {/* small pinned note */}
          <article
            className="absolute bottom-12 right-0 w-[60%] note-card pin-top paper-grain p-5 bg-[color:color-mix(in_oklab,var(--lavender)_30%,var(--card))] paper-settle stack-lift"
            style={{ transform: "rotate(4deg)", ['--rot' as never]: "4deg", animationDelay: "240ms" }}
          >
            <span className="hand text-base text-plum">to my younger self</span>
            <p className="mt-2 text-foreground leading-relaxed text-sm">
              You will not always have to translate yourself. There are rooms where
              you arrive already understood.
            </p>
            <p className="mt-3 text-[0.7rem] text-ink-soft">— R., 31</p>
          </article>

          {/* pressed flower */}
          <img
            src={flowerImg}
            alt=""
            aria-hidden
            loading="lazy"
            className="pointer-events-none absolute -bottom-2 -left-4 w-24 md:w-28 opacity-90 rotate-[-20deg] select-none paper-settle"
            style={{ ['--rot' as never]: "-20deg", animationDelay: "320ms" }}
          />
        </div>

      </div>
    </section>
  );
}

function TrustBlock() {
  return (
    <section className="bg-paper-deep/50 border-y border-border/60 relative">
      <MarginNote text="read slowly." rotate={1} className="-left-4 top-10" />
      <MarginNote text="you're safe here" rotate={-2} className="-right-8 top-16 text-plum" />
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="max-w-2xl">
          <p className="eyebrow mb-4">Before you share</p>
          <h2 className="serif text-3xl md:text-4xl text-foreground leading-tight">
            This is a consent-first space. You stay in control of every word.
          </h2>
        </div>
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {trustCards.map((c) => (
            <div key={c.title} className="paper-card p-6">
              <h3 className="serif text-xl text-foreground">{c.title}</h3>
              <p className="mt-2 text-sm text-ink-soft leading-relaxed">{c.body}</p>
            </div>
          ))}
        </div>
        <div className="mt-10">
          <Link to="/privacy" className="text-sm text-plum hover:text-foreground underline underline-offset-4">
            Read the full Privacy, Consent & Safety page →
          </Link>
        </div>
      </div>
    </section>
  );
}

function CategoriesBlock() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24 relative">
      <MarginNote text="or just one line" rotate={1.5} className="-right-6 bottom-16 italic" />
      <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
        <div className="max-w-2xl">
          <p className="eyebrow mb-3">What can you share?</p>
          <h2 className="serif text-3xl md:text-4xl text-foreground">
            Eight invitations. Pick any one that feels like yours today.
          </h2>
        </div>
        <p className="hand text-xl text-plum">none of these are required.</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {categories.map((c, i) => (
          <div key={c.title} className="paper-card p-5 hover:-translate-y-0.5 transition-transform group">
            <span className="eyebrow text-[0.62rem]">0{i + 1}</span>
            <h3 className="serif text-xl mt-2 text-foreground">{c.title}</h3>
            <span className="block w-8 h-px bg-plum/50 mt-3 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" aria-hidden />
            <p className="hand text-base text-plum mt-3 leading-snug">{c.prompt}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function ArchivePreview() {
  const [preview, setPreview] = useState<WallItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPreview() {
      setLoading(true);
      try {
        const [lettersRes, notesRes] = await Promise.all([
          supabase.from('letters').select('*').eq('status', 'approved').eq('allow_public_display', true).order('created_at', { ascending: false }).limit(10),
          supabase.from('notes').select('*').eq('status', 'approved').eq('allow_public_display', true).order('created_at', { ascending: false }).limit(10)
        ]);

        const lettersData = lettersRes.data || [];
        const notesData = notesRes.data || [];

        const tones = ["blush", "lavender", "teal", "gold", "paper", "lilac", "rose"];
        const attaches = ["paperclip", "tape", "tape-corner", "pin"];

        const mappedLetters: WallItem[] = lettersData.map(l => {
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
             rotate: (idHash % 7) - 3,
             featured: l.featured,
             created_at: l.created_at
           };
        });

        const mappedNotes: WallItem[] = notesData.map(n => {
           const idHash = n.id.split('').reduce((acc: number, char: string) => acc + char.charCodeAt(0), 0);
           return {
             id: n.id,
             kind: n.category || "confession",
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

        let combined = [...mappedLetters, ...mappedNotes].sort((a, b) => 
          new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime()
        );
        
        // prioritize featured
        combined = combined.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        
        // prioritize diversity
        const diverseItems: WallItem[] = [];
        const seenKinds = new Set<string>();
        const remaining: WallItem[] = [];

        for (const item of combined) {
          if (!seenKinds.has(item.kind)) {
            diverseItems.push(item);
            seenKinds.add(item.kind);
          } else {
            remaining.push(item);
          }
        }

        const finalPreview = [...diverseItems, ...remaining].slice(0, 6);
        setPreview(finalPreview);
      } catch (e) {
        console.error("Error fetching preview:", e);
      } finally {
        setLoading(false);
      }
    }
    fetchPreview();
  }, []);

  return (
    <section className="bg-paper-deep/40 border-y border-border/60 relative">
      <MarginNote text="some took years to write down" rotate={-1} className="-right-12 top-32" />
      <MarginNote icon="stars" className="-right-8 top-40" />
      <MarginNote icon="stars" className="-right-16 top-48" />
      <div className="mx-auto max-w-6xl px-6 py-24">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-12">
          <div>
            <p className="eyebrow mb-3">From the wall</p>
            <h2 className="serif text-3xl md:text-4xl text-foreground max-w-xl leading-tight">
              A few voices already pinned here.
            </h2>
          </div>
          <Link to="/wall" className="text-sm text-foreground underline underline-offset-4 decoration-plum">
            See the whole wall →
          </Link>
        </div>
        {loading ? (
          <div className="text-center py-10">
             <p className="text-ink-soft animate-pulse">Loading preview...</p>
          </div>
        ) : (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-7 [column-fill:_balance]">
            {preview.map((item) => (
              <div key={item.id} className="break-inside-avoid mb-7">
                <WallCard item={item} dense />
              </div>
            ))}
            {preview.length === 0 && (
              <p className="text-ink-soft text-center break-inside-avoid">No public entries yet.</p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

function VoicesBeyond() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <div className="flex flex-wrap items-end justify-between gap-6 mb-10">
        <div className="max-w-2xl">
          <p className="eyebrow mb-3">Voices beyond the wall</p>
          <h2 className="serif text-3xl md:text-4xl text-foreground leading-tight">
            A few voices that came before us — and made room.
          </h2>
          <p className="mt-4 text-ink-soft max-w-xl leading-relaxed">
            The community wall holds the people writing in today. This shelf
            holds a small lineage we read alongside it.
          </p>
        </div>
        <p className="hand text-lg text-plum max-w-xs">
          verified excerpts.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        {voicesBeyond.map((v) => (
          <figure
            key={v.name}
            className="paper-card p-7 md:p-8 flex flex-col"
          >
            <div className="flex items-center gap-3 mb-4">
              <span
                aria-hidden
                className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-paper-deep border border-ink/10 serif text-base text-plum"
              >
                {v.name.split(" ").map((p) => p[0]).slice(0, 2).join("")}
              </span>
              <div className="leading-tight">
                <figcaption className="serif text-lg text-foreground">{v.name}</figcaption>
                <p className="text-xs text-ink-soft">{v.role}{v.context ? ` · ${v.context}` : ""}</p>
              </div>
            </div>
            <blockquote className="serif text-[1.15rem] text-foreground/90 leading-relaxed border-l-2 border-plum/40 pl-4">
              "{v.quote}"
            </blockquote>
          </figure>
        ))}
      </div>
    </section>
  );
}

function NotReadyBlock() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-24 text-center">
      <p className="hand text-2xl text-plum mb-4">not ready to share a whole story?</p>
      <h2 className="serif text-3xl md:text-5xl text-foreground leading-tight">
        Leave one line. One hope. One myth you'd like to undo.
      </h2>
      <p className="mt-6 text-ink-soft max-w-2xl mx-auto leading-relaxed">
        Sometimes a single sentence is the whole story. The wall has room
        for fragments, half-thoughts, and things you're still working out.
      </p>
      <div className="mt-8">
        <Link to="/pin" className="px-6 py-3.5 rounded-full bg-foreground text-background text-sm font-medium hover:opacity-90 transition inline-block">
          Pin a Note Instead
        </Link>
      </div>
    </section>
  );
}

function WhyBlock() {
  return (
    <section className="bg-foreground text-background relative overflow-hidden">
      <svg className="absolute -left-10 top-0 h-full w-[200px] text-background opacity-[0.08] pointer-events-none" viewBox="0 0 100 400" preserveAspectRatio="none">
        <path d="M 0 0 C 100 100, 100 300, 0 400" stroke="currentColor" strokeWidth="2" strokeDasharray="4 8" fill="none" />
      </svg>
      <div className="mx-auto max-w-5xl px-6 py-24 grid md:grid-cols-5 gap-10">
        <div className="md:col-span-2">
          <p className="eyebrow !text-background/60 mb-3">Why this exists</p>
          <h2 className="serif text-3xl md:text-4xl leading-tight">
            Queer stories are often flattened into stereotypes — or into silence.
          </h2>
        </div>
        <div className="md:col-span-3 space-y-5 text-background/80 leading-relaxed">
          <p>
            Not everyone has a safe room to speak in. Not every story is a
            triumphant coming-out. Some are quiet, unfinished, complicated by
            family and city and time. All of them are worth holding.
          </p>
          <p>
            Letters Left Here is an attempt to build a small archive of those
            voices during Pride Month — without flattening them, without using
            them as branding, without asking anyone to perform their pain.
          </p>
          <p className="hand text-2xl text-blush">
            this campaign is hosted by Enactus VIT Chennai, but the voices here belong only to the people who left them.
          </p>
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24 relative">
      <MarginNote text="whenever you're ready." rotate={2} className="-left-16 top-1/3" />
      <p className="eyebrow mb-4 text-center">Three ways to be here</p>
      <h2 className="serif text-4xl md:text-5xl text-center text-foreground mb-14">
        How would you like to show up today?
      </h2>
      <div className="grid md:grid-cols-3 gap-8 md:gap-10">
        {/* Write a Letter - Torn paper + Paperclip */}
        <Link
          to="/write"
          className="relative bg-[#f4f7fa] p-8 pb-10 torn-bottom torn-top ruled-paper shadow-md group hover:-translate-y-1 hover:rotate-[-1deg] transition-transform rotate-[-2deg]"
        >
          <img src={paperclipImg} alt="" className="absolute -top-6 left-6 w-8 rotate-[10deg] opacity-90 drop-shadow-sm z-10" />
          <h3 className="serif text-2xl text-foreground">Write a Letter</h3>
          <p className="mt-4 text-ink-soft leading-relaxed text-sm">For longer stories, memories, and reflections you want to give shape to.</p>
          <p className="mt-6 text-sm text-plum group-hover:translate-x-1 transition-transform">Begin a letter →</p>
        </Link>

        {/* Pin a Note - Yellow Sticky + Red Pin */}
        <Link
          to="/pin"
          className="relative bg-[#fce883] p-8 pb-10 shadow-md group hover:-translate-y-1 hover:rotate-[1deg] transition-transform rotate-[2deg] mt-4 md:mt-0"
        >
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#d63a3a] shadow-[inset_-2px_-2px_4px_rgba(0,0,0,0.3),_2px_4px_4px_rgba(0,0,0,0.2)] z-10">
            <div className="absolute top-full left-1/2 w-0.5 h-3 bg-black/20 -translate-x-1/2 origin-top rotate-[20deg]" />
          </div>
          <h3 className="serif text-2xl text-foreground">Pin a Note</h3>
          <p className="mt-4 text-ink/80 leading-relaxed text-sm">For confessions, hopes, advice, and short truths. One line is enough.</p>
          <p className="mt-6 text-sm text-ink group-hover:translate-x-1 transition-transform">Leave a note →</p>
        </Link>

        {/* Read the Wall - Spiral edge */}
        <Link
          to="/wall"
          className="relative bg-white p-8 pb-10 shadow-sm border border-ink/5 group hover:-translate-y-1 hover:rotate-[1deg] transition-transform rotate-[-1deg] mt-4 md:mt-0"
        >
          <div className="absolute top-0 left-0 w-full h-4 flex justify-around px-2 -mt-2">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="w-3 h-3 rounded-full bg-background shadow-[inset_0_1px_2px_rgba(0,0,0,0.2)] border border-ink/5" />
            ))}
          </div>
          <div className="absolute top-0 left-0 w-full h-8 flex justify-around px-2 -mt-2 opacity-50 pointer-events-none">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="w-1.5 h-6 border-l border-r border-t border-[#d4c3b3] rounded-t-full translate-x-[3px] -translate-y-1 skew-x-[15deg]" />
            ))}
          </div>
          <h3 className="serif text-2xl text-foreground mt-4">Read the Wall</h3>
          <p className="mt-4 text-ink-soft leading-relaxed text-sm">For sitting quietly and reading what others have already left behind.</p>
          <p className="mt-6 text-sm text-plum group-hover:translate-x-1 transition-transform">Open the wall →</p>
        </Link>
      </div>
    </section>
  );
}

function CollaboratorsBlock() {
  return (
    <section className="bg-paper-deep/30 border-y border-border/50 relative overflow-hidden">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <div className="flex flex-col md:flex-row gap-12 md:gap-16 items-center justify-between">
          <div className="max-w-xl text-center md:text-left">
            <p className="eyebrow mb-3">Together, We Hold Space</p>
            <h2 className="serif text-3xl md:text-4xl text-foreground mb-4 leading-tight">
              Every safe space is built by people who choose compassion over silence.
            </h2>
            <p className="text-ink-soft leading-relaxed">
              Letters Left Here is brought to life through collaborations with organizations that believe every story deserves to be heard with dignity, empathy, and care.
            </p>
          </div>
          
          <div className="w-full md:w-[450px] flex-shrink-0 relative">
             <article className="note-card paper-grain p-8 md:p-10 bg-[#fcf9f5] shadow-md group hover:-translate-y-1 hover:rotate-[0deg] transition-transform rotate-[1.5deg] paper-settle stack-lift relative border border-black/5">
               <img 
                 src={paperclipImg} 
                 alt="" 
                 aria-hidden 
                 className="absolute -top-5 left-10 w-9 rotate-[15deg] opacity-90 drop-shadow-sm z-10 select-none pointer-events-none" 
               />
               <div className="flex flex-col items-center text-center mt-2">
                 <div className="w-28 h-28 flex items-center justify-center mb-5">
                   <img src={qConnectImg} alt="QConnect Logo" className="w-full h-full object-contain" />
                 </div>
                 <h3 className="serif text-2xl text-foreground mb-3">QConnect</h3>
                 <p className="text-[0.9rem] text-ink-soft leading-relaxed">
                   QConnect is a youth-led initiative dedicated to building safer, more inclusive spaces for LGBTQIA+ individuals through community, conversations, education, and support. Their commitment to creating environments where every identity is respected aligns deeply with the spirit of Letters Left Here.
                 </p>
               </div>
             </article>
          </div>
        </div>
      </div>
    </section>
  );
}
