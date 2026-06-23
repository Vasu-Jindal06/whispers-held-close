import type { WallItem } from "@/lib/wall-data";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import paperclipImg from "@/assets/paperclip.png";

const toneBg: Record<NonNullable<WallItem["tone"]>, string> = {
  blush: "bg-[color:color-mix(in_oklab,var(--blush)_30%,var(--card))]",
  lavender: "bg-[color:color-mix(in_oklab,var(--lavender)_28%,var(--card))]",
  teal: "bg-[color:color-mix(in_oklab,var(--teal)_22%,var(--card))]",
  gold: "bg-[color:color-mix(in_oklab,var(--gold)_28%,var(--card))]",
  paper: "bg-card",
};

export function WallCard({ item, dense = false }: { item: WallItem; dense?: boolean }) {
  const tone = item.tone ?? "paper";
  const isLetter = item.kind === "letter";
  const attach = item.attach ?? (isLetter ? "paperclip" : "tape");

  const attachClass =
    attach === "tape" ? "tape-strip" :
    attach === "tape-corner" ? "tape-corner" :
    attach === "pin" ? "pin-top" :
    "";

  const kindLabel: Record<string, string> = {
    letter: "archive entry",
    confession: "left here anonymously",
    advice: "to my younger self",
    truth: "myth to debunk",
    hope: "a hope",
    family: "to my family",
  };

  return (
    <article
      className={cn(
        "note-card relative p-6 md:p-7 stack-lift paper-grain paper-settle",
        toneBg[tone],
        attachClass,
        isLetter ? "md:p-9 pt-9 md:pt-12 ruled-paper" : "",
        item.kind === "confession" ? "torn-bottom pb-9" : "",
      )}
      style={{ transform: `rotate(${item.rotate ?? 0}deg)`, ['--rot' as never]: `${item.rotate ?? 0}deg` }}
    >
      {attach === "paperclip" && (
        <img
          src={paperclipImg}
          alt=""
          aria-hidden
          loading="lazy"
          className="pointer-events-none absolute -top-5 left-6 w-7 md:w-9 rotate-[18deg] drop-shadow-[0_3px_4px_rgba(0,0,0,0.18)] select-none"
        />
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

      <p className={cn(
        "text-ink leading-relaxed",
        isLetter ? "text-[0.98rem]" : "text-[1.02rem]",
      )}>
        {item.body}
      </p>

      <div className="mt-5 pt-4 border-t border-dashed border-ink/15 flex items-center justify-between">
        <span className="text-xs text-ink-soft">{item.author}</span>
        {isLetter && item.fullLetter && (
          <Link
            to="/letter/$id"
            params={{ id: item.id }}
            className="text-xs text-plum hover:text-foreground underline underline-offset-4 decoration-dotted"
          >
            Read full letter →
          </Link>
        )}
      </div>
    </article>
  );
}
