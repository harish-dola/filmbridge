'use client';

import React from 'react';
import Link from 'next/link';
import footerLogo from '../../app/fb-footer.png';
import footerDecor from '../../app/fb-footer.jpg';

const FOOTER_LINKS = [
  {
    title: 'Resources',
    links: [
      ['Library', '/library'],
      ['Articles', '/library'],
      ['Library Index', '/library'],
    ],
  },
  {
    title: 'Platform',
    links: [
      ['Membership', '/auth'],
      ['Community', '/auth?mode=signup'],
      ['Contact', '/contact'],
    ],
  },
  {
    title: 'Company',
    links: [
      ['About', '/#about'],
      ['Editorial Desk', '/contact'],
      ['Request Topic', '/contact'],
    ],
  },
];

const SOCIAL_LINKS = [
  { 
    id: 'TW', 
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
      </svg>
    )
  },
  { 
    id: 'IG', 
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
      </svg>
    )
  },
  { 
    id: 'YT', 
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.42a2.78 2.78 0 0 0-1.94 2C1 8.14 1 12 1 12s0 3.86.46 5.58a2.78 2.78 0 0 0 1.94 2C5.12 20 12 20 12 20s6.88 0 8.6-.42a2.78 2.78 0 0 0 1.94-2C23 15.86 23 12 23 12s0-3.86-.46-5.58z"/>
        <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor"/>
      </svg>
    )
  },
  { 
    id: 'LI', 
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
        <rect x="2" y="9" width="4" height="12"/>
        <circle cx="4" cy="4" r="2"/>
      </svg>
    )
  }
];

export const Footer = () => {
  return (
    <footer className="relative overflow-hidden border-t border-white/5 bg-[#121212] px-6 pb-10 pt-24 text-white">
      <div className="absolute inset-0 bg-grid-dark opacity-10 pointer-events-none" />
      <div className="absolute right-0 top-0 h-full w-1/2 opacity-[0.035] grayscale invert pointer-events-none">
        <img src={footerDecor.src || footerDecor} alt="" className="h-full w-full object-cover" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid gap-12 border-b border-white/10 pb-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <div>
            <Link href="/" className="mb-8 inline-flex hover:opacity-80">
              <img src={footerLogo.src || footerLogo} alt="FilmBridge" className="h-16 w-auto object-contain" />
            </Link>
            
            <p className="mt-8 max-w-xl text-[13px] font-medium leading-relaxed text-white/40 uppercase tracking-wide">
              FilmBridge is a practical archive for filmmakers studying writing, production, direction, editing, distribution, and the work between each stage.
            </p>
          </div>

          <div className="border border-white/5 bg-white/[0.02] p-8 md:p-10 transition-colors hover:border-white/10">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Stay Connected</p>
            <p className="mt-5 text-sm font-medium leading-relaxed text-white/30 uppercase tracking-widest">
              Get community updates and analysis sent to your inbox.
            </p>
            <form className="mt-8 grid gap-2 sm:grid-cols-[1fr_auto]" onSubmit={(event) => event.preventDefault()}>
              <input
                type="email"
                placeholder="STUDIO_EMAIL"
                className="min-h-14 border border-white/10 bg-white/5 px-5 text-[10px] font-black uppercase tracking-[0.2em] text-white outline-none placeholder:text-white/20 focus:border-primary/50 transition-colors"
              />
              <button className="min-h-14 bg-primary px-8 text-[10px] font-black uppercase tracking-[0.3em] text-white hover:bg-white hover:text-black transition-all">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-b border-white/10 py-12">
          <div className="grid gap-12 sm:grid-cols-3 max-w-4xl">
            {FOOTER_LINKS.map((group) => (
              <div key={group.title}>
                <h5 className="mb-6 text-[10px] font-black uppercase tracking-[0.4em] text-primary/80">{group.title}</h5>
                <ul className="space-y-4">
                  {group.links.map(([label, href]) => (
                    <li key={label}>
                      <Link href={href} className="text-[11px] font-bold uppercase tracking-widest text-white/40 hover:text-primary transition-colors">
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-10 pt-10 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
            <p className="text-[9px] font-black uppercase tracking-[0.5em] text-white/20">
              Copyright 2024 FilmBridge
            </p>
            <span className="hidden h-px w-12 bg-white/5 sm:block" />
            <p className="text-[9px] font-black uppercase tracking-[0.4em] text-white/30 italic">In & Out</p>
          </div>

          <div className="flex items-center gap-5">
            <span className="mr-4 flex items-center gap-2.5 text-[9px] font-black uppercase tracking-[0.4em] text-white/20">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)] animate-pulse" />
              Live Session
            </span>
            <div className="flex gap-2">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.id}
                  href="#"
                  className="flex h-11 w-11 items-center justify-center border border-white/10 bg-transparent text-white/30 hover:border-primary hover:bg-primary hover:text-white transition-all duration-300"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
