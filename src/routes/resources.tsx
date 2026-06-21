import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/SiteShell";

export const Route = createFileRoute("/resources")({
  head: () => ({
    meta: [
      { title: "Support & Resources — Letters Left Here" },
      { name: "description", content: "LGBTQIA+ support lines, mental health resources, and a gentle note for difficult days." },
      { property: "og:title", content: "Support & Resources — Letters Left Here" },
      { property: "og:description", content: "Resources and helplines for queer people, allies, and anyone holding heavy things today." },
    ],
  }),
  component: ResourcesPage,
});

const resources = [
  { name: "iCall (India)", desc: "Free psychosocial counselling by mental health professionals.", contact: "icall@tiss.edu · +91 9152987821" },
  { name: "Trevor Project (US)", desc: "Crisis intervention and suicide prevention for LGBTQ young people.", contact: "thetrevorproject.org · 1-866-488-7386" },
  { name: "Switchboard LGBT+ (UK)", desc: "A listening service for anyone who needs to talk about sexuality, gender, or identity.", contact: "switchboard.lgbt · 0800 0119 100" },
  { name: "Nazariya QFRG (India)", desc: "A queer feminist resource group offering community and support.", contact: "nazariyaqfrg.wordpress.com" },
  { name: "It Gets Better Project", desc: "Stories and resources from LGBTQ+ adults around the world.", contact: "itgetsbetter.org" },
  { name: "Trans Lifeline", desc: "Peer support hotline run by and for trans people.", contact: "translifeline.org" },
];

function ResourcesPage() {
  return (
    <SiteShell>
      <div className="mx-auto max-w-3xl px-6 py-16 md:py-24">
        <p className="hand text-xl text-plum mb-3">a gentle note</p>
        <h1 className="serif text-4xl md:text-6xl text-foreground leading-tight">
          If today is heavy, please put yourself first.
        </h1>
        <p className="mt-6 text-lg text-ink-soft leading-relaxed">
          Some of the writing here may bring up old feelings — or new ones.
          That's okay. Take a break. Drink water. Text the person who always
          picks up. If you'd like to talk to someone trained for this, here are
          a few places that hold space well.
        </p>

        <div className="mt-12 grid sm:grid-cols-2 gap-4">
          {resources.map((r) => (
            <div key={r.name} className="paper-card p-6">
              <h3 className="serif text-xl text-foreground">{r.name}</h3>
              <p className="mt-2 text-sm text-ink-soft leading-relaxed">{r.desc}</p>
              <p className="mt-3 text-sm text-plum break-words">{r.contact}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 note-card tape-strip p-7 bg-[color:color-mix(in_oklab,var(--lavender)_24%,var(--card))]">
          <p className="hand text-base text-plum">a small reminder</p>
          <p className="serif text-2xl mt-2 text-foreground leading-snug">
            You do not have to be in crisis to ask for help. Wanting to talk is enough of a reason.
          </p>
        </div>

        <div className="mt-12 flex flex-wrap gap-3">
          <Link to="/wall" className="px-5 py-3 rounded-full border border-foreground/30 text-sm">Back to the Wall</Link>
          <Link to="/" className="px-5 py-3 rounded-full border border-foreground/30 text-sm">Home</Link>
        </div>
      </div>
    </SiteShell>
  );
}
