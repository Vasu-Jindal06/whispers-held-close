import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/SiteShell";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { MarginNote } from "@/components/MarginNote";
import { PaperPlaneTransition } from "@/components/PaperPlaneTransition";
import { SubmissionSuccess } from "@/components/SubmissionSuccess";
import { WallCard } from "@/components/WallCard";
import type { WallItem } from "@/lib/wall-data";
import flower4Img from "@/assets/flower4.png";

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

const floatingNotesPin: WallItem[] = [
  {
    id: "fp1",
    kind: "truth",
    label: "A truth I've learned",
    body: "Peace looks different for everyone.",
    author: "left anonymously",
    tone: "paper",
    attach: "tape",
    rotate: -1
  },
  {
    id: "fp2",
    kind: "confession",
    label: "Anonymous confession",
    body: "Some days I still introduce myself twice.",
    author: "left anonymously",
    tone: "blush",
    attach: "paperclip",
    rotate: 2
  }
];

const pinCategoryMap: Record<string, { label: string; prompt: string }> = {
  "anonymous_confession": { label: "Confession", prompt: "Something you've never said aloud." },
  "younger_self": { label: "Advice", prompt: "What do you wish someone had told you sooner?" },
  "message_to_family": { label: "Message", prompt: "What do you wish they understood?" },
  "myth_to_debunk": { label: "Myth to debunk", prompt: "What do people always get wrong?" },
  "hope_for_future": { label: "Hope", prompt: "What are you writing toward?" },
  "one_line_truth": { label: "One-line truth", prompt: "Just one true thing." },
  "other": { label: "Something else", prompt: "Whatever it is. Leave it here." },
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

const permissionMap: Record<string, string> = {
  "consent_website": "Website archive",
  "consent_instagram": "Instagram",
  "consent_quote_cards": "Quote card",
  "consent_reels": "Reels",
  "internal": "Internal only",
};

function PinPage() {
  const [kind, setKind] = useState("anonymous_confession");
  const [text, setText] = useState("");
  const [identity, setIdentity] = useState<Identity>("Anonymous");
  const [credit, setCredit] = useState("");
  const [perms, setPerms] = useState<string[]>(["consent_website"]);
  const [agree, setAgree] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const [loading, setLoading] = useState(false);

  const isPrivate = identity === "Private — do not publish";

  useEffect(() => {
    if (isPrivate) setPerms(["internal"]);
  }, [isPrivate]);

  const toggle = (v: string) => {
    if (isPrivate && v !== "internal") return;
    setPerms(perms.includes(v) ? perms.filter((x) => x !== v) : [...perms, v]);
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
      const { error } = await supabase.from('notes').insert({
        category: kind,
        note_text: text,
        display_name: displayName,
        is_anonymous: isAnonymous,
        consent_website: perms.includes("consent_website"),
        consent_instagram: perms.includes("consent_instagram"),
        consent_reels: perms.includes("consent_reels"),
        consent_quote_cards: perms.includes("consent_quote_cards"),
        allow_public_display: !isPrivate && perms.includes("consent_website"),
        status: "pending"
      });
      if (error) throw error;
      setTransitioning(true);
    } catch (err) {
      console.error(err);
      alert("Something went wrong saving your note. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <SiteShell>
        <SubmissionSuccess onReset={() => { setSubmitted(false); setTransitioning(false); setText(""); setAgree(false); }} isPin />
      </SiteShell>
    );
  }

  const help = identityHelp[identity];
  const activePrompt = pinCategoryMap[kind]?.prompt || "What's on your mind?";

  return (
    <SiteShell>
      <PaperPlaneTransition active={transitioning} onComplete={() => setSubmitted(true)} />
      <div className="min-h-screen relative overflow-hidden">
        
        {/* Floating Background Decorative Cards (Desktop only) */}
        <div className="hidden xl:block absolute left-8 top-32 w-[300px] opacity-100 z-0 pointer-events-none group hover:pointer-events-auto">
          <WallCard item={floatingNotesPin[0]} dense />
        </div>
        <div className="hidden xl:block absolute right-8 top-1/3 w-[300px] opacity-100 z-0 pointer-events-none group hover:pointer-events-auto">
          <WallCard item={floatingNotesPin[1]} dense />
          <img src={flower4Img} alt="" className="absolute -bottom-10 -right-6 w-28 rotate-[-5deg] opacity-90 mix-blend-multiply pointer-events-none" />
        </div>

        <div className="mx-auto max-w-2xl px-6 py-16 md:py-24 relative z-10">
          <div className="text-center mb-10">
            <p className="hand text-xl text-plum mb-2">leave it on the wall.</p>
            <h1 className="serif text-4xl md:text-6xl text-foreground leading-tight">A short note is enough.</h1>
            <p className="mt-5 text-ink-soft max-w-xl mx-auto">One line. A confession. A hope. A truth you've been carrying around in your pocket.</p>
          </div>

          <form onSubmit={handleSubmit}
            className="note-card tape-strip tape-blush p-8 md:p-10 bg-[color:color-mix(in_oklab,var(--blush)_18%,var(--card))] space-y-8">
          <div>
            <span className="hand text-base text-plum">what kind of note is this?</span>
            <div className="mt-3 flex flex-wrap gap-2">
              {Object.entries(pinCategoryMap).map(([k, { label }]) => (
                <button type="button" key={k} onClick={() => setKind(k)}
                  className={`px-3.5 py-1.5 rounded-full text-sm border transition ${kind === k ? "bg-foreground text-background border-foreground" : "border-ink/20 text-ink-soft hover:text-foreground hover:border-foreground/50"}`}>
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <span className="hand text-base text-plum">{activePrompt}</span>
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
                {Object.entries(permissionMap).map(([k, label]) => {
                  const disabled = isPrivate && k !== "internal";
                  const active = perms.includes(k);
                  return (
                    <button type="button" key={k} onClick={() => toggle(k)} disabled={disabled}
                      className={`px-3 py-1.5 rounded-full text-xs border transition ${
                        disabled ? "border-ink/10 text-ink-soft/40 line-through cursor-not-allowed" :
                        active ? "bg-plum/10 border-plum text-foreground" : "border-ink/20 text-ink-soft hover:border-foreground/40"
                      }`}>
                      {label}
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

          <div className="pt-6 border-t border-dashed border-ink/15 text-center">
            <button type="submit" disabled={loading || !agree}
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-foreground text-background text-sm font-medium hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed">
              {loading ? "Pinning..." : "Pin Note"}
            </button>
          </div>
        </form>
        <div className="relative flex justify-center mt-8">
           <MarginNote text="one line is enough." rotate={1} className="" />
        </div>

        <p className="text-center mt-10 text-sm text-ink-soft">
          Have something longer to say?{" "}
          <Link to="/write" className="text-plum underline underline-offset-4">Write a letter instead</Link>
        </p>
      </div>
      </div>
    </SiteShell>
  );
}
