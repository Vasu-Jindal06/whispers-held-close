import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { AmbientAudio } from "./AmbientAudio";
import flower2Img from "@/assets/flower2.png";
import flower4Img from "@/assets/flower4.png";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/write", label: "Write a Letter" },
  { to: "/pin", label: "Pin a Note" },
  { to: "/wall", label: "Read the Wall" },
  { to: "/about", label: "About" },
  { to: "/privacy", label: "Privacy" },
] as const;

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col relative z-0">
        {children}
      </main>
      <Footer />
      <div className="fixed bottom-6 right-6 z-50 mix-blend-multiply opacity-80 hover:opacity-100 transition-opacity">
        <AmbientAudio />
      </div>
    </div>
  );
}

import logoUrl from '../assets/enactus-logo.svg';

function Logo() {
  return (
    <img 
      src={logoUrl} 
      alt="Enactus VIT Chennai Logo" 
      className="w-10 h-10 object-contain drop-shadow-sm opacity-90"
    />
  );
}

function Header() {
  return (
    <header className="border-b border-border/60 backdrop-blur-sm bg-background/70 sticky top-0 z-40">
      <div className="mx-auto max-w-6xl px-6 py-5 flex items-center justify-between gap-6">
        <Link to="/" className="flex items-center gap-3 group">
          <Logo />
          <span className="flex flex-col leading-tight">
            <span className="serif text-2xl tracking-tight text-foreground">Letters Left Here</span>
            <span className="text-[0.66rem] tracking-[0.18em] uppercase text-ink-soft hidden sm:inline">
              an Enactus VIT Chennai Pride archive
            </span>
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-7 text-sm">
          {navItems.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="text-ink-soft hover:text-foreground transition-colors"
              activeProps={{ className: "text-foreground font-medium" }}
              activeOptions={{ exact: n.to === "/" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <Link
          to="/write"
          className="md:hidden text-sm px-3 py-1.5 rounded-full bg-foreground text-background"
        >
          Share
        </Link>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="relative mt-16 border-t border-border/40 overflow-hidden bg-[color:color-mix(in_oklab,var(--paper-deep)_40%,var(--background))]">
      <div className="relative mx-auto max-w-5xl px-6 pt-16">
        
        {/* Top section — 4 columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 items-start">
          
          {/* Col 1 — Identity */}
          <div className="flex flex-col">
            <h2 className="serif text-[22px] text-foreground tracking-tight">Letters Left Here</h2>
            <p className="hand text-sm text-plum mt-1 opacity-90">a quiet place to leave something</p>
            
            <p className="mt-4 text-[13px] text-ink-soft leading-relaxed max-w-[200px]">
              A Pride Month storytelling archive built to hold queer voices — anonymously, gently, and only with consent.
            </p>

            <div className="mt-5 tape-strip tape-blush rotate-[2deg] inline-block px-3 py-1.5 bg-[#e0b8b8] shadow-sm self-start">
              <span className="hand text-xs text-ink/80">left here, for anyone who needs it ♡</span>
            </div>
            
            <div className="mt-10">
              <p className="eyebrow mb-3 tracking-widest text-[0.65rem] border-b border-ink/10 pb-1.5 inline-block">STAY WITH ENACTUS VIT CHENNAI</p>
              <ul className="space-y-2 text-sm">
                <li><a href="https://www.instagram.com/enactusvitc/" target="_blank" rel="noopener noreferrer" className="hover:text-foreground text-ink-soft transition-colors">Instagram</a></li>
                <li><a href="https://www.linkedin.com/company/enactusvitc/posts/?feedView=all" target="_blank" rel="noopener noreferrer" className="hover:text-foreground text-ink-soft transition-colors">LinkedIn</a></li>
                <li><a href="mailto:enactusvitc5@gmail.com" className="hover:text-foreground text-ink-soft transition-colors">Email Us</a></li>
              </ul>
            </div>
          </div>

          {/* Col 2 — The Site */}
          <div className="note-card bg-paper-deep p-6 pb-8 rotate-[-2deg] torn-bottom shadow-md relative z-10 flex flex-col">
            <p className="eyebrow mb-5 border-b border-ink/20 pb-2">THE SITE</p>
            <ul className="space-y-3 text-sm serif tracking-wide">
              <li><Link to="/write" className="hover:text-foreground text-ink-soft transition-colors block py-1">Write a Letter</Link></li>
              <li><Link to="/pin" className="hover:text-foreground text-ink-soft transition-colors block py-1">Pin a Note</Link></li>
              <li><Link to="/wall" className="hover:text-foreground text-ink-soft transition-colors block py-1">Read the Wall</Link></li>
              <li><Link to="/resources" className="hover:text-foreground text-ink-soft transition-colors block py-1">Support & Resources</Link></li>
            </ul>
            {/* Small flower asset bottom of this column */}
            <img src={flower4Img} alt="" className="absolute -bottom-6 -right-4 w-12 rotate-12 opacity-80 mix-blend-multiply pointer-events-none" />
          </div>

          {/* Col 3 — Trust */}
          <div className="note-card bg-paper-deep p-6 pb-8 rotate-[1deg] torn-bottom shadow-md relative z-10 flex flex-col">
            <p className="eyebrow mb-5 border-b border-ink/20 pb-2">TRUST</p>
            <ul className="space-y-3 text-sm serif tracking-wide">
              <li><Link to="/privacy" className="hover:text-foreground text-ink-soft transition-colors block py-1">Privacy & Consent</Link></li>
              <li><Link to="/about" className="hover:text-foreground text-ink-soft transition-colors block py-1">About the Campaign</Link></li>
              <li><a href="mailto:enactusvitc5@gmail.com" className="hover:text-foreground text-plum border-b border-plum transition-colors block py-1 w-fit">Removal requests</a></li>
            </ul>
            
            {/* Circular Stamp */}
            <div className="mt-8 w-[52px] h-[52px] rounded-full border border-dashed border-ink/30 flex items-center justify-center rotate-[-15deg] pointer-events-none opacity-40">
              <span className="text-[0.3rem] uppercase tracking-widest text-center text-ink-soft leading-tight">
                Thank You<br/>♡<br/>For Being Here
              </span>
            </div>
          </div>

          {/* Col 4 — Archive note */}
          <div className="flex flex-col items-center md:items-end justify-center relative mt-8 md:mt-0">
            {/* Peeking flower */}
            <img src={flower2Img} alt="" className="absolute -top-4 right-16 w-12 rotate-[15deg] opacity-80 mix-blend-multiply pointer-events-none z-0" />
            
            {/* Archive Card */}
            <div className="note-card bg-[#fcf9f5] w-[180px] p-4 shadow-sm rotate-[3deg] flex flex-col items-center text-center relative z-10 border border-black/5">
              <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-16 tape-strip tape-blush bg-[#e0b8b8] shadow-sm rotate-[-2deg]" />
              <p className="hand text-plum text-sm mt-3 mb-4 leading-tight">your story,<br/>your choice</p>
              <div className="border-t border-ink/10 w-full pt-3 flex flex-col items-center">
                <span className="eyebrow !text-[0.5rem] text-ink/60 tracking-widest">ARCHIVE ENTRY</span>
                <span className="serif text-2xl text-ink mt-1">026</span>
              </div>
            </div>
          </div>

        </div>

        {/* Divider */}
        <div className="w-full h-px bg-ink/20 mt-16" />

        {/* Bottom bar */}
        <div className="pt-6 pb-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-ink-soft">
          <p>An Enactus VIT Chennai Pride Month initiative · 2026</p>
          <div className="flex gap-4">
            <Link to="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
            <span>·</span>
            <a href="mailto:enactusvitc5@gmail.com" className="hover:text-foreground transition-colors">Contact</a>
            <span>·</span>
            <a href="mailto:enactusvitc5@gmail.com" className="hover:text-foreground transition-colors">Removal request</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
