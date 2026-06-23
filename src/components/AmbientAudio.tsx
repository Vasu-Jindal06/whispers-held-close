import { useEffect, useRef, useState } from "react";
import ambientAudioSrc from "@/assets/ambient.mp3";

/**
 * Optional ambient companion. Off by default.
 * Plays the ambient.mp3 file.
 */
export function AmbientAudio() {
  const [on, setOn] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (on && audioRef.current) {
      audioRef.current.volume = 0.5;
      audioRef.current.play().catch(console.error);
    } else if (!on && audioRef.current) {
      audioRef.current.pause();
    }
  }, [on]);

  return (
    <>
      <audio ref={audioRef} src={ambientAudioSrc} loop />
      <button
        type="button"
        onClick={() => setOn((v) => !v)}
        aria-pressed={on}
        aria-label={on ? "Turn ambient sound off" : "Turn ambient sound on"}
        className="fixed bottom-5 right-5 z-50 flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-card/90 backdrop-blur border border-ink/15 shadow-sm hover:shadow-md transition text-xs text-ink-soft hover:text-foreground"
      >
        <span
          className={`inline-block w-2 h-2 rounded-full transition ${on ? "bg-plum animate-pulse" : "bg-ink/25"}`}
          aria-hidden
        />
        <span className="hand text-base text-plum">{on ? "ambient on" : "play ambient audio"}</span>
      </button>
    </>
  );
}
