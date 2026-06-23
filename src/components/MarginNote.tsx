import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export interface MarginNoteProps {
  text?: string;
  rotate?: number;
  className?: string;
  icon?: "arrow" | "stars" | "heart";
  children?: ReactNode;
  opacity?: number;
}

export function MarginNote({ text, rotate = 0, className, icon, children, opacity = 60 }: MarginNoteProps) {
  return (
    <div
      className={cn(
        "hidden md:block absolute pointer-events-none z-0",
        className
      )}
      style={{
        transform: `rotate(${rotate}deg)`,
        opacity: opacity / 100,
      }}
    >
      <div className="flex flex-col items-center gap-2">
        {text && (
          <span
            className="hand"
            style={{
              fontSize: "clamp(11px, 1vw, 13px)",
              color: "inherit",
              whiteSpace: "nowrap"
            }}
          >
            {text}
          </span>
        )}
        {icon === "arrow" && (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-plum opacity-50" style={{ strokeWidth: 1.2 }}>
            <path d="M4 4C8 12 16 16 20 20M20 20L15 19.5M20 20L19.5 15" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
        {icon === "stars" && (
          <div className="flex gap-1">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-gold opacity-60" style={{ strokeWidth: 1.5 }}>
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-gold opacity-60 translate-y-1" style={{ strokeWidth: 1.5 }}>
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        )}
        {icon === "heart" && (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-plum opacity-50" style={{ strokeWidth: 1.5 }}>
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
        {children}
      </div>
    </div>
  );
}
