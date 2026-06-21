import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteShell } from "@/components/SiteShell";
import { wallItems } from "@/lib/wall-data";
import paperclipImg from "@/assets/paperclip.png";
import stampImg from "@/assets/stamp.png";

export const Route = createFileRoute("/letter/$id")({
  loader: ({ params }) => {
    const item = wallItems.find((i) => i.id === params.id && i.fullLetter);
    if (!item) throw notFound();
    return { item };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.item.title ?? "A letter"} — Letters Left Here` },
          {
            name: "description",
            content: `A preserved letter from the Enactus VIT Chennai Pride archive — ${loaderData.item.label}.`,
          },
          { property: "og:title", content: `${loaderData.item.title ?? "A letter"} — Letters Left Here` },
          { property: "og:description", content: loaderData.item.body.slice(0, 150) },
        ]
      : [{ title: "A letter — Letters Left Here" }],
  }),
  component: LetterPage,
  notFoundComponent: () => (
    <SiteShell>
      <div className="mx-auto max-w-2xl px-6 py-32 text-center">
        <p className="hand text-2xl text-plum">we couldn't find this one</p>
        <h1 className="serif text-4xl text-foreground mt-3">This letter isn't on the wall.</h1>
        <Link to="/wall" className="inline-block mt-8 px-5 py-3 rounded-full bg-foreground text-background text-sm">
          Back to the wall
        </Link>
      </div>
    </SiteShell>
  ),
  errorComponent: ({ reset }) => (
    <SiteShell>
      <div className="mx-auto max-w-2xl px-6 py-32 text-center">
        <h1 className="serif text-3xl text-foreground">This page didn't open.</h1>
        <button onClick={reset} className="mt-6 px-5 py-3 rounded-full bg-foreground text-background text-sm">Try again</button>
      </div>
    </SiteShell>
  ),
});

function LetterPage() {
  const { item } = Route.useLoaderData();
  const paragraphs = (item.fullLetter ?? item.body).split(/\n\s*\n/);

  return (
    <SiteShell>
      <div className="mx-auto max-w-3xl px-6 pt-12 pb-24">
        <Link to="/wall" className="text-sm text-ink-soft hover:text-foreground">← back to the wall</Link>

        <div className="mt-8 grid grid-cols-3 gap-4 text-xs text-ink-soft">
          <div><span className="eyebrow block mb-1">Category</span>{item.label}</div>
          <div><span className="eyebrow block mb-1">Credited</span>{item.author}</div>
          <div><span className="eyebrow block mb-1">Status</span>shared with permission</div>
        </div>

        <article className="relative mt-8 paper-card paper-grain p-10 md:p-16">
          <img
            src={paperclipImg}
            alt=""
            aria-hidden
            className="pointer-events-none absolute -top-8 left-10 w-12 md:w-14 rotate-[14deg] drop-shadow-[0_4px_6px_rgba(0,0,0,0.2)] select-none"
          />
          <img
            src={stampImg}
            alt=""
            aria-hidden
            loading="lazy"
            className="pointer-events-none absolute top-6 right-6 w-20 md:w-24 opacity-70 mix-blend-multiply select-none stamp-press"
          />

          {item.title && (
            <h1 className="serif text-3xl md:text-5xl text-foreground leading-[1.1] max-w-2xl">
              {item.title}
            </h1>
          )}
          <p className="hand text-lg text-plum mt-3">{item.label}</p>

          <div className="mt-10 space-y-6 serif text-[1.18rem] md:text-[1.25rem] leading-[1.75] text-foreground/95 whitespace-pre-line">
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <div className="mt-12 pt-6 border-t border-dashed border-ink/20 flex items-center justify-between text-xs text-ink-soft">
            <span>{item.author}</span>
            <span className="hand text-base text-plum">left here, with consent.</span>
          </div>
        </article>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-ink-soft max-w-md">
            If reading this stirred something, you can leave a letter or a note of your own.
            Nothing posts without your consent.
          </p>
          <div className="flex gap-3">
            <Link to="/write" className="px-5 py-3 rounded-full bg-foreground text-background text-sm">Write a Letter</Link>
            <Link to="/pin" className="px-5 py-3 rounded-full border border-foreground/30 text-sm">Pin a Note</Link>
          </div>
        </div>
      </div>
    </SiteShell>
  );
}
