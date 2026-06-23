import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/SiteShell";
import paperclipImg from "@/assets/paperclip.png";
import customImage from "@/assets/image.png";

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
    body: "Every submission is reviewed by our team. If you ticked 'internal only,' it stays internal. If you ticked the archive, we may publish it there. If you ticked nothing, we hold it privately as part of the project record only.",
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
    body: "You can ask us to remove your submission at any time, for any reason, no questions asked. Write to enactus.vitc@gmail.com and reference any detail from your submission (a phrase, an approximate date) so we can find it. We will remove it within 7 days.",
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
      <div>
        {/* Section 1 — Header */}
        <section className="bg-foreground text-background py-16 md:py-28 px-6">
          <div className="mx-auto max-w-4xl text-center md:text-left">
            <h1 className="serif text-4xl md:text-6xl text-background leading-tight">
              Privacy, consent, and how we hold what you share.
            </h1>
            <p className="mt-6 text-lg md:text-xl text-background/80 leading-relaxed font-light max-w-2xl">
              A plain-language walkthrough — who reads submissions, what stays private, and how to take something back.
            </p>
          </div>
        </section>

        {/* Section 2 — The Ten Points */}
        <section className="py-16 md:py-24 px-6">
          <div className="mx-auto max-w-5xl columns-1 md:columns-2 gap-8 space-y-8">
            {sections.map((s, i) => {
              // Determine attachment type based on index to mimic alternating rows in masonry
              const attachmentType = i % 3 === 0 ? "tape" : i % 3 === 1 ? "pin" : "clip";
              
              return (
                <div key={i} className="break-inside-avoid paper-card bg-[#fdfbf7] p-8 shadow-sm relative group hover:-translate-y-1 transition-transform">
                  
                  {/* Attachments */}
                  {attachmentType === "tape" && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-5 tape-strip bg-[#e8cf90] shadow-sm rotate-[-2deg] opacity-80" />
                  )}
                  {attachmentType === "pin" && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#d63a3a] shadow-[inset_-2px_-2px_4px_rgba(0,0,0,0.3),_2px_4px_4px_rgba(0,0,0,0.2)] z-10">
                      <div className="absolute top-full left-1/2 w-0.5 h-2.5 bg-black/20 -translate-x-1/2 origin-top rotate-[20deg]" />
                    </div>
                  )}
                  {attachmentType === "clip" && (
                    <img src={paperclipImg} alt="" className="absolute -top-5 left-8 w-7 rotate-[15deg] opacity-80 drop-shadow-sm z-10" />
                  )}

                  <div className="flex gap-4 items-start">
                    <span className="hand text-lg text-plum shrink-0 mt-1">
                      {i < 9 ? `0${i + 1}` : i + 1}
                    </span>
                    <div>
                      <h2 className="serif text-xl text-foreground leading-tight">{s.title}</h2>
                      <p className="mt-3 text-sm text-ink-soft leading-[1.7]">{s.body}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

      </div>
    </SiteShell>
  );
}
