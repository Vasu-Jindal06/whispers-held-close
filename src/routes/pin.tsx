import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/SiteShell";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/pin")({
  head: () => ({
    meta: [
      { title: "Pin a Note — Letters Left Here" },
      { name: "description", content: "Leave a short anonymous note on the wall. One line is enough." },
      { property: "og:title", content: "Pin a Note — Letters Left Here" },
      { property: "og:description", content: "Confessions, hopes, advice, one-line truths — pinned anonymously." },
    ],
  }),
  component: PinPage,
});

const noteKinds = ["Confession", "Advice", "Message", "Myth to debunk", "Hope", "One-line truth", "Something else"];
const prompts: Record<string, string> = {
  Confession: "Something you've never said aloud.",
  Advice: "What do you wish someone had told you sooner?",
  Message: "What do you wish they understood?",
  "Myth to debunk": "What do people always get wrong?",
  Hope: "What are you writing toward?",
  "One-line truth": "Just one true thing.",
  "Something else": "Whatever it is. Leave it here.",
};

const identityOptions = ["Anonymous", "Initials only", "First name only", "Pseudonym", "Full name", "Private — do not publish"] as const;
type Identity = typeof identityOptions[number];

const identityHelp: Record<Identity, { placeholder?: string; max?: number; note?: string }> = {
  "Anonymous": { note: "Your note will appear as 'anon'." },
  "Initials only": { placeholder: "e.g. R.K.", max: 6 },
  "First name only": { placeholder: "e.g. Priya" },
  "Pseudonym": { placeholder: "Any name that feels right" },
  "Full name": { placeholder: "Your full name" },
  "Private — do not publish": { note: "This will only be read by our team. It won't appear anywhere publicly." },
};

const permOptions = ["Website archive", "Instagram", "Quote card", "Internal only"] as const;

function PinPage() {
  const [kind, setKind] = useState("Confession");
  const [text, setText] = useState("");
  const [identity, setIdentity] = useState<Identity>("Anonymous");
  const [credit, setCredit] = useState("");
  const [perms, setPerms] = useState<string[]>(["Website archive"]);
  const [agree, setAgree] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const isPrivate = identity === "Private — do not publish";

  // when private, force only "Internal only"
  useEffect(() => {
    if (isPrivate) setPerms(["Internal only"]);
  }, [isPrivate]);

  const toggle = (v: string) => {
    if (isPrivate && v !== "Internal only") return;
    setPerms(perms.includes(v) ? perms.filter((x) => x !== v) : [...perms, v]);
  };

  if (submitted) {
    return (
      <SiteShell>
        <div className="mx-auto max-w-2xl px-6 py-32 text-center">
          <p className="hand text-2xl text-plum">pinned, with care.</p>
          <h1 className="serif text-4xl md:text-6xl mt-4 text-foreground">Your note is on the wall.</h1>
          <p className="mt-6 text-ink-soft">It will be read by a small team and added to the archive only with the permissions you set.</p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link to="/wall" className="px-6 py-3 rounded-full bg-foreground text-background text-sm">See the wall</Link>
            <button onClick={() => { setSubmitted(false); setText(""); setAgree(false); }} className="px-6 py-3 rounded-full border border-foreground/30 text-sm">Pin another</button>
          </div>
        </div>
      </SiteShell>
    );
  }

  const help = identityHelp[identity];

  return (
    <SiteShell>
      <div className="mx-auto max-w-3xl px-6 py-16 md:py-24">
        <div className="text-center mb-10">
          <p className="hand text-xl text-plum mb-2">leave it on the wall.</p>
          <h1 className="serif text-4xl md:text-6xl text-foreground leading-tight">A short note is enough.</h1>
          <p className="mt-5 text-ink-soft max-w-xl mx-auto">One line. A confession. A hope. A truth you've been carrying around in your pocket.</p>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
          className="note-card tape-strip tape-blush p-8 md:p-10 bg-[color:color-mix(in_oklab,var(--blush)_18%,var(--card))] space-y-8">
          <div>
            <span className="hand text-base text-plum">what kind of note is this?</span>
            <div className="mt-3 flex flex-wrap gap-2">
              {noteKinds.map((k) => (
                <button type="button" key={k} onClick={() => setKind(k)}
                  className={`px-3.5 py-1.5 rounded-full text-sm border transition ${kind === k ? "bg-foreground text-background border-foreground" : "border-ink/20 text-ink-soft hover:text-foreground hover:border-foreground/50"}`}>
                  {k}
                </button>
              ))}
            </div>
          </div>

          <div>
            <span className="hand text-base text-plum">{prompts[kind]}</span>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
              rows={5}
              maxLength={400}
              placeholder="Write it the way you'd whisper it."
              className="mt-3 w-full bg-transparent border-b border-ink/20 focus:border-plum outline-none py-3 resize-none text-foreground leading-relaxed"
              style={{ fontFamily: "var(--font-serif)", fontSize: "1.35rem" }}
            />
            <div className="text-xs text-ink-soft text-right">{text.length}/400</div>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 pt-2 border-t border-dashed border-ink/15">
            <div>
              <span className="eyebrow block mb-2">Credit as</span>
              <select value={identity} onChange={(e) => setIdentity(e.target.value as Identity)}
                className="w-full bg-paper-deep/40 border border-ink/10 rounded-md p-3 text-sm focus:outline-none focus:border-plum/60">
                {identityOptions.map((o) => <option key={o}>{o}</option>)}
              </select>
              {help.placeholder && (
                <input
                  type="text"
                  value={credit}
                  onChange={(e) => setCredit(e.target.value)}
                  maxLength={help.max}
                  placeholder={help.placeholder}
                  className="mt-2 w-full bg-paper-deep/40 border border-ink/10 rounded-md p-3 text-sm focus:outline-none focus:border-plum/60"
                />
              )}
              {help.note && (
                <p className="mt-2 text-xs text-ink-soft leading-relaxed italic">{help.note}</p>
              )}
            </div>
            <div>
              <span className="eyebrow block mb-2">May appear on</span>
              <div className="flex flex-wrap gap-2">
                {permOptions.map((p) => {
                  const disabled = isPrivate && p !== "Internal only";
                  const active = perms.includes(p);
                  return (
                    <button type="button" key={p} onClick={() => toggle(p)} disabled={disabled}
                      className={`px-3 py-1.5 rounded-full text-xs border transition ${
                        disabled ? "border-ink/10 text-ink-soft/40 line-through cursor-not-allowed" :
                        active ? "bg-plum/10 border-plum text-foreground" : "border-ink/20 text-ink-soft hover:border-foreground/40"
                      }`}>
                      {p}
                    </button>
                  );
                })}
              </div>
              {isPrivate && (
                <p className="mt-2 text-xs text-ink-soft italic leading-relaxed">
                  Since you've chosen to keep this private, it won't be shared publicly.
                </p>
              )}
            </div>
          </div>

          <label className="flex items-start gap-3 cursor-pointer">
            <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} className="mt-1 accent-plum" />
            <span className="text-sm text-foreground">This is mine to share, and I'm okay with the permissions above. I can request removal anytime.</span>
          </label>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <Link to="/privacy" className="text-sm text-plum underline underline-offset-4">How privacy works →</Link>
            <button type="submit" disabled={!agree || !text}
              className="px-7 py-3.5 rounded-full bg-foreground text-background text-sm font-medium hover:opacity-90 transition disabled:opacity-40 disabled:cursor-not-allowed">
              Pin this Note
            </button>
          </div>
        </form>

        <p className="text-center mt-10 text-sm text-ink-soft">
          Have something longer to say?{" "}
          <Link to="/write" className="text-plum underline underline-offset-4">Write a letter instead</Link>
        </p>
      </div>
    </SiteShell>
  );
}
