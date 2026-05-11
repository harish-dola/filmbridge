'use client';

import React, { useMemo, useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Navbar } from '@/components/ui/Navbar';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

const ACCESS_POINTS = [
  ['Community', 'Connect with active creators'],
  ['Analysis', 'In-depth technical breakdowns'],
  ['Resources', 'Industry production templates'],
];

export default function AuthPage() {
  const router = useRouter();
  const { login, user } = useAuth();
  const [mode, setMode] = useState('login');

  const isSignup = mode === 'signup';

  useEffect(() => {
    if (user) router.push('/library');
  }, [user, router]);

  const content = useMemo(
    () => ({
      badge: isSignup ? 'Join the Community' : 'Member Access',
      title: isSignup ? 'Create your Profile' : 'Welcome Back',
      copy: isSignup
        ? 'Join a network of filmmakers dedicated to the craft. Share insights, access in-depth analysis, and build your technical library.'
        : 'Sign in to continue your analysis sessions, saved resources, and community discussions.',
      action: isSignup ? 'Join FilmBridge' : 'Enter Workspace',
      switchCopy: isSignup ? 'Already a member?' : 'New to the community?',
      switchAction: isSignup ? 'Login' : 'Join Now',
    }),
    [isSignup]
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const email = formData.get('email');
    const name = isSignup ? formData.get('name') : email.split('@')[0];
    
    login({ 
      name: name.charAt(0).toUpperCase() + name.slice(1), 
      email, 
      isAdmin: email.includes('admin') 
    });
    router.push('/library');
  };

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-white text-[#121212] selection:bg-primary selection:text-white">
      <Navbar />

      <main className="relative flex flex-1 items-center justify-center px-6 py-32 md:py-40">
        {/* Background elements */}
        <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 mx-auto grid w-full max-w-6xl overflow-hidden border border-zinc-100 bg-white shadow-2xl lg:grid-cols-[0.95fr_1.05fr]">
          <aside className="relative hidden overflow-hidden bg-[#121212] p-12 text-white lg:flex lg:flex-col lg:justify-between">
            <div className="absolute inset-0 bg-grid-dark opacity-20" />
            
            <div className="relative z-10">
              <Badge className="mb-10 rounded-none border-white/20 bg-white/5 px-4 py-1.5 text-white/90">FilmBridge Community</Badge>
              <h2 className="text-5xl font-black uppercase italic leading-[0.85] tracking-tight">
                Sharing <br />
                The <span className="text-primary not-italic">Craft.</span>
              </h2>
              <p className="mt-8 max-w-md text-lg font-light leading-relaxed text-white/50">
                A specialized space for directors, editors, and cinematographers to exchange in-depth analysis and technical resources.
              </p>

              <div className="mt-16 space-y-8">
                {ACCESS_POINTS.map(([label, desc], index) => (
                  <div key={label} className="group flex items-start gap-5">
                    <div className="mt-1 flex h-6 w-6 items-center justify-center border border-white/10 text-[10px] font-black text-primary">
                      0{index + 1}
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white">{label}</p>
                      <p className="mt-1 text-[11px] font-medium text-white/30 uppercase tracking-widest">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative z-10 mt-20 pt-10 border-t border-white/5">
              <div className="flex items-center gap-4">
                <div className="flex -space-x-3">
                  {[1,2,3].map(i => (
                    <div key={i} className="w-8 h-8 rounded-none border-2 border-[#121212] bg-zinc-800 flex items-center justify-center text-[8px] font-black">
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/30">
                  <span className="text-green-500 animate-pulse mr-2">●</span>
                  1.2K CREATORS ACTIVE
                </span>
              </div>
            </div>
          </aside>

          <div className="p-8 md:p-16 lg:p-20">
            <div className="mx-auto max-w-sm">
              <Link href="/" className="mb-10 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-zinc-400 hover:text-primary">
                <span>-</span> Home
              </Link>

              <header className="mb-12">
                <div className="mb-8 grid grid-cols-2 border border-zinc-100 bg-[#FAFAFA] p-1">
                  {['login', 'signup'].map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setMode(option)}
                      className={`px-4 py-3 text-[10px] font-black uppercase tracking-[0.25em] transition-all ${
                        mode === option ? 'bg-[#121212] text-white shadow-lg' : 'text-zinc-400 hover:text-primary'
                      }`}
                    >
                      {option === 'login' ? 'Login' : 'Sign Up'}
                    </button>
                  ))}
                </div>
                <Badge variant="primary" className="mb-4 rounded-none">{content.badge}</Badge>
                <h3 className="text-4xl font-black uppercase italic tracking-tighter text-[#121212]">
                  {content.title}
                </h3>
                <p className="mt-5 text-sm font-medium leading-relaxed text-zinc-500">
                  {content.copy}
                </p>
              </header>

              <form className="space-y-6" onSubmit={handleSubmit}>
                {isSignup && (
                  <Input
                    label="Full Name"
                    name="name"
                    type="text"
                    placeholder="e.g. Christopher Nolan"
                    className="rounded-none border-zinc-100 bg-[#FAFAFA] py-5 focus:border-primary text-sm"
                  />
                )}
                <Input
                  label="Studio Email"
                  name="email"
                  type="email"
                  placeholder="you@studio.com"
                  className="rounded-none border-zinc-100 bg-[#FAFAFA] py-5 focus:border-primary text-sm"
                  required
                />
                <Input
                  label="Security Key"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  className="rounded-none border-zinc-100 bg-[#FAFAFA] py-5 focus:border-primary text-sm"
                  required
                />
                
                <div className="flex items-center justify-between gap-4 px-1 py-2">
                  <label className="flex cursor-pointer items-center gap-3">
                    <input type="checkbox" className="h-4 w-4 rounded-none border-zinc-200 accent-primary" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Remember Session</span>
                  </label>
                  {!isSignup && (
                    <a href="#" className="text-[10px] font-black uppercase tracking-widest text-primary hover:text-[#121212]">
                      Lost Key?
                    </a>
                  )}
                </div>

                <Button type="submit" className="w-full rounded-none py-5 text-xs uppercase tracking-[0.4em] shadow-xl hover:shadow-primary/20">
                  {content.action}
                </Button>
              </form>

              <div className="relative py-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-zinc-100" />
                </div>
                <div className="relative flex justify-center text-[9px] uppercase tracking-[0.4em]">
                  <span className="bg-white px-4 text-zinc-300">OR</span>
                </div>
              </div>

              <Button variant="secondary" className="w-full rounded-none border-zinc-200 py-4 text-[10px] uppercase tracking-[0.2em] hover:bg-zinc-50">
                Continue with Google
              </Button>

              {/* Simulation Access for testing */}
              <div className="mt-12 border border-zinc-100 bg-[#FAFAFA] p-6">
                <p className="mb-4 text-[8px] font-black uppercase tracking-[0.4em] text-zinc-300">Simulation Access</p>
                <div className="grid grid-cols-2 gap-3">
                  <button 
                    onClick={() => login({ name: 'Member', email: 'member@studio.com', isAdmin: false })}
                    className="border border-zinc-200 bg-white py-3 text-[9px] font-bold uppercase tracking-widest text-zinc-500 hover:border-primary hover:text-primary transition-all"
                  >
                    Login as Member
                  </button>
                  <button 
                    onClick={() => login({ name: 'Admin', email: 'admin@studio.com', isAdmin: true })}
                    className="border border-zinc-200 bg-white py-3 text-[9px] font-bold uppercase tracking-widest text-zinc-500 hover:border-[#121212] hover:text-[#121212] transition-all"
                  >
                    Login as Admin
                  </button>
                </div>
              </div>

              <div className="mt-12 text-center">
                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                  {content.switchCopy}
                  <button
                    onClick={() => setMode(isSignup ? 'login' : 'signup')}
                    className="ml-2 border-b-2 border-primary/20 font-black text-primary hover:border-primary hover:text-[#121212] transition-all"
                  >
                    {content.switchAction}
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="relative z-10 flex flex-col gap-3 border-t border-zinc-50 bg-white px-6 py-5 text-[8px] font-bold uppercase tracking-[0.35em] text-zinc-300 sm:flex-row sm:items-center sm:justify-between md:px-10">
        <span>Copyright 2024 FilmBridge</span>
        <div className="flex gap-6">
          <span className="text-primary italic">In & Out</span>
        </div>
      </footer>
    </div>
  );
}
