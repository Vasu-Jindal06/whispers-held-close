import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/SiteShell";
import { WallCard } from "@/components/WallCard";
import { wallItems, voicesBeyond, marqueeLines } from "@/lib/wall-data";
import { useEffect, useState } from "react";
import paperclipImg from "@/assets/paperclip.png";
import stampImg from "@/assets/stamp.png";
import flowerImg from "@/assets/flower.png";

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
      <Marquee />
      <TrustBlock />
      <CategoriesBlock />
      <ArchivePreview />
      <VoicesBeyond />
      <NotReadyBlock />
      <WhyBlock />
      <FinalCTA />
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
      <div className="grid md:grid-cols-12 gap-10 md:gap-12 items-start">
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

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Link to="/write" className="px-6 py-3.5 rounded-full bg-foreground text-background text-sm font-medium hover:opacity-90 transition">
              Write a Letter
            </Link>
            <Link to="/pin" className="px-6 py-3.5 rounded-full border border-foreground/30 text-foreground text-sm font-medium hover:bg-foreground/5 transition">
              Pin a Note
            </Link>
            <Link to="/wall" className="px-6 py-3.5 rounded-full text-foreground text-sm font-medium hover:bg-foreground/5 transition">
              Read the Wall →
            </Link>
          </div>
          <Link to="/privacy" className="inline-block mt-5 text-sm text-ink-soft hover:text-foreground underline underline-offset-4 decoration-dotted">
            How privacy works →
          </Link>
        </div>

        {/* RIGHT — tactile archive collage */}
        <div className="md:col-span-5 relative min-h-[520px] md:min-h-[600px]">
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
    <section className="bg-paper-deep/50 border-y border-border/60">
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
    <section className="mx-auto max-w-6xl px-6 py-24">
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
  const preview = wallItems.slice(0, 6);
  return (
    <section className="bg-paper-deep/40 border-y border-border/60">
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
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {preview.map((item) => (
            <WallCard key={item.id} item={item} dense />
          ))}
        </div>
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
          attributed excerpts only — placeholders here until verified for publication.
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
    <section className="bg-foreground text-background">
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
    <section className="mx-auto max-w-6xl px-6 py-24">
      <p className="eyebrow mb-4 text-center">Three ways to be here</p>
      <h2 className="serif text-4xl md:text-5xl text-center text-foreground mb-14">
        How would you like to show up today?
      </h2>
      <div className="grid md:grid-cols-3 gap-6">
        {[
          { to: "/write" as const, title: "Write a Letter", body: "For longer stories, memories, and reflections you want to give shape to.", cta: "Begin a letter" },
          { to: "/pin" as const, title: "Pin a Note", body: "For confessions, hopes, advice, and short truths. One line is enough.", cta: "Leave a note" },
          { to: "/wall" as const, title: "Read the Wall", body: "For sitting quietly and reading what others have already left here.", cta: "Open the wall" },
        ].map((c) => (
          <Link
            key={c.to}
            to={c.to}
            className="paper-card p-8 group hover:-translate-y-1 transition-transform"
          >
            <h3 className="serif text-2xl text-foreground">{c.title}</h3>
            <p className="mt-3 text-ink-soft leading-relaxed">{c.body}</p>
            <p className="mt-6 text-sm text-plum group-hover:translate-x-1 transition-transform">{c.cta} →</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
