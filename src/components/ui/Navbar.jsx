'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from './Button';
import { useAuth } from '@/context/AuthContext';
import logo from '../../app/fb-logo.jpg';

export const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { user, logout, isInitialized } = useAuth();
  const userMenuRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };

    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [menuOpen]);

  const navItems = [
    ...(user ? [{ href: '/dashboard', label: 'Workspace' }] : []),
    { href: '/library', label: 'Library' },
    { href: '/#about', label: 'About' },
    { href: '/contact', label: 'Contact' },
    ...(user?.isAdmin ? [{ href: '/admin', label: 'Control' }] : []),
  ];

  const isActive = (href) => {
    if (href === '/#about') return false;
    return pathname === href;
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      menuOpen 
        ? 'py-4 bg-white border-b border-zinc-100' 
        : scrolled 
          ? 'py-2 bg-white/80 border-b border-zinc-100 backdrop-blur-xl shadow-sm' 
          : 'py-5 bg-transparent border-b border-transparent'
    } px-4 md:px-10`}>
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4">
        <div className="flex items-center gap-14">
          <Link href="/" className="flex items-center hover:opacity-80 transition-opacity group">
            <img src={logo.src || logo} alt="FilmBridge" className={`transition-all duration-500 ${scrolled ? 'h-10' : 'h-14'} w-auto object-contain`} />
          </Link>

          <div className={`hidden items-center gap-6 transition-all duration-500 lg:flex ${scrolled ? 'scale-95' : ''}`}>
            {navItems.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-4 py-2 text-[10px] font-bold uppercase tracking-[0.3em] transition-all relative group flex items-center justify-center ${
                  isActive(item.href) ? 'text-[#121212]' : 'text-zinc-400 hover:text-primary'
                }`}
              >
                {/* Viewfinder Brackets */}
                <span className={`absolute top-0 left-0 w-1.5 h-1.5 border-t-2 border-l-2 border-primary transition-all duration-500 ${
                  isActive(item.href) ? 'opacity-100 -translate-x-1 -translate-y-1' : 'opacity-0 translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:-translate-x-1 group-hover:-translate-y-1'
                }`} />
                <span className={`absolute bottom-0 right-0 w-1.5 h-1.5 border-b-2 border-r-2 border-primary transition-all duration-500 ${
                  isActive(item.href) ? 'opacity-100 translate-x-1 translate-y-1' : 'opacity-0 -translate-x-1 -translate-y-1 group-hover:opacity-100 group-hover:translate-x-1 group-hover:translate-y-1'
                }`} />

                <span className="relative z-10">{item.label}</span>
                
                {/* Technical Index */}
                <span className={`absolute -right-5 top-1/2 -translate-y-1/2 font-mono text-[7px] font-bold tracking-normal transition-all duration-500 ${
                  isActive(item.href) ? 'opacity-40 translate-x-0' : 'opacity-0 -translate-x-2 group-hover:opacity-40 group-hover:translate-x-1'
                }`}>
                  {String(index + 1).padStart(2, '0')}
                </span>
              </Link>
            ))}
          </div>
        </div>

        <div className="hidden items-center gap-8 sm:flex">
          {isInitialized && (
            user ? (
              <div className="relative" ref={userMenuRef}>
                <button 
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-3 group pl-4 border-l border-zinc-100"
                >
                  <div className="flex flex-col items-end mr-1">
                    <span className="text-[9px] font-black uppercase tracking-widest text-[#121212] group-hover:text-primary transition-colors">{user.name}</span>
                    <span className="text-[7px] font-bold uppercase tracking-[0.2em] text-zinc-400">Member Space</span>
                  </div>
                  <div className="h-9 w-9 rounded-none bg-[#121212] flex items-center justify-center text-[10px] font-black text-white uppercase italic group-hover:bg-primary transition-colors">
                    {user.name?.slice(0, 1)}
                  </div>
                </button>

                {showUserMenu && (
                  <div className="absolute top-full right-0 mt-4 w-56 bg-white border border-zinc-100 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-300 overflow-hidden">
                    <div className="p-5 border-b border-zinc-50 bg-[#FAFAFA]">
                      <p className="text-[8px] font-black text-zinc-300 uppercase tracking-[0.3em] mb-1">Authenticated Email</p>
                      <p className="text-[10px] font-bold text-zinc-500 truncate">{user.email}</p>
                    </div>
                    <div className="p-2">
                      <Link href="/dashboard" className="block px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-zinc-600 hover:bg-zinc-50 hover:text-primary transition-colors">Workspace</Link>
                      <button 
                        onClick={logout}
                        className="w-full text-left px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-red-400 hover:bg-red-50/50 hover:text-red-500 transition-colors"
                      >
                        Terminate Session
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-8">
                <Link href="/auth" className="text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-[#121212] transition-all">
                  Sign In
                </Link>
                <Button size="sm" className="px-8 py-3 rounded-none text-[10px] uppercase tracking-[0.3em] shadow-xl hover:shadow-primary/20" onClick={() => router.push('/auth?mode=signup')}>
                  Join the Lab
                </Button>
              </div>
            )
          )}
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          className={`relative h-11 w-11 flex flex-col items-center justify-center transition-all lg:hidden ${scrolled ? 'bg-[#121212] text-white' : 'bg-white border border-zinc-100 text-[#121212]'}`}
          aria-label="Toggle navigation menu"
        >
          <div className="relative w-5 h-5 flex flex-col items-center justify-center">
            <span className={`absolute h-0.5 bg-current transition-all duration-300 ease-out ${menuOpen ? 'w-6 rotate-45' : 'w-5 -translate-y-1.5'}`} />
            <span className={`absolute h-0.5 bg-current transition-all duration-300 ease-out ${menuOpen ? 'w-6 -rotate-45' : 'w-3 translate-y-1.5 translate-x-1'}`} />
          </div>
        </button>
      </div>

      {/* Mobile Menu - Single Sheet */}
      {menuOpen && (
        <div className="fixed inset-0 z-[60] flex flex-col bg-white px-10 pb-12 pt-32 animate-in fade-in zoom-in duration-500 lg:hidden">
          <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_white_90%)] pointer-events-none" />
          
          <button 
            onClick={() => setMenuOpen(false)}
            className="absolute top-8 right-10 h-12 w-12 flex items-center justify-center border border-zinc-100 bg-white shadow-xl hover:bg-[#121212] hover:text-white transition-all duration-300 group z-[70]"
          >
            <span className="text-xl font-light group-hover:rotate-90 transition-transform duration-500">✕</span>
          </button>

          <div className="relative z-10 flex flex-1 flex-col justify-between">
            <div className="flex flex-col gap-8">
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-300">Navigation</span>
              <nav className="flex flex-col items-start gap-6">
                {navItems.map((item, index) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="group relative flex items-center"
                  >
                    <span className="font-mono text-[10px] font-bold text-primary mr-4 opacity-0 group-hover:opacity-100 transition-opacity">0{index + 1}</span>
                    <span className={`text-4xl font-black uppercase italic tracking-tighter transition-all ${
                      isActive(item.href) ? 'text-[#121212]' : 'text-zinc-300 hover:text-primary hover:translate-x-2'
                    }`}>
                      {item.label}
                    </span>
                  </Link>
                ))}
              </nav>
            </div>
            
            <div className="mt-20">
              {!user ? (
                <div className="grid gap-4">
                  <Button className="w-full py-6 rounded-none text-xs uppercase tracking-[0.4em] shadow-2xl" onClick={() => router.push('/auth?mode=signup')}>
                    Join the Community
                  </Button>
                  <button 
                    onClick={() => router.push('/auth')}
                    className="w-full py-4 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 hover:text-[#121212]"
                  >
                    Member Login
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-8">
                  <div className="flex items-center gap-5 border-t border-zinc-100 pt-8">
                    <div className="h-14 w-14 rounded-none bg-[#121212] flex items-center justify-center text-lg font-black text-white uppercase italic">
                      {user.name?.slice(0, 1)}
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-300 mb-1">Active Member</p>
                      <p className="text-xl font-black uppercase italic tracking-tight text-[#121212]">{user.name}</p>
                    </div>
                  </div>
                  <Button variant="secondary" className="w-full py-5 rounded-none border-zinc-200 uppercase text-xs tracking-[0.3em] text-red-400" onClick={logout}>
                    Terminate Session
                  </Button>
                </div>
              )}
              
              <div className="mt-12 flex items-center justify-between border-t border-zinc-50 pt-8 opacity-40">
                <span className="text-[8px] font-bold uppercase tracking-[0.4em] text-zinc-400">FilmBridge Network</span>
                <span className="text-[8px] font-mono text-zinc-400">FB_MOBILE_V1.2</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
