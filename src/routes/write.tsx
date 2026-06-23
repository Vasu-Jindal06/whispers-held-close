import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/SiteShell";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import paperclipImg from "@/assets/paperclip.png";
import { MarginNote } from "@/components/MarginNote";
import { PaperPlaneTransition } from "@/components/PaperPlaneTransition";
import { SubmissionSuccess } from "@/components/SubmissionSuccess";

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

export const categoryMap: Record<string, string> = {
  "coming_out_story": "Coming out story",
  "acceptance_rejection": "Acceptance / rejection",
  "younger_self": "Advice to younger queer people",
  "message_to_family": "Message to family",
  "anonymous_confession": "Anonymous confession",
  "ally_experience": "Ally perspective",
  "myth_to_debunk": "Myth to debunk",
  "hope_for_future": "Hope for the future",
};

const identityOptions = [
  "Anonymous",
  "Initials only",
  "First name only",
  "Pseudonym",
  "Full name",
  "Keep private — do not publish",
];

const permissionMap: Record<string, string> = {
  "consent_website": "Website archive",
  "consent_instagram": "Instagram post / carousel",
  "consent_quote_cards": "Quote card",
  "consent_reels": "Voiceover reel",
  "internal": "Internal reading only",
};

function WritePage() {
  const [submitted, setSubmitted] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [cats, setCats] = useState<string[]>([]);
  const [identity, setIdentity] = useState("Anonymous");
  const [credit, setCredit] = useState("");
  
  const [perms, setPerms] = useState<string[]>(["consent_website"]);
  
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [pronouns, setPronouns] = useState("");
  const [age, setAge] = useState("");
  const [location, setLocation] = useState("");

  const [agree1, setAgree1] = useState(false);
  const [agree2, setAgree2] = useState(false);
  const [agree3, setAgree3] = useState(false);

  const isPrivate = identity === "Keep private — do not publish";

  useEffect(() => {
    if (isPrivate) setPerms(["internal"]);
  }, [isPrivate]);

  const toggle = (arr: string[], v: string, setter: (a: string[]) => void) => {
    if (arr === perms && isPrivate && v !== "internal") return;
    setter(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const isAnonymous = identity === "Anonymous" || isPrivate;
    let displayName = isAnonymous ? "Anonymous" : credit;
    if (!isAnonymous && !credit) {
       displayName = identity; 
    }

    try {
      const { error } = await supabase.from('letters').insert({
        category: cats.length > 0 ? cats[0] : null,
        title: title || null,
        body: body,
        display_name: displayName,
        is_anonymous: isAnonymous,
        age: age || null,
        pronouns: pronouns || null,
        location: location || null,
        consent_website: perms.includes("consent_website"),
        consent_instagram: perms.includes("consent_instagram"),
        consent_reels: perms.includes("consent_reels"),
        consent_quote_cards: perms.includes("consent_quote_cards"),
        allow_public_display: !isPrivate && perms.includes("consent_website"),
        allow_editing_for_length: agree3,
        status: "pending"
      });
      if (error) throw error;
      setTransitioning(true);
    } catch (err) {
      console.error(err);
      alert("Something went wrong saving your letter. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <SiteShell>
        <SubmissionSuccess onReset={() => { setSubmitted(false); setTitle(""); setBody(""); }} />
      </SiteShell>
    );
  }

  return (
    <SiteShell>
      <PaperPlaneTransition active={transitioning} onComplete={() => { setTransitioning(false); setSubmitted(true); }} />
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
          onSubmit={handleSubmit}
          className="paper-card paper-grain p-8 md:p-12 space-y-10 relative"
        >
          <MarginNote text="write only what feels safe" rotate={-90} className="-left-14 top-1/2 origin-center" />
          <img
            src={paperclipImg}
            alt=""
            aria-hidden
            className="pointer-events-none absolute -top-9 left-12 w-14 md:w-16 rotate-[14deg] drop-shadow-[0_5px_7px_rgba(0,0,0,0.22)] select-none"
          />
          <div className="absolute top-5 right-6 eyebrow text-[0.6rem]">letter draft · 001</div>
          <Section number="01" title="What are you sharing?" hint="Pick one or more — or none if it doesn't fit a box.">
            <div className="flex flex-wrap gap-2">
              {Object.entries(categoryMap).map(([k, label]) => (
                <Chip key={k} active={cats.includes(k)} onClick={() => toggle(cats, k, setCats)}>{label}</Chip>
              ))}
            </div>
          </Section>

          <Section number="02" title="How should we credit you?" hint="If this is published, what name appears with it?">
            <div className="grid sm:grid-cols-2 gap-2">
              {identityOptions.map((o) => (
                <RadioCard key={o} name="identity" value={o} checked={identity === o} onChange={() => setIdentity(o)} />
              ))}
            </div>
            <CreditField identity={identity} value={credit} onChange={setCredit} />
          </Section>

          <Section number="03" title="Where may we share this, if selected?" hint="Tick only the places that feel okay. You can change this later.">
            <div className="grid sm:grid-cols-2 gap-2">
              {Object.entries(permissionMap).map(([k, label]) => {
                const disabled = isPrivate && k !== "internal";
                return (
                  <CheckCard key={k} checked={perms.includes(k)} disabled={disabled} onChange={() => toggle(perms, k, setPerms)} label={label} />
                );
              })}
            </div>
            {isPrivate && (
              <p className="mt-3 text-sm text-ink-soft italic leading-relaxed">
                Since you've chosen to keep this private, it won't be shared publicly.
              </p>
            )}
          </Section>


          <Section number="04" title="The letter itself" hint="One paragraph or many. Write the way you'd write to one person.">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Optional title — e.g. 'to my mother' or 'the part I never said'"
              className="w-full bg-transparent border-b border-ink/20 focus:border-plum outline-none py-3 serif text-2xl placeholder:text-ink-soft/60"
            />
            <div className="relative">
              <textarea
                required
                value={body}
                onChange={(e) => setBody(e.target.value)}
                rows={14}
                placeholder="Start anywhere. There is no right way to begin."
                className="mt-6 w-full bg-paper-deep/40 border border-ink/10 rounded-md p-5 text-foreground leading-relaxed focus:outline-none focus:border-plum/60 resize-y"
                style={{ fontFamily: "var(--font-serif)", fontSize: "1.1rem" }}
              />
              <MarginNote text="you can be unfinished." rotate={-1} className="right-2 -bottom-8" />
            </div>
          </Section>

          <Section number="05" title="Optional context" hint="Everything here is optional. Skip whatever you'd rather not say.">
            <div className="grid sm:grid-cols-2 gap-3">
              <Field value={pronouns} onChange={setPronouns} label="Pronouns" placeholder="she/her, they/them…" />
              <Field value={age} onChange={setAge} label="Age range" placeholder="18–24, 25–34…" />
              <Field value={location} onChange={setLocation} label="City / country" placeholder="Mumbai, India" />
            </div>
          </Section>

          <Section number="06" title="Review & consent" hint="A small pause before sending.">
            <div className="bg-paper-deep/40 border border-ink/10 rounded-md p-5 text-sm space-y-2">
              <p><span className="text-ink-soft">Category:</span> {cats.length ? cats.map(c => categoryMap[c]).join(", ") : <em className="text-ink-soft">none chosen</em>}</p>
              <p><span className="text-ink-soft">Credited as:</span> {identity}</p>
              <p><span className="text-ink-soft">May appear on:</span> {perms.length ? perms.map(p => permissionMap[p]).join(", ") : <em className="text-ink-soft">nowhere — kept private</em>}</p>
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
              disabled={!(agree1 && agree2 && agree3) || loading}
              className="px-7 py-3.5 rounded-full bg-foreground text-background text-sm font-medium hover:opacity-90 transition disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {loading ? "Sending..." : "Leave this Letter Here"}
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

function CheckCard({ checked, onChange, label, disabled = false }: { checked: boolean; onChange: () => void; label: string; disabled?: boolean }) {
  return (
    <label className={`flex items-center gap-3 px-4 py-3 rounded-md border transition ${
      disabled ? "border-ink/10 bg-ink/5 cursor-not-allowed opacity-50" :
      checked ? "border-plum bg-plum/5 cursor-pointer" : "border-ink/15 hover:border-ink/30 cursor-pointer"
    }`}>
      <input type="checkbox" checked={checked} onChange={onChange} disabled={disabled} className="accent-plum" />
      <span className={`text-sm ${disabled ? "line-through" : ""}`}>{label}</span>
    </label>
  );
}

const creditConfig: Record<string, { placeholder?: string; max?: number; note?: string }> = {
  "Anonymous": { note: "Your letter will appear as 'anon'." },
  "Initials only": { placeholder: "e.g. R.K.", max: 6 },
  "First name only": { placeholder: "e.g. Priya" },
  "Pseudonym": { placeholder: "Any name that feels right" },
  "Full name": { placeholder: "Your full name" },
  "Keep private — do not publish": { note: "This will only be read by our team. It won't appear anywhere publicly." },
};

function CreditField({ identity, value, onChange }: { identity: string; value: string; onChange: (v: string) => void }) {
  const cfg = creditConfig[identity];
  if (!cfg) return null;
  return (
    <div className="mt-4">
      {cfg.placeholder && (
        <input
          type="text"
          value={value}
          maxLength={cfg.max}
          onChange={(e) => onChange(e.target.value)}
          placeholder={cfg.placeholder}
          className="w-full sm:w-1/2 bg-paper-deep/40 border border-ink/10 rounded-md p-3 text-sm focus:outline-none focus:border-plum/60"
        />
      )}
      {cfg.note && <p className="text-xs text-ink-soft italic leading-relaxed">{cfg.note}</p>}
    </div>
  );
}

function Field({ label, placeholder, value, onChange, className = "" }: { label: string; placeholder: string; value: string; onChange: (v: string) => void; className?: string }) {
  return (
    <label className={`block ${className}`}>
      <span className="text-xs text-ink-soft block mb-1.5">{label}</span>
      <input type="text" value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="w-full bg-paper-deep/40 border border-ink/10 rounded-md p-3 text-sm focus:outline-none focus:border-plum/60" />
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

