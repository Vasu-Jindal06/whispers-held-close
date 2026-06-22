import { useEffect, useRef, useState } from "react";

/**
 * Optional ambient companion. Off by default. Uses the Web Audio API to
 * synthesise a soft, slow-breathing pad — no asset downloads, no autoplay,
 * fully user-controlled.
 */
export function AmbientAudio() {
  const [on, setOn] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const stopRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (!on) {
      stopRef.current?.();
      stopRef.current = null;
      return;
    }

    const AC =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = ctxRef.current ?? new AC();
    ctxRef.current = ctx;
    if (ctx.state === "suspended") void ctx.resume();

    const master = ctx.createGain();
    master.gain.value = 0;
    master.gain.linearRampToValueAtTime(0.05, ctx.currentTime + 2.5);
    master.connect(ctx.destination);

    const freqs = [196, 261.6, 329.6, 392];
    const oscs: OscillatorNode[] = [];

    freqs.forEach((f, i) => {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = "sine";
      o.frequency.value = f;
      o.detune.value = i % 2 === 0 ? -6 : 6;
      g.gain.value = 0.18;
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.frequency.value = 0.05 + i * 0.013;
      lfoGain.gain.value = 0.07;
      lfo.connect(lfoGain).connect(g.gain);
      o.connect(g).connect(master);
      o.start();
      lfo.start();
      oscs.push(o, lfo);
    });

    stopRef.current = () => {
      master.gain.cancelScheduledValues(ctx.currentTime);
      master.gain.linearRampToValueAtTime(0, ctx.currentTime + 1.2);
      setTimeout(() => {
        oscs.forEach((o) => {
          try { o.stop(); } catch { /* noop */ }
        });
        master.disconnect();
      }, 1400);
    };

    return () => {
      stopRef.current?.();
      stopRef.current = null;
    };
  }, [on]);

  return (
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
  );
}
