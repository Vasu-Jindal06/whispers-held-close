import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/SiteShell";
import paperclipImg from "@/assets/paperclip.png";
import { WallCard } from "@/components/WallCard";
import type { WallItem } from "@/lib/wall-data";
import flower2Img from "@/assets/flower2.png";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About the Campaign — Letters Left Here" },
      { name: "description", content: "Why Enactus built this Pride Month archive — to hold queer stories without flattening them, and to make space for the quieter ones." },
      { property: "og:title", content: "About the Campaign — Letters Left Here" },
      { property: "og:description", content: "The intention behind Letters Left Here." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <SiteShell>
      <div>
        {/* Section 1 — Hero / Opening */}
        <section className="bg-foreground text-background py-16 md:py-28 px-6 overflow-hidden">
          <div className="mx-auto max-w-5xl grid md:grid-cols-12 gap-12 items-center">
            <div className="md:col-span-7">
              <p className="eyebrow !text-background/60 mb-6 tracking-widest text-xs">
                AN ENACTUS VIT CHENNAI PRIDE ARCHIVE · 2026
              </p>
              <h1 className="serif text-5xl md:text-7xl leading-tight text-background">
                A small room,<br/>made on purpose.
              </h1>
              <div className="mt-8 space-y-2 text-lg md:text-xl text-background/80 leading-relaxed font-light">
                <p>Not every story is loud.</p>
                <p>Not every story is out.</p>
                <p>All of them deserve to be here.</p>
              </div>
            </div>
            
            <div className="md:col-span-5 flex flex-col items-center md:items-end justify-center relative mt-12 md:mt-0">
              <div className="max-w-sm w-full rotate-[2deg] hover:rotate-[0deg] transition-transform relative z-10">
                <WallCard
                  item={{
                    id: "about-demo",
                    kind: "truth",
                    label: "A truth I've learned",
                    body: "There is so much room for us here.",
                    author: "left anonymously",
                    tone: "paper",
                    attach: "tape",
                    rotate: 0,
                  }}
                  dense
                />
              </div>
              <img src={flower2Img} alt="" className="absolute -bottom-4 -right-4 w-32 rotate-[15deg] opacity-90 mix-blend-multiply pointer-events-none z-20" />
            </div>
          </div>
        </section>

        {/* Section 2 — Four Pillars */}
        <section className="py-12 md:py-16 px-6">
          <div className="mx-auto max-w-5xl grid md:grid-cols-2 gap-8 md:gap-10">
            {[
              { tape: "bg-[#e8cf90]", title: "A space for queer voices", body: "Stories, confessions, advice, truths, and hopes — every form." },
              { tape: "bg-[#e0b8b8]", title: "Consent-first", body: "You decide what gets shared, where, and how you're named." },
              { tape: "bg-[#e6ccde]", title: "A wall of words", body: "Submissions people chose to leave behind. Not performance — just honesty." },
              { tape: "bg-[#a6ccc7]", title: "Run by Enactus VIT Chennai", body: "A student team holding space, not taking it over." },
            ].map((card, i) => (
              <div key={i} className="paper-card bg-[#fcf9f5] p-8 md:p-10 shadow-sm relative group hover:-translate-y-1 transition-transform">
                <div className={`absolute -top-3 left-8 w-24 h-6 tape-strip ${card.tape} shadow-sm rotate-[-2deg] opacity-90`} />
                <h3 className="serif text-2xl md:text-3xl text-foreground mt-4">{card.title}</h3>
                <p className="mt-4 text-ink-soft leading-relaxed">{card.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3 — The Quote */}
        <section className="py-16 px-6 relative overflow-hidden flex justify-center items-center">
          <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
            <div className="w-96 h-96 rounded-full border-[10px] border-dashed border-ink/40 flex items-center justify-center">
               <span className="text-4xl uppercase tracking-widest text-center text-ink-soft font-bold">ARCHIVE</span>
            </div>
          </div>
          <div className="mx-auto max-w-4xl text-center relative z-10">
            <h2 className="serif italic text-3xl md:text-5xl text-foreground leading-[1.3] text-balance">
              "Coming out is not the only queer story worth telling. We wanted a place for the quieter ones, too."
            </h2>
            <p className="mt-8 text-sm text-ink-soft tracking-wider uppercase">— Enactus VIT Chennai</p>
          </div>
        </section>

        {/* Section 4 — Who This Is For */}
        <section className="py-12 md:py-16 px-6">
          <div className="mx-auto max-w-5xl grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="serif text-3xl md:text-4xl text-foreground mb-6">Who this is for</h2>
              <p className="text-lg text-ink-soft leading-relaxed max-w-md">
                There is no entry requirement. You do not have to be sure of anything.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              {[
                { text: "Queer people of every age and stage", color: "bg-[#e0b8b8]/40 text-ink" },
                { text: "Questioning folks", color: "bg-[#e6ccde]/50 text-ink" },
                { text: "People who are out only online", color: "bg-[#a6ccc7]/40 text-ink" },
                { text: "Closeted folks", color: "bg-[#e8cf90]/40 text-ink" },
                { text: "Allies with something to add or unlearn", color: "bg-[#e0b8b8]/40 text-ink" },
                { text: "Family members rewriting old responses", color: "bg-[#e6ccde]/50 text-ink" },
              ].map((tag, i) => (
                <span key={i} className={`px-4 py-1.5 rounded-full text-[13px] shadow-sm ${tag.color}`}>
                  {tag.text}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Section 5 — What Enactus Is Doing Here */}
        <section className="py-12 md:py-16 px-6">
          <div className="mx-auto max-w-4xl">
            <div className="relative bg-[#fcfcfc] p-8 md:p-12 shadow-md ruled-paper torn-bottom torn-top rotate-[1deg]">
              <img src={paperclipImg} alt="" className="absolute -top-6 left-10 w-8 rotate-[-5deg] opacity-90 drop-shadow-sm z-10" />
              <h2 className="serif text-3xl text-foreground mb-6">What Enactus VIT Chennai Is Doing Here</h2>
              <div className="space-y-6 text-ink-soft leading-relaxed">
                <p>
                  Enactus VIT Chennai is a student-led team working on social-impact projects out of VIT Chennai. Our role here is to hold the space, build the tools, and review submissions with care. That's it.
                </p>
                <p>
                  The voices on the wall belong to the people who left them — not to us, not to our marketing. We will never use a submission outside the permissions you set.
                </p>
              </div>
              <div className="mt-10 text-right">
                <span className="hand text-plum text-lg -rotate-2 inline-block">
                  the voices belong to the people who left them.
                </span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </SiteShell>
  );
}
