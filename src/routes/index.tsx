import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/SiteShell";
import { WallCard } from "@/components/WallCard";
import { wallItems } from "@/lib/wall-data";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Letters Left Here — An Enactus Pride Month Archive" },
      { name: "description", content: "A quiet digital archive of queer voices. Write a letter, pin a note, or read the wall. Share only what feels safe." },
      { property: "og:title", content: "Letters Left Here — An Enactus Pride Month Archive" },
      { property: "og:description", content: "Anonymous, consent-first storytelling for Pride Month." },
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
      <TrustBlock />
      <CategoriesBlock />
      <ArchivePreview />
      <NotReadyBlock />
      <WhyBlock />
      <FinalCTA />
    </SiteShell>
  );
}

function Hero() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % rotatingLines.length), 3800);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative mx-auto max-w-6xl px-6 pt-20 pb-24 md:pt-28 md:pb-32">
      <p className="eyebrow mb-6">An Enactus Pride Month Archive · 2026</p>
      <h1 className="serif text-5xl md:text-7xl leading-[1.02] tracking-tight max-w-4xl text-foreground">
        Some truths are <em className="text-plum">easier to write</em> than say aloud.
      </h1>
      <p className="mt-7 max-w-2xl text-lg text-ink-soft leading-relaxed">
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
        <Link to="/privacy" className="ml-2 text-sm text-ink-soft hover:text-foreground underline underline-offset-4 decoration-dotted">
          How privacy works
        </Link>
      </div>

      {/* Floating notes */}
      <div className="mt-16 grid md:grid-cols-3 gap-6 items-start">
        <div className="note-card tape-strip p-6 -rotate-2 bg-[color:color-mix(in_oklab,var(--blush)_24%,var(--card))]">
          <span className="hand text-base text-plum">left here anonymously</span>
          <p key={idx} className="serif text-2xl mt-3 leading-snug text-foreground float-in">
            "{rotatingLines[idx]}"
          </p>
        </div>
        <div className="note-card tape-strip p-6 rotate-1 bg-[color:color-mix(in_oklab,var(--lavender)_22%,var(--card))] md:mt-8">
          <span className="hand text-base text-plum">to my younger self</span>
          <p className="mt-3 text-foreground leading-relaxed">
            You will not always have to translate yourself. There are rooms where
            you arrive already understood.
          </p>
          <p className="mt-4 text-xs text-ink-soft">— R., 31</p>
        </div>
        <div className="note-card tape-strip p-6 -rotate-1 bg-[color:color-mix(in_oklab,var(--gold)_24%,var(--card))]">
          <span className="hand text-base text-plum">a hope</span>
          <p className="mt-3 text-foreground leading-relaxed">
            That coming out becomes a small sentence. That one day it sounds
            like 'I have a partner' and then we move on to lunch.
          </p>
          <p className="mt-4 text-xs text-ink-soft">anon</p>
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
          <div key={c.title} className="paper-card p-5 hover:-translate-y-0.5 transition-transform">
            <span className="eyebrow text-[0.62rem]">0{i + 1}</span>
            <h3 className="serif text-xl mt-2 text-foreground">{c.title}</h3>
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
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
          {preview.map((item) => (
            <WallCard key={item.id} item={item} dense />
          ))}
        </div>
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
            this campaign is held by Enactus, but the voices here belong only to the people who left them.
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
          { to: "/write", title: "Write a Letter", body: "For longer stories, memories, and reflections you want to give shape to.", cta: "Begin a letter" },
          { to: "/pin", title: "Pin a Note", body: "For confessions, hopes, advice, and short truths. One line is enough.", cta: "Leave a note" },
          { to: "/wall", title: "Read the Wall", body: "For sitting quietly and reading what others have already left here.", cta: "Open the wall" },
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
