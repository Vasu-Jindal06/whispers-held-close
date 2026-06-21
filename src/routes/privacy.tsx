import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/SiteShell";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy, Consent & Safety — Letters Left Here" },
      { name: "description", content: "How anonymity, consent, editing, removal, and submission review work in the Letters Left Here archive." },
      { property: "og:title", content: "Privacy, Consent & Safety — Letters Left Here" },
      { property: "og:description", content: "Plain-language privacy and consent details for contributors." },
    ],
  }),
  component: PrivacyPage,
});

const sections = [
  {
    title: "What we accept",
    body: "Personal stories, reflections, advice, hopes, confessions, and ally experiences. Long letters or one-line notes — both belong here. Submissions can be in any language you're comfortable in.",
  },
  {
    title: "What stays optional",
    body: "Your name, pronouns, age, city, and email are all optional. You can leave every single field blank except the note itself.",
  },
  {
    title: "How anonymity works",
    body: "If you choose 'Anonymous,' we do not attach any identifying information to your submission when it appears. We will never publish your email, IP, or device details. If you provide an email so we can contact you before publishing, it is stored separately and never displayed.",
  },
  {
    title: "How publication permissions work",
    body: "Each submission has a list of places we may share it (website, Instagram, quote card, event wall, internal-only, etc.). We will only ever use your words in the places you ticked. If we want to use it somewhere new, we'll ask first — only if you gave us a way to contact you.",
  },
  {
    title: "Nothing is posted without consent",
    body: "Every submission is reviewed by a small Enactus VIT Chennai team. If you ticked 'internal only,' it stays internal. If you ticked the archive, we may publish it there. If you ticked nothing, we hold it privately as part of the project record only.",
  },
  {
    title: "How review works",
    body: "We read submissions for safety (your safety and others'), for clarity, and to make sure we're respecting your permissions. We do not gatekeep based on whether a story is 'big enough' or 'sad enough.' Small stories matter here.",
  },
  {
    title: "How editing works",
    body: "If you allowed light edits, we may shorten for length or fix a typo. We will never change the meaning of what you said. If a sentence does heavy lifting, we leave it as you wrote it.",
  },
  {
    title: "How removal works",
    body: "You can ask us to remove your submission at any time, for any reason, no questions asked. Write to lettersleft@enactus.org and reference any detail from your submission (a phrase, an approximate date) so we can find it. We will remove it within 7 days.",
  },
  {
    title: "What not to submit",
    body: "Please don't share someone else's story or out someone without their permission. If you'd like to stay anonymous, please leave out details (full names, workplaces, very specific addresses) that could identify you. We do not accept hateful or discriminatory content — including against queer people, trans people, or any other group.",
  },
  {
    title: "If something here is difficult",
    body: "Some stories may bring up hard feelings — yours or someone else's. Please take breaks. Reach out to people who hold you. We've collected a short list of LGBTQIA+ and mental health resources on our Resources page.",
  },
];

function PrivacyPage() {
  return (
    <SiteShell>
      <div className="mx-auto max-w-3xl px-6 py-16 md:py-24">
        <p className="eyebrow mb-4">The trust page</p>
        <h1 className="serif text-4xl md:text-6xl text-foreground leading-tight">
          Privacy, consent, and how we hold what you share.
        </h1>
        <p className="mt-6 text-lg text-ink-soft leading-relaxed">
          A plain-language walkthrough of how this archive works — who reads
          submissions, what stays private, and how to take something back.
        </p>

        <div className="mt-14 space-y-10">
          {sections.map((s, i) => (
            <section key={s.title} className="border-l-2 border-plum/40 pl-6">
              <p className="hand text-base text-plum">0{i + 1}</p>
              <h2 className="serif text-2xl md:text-3xl text-foreground mt-1">{s.title}</h2>
              <p className="mt-3 text-ink leading-relaxed">{s.body}</p>
            </section>
          ))}
        </div>

        <div className="paper-card p-8 mt-16">
          <h3 className="serif text-2xl text-foreground">Want something removed?</h3>
          <p className="mt-2 text-ink-soft">No questions, no friction. Write to us and it's gone within 7 days.</p>
          <a href="mailto:lettersleft@enactus.org" className="inline-block mt-5 px-5 py-3 rounded-full bg-foreground text-background text-sm">
            lettersleft@enactus.org
          </a>
        </div>

        <div className="mt-12 flex flex-wrap gap-3">
          <Link to="/write" className="px-5 py-3 rounded-full border border-foreground/30 text-sm">Write a Letter</Link>
          <Link to="/pin" className="px-5 py-3 rounded-full border border-foreground/30 text-sm">Pin a Note</Link>
          <Link to="/resources" className="px-5 py-3 rounded-full border border-foreground/30 text-sm">Support & Resources</Link>
        </div>
      </div>
    </SiteShell>
  );
}
