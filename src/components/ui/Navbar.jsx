'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from './Button';
import logo from '../../app/fb-logo.jpg';

export const Navbar = () => {
  const router = useRouter();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-zinc-100 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-12">
          <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
            <img src={logo.src || logo} alt="FilmBridge" className="h-9 w-auto object-contain" />
          </Link>

          <div className="hidden lg:flex items-center gap-8 text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-600">
            <Link href="/library" className="hover:text-primary transition-colors">Library</Link>
            <Link href="/contact" className="hover:text-primary transition-colors">Contact</Link>
            <Link href="#" className="hover:text-primary transition-colors">Community</Link>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <Link href="/auth" className="hidden sm:block text-[10px] font-bold uppercase tracking-widest text-zinc-500 hover:text-foreground transition-colors">
            Login
          </Link>
          <Button size="sm" className="px-6 py-2.5" onClick={() => router.push('/auth')}>Sign Up</Button>
        </div>
      </div>
    </nav>
  );
};


