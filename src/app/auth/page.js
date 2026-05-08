'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Navbar } from '@/components/ui/Navbar';

export default function AuthPage() {
  return (
    <div className="min-h-screen bg-white text-[#121212] selection:bg-primary selection:text-white flex flex-col relative overflow-hidden">
      <Navbar />
      
      <main className="flex-grow flex flex-col items-center justify-center p-6 relative">
        {/* Background Visuals - Mirroring Hero Section */}
        <div className="absolute inset-0 bg-grid opacity-100" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_white_100%)] opacity-80" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--color-primary)_0%,_transparent_100%)] opacity-[0.08]" />

        <div className="relative z-10 w-full max-w-xl bg-white border border-zinc-100 shadow-2xl p-8 md:p-14 py-16 md:py-20">
          <Link href="/" className="absolute top-8 left-8 text-[10px] font-bold uppercase tracking-widest text-zinc-600 hover:text-primary transition-colors flex items-center gap-2">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/></svg>
            Home
          </Link>
          <div className="w-full max-w-sm mx-auto">
            <div className="text-center mb-10">
              <Badge variant="primary" className="mb-4">Network Access</Badge>
              <h1 className="text-4xl font-black uppercase tracking-tighter italic text-[#121212] leading-none">
                Login to <span className="text-primary">Bridge</span>
              </h1>
            </div>

            <form className="space-y-5">
              <Input 
                label="Email Address" 
                type="email" 
                placeholder="you@example.com" 
                className="bg-[#fafafa] rounded-none border-zinc-100 focus:border-primary py-3" 
              />
              <Input 
                label="Password" 
                type="password" 
                placeholder="••••••••" 
                className="bg-[#fafafa] rounded-none border-zinc-100 focus:border-primary py-3" 
              />
              
              <div className="flex items-center justify-between px-1">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <div className="w-3.5 h-3.5 border border-zinc-200 group-hover:border-primary transition-colors flex items-center justify-center bg-white">
                    <div className="w-1.5 h-1.5 bg-primary scale-0 group-hover:scale-100 transition-transform"></div>
                  </div>
                  <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-400">Remember</span>
                </label>
                <a href="#" className="text-[9px] font-bold uppercase tracking-widest text-primary hover:text-[#121212] transition-colors">Forgot Password?</a>
              </div>

              <Button className="w-full py-4 text-xs uppercase tracking-[0.3em] rounded-none shadow-lg hover:shadow-primary/20">
                Login
              </Button>
            </form>

            <div className="relative py-6">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-zinc-100"></div></div>
              <div className="relative flex justify-center text-[9px] uppercase tracking-[0.4em]"><span className="bg-white px-4 text-zinc-300">OR</span></div>
            </div>

            <Button variant="secondary" className="w-full py-4 text-[10px] uppercase tracking-[0.2em] border-zinc-200 rounded-none hover:bg-zinc-50">
              Continue with Google
            </Button>

            <p className="mt-8 text-center text-zinc-400 text-[9px] uppercase tracking-widest font-medium">
              New to the Network? <a href="#" className="text-primary hover:text-[#121212] transition-colors font-bold border-b border-primary/20 hover:border-primary ml-1">Request Access</a>
            </p>
          </div>
        </div>
      </main>
      
      {/* Bottom Legal - Consistent with Footer feel but minimal */}
      <footer className="relative z-10 py-6 px-10 flex justify-between items-center text-[8px] font-bold uppercase tracking-[0.4em] text-zinc-300 border-t border-zinc-50 bg-white">
        <span>© 2024 FilmBridge</span>
        <div className="flex gap-6">
          <span>VER. 1.2.0</span>
          <span className="text-primary italic">In & Out</span>
        </div>
      </footer>
    </div>
  );
}
