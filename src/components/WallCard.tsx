import type { WallItem } from "@/lib/wall-data";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";

const toneBg: Record<NonNullable<WallItem["tone"]>, string> = {
  blush: "bg-[color:color-mix(in_oklab,var(--blush)_30%,var(--card))]",
  lavender: "bg-[color:color-mix(in_oklab,var(--lavender)_28%,var(--card))]",
  teal: "bg-[color:color-mix(in_oklab,var(--teal)_22%,var(--card))]",
  gold: "bg-[color:color-mix(in_oklab,var(--gold)_28%,var(--card))]",
  paper: "bg-card",
  lilac: "bg-[color:color-mix(in_oklab,var(--lilac)_30%,var(--card))]",
  rose: "bg-[color:color-mix(in_oklab,var(--rose)_30%,var(--card))]",
};

const toneColor: Record<NonNullable<WallItem["tone"]>, string> = {
  blush: "color-mix(in oklab, var(--blush) 30%, var(--card))",
  lavender: "color-mix(in oklab, var(--lavender) 28%, var(--card))",
  teal: "color-mix(in oklab, var(--teal) 22%, var(--card))",
  gold: "color-mix(in oklab, var(--gold) 28%, var(--card))",
  paper: "var(--card)",
  lilac: "color-mix(in oklab, var(--lilac) 30%, var(--card))",
  rose: "color-mix(in oklab, var(--rose) 30%, var(--card))",
};

export function WallCard({ item, dense = false }: { item: WallItem; dense?: boolean }) {
  const tone = item.tone ?? "paper";
  const isLetter = item.kind === "letter";
  let attach = "none";
  if (item.kind === "letter" || item.kind === "family" || item.kind === "message_to_family") attach = "paperclip";
  if (item.kind === "confession" || item.kind === "anonymous_confession" || item.kind === "advice" || item.kind === "younger_self") attach = "tape";
  if (item.kind === "hope" || item.kind === "hope_for_future") attach = "pin";

  const kindLabelMap: Record<string, string> = {
    letter: `archive entry · ${(item.id || "000").slice(0, 3)}`,
    confession: item.author === "Anonymous" ? "left here anonymously" : item.author,
    anonymous_confession: item.author === "Anonymous" ? "left here anonymously" : item.author,
    advice: "to my younger self",
    younger_self: "to my younger self",
    truth: "myth to debunk",
    myth_to_debunk: "myth to debunk",
    hope: "a hope",
    hope_for_future: "a hope",
    family: "to my family",
    message_to_family: "to my family",
  };
  const bottomLabel = kindLabelMap[item.kind] || item.kind;

  const isLong = item.body && (item.body.length > 320 || item.body.split('\n').length > 7);
  const shouldTruncate = isLetter && isLong;

  return (
    <article
      className={cn(
        "note-card relative p-6 md:p-7 paper-grain paper-settle group",
        toneBg[tone],
        isLetter ? "md:p-9 pt-9 md:pt-12 ruled-paper" : "",
        item.kind === "confession" || item.kind === "anonymous_confession" ? "torn-bottom pb-9" : "",
        "transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(60,40,20,0.13)] transform"
      )}
      style={{
        "--tw-rotate": `${item.rotate ?? 0}deg`,
        transform: `translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate))`,
        ['--rot' as never]: `${item.rotate ?? 0}deg`
      } as React.CSSProperties}
    >
      {attach === "paperclip" && (
        <div className="pointer-events-none absolute -top-2 left-[14px] rotate-[15deg] z-10">
          <svg width="14" height="28" viewBox="0 0 14 28" fill="none" className="drop-shadow-sm">
            <path d="M7 26C3.68629 26 1 23.3137 1 20V8C1 4.68629 3.68629 2 7 2C10.3137 2 13 4.68629 13 8V22C13 24.2091 11.2091 26 9 26C6.79086 26 5 24.2091 5 22V8" stroke="#999" strokeWidth="1.2" strokeLinecap="round"/>
          </svg>
        </div>
      )}
      {attach === "tape" && (
        <div className="pointer-events-none absolute -top-[6px] left-1/2 -translate-x-1/2 rotate-[1.5deg] w-[60px] h-[14px] rounded-[2px] z-10" style={{ background: "rgba(210, 185, 140, 0.55)" }} />
      )}
      {attach === "pin" && (
        <div className="pointer-events-none absolute -top-[7px] left-1/2 -translate-x-1/2 w-[12px] h-[12px] rounded-full bg-[#C17B7B] shadow-[0_2px_4px_rgba(0,0,0,0.2)] z-10" />
      )}


      {/* Random Junk Journal Overlays */}
      {isLetter && (
        <span className="archive-stamp text-[0.6rem] absolute top-3 right-4 rotate-[15deg] border-plum/30 text-plum/60 select-none">
          Archive
        </span>
      )}

      <div className="flex items-center justify-between mb-3 mt-4">
        <span className="hand text-base text-plum">{item.label}</span>
        <span className="eyebrow text-[0.62rem]">{item.kind}</span>
      </div>

      {item.title && (
        <h3 className={cn("serif text-foreground leading-snug mb-3", dense ? "text-xl" : "text-2xl md:text-[1.7rem]")}>
          {item.title}
        </h3>
      )}

      <div className={cn("relative", shouldTruncate ? "max-h-[14rem] overflow-hidden" : "")}>
        <p className={cn(
          "text-ink leading-relaxed whitespace-pre-wrap",
          isLetter ? "text-[0.98rem]" : "text-[1.02rem]",
        )}>
          {item.body}
        </p>
        {shouldTruncate && (
          <div 
            className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
            style={{
              background: `linear-gradient(to bottom, transparent, ${toneColor[tone]})`
            }}
          />
        )}
      </div>

      <div className="mt-5 pt-4 border-t border-dashed border-ink/15 flex items-center justify-between">
        <span className="hand text-[10px] opacity-55 text-ink-soft">{bottomLabel}</span>
        {isLetter && item.fullLetter && (
          <Link
            to="/letter/$id"
            params={{ id: item.id }}
            className="text-xs text-plum hover:text-foreground underline underline-offset-4 decoration-dotted relative z-10"
          >
            Read full letter →
          </Link>
        )}
      </div>
    </article>
  );
}
