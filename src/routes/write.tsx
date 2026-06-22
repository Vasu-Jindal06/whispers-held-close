import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/SiteShell";
import { useEffect, useState } from "react";
import paperclipImg from "@/assets/paperclip.png";

export const Route = createFileRoute("/write")({
  head: () => ({
    meta: [
      { title: "Write a Letter — Letters Left Here" },
      { name: "description", content: "Sit down with a page and write something personal. Anonymous if you want. Shared only with your consent." },
      { property: "og:title", content: "Write a Letter — Letters Left Here" },
      { property: "og:description", content: "A consent-first letter form for queer stories, reflections, and family messages." },
    ],
  }),
  component: WritePage,
});

const categoryOptions = [
  "Coming out story",
  "Acceptance / rejection",
  "Advice to younger queer people",
  "Message to family",
  "Ally perspective",
  "Myth to debunk",
  "Hope for the future",
  "Something else",
];

const identityOptions = [
  "Anonymous",
  "Initials only",
  "First name only",
  "Pseudonym",
  "Full name",
  "Keep private — do not publish",
];

const permissionOptions = [
  "Website archive",
  "Instagram post / carousel",
  "Quote card",
  "Voiceover reel",
  "Event digital wall",
  "Internal reading only",
];

function WritePage() {
  const [submitted, setSubmitted] = useState(false);
  const [cats, setCats] = useState<string[]>([]);
  const [identity, setIdentity] = useState("Anonymous");
  const [credit, setCredit] = useState("");
  const [perms, setPerms] = useState<string[]>(["Website archive"]);
  const [agree1, setAgree1] = useState(false);
  const [agree2, setAgree2] = useState(false);
  const [agree3, setAgree3] = useState(false);

  const isPrivate = identity === "Keep private — do not publish";

  useEffect(() => {
    if (isPrivate) setPerms(["Internal reading only"]);
  }, [isPrivate]);

  const toggle = (arr: string[], v: string, setter: (a: string[]) => void) => {
    if (arr === perms && isPrivate && v !== "Internal reading only") return;
    setter(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);
  };

  if (submitted) return <ThankYou kind="letter" />;

  return (
    <SiteShell>
      <div className="mx-auto max-w-3xl px-6 py-16 md:py-24">
        <div className="text-center mb-12">
          <p className="hand text-xl text-plum mb-3">write only what feels safe.</p>
          <h1 className="serif text-4xl md:text-6xl text-foreground leading-tight">
            Sit with a page.<br/>Say what you mean.
          </h1>
          <p className="mt-6 text-ink-soft max-w-xl mx-auto leading-relaxed">
            It doesn't need to be polished. It can be one paragraph or a full story.
            You decide who sees it and where it goes — every step.
          </p>
        </div>

        <form
          onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
          className="paper-card paper-grain p-8 md:p-12 space-y-10 relative"
        >
          <img
            src={paperclipImg}
            alt=""
            aria-hidden
            className="pointer-events-none absolute -top-9 left-12 w-14 md:w-16 rotate-[14deg] drop-shadow-[0_5px_7px_rgba(0,0,0,0.22)] select-none"
          />
          <div className="absolute top-5 right-6 eyebrow text-[0.6rem]">letter draft · 001</div>
          <Section number="01" title="What are you sharing?" hint="Pick one or more — or none if it doesn't fit a box.">
            <div className="flex flex-wrap gap-2">
              {categoryOptions.map((c) => (
                <Chip key={c} active={cats.includes(c)} onClick={() => toggle(cats, c, setCats)}>{c}</Chip>
              ))}
            </div>
          </Section>

          <Section number="02" title="How should we credit you?" hint="If this is published, what name appears with it?">
            <div className="grid sm:grid-cols-2 gap-2">
              {identityOptions.map((o) => (
                <RadioCard key={o} name="identity" value={o} checked={identity === o} onChange={() => setIdentity(o)} />
              ))}
            </div>
          </Section>

          <Section number="03" title="Where may we share this, if selected?" hint="Tick only the places that feel okay. You can change this later.">
            <div className="grid sm:grid-cols-2 gap-2">
              {permissionOptions.map((o) => (
                <CheckCard key={o} checked={perms.includes(o)} onChange={() => toggle(perms, o, setPerms)} label={o} />
              ))}
            </div>
          </Section>

          <Section number="04" title="The letter itself" hint="One paragraph or many. Write the way you'd write to one person.">
            <input
              type="text"
              placeholder="Optional title — e.g. 'to my mother' or 'the part I never said'"
              className="w-full bg-transparent border-b border-ink/20 focus:border-plum outline-none py-3 serif text-2xl placeholder:text-ink-soft/60"
            />
            <textarea
              required
              rows={14}
              placeholder="Start anywhere. There is no right way to begin."
              className="mt-6 w-full bg-paper-deep/40 border border-ink/10 rounded-md p-5 text-foreground leading-relaxed focus:outline-none focus:border-plum/60 resize-y"
              style={{ fontFamily: "var(--font-serif)", fontSize: "1.1rem" }}
            />
            <div className="grid sm:grid-cols-2 gap-4 mt-4">
              <textarea rows={2} placeholder="A note to the team (optional)" className="bg-paper-deep/40 border border-ink/10 rounded-md p-3 text-sm focus:outline-none focus:border-plum/60" />
              <input type="text" placeholder="Content warning to add (optional)" className="bg-paper-deep/40 border border-ink/10 rounded-md p-3 text-sm focus:outline-none focus:border-plum/60" />
            </div>
          </Section>

          <Section number="05" title="Optional context" hint="Everything here is optional. Skip whatever you'd rather not say.">
            <div className="grid sm:grid-cols-2 gap-3">
              <Field label="Pronouns" placeholder="she/her, they/them…" />
              <Field label="Age range" placeholder="18–24, 25–34…" />
              <Field label="City / country" placeholder="Mumbai, India" />
              <Field label="Out to…" placeholder="family / friends / no one / online only / prefer not to say" />
              <Field label="Email — only if you'd like us to contact you before publishing" placeholder="you@example.com" className="sm:col-span-2" />
            </div>
          </Section>

          <Section number="06" title="Review & consent" hint="A small pause before sending.">
            <div className="bg-paper-deep/40 border border-ink/10 rounded-md p-5 text-sm space-y-2">
              <p><span className="text-ink-soft">Category:</span> {cats.length ? cats.join(", ") : <em className="text-ink-soft">none chosen</em>}</p>
              <p><span className="text-ink-soft">Credited as:</span> {identity}</p>
              <p><span className="text-ink-soft">May appear on:</span> {perms.length ? perms.join(", ") : <em className="text-ink-soft">nowhere — kept private</em>}</p>
            </div>
            <div className="mt-5 space-y-3">
              <Consent checked={agree1} onChange={setAgree1} label="I confirm this is my story or perspective to share." />
              <Consent checked={agree2} onChange={setAgree2} label="I understand I can ask for removal later, at any time." />
              <Consent checked={agree3} onChange={setAgree3} label="I'm okay with light edits for clarity or length — without changing meaning." />
            </div>
          </Section>

          <div className="pt-4 border-t border-ink/10 flex flex-wrap items-center justify-between gap-4">
            <Link to="/privacy" className="text-sm text-plum underline underline-offset-4">How privacy actually works →</Link>
            <button
              type="submit"
              disabled={!(agree1 && agree2 && agree3)}
              className="px-7 py-3.5 rounded-full bg-foreground text-background text-sm font-medium hover:opacity-90 transition disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Leave this Letter Here
            </button>
          </div>
        </form>
      </div>
    </SiteShell>
  );
}

function Section({ number, title, hint, children }: { number: string; title: string; hint?: string; children: React.ReactNode }) {
  return (
    <section>
      <div className="flex items-baseline gap-3 mb-1">
        <span className="hand text-lg text-plum">{number}</span>
        <h2 className="serif text-2xl text-foreground">{title}</h2>
      </div>
      {hint && <p className="text-sm text-ink-soft mb-5 ml-7">{hint}</p>}
      <div className="ml-0 sm:ml-7">{children}</div>
    </section>
  );
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button type="button" onClick={onClick}
      className={`px-4 py-2 rounded-full text-sm border transition ${active ? "bg-foreground text-background border-foreground" : "border-ink/20 text-ink-soft hover:border-foreground/50 hover:text-foreground"}`}>
      {children}
    </button>
  );
}

function RadioCard({ name, value, checked, onChange }: { name: string; value: string; checked: boolean; onChange: () => void }) {
  return (
    <label className={`flex items-center gap-3 px-4 py-3 rounded-md border cursor-pointer transition ${checked ? "border-plum bg-plum/5" : "border-ink/15 hover:border-ink/30"}`}>
      <input type="radio" name={name} checked={checked} onChange={onChange} className="accent-plum" />
      <span className="text-sm">{value}</span>
    </label>
  );
}

function CheckCard({ checked, onChange, label }: { checked: boolean; onChange: () => void; label: string }) {
  return (
    <label className={`flex items-center gap-3 px-4 py-3 rounded-md border cursor-pointer transition ${checked ? "border-plum bg-plum/5" : "border-ink/15 hover:border-ink/30"}`}>
      <input type="checkbox" checked={checked} onChange={onChange} className="accent-plum" />
      <span className="text-sm">{label}</span>
    </label>
  );
}

function Field({ label, placeholder, className = "" }: { label: string; placeholder: string; className?: string }) {
  return (
    <label className={`block ${className}`}>
      <span className="text-xs text-ink-soft block mb-1.5">{label}</span>
      <input type="text" placeholder={placeholder} className="w-full bg-paper-deep/40 border border-ink/10 rounded-md p-3 text-sm focus:outline-none focus:border-plum/60" />
    </label>
  );
}

function Consent({ checked, onChange, label }: { checked: boolean; onChange: (b: boolean) => void; label: string }) {
  return (
    <label className="flex items-start gap-3 cursor-pointer">
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="mt-1 accent-plum" />
      <span className="text-sm text-foreground leading-relaxed">{label}</span>
    </label>
  );
}

function ThankYou({ kind }: { kind: "letter" | "note" }) {
  return (
    <SiteShell>
      <div className="mx-auto max-w-2xl px-6 py-32 text-center">
        <p className="hand text-2xl text-plum">received, gently.</p>
        <h1 className="serif text-4xl md:text-6xl text-foreground mt-4 leading-tight">
          Thank you for leaving this here.
        </h1>
        <p className="mt-6 text-ink-soft leading-relaxed">
          Your {kind} is with us. A small team will read it with care. If you
          asked to be contacted before publishing, we'll write to you first. If
          you ever change your mind, write to{" "}
          <a href="mailto:lettersleft@enactus.org" className="text-plum underline underline-offset-4">lettersleft@enactus.org</a>{" "}
          and we'll take it down.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link to="/wall" className="px-6 py-3 rounded-full bg-foreground text-background text-sm">Read the Wall</Link>
          <Link to="/" className="px-6 py-3 rounded-full border border-foreground/30 text-foreground text-sm">Back home</Link>
        </div>
      </div>
    </SiteShell>
  );
}
