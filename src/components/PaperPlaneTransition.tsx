import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function PaperPlaneTransition({ active, onComplete }: { active: boolean, onComplete: () => void }) {
  const [fadingOut, setFadingOut] = useState(false);

  useEffect(() => {
    if (active) {
      setFadingOut(false);
      const fadeTimer = setTimeout(() => {
        setFadingOut(true);
      }, 1800);
      
      const completeTimer = setTimeout(() => {
        onComplete();
      }, 2000);
      
      return () => {
        clearTimeout(fadeTimer);
        clearTimeout(completeTimer);
      }
    }
  }, [active, onComplete]);

  if (!active) return null;

  return (
    <div className={cn(
      "fixed inset-0 z-[100] flex items-center justify-center bg-background/95 transition-opacity duration-200 pointer-events-none",
      fadingOut ? "opacity-0" : "opacity-100"
    )}>
      {/* Path container */}
      <div className="absolute inset-0 flex justify-center items-end pb-10">
        <svg viewBox="0 0 400 800" fill="none" className="w-[400px] h-[800px] absolute bottom-0 overflow-visible">
          <defs>
            <clipPath id="transition-clip">
              <path
                d="M200,800 C200,750 150,650 100,550 C50,450 50,350 150,300 C250,250 350,350 300,450 C250,550 150,500 100,400 C50,300 250,150 350,50"
                stroke="white"
                strokeWidth="40"
                fill="none"
                style={{
                  strokeDasharray: 2000,
                  strokeDashoffset: 2000,
                  animation: "transition-trail-mask 2.0s ease-in-out forwards",
                  animationDelay: "80ms"
                }}
              />
            </clipPath>
          </defs>
          <path
            d="M200,800 C200,750 150,650 100,550 C50,450 50,350 150,300 C250,250 350,350 300,450 C250,550 150,500 100,400 C50,300 250,150 350,50"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray="3 9"
            className="text-plum/45"
            clipPath="url(#transition-clip)"
          />
        </svg>

        <div
          className="absolute top-0 left-1/2 -ml-[200px] w-[400px] h-[800px] origin-center"
        >
          <div 
            className="absolute top-0 left-0"
            style={{
              offsetPath: "path('M200,800 C200,750 150,650 100,550 C50,450 50,350 150,300 C250,250 350,350 300,450 C250,550 150,500 100,400 C50,300 250,150 350,50')",
              offsetRotate: "auto 45deg",
              animation: "transition-fly 2.0s ease-in-out forwards",
              animationDelay: "80ms",
              opacity: 0,
            }}
          >
            <svg
              width="40"
              height="28"
              viewBox="0 0 28 20"
              fill="none"
              className="text-ink stroke-current"
              style={{ strokeWidth: 1.5, strokeLinejoin: "round", strokeLinecap: "round" }}
            >
              <path d="M2 10L26 2L18 18L12 12L2 10Z" />
              <path d="M12 12V18L15 14" />
              <path d="M26 2L12 12" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
