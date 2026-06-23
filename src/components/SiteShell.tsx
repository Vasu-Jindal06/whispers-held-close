import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { AmbientAudio } from "./AmbientAudio";
import paperclipImg from "@/assets/paperclip.png";
import stampImg from "@/assets/stamp.png";
import flowerImg from "@/assets/flower.png";
import noteImage from "@/assets/image.png";

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
      <main className="flex-1">{children}</main>
      <Footer />
      <AmbientAudio />
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
      <div className="relative mx-auto max-w-5xl px-6 pt-16 pb-16">
        
        {/* Global Footer Decorations - Pushed to the outer edges to avoid content overlap */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Pressed Flower - Top Left Edge */}
          <img src={flowerImg} alt="" className="absolute top-4 -left-8 md:left-4 w-24 md:w-32 rotate-[25deg] opacity-60 mix-blend-multiply" />
        </div>

        <div className="grid lg:grid-cols-10 gap-10 lg:gap-12 items-start">
          
          {/* Left Column: Branding and Links */}
          <div className="lg:col-span-5 relative">
             <div className="relative z-10 pl-4 md:pl-10 border-l border-ink/10">
               <h2 className="serif text-4xl md:text-5xl text-foreground tracking-tight">Letters Left Here</h2>
               <p className="hand text-xl text-plum mt-2">a quiet place to leave something</p>
               
               <p className="mt-8 text-sm text-ink-soft max-w-xs leading-relaxed">
                 A Pride Month storytelling archive<br/>
                 built to hold queer voices —<br/>
                 anonymously, gently, and only with consent.
               </p>

               <div className="mt-6 tape-strip tape-blush rotate-[2deg] inline-block px-4 py-2 bg-[#e0b8b8] shadow-sm">
                 <span className="hand text-sm text-ink/80">left here, for anyone who needs it ♡</span>
               </div>
               
               {/* Stay with Enactus */}
               <div className="mt-16 relative">
                 <p className="eyebrow mb-4 tracking-widest text-[0.65rem] border-b border-ink/10 pb-2 inline-block">STAY WITH ENACTUS VIT CHENNAI</p>
                 <ul className="space-y-3 text-sm mt-2">
                   <li><a href="https://www.instagram.com/enactusvitc/" className="hover:text-foreground text-ink-soft">Instagram</a></li>
                   <li><a href="https://www.linkedin.com/company/enactusvitc/posts/?feedView=all" className="hover:text-foreground text-ink-soft">LinkedIn</a></li>
                   <li><a href="mailto:lettersleft@enactus.org" className="hover:text-foreground text-ink-soft">Email Us</a></li>
                 </ul>
                 {/* Thank you circle - moved slightly to not overlap social links */}
                 <div className="absolute top-4 left-44 md:left-56 w-14 h-14 rounded-full border border-dashed border-ink/30 flex items-center justify-center rotate-[20deg] pointer-events-none opacity-80">
                   <span className="text-[0.35rem] uppercase tracking-widest text-center text-ink-soft leading-tight">
                     Thank You<br/>♡<br/>For Being Here
                   </span>
                 </div>
               </div>
             </div>
          </div>

          {/* Right Column: Navigation Cards */}
          <div className="lg:col-span-5 relative flex gap-6 mt-10 lg:mt-16 z-10">
             
             {/* Subtle Airmail Envelope Background - Pushed far bottom right */}
             <div className="absolute -bottom-16 -right-12 md:-right-24 w-48 h-28 bg-card border border-[color:color-mix(in_oklab,var(--ink)_10%,transparent)] shadow-md rotate-[-6deg] z-0 pointer-events-none opacity-60">
                <div className="absolute inset-0" style={{ background: "repeating-linear-gradient(45deg, transparent, transparent 8px, #b83b3b 8px, #b83b3b 16px, transparent 16px, transparent 24px, #3b5998 24px, #3b5998 32px)", opacity: 0.1 }}></div>
             </div>

             {/* Vintage Stamp Top Right - Scaled down and pushed out */}
             <div className="absolute -top-12 right-0 md:-right-10 rotate-[15deg] shadow-sm z-10 pointer-events-none opacity-90">
               <div className="vintage-stamp bg-[#c45555]">
                 <div className="w-10 h-12 border border-white/30 flex flex-col items-center justify-center text-white/90 font-serif p-0.5">
                   <span className="text-[0.25rem] tracking-widest uppercase">Nederland</span>
                   <span className="text-lg mt-0.5">6</span>
                 </div>
               </div>
             </div>

             {/* Archive Postmark - Scaled down */}
             <div className="absolute -top-6 -right-6 md:-right-16 rotate-[-15deg] z-20 mix-blend-multiply opacity-60 pointer-events-none">
               <div className="w-14 h-14 rounded-full border border-dashed border-ink/40 flex items-center justify-center">
                 <span className="text-[0.4rem] uppercase tracking-widest text-center text-ink-soft">
                   Archive<br/><span className="text-ink block font-bold text-[0.55rem]">JUNE 2026</span>
                 </span>
               </div>
             </div>

             {/* Vintage Ticket Stub - Scaled down and tucked away */}
             <div className="absolute -bottom-10 right-4 rotate-[4deg] z-20 pointer-events-none opacity-90 shadow-sm">
                <div className="ticket-stub p-2 flex flex-col items-center justify-center bg-[#e8e2d2]">
                  <span className="eyebrow !text-[0.4rem] text-ink/70">ARCHIVE ENTRY</span>
                  <div className="flex items-center gap-2 mt-0.5 border-y border-ink/20 py-0.5">
                    <span className="serif text-lg text-ink">026</span>
                  </div>
                </div>
             </div>

             {/* The Site Card */}
             <div className="note-card bg-paper-deep p-6 pb-8 rotate-[-2deg] torn-bottom flex-1 shadow-md relative z-10">
                <p className="eyebrow border-b border-ink/20 pb-2 mb-4">THE SITE</p>
                <ul className="space-y-3 text-sm serif tracking-wide">
                  <li><Link to="/write" className="hover:text-foreground text-ink-soft block py-1">Write a Letter</Link></li>
                  <li><Link to="/pin" className="hover:text-foreground text-ink-soft block py-1">Pin a Note</Link></li>
                  <li><Link to="/wall" className="hover:text-foreground text-ink-soft block py-1">Read the Wall</Link></li>
                  <li><Link to="/resources" className="hover:text-foreground text-ink-soft block py-1">Support & Resources</Link></li>
                </ul>
             </div>

             {/* Trust Card */}
             <div className="note-card bg-paper-deep p-6 pb-8 rotate-[1deg] torn-bottom flex-1 shadow-md relative z-10">
                <p className="eyebrow border-b border-ink/20 pb-2 mb-4">TRUST</p>
                <ul className="space-y-3 text-sm serif tracking-wide">
                  <li><Link to="/privacy" className="hover:text-foreground text-ink-soft block py-1">Privacy & Consent</Link></li>
                  <li><Link to="/about" className="hover:text-foreground text-ink-soft block py-1">About the Campaign</Link></li>
                  <li><a href="mailto:lettersleft@enactus.org" className="hover:text-foreground text-plum border-b border-plum block py-1 w-fit">Removal requests</a></li>
                </ul>
             </div>

             {/* Small tape note over cards - Scaled down */}
             <div className="absolute top-1/2 -right-4 w-24 tape-strip bg-card p-2 shadow-sm rotate-[-6deg] z-20 ruled-paper torn-bottom opacity-90 pointer-events-none">
               <span className="hand text-sm text-ink block leading-tight">your story,<br/>your choice</span>
             </div>
          </div>
        </div>

        {/* Center Note Image - Placed in the whitespace between columns and the lock */}
        <div className="absolute -bottom-8 md:-bottom-16 left-1/2 -translate-x-1/2 md:translate-x-[-20%] rotate-[4deg] w-64 md:w-80 z-0 pointer-events-none opacity-95">
          <img src={noteImage} alt="" className="w-full h-auto mix-blend-multiply" />
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 mt-2">
            <span className="hand text-lg md:text-2xl text-ink">Every letter stays.</span>
            <span className="hand text-lg md:text-2xl text-ink mt-0.5">Every voice matters. ♡</span>
          </div>
        </div>

        {/* Bottom Lock / Security Disclaimer */}
        <div className="mt-16 flex items-end gap-4 text-xs text-ink-soft/80 relative z-10 pl-4 md:pl-10">
          <span className="text-lg">🔒</span>
          <div className="leading-relaxed max-w-xs">
             <p>This is a consent-based archive.</p>
             <p>We listen. We respect. We protect.</p>
             <p className="hand text-plum text-sm mt-0.5">always. ❀</p>
          </div>
          {/* Small vintage stamp */}
          <div className="absolute bottom-1 left-56 rotate-[2deg] opacity-50 pointer-events-none">
            <div className="vintage-stamp bg-[#c45555] p-0.5 shadow-sm flex items-center justify-center">
              <span className="text-[0.35rem] tracking-widest text-white/90">POSTAGE 15 CENTS</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
