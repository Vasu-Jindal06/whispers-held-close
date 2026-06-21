import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/SiteShell";

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
      <article className="mx-auto max-w-3xl px-6 py-16 md:py-28">
        <p className="hand text-xl text-plum mb-3">about this archive</p>
        <h1 className="serif text-4xl md:text-6xl text-foreground leading-tight">
          A small room, made on purpose.
        </h1>

        <div className="mt-10 space-y-7 text-lg leading-relaxed text-foreground/90">
          <p>
            Letters Left Here is a Pride Month campaign built by Enactus to do
            one thing: hold queer stories carefully. Not flatten them into
            slogans. Not flatten them into rainbows. Just hold them.
          </p>
          <p>
            We started this because the loudest version of Pride is not the only
            version. Some people are out, some are not, some are still figuring
            out the vocabulary. Some have parents who showed up; some are
            writing letters they will never send. All of that is real. All of
            that deserves a room.
          </p>

          <blockquote className="border-l-2 border-plum pl-6 my-10">
            <p className="serif text-2xl md:text-3xl text-foreground italic leading-snug">
              "Coming out is not the only queer story worth telling. We wanted a
              place for the quieter ones, too."
            </p>
          </blockquote>

          <h2 className="serif text-3xl text-foreground !leading-tight pt-6">Who this is for</h2>
          <p>
            Queer people of every age and stage. Questioning folks. Closeted
            folks. People who are out only online. Allies with something to add
            or unlearn. Family members rewriting old responses. There is no
            entry requirement — you do not have to be sure of anything.
          </p>

          <h2 className="serif text-3xl text-foreground !leading-tight pt-6">What Enactus is doing here</h2>
          <p>
            Enactus is a global community of student-led teams working on
            social-impact projects. Our role here is to hold the space, build
            the tools, and review submissions with care. That's it. The voices
            on the wall belong to the people who left them — not to us, not to
            our marketing.
          </p>
          <p>
            We will never use a submission outside the permissions you set, and
            we will never use this archive to brand Enactus on top of the
            people who trusted it.
          </p>

          <h2 className="serif text-3xl text-foreground !leading-tight pt-6">What happens after Pride Month</h2>
          <p>
            The archive stays open. We continue reading and adding to it. If
            you'd like your submission removed at any point — during Pride
            Month, after, years from now — write to us and we'll do it.
          </p>
        </div>

        <div className="mt-16 paper-card p-8">
          <h3 className="serif text-2xl text-foreground">Three ways to be here</h3>
          <p className="text-ink-soft mt-2">Whatever shape today's energy takes.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/write" className="px-5 py-3 rounded-full bg-foreground text-background text-sm">Write a Letter</Link>
            <Link to="/pin" className="px-5 py-3 rounded-full border border-foreground/30 text-sm">Pin a Note</Link>
            <Link to="/wall" className="px-5 py-3 rounded-full border border-foreground/30 text-sm">Read the Wall</Link>
          </div>
        </div>
      </article>
    </SiteShell>
  );
}
