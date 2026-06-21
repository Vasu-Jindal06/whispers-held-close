import type { WallItem } from "@/lib/wall-data";
import { cn } from "@/lib/utils";

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
  return (
    <article
      className={cn(
        "note-card tape-strip p-6 md:p-7 transition-transform duration-300 hover:-translate-y-1 hover:rotate-0",
        toneBg[tone],
        isLetter ? "md:p-9" : "",
      )}
      style={{ transform: `rotate(${item.rotate ?? 0}deg)` }}
    >
      <div className="flex items-center justify-between mb-3">
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
        {isLetter && (
          <button className="text-xs text-plum hover:text-foreground underline underline-offset-4 decoration-dotted">
            Read full letter
          </button>
        )}
      </div>
    </article>
  );
}
