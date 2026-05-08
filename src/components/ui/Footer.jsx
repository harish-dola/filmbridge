'use client';

import React from 'react';
import Link from 'next/link';
import footerLogo from '../../app/fb-footer.png';
import footerDecor from '../../app/fb-footer.jpg';

export const Footer = () => {
  return (
    <footer className="relative bg-[#121212] pt-32 pb-12 px-6 overflow-hidden border-t border-white/5">
      {/* Industrial Grid Background */}
      <div className="absolute inset-0 bg-grid-dark opacity-5 pointer-events-none" />
      
      {/* Decorative Background Image - Preserving your manual addition */}
      <div className="absolute top-0 right-0 w-1/3 h-full opacity-[0.03] pointer-events-none grayscale invert">
        <img src={footerDecor.src || footerDecor} alt="" className="w-full h-full object-cover" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-16 pb-20 border-b border-white/5">
          {/* Branding Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center hover:opacity-80 transition-opacity mb-10">
              <img src={footerLogo.src || footerLogo} alt="FilmBridge" className="h-16 w-auto object-contain" />
            </Link>
            <p className="text-white/40 text-sm font-medium leading-relaxed max-w-sm mb-12">
              The premier standard for visual storytelling. 
              Bridging vision and reality through professional technical archives since 2024.
            </p>
            
            <div className="flex gap-4">
              {['TW', 'IG', 'YT', 'LI'].map((social) => (
                <a key={social} href="#" className="w-10 h-10 border border-white/10 flex items-center justify-center text-[10px] font-bold text-white/30 hover:bg-primary hover:text-white hover:border-primary transition-all">
                  {social}
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div className="grid grid-cols-3 lg:col-span-3 gap-12">
            <div>
              <h5 className="text-[10px] uppercase tracking-[0.4em] font-bold text-primary mb-10">Resources</h5>
              <ul className="space-y-4">
                <li><Link href="/library" className="text-[11px] font-bold uppercase tracking-widest text-white/60 hover:text-white transition-colors">Library</Link></li>
                <li><Link href="/contact" className="text-[11px] font-bold uppercase tracking-widest text-white/60 hover:text-white transition-colors">Contact</Link></li>
                <li><Link href="#" className="text-[11px] font-bold uppercase tracking-widest text-white/60 hover:text-white transition-colors">E-Books</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="text-[10px] uppercase tracking-[0.4em] font-bold text-white/20 mb-10">Platform</h5>
              <ul className="space-y-4">
                <li><Link href="#" className="text-[11px] font-bold uppercase tracking-widest text-white/60 hover:text-white transition-colors">Community</Link></li>
                <li><Link href="/auth" className="text-[11px] font-bold uppercase tracking-widest text-white/60 hover:text-white transition-colors">Membership</Link></li>
                <li><Link href="#" className="text-[11px] font-bold uppercase tracking-widest text-white/60 hover:text-white transition-colors">Network</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="text-[10px] uppercase tracking-[0.4em] font-bold text-white/20 mb-10">Newsletter</h5>
              <p className="text-white/30 text-[10px] mb-8 leading-relaxed font-medium">Weekly technical breakdowns and studio updates.</p>
              <div className="flex flex-col gap-3">
                <input type="email" placeholder="agent@studio.com" className="bg-white/5 border border-white/10 px-4 py-4 text-[10px] text-white outline-none focus:border-primary transition-colors font-bold uppercase tracking-widest" />
                <button className="bg-primary text-white py-4 text-[10px] font-bold uppercase tracking-[0.3em] hover:opacity-90 transition-opacity">Initialize Sync</button>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-12 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-4">
            <span className="w-2 h-[1px] bg-white/10"></span>
            <p className="text-[9px] uppercase tracking-[0.5em] font-bold text-white/20">
              © 2024 FilmBridge Technical Archive
            </p>
          </div>
          <div className="flex gap-8 text-[9px] uppercase tracking-[0.5em] font-bold text-white/20">
            <span className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-green-500/50"></span> LIVE_V1.2.0</span>
            <span className="text-white/40 italic">In & Out</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
