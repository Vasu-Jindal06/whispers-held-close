import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import flowerImg from "@/assets/flower.png";

export function SubmissionSuccess({ onReset, isPin }: { onReset: () => void; isPin?: boolean }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="mx-auto max-w-lg px-6 py-20 md:py-32 flex flex-col items-center justify-center relative">
      {/* Container for layered physical card effect */}
      <div className="relative w-full max-w-[420px]">
        {/* Layer 1: Back Envelope */}
        <div
          className="absolute inset-0 bg-[#d9c39a] rounded-sm transform translate-y-6 rotate-[-4deg] opacity-0 transition-all duration-[800ms] ease-out"
          style={{
            boxShadow: "0 12px 24px -12px rgba(0,0,0,0.15)",
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(12px) rotate(-4deg)" : "translateY(24px) rotate(-6deg)",
          }}
        >
          <div
            className="absolute top-0 left-0 right-0 h-1/2 bg-[#b89a6a]/60"
            style={{ clipPath: "polygon(0 0, 100% 0, 50% 100%)" }}
          />
        </div>

        {/* Layer 2: Main Card */}
        <div
          className="relative bg-card paper-grain p-8 md:p-10 rounded-[6px] opacity-0 transition-all duration-[600ms] ease-out delay-[100ms] z-10"
          style={{
            boxShadow: "0 8px 32px rgba(60,40,20,0.10)",
            opacity: mounted ? 1 : 0,
            transform: mounted ? "scale(1)" : "scale(0.96) translateY(10px)",
          }}
        >
          {/* Layer 3: Washi tape */}
          <div
            className="absolute top-[-9px] left-1/2 w-[160px] h-[18px] rounded-[2px] opacity-0 transition-all duration-[500ms] ease-out delay-[200ms]"
            style={{
              background: "rgba(210, 185, 140, 0.70)",
              transform: mounted ? "translateX(-50%) rotate(1.5deg) translateY(0)" : "translateX(-50%) rotate(1.5deg) translateY(-10px)",
              opacity: mounted ? 1 : 0,
            }}
          />

          <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start relative mt-2">
            {/* Layer 4: Envelope Illustration */}
            <div
              className="relative shrink-0 opacity-0 transition-opacity duration-[600ms] ease-out delay-[250ms]"
              style={{ opacity: mounted ? 1 : 0 }}
            >
              {/* Envelope Body */}
              <div className="w-[85px] h-[65px] bg-[#a985a9] rounded-sm relative shadow-sm overflow-hidden flex items-center justify-center">
                {/* Flap */}
                <div
                  className="absolute top-0 left-0 right-0 h-[60%] bg-[#966b96]"
                  style={{ clipPath: "polygon(0 0, 100% 0, 50% 100%)" }}
                />
                <img src={flowerImg} alt="" className="absolute -bottom-2 -left-2 w-14 opacity-80 mix-blend-multiply" />
                {/* Wax Seal */}
                <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[22px] h-[22px] rounded-full bg-[#8c3535] shadow-[0_2px_4px_rgba(0,0,0,0.3)] border border-[#5e1c1c]/30 flex items-center justify-center">
                  <div className="w-[16px] h-[16px] rounded-full border border-[#5e1c1c]/40" />
                </div>
              </div>
            </div>

            {/* Layer 5: Card text */}
            <div
              className="opacity-0 transition-all duration-[600ms] ease-out delay-[300ms]"
              style={{ opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(5px)" }}
            >
              <h2 className="serif text-[26px] text-plum mb-3 leading-none">Thank you.</h2>
              <p className="text-[14px] text-ink/80 leading-[1.65] mb-5">
                Your words have been tucked safely into the archive.
              </p>
              <p className="hand text-[15px] text-ink-soft flex items-center gap-1.5">
                We'll hold them with care.
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-plum opacity-80 mt-0.5" style={{ strokeWidth: 1.5 }}>
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </p>
            </div>
          </div>

          {/* Layer 6: Archive stamp */}
          <div
            className="absolute bottom-4 right-4 w-[52px] h-[52px] rounded-full border border-ink/20 text-[6px] tracking-widest text-ink/30 flex items-center justify-center text-center leading-[1.2] opacity-0 transition-all duration-[400ms] ease-out delay-[400ms]"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "scale(1) rotate(-10deg)" : "scale(1.08) rotate(0)",
            }}
          >
            PRIDE<br/>ARCHIVE<br/>2026
          </div>
        </div>
      </div>

      <div
        className="mt-14 flex flex-col items-center gap-4 opacity-0 transition-opacity duration-700 delay-500"
        style={{ opacity: mounted ? 1 : 0 }}
      >
        <Link to="/wall" className="text-sm text-plum hover:text-foreground underline underline-offset-4 decoration-plum/40 transition-colors">
          Read what others have left →
        </Link>
        <button
          onClick={onReset}
          className="px-5 py-2.5 rounded-full border border-ink/20 text-ink text-xs hover:border-ink/40 transition-colors"
        >
          {isPin ? "Leave another note" : "Write another letter"}
        </button>
      </div>
    </div>
  );
}
