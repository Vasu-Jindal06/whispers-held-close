import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { AmbientAudio } from "./AmbientAudio";

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
    <footer className="border-t border-border/60 mt-24 bg-paper-deep/40">
      <div className="mx-auto max-w-6xl px-6 py-14 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="serif text-2xl text-foreground">Letters Left Here</p>
          <p className="hand text-lg text-plum mt-1">a quiet place to leave something</p>
          <p className="mt-4 text-sm text-ink-soft max-w-md leading-relaxed">
            A Pride Month storytelling archive hosted by Enactus VIT Chennai.
            Built to hold queer voices — anonymously, gently, and only with consent.
          </p>
        </div>
        <div>
          <p className="eyebrow mb-3">The Site</p>
          <ul className="space-y-2 text-sm">
            <li><Link to="/write" className="hover:text-foreground text-ink-soft">Write a Letter</Link></li>
            <li><Link to="/pin" className="hover:text-foreground text-ink-soft">Pin a Note</Link></li>
            <li><Link to="/wall" className="hover:text-foreground text-ink-soft">Read the Wall</Link></li>
            <li><Link to="/resources" className="hover:text-foreground text-ink-soft">Support & Resources</Link></li>
          </ul>
        </div>
        <div>
          <p className="eyebrow mb-3">Trust</p>
          <ul className="space-y-2 text-sm">
            <li><Link to="/privacy" className="hover:text-foreground text-ink-soft">Privacy & Consent</Link></li>
            <li><Link to="/about" className="hover:text-foreground text-ink-soft">About the Campaign</Link></li>
            <li><a href="mailto:lettersleft@enactus.org" className="hover:text-foreground text-ink-soft">Removal requests</a></li>
          </ul>
        </div>
        <div>
          <p className="eyebrow mb-3">Stay with Enactus VIT Chennai</p>
          <ul className="space-y-2 text-sm">
            <li><a href="https://www.instagram.com/enactusvitc/" target="_blank" rel="noopener noreferrer" className="hover:text-foreground text-ink-soft flex items-center gap-2">Instagram</a></li>
            <li><a href="https://www.linkedin.com/company/enactusvitc/posts/?feedView=all" target="_blank" rel="noopener noreferrer" className="hover:text-foreground text-ink-soft flex items-center gap-2">LinkedIn</a></li>
            <li><a href="mailto:lettersleft@enactus.org" className="hover:text-foreground text-ink-soft flex items-center gap-2">Email Us</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60">
        <div className="mx-auto max-w-6xl px-6 py-5 flex flex-wrap items-center justify-between gap-2 text-xs text-ink-soft">
          <span>An Enactus VIT Chennai Pride Month initiative · {new Date().getFullYear()}</span>
          <span className="hand text-base text-plum">share only what feels safe.</span>
        </div>
      </div>
    </footer>
  );
}
