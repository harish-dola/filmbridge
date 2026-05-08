'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Section } from '@/components/ui/Section';
import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';

const FEATURED_RESOURCES = [
  {
    id: "the-editors-rhythm",
    title: "The Editor's Rhythm",
    type: "Article",
    description: "Mastering the invisible art of pacing and narrative flow in the cutting room.",
    image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "cinematic-lighting",
    title: "Cinematic Lighting",
    type: "Manual",
    description: "Understanding photons, sensors, and the psychological impact of light placement.",
    image: "https://images.unsplash.com/photo-1492691523567-6170f0295df1?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "color-science",
    title: "Color Science",
    type: "Technical Guide",
    description: "Mastering Log profiles, LUTs, and the color pipeline for high-end digital cinema.",
    image: "https://images.unsplash.com/photo-1550684376-efcbd6e3f031?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "directing-the-camera",
    title: "Directing the Camera",
    type: "Manual",
    description: "Translating performance blocking into a comprehensive and dynamic shot list.",
    image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=1200&auto=format&fit=crop",
  },
];

const WHY_FILMBRIDGE = [
  {
    emoji: "🎬",
    title: "Real Filmmaking",
    description: "Learn the practical realities behind writing, production, direction, editing, and distribution."
  },
  {
    emoji: "📖",
    title: "Educational Content",
    description: "Access structured articles and resources curated specifically for cinema enthusiasts."
  },
  {
    emoji: "🚀",
    title: "Community Growth",
    description: "Build connections with people who genuinely want to create films and collaborate."
  }
];

export default function FilmBridgeLandingPage() {
  const router = useRouter();
  const [showNewsletter, setShowNewsletter] = useState(false);
  const [hasShownThisSession, setHasShownThisSession] = useState(false);

  useEffect(() => {
    const shown = sessionStorage.getItem('fb_newsletter_shown');
    if (shown) setHasShownThisSession(true);

    const handleScroll = () => {
      if (hasShownThisSession) return;
      
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const fullHeight = document.documentElement.scrollHeight;
      
      if (scrollPosition > (fullHeight - windowHeight) / 2) {
        setShowNewsletter(true);
        setHasShownThisSession(true);
        sessionStorage.setItem('fb_newsletter_shown', 'true');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasShownThisSession]);

  return (
    <div className="min-h-screen bg-white text-[#121212] selection:bg-primary selection:text-white">
      <Navbar />
      
      {/* Newsletter Popup */}
      {showNewsletter && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-[#121212]/40 backdrop-blur-sm animate-in fade-in duration-500">
          <div className="bg-white border border-zinc-100 shadow-2xl max-w-lg w-full relative overflow-hidden">
            <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
            <button 
              onClick={() => setShowNewsletter(false)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-[#121212] transition-colors z-20"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
            
            <div className="p-12 relative z-10 text-center">
              <Badge variant="primary" className="mb-6">Newsletter</Badge>
              <h3 className="text-3xl font-black uppercase tracking-tighter italic text-[#121212] mb-4">The Industrial Feed</h3>
              <p className="text-zinc-500 text-sm leading-relaxed mb-10 max-w-xs mx-auto">
                Get weekly technical breakdowns and exclusive resources delivered to your studio inbox.
              </p>
              <div className="space-y-4">
                <input type="email" placeholder="agent@studio.com" className="w-full bg-[#fafafa] border border-zinc-100 px-4 py-4 text-center text-sm outline-none focus:border-primary transition-colors" />
                <Button className="w-full py-4 text-xs uppercase tracking-[0.3em] rounded-none shadow-lg hover:shadow-primary/20" onClick={() => setShowNewsletter(false)}>
                  Join the Lab
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 py-32 text-center overflow-hidden bg-white">
        <div className="absolute inset-0 bg-grid opacity-100" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_white_100%)] opacity-80" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--color-primary)_0%,_transparent_100%)] opacity-[0.08]" />
        
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-zinc-100 bg-white shadow-sm mb-10 translate-y-4 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-zinc-400">
              New: The Editor's Rhythm Technical Guide
            </span>
          </div>

          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black leading-[0.9] tracking-tighter uppercase mb-8 text-[#121212]">
            Cinema <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary/60 to-primary/40">In & Out</span>
          </h1>

          <p className="mt-8 text-zinc-500 text-lg md:text-2xl leading-relaxed max-w-2xl mx-auto font-light tracking-wide">
            Learn the real process behind filmmaking. 
            Practical guides for aspiring creators.
          </p>

          <div className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-6">
            <Button size="lg" className="w-full sm:w-auto shadow-xl hover:shadow-primary/20" onClick={() => router.push('/library')}>
              Explore Library
            </Button>
            <Button variant="secondary" size="lg" className="w-full sm:w-auto" onClick={() => router.push('/auth')}>
              Join Community
            </Button>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-20">
          <div className="w-[1px] h-12 bg-gradient-to-b from-transparent to-[#121212]" />
        </div>
      </section>

      {/* Featured Content */}
      <Section 
        subtitle="Featured Resources" 
        title="Learn Filmmaking"
        className="relative bg-white border-y border-zinc-100 overflow-hidden"
      >
        <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />
        
        <div className="grid md:grid-cols-4 gap-6 mt-16 relative z-10">
          {FEATURED_RESOURCES.map((item, index) => (
            <div key={index} className="group flex flex-col bg-white border border-zinc-100 hover:border-primary transition-all duration-500 shadow-sm hover:shadow-xl cursor-pointer" onClick={() => router.push(`/articles/${item.id}`)}>
              <div className="relative aspect-[4/5] overflow-hidden border-b border-zinc-100">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-1000 grayscale group-hover:grayscale-0"
                />
                <div className="absolute top-4 left-4">
                   <Badge variant="primary" className="bg-white/95 backdrop-blur-md text-primary border-none shadow-sm">{item.type}</Badge>
                </div>
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-lg font-black uppercase tracking-tight group-hover:text-primary transition text-[#121212] leading-tight">
                  {item.title}
                </h3>
                <p className="mt-3 text-zinc-500 text-xs leading-relaxed font-medium line-clamp-3">
                  {item.description}
                </p>
                <div className="mt-auto pt-6 flex items-center justify-between border-t border-zinc-50">
                  <span className="text-[9px] uppercase tracking-widest font-bold text-zinc-300">Available</span>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-[#121212] group-hover:text-primary flex items-center gap-2 transition-colors">
                    Access <span className="text-sm">→</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Membership Section */}
      <section className="relative px-6 py-32 overflow-hidden border-b border-zinc-100 bg-white">
        <div className="absolute inset-0 bg-grid opacity-100" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_white_100%)] opacity-80" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--color-primary)_0%,_transparent_100%)] opacity-[0.08]" />
        
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-24 items-center relative z-10">
          <div>
            <Badge className="mb-6">Membership</Badge>
            <h2 className="text-5xl md:text-7xl font-black leading-[0.95] uppercase tracking-tighter text-[#121212]">
              Unlock <br />
              <span className="text-primary italic">Resources</span>
            </h2>

            <p className="mt-10 text-zinc-500 text-lg leading-relaxed max-w-lg font-light">
              Get full access to all articles, e-books, breakdowns, and community features.
            </p>

            <div className="mt-12 space-y-5">
              {[
                "Exclusive Articles",
                "E-Books & Guides",
                "Community Access",
                "Behind The Scenes"
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-600">
                  <span className="w-1.5 h-1.5 bg-primary" />
                  {feature}
                </div>
              ))}
            </div>
          </div>

          <div className="relative w-full max-w-xl mx-auto bg-white border border-zinc-100 shadow-2xl p-8 md:p-14 py-16 md:py-20">
            <div className="w-full max-w-sm mx-auto text-center">
              <h3 className="text-2xl font-black mb-10 uppercase tracking-tighter italic text-[#121212]">Login</h3>
              <div className="space-y-6 text-left">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 ml-1">Email Address</label>
                  <input type="email" placeholder="you@example.com" className="w-full bg-[#fafafa] border border-zinc-100 rounded-none px-5 py-3 outline-none focus:border-primary transition" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 ml-1">Password</label>
                  <input type="password" placeholder="••••••••" className="w-full bg-[#fafafa] border border-zinc-100 rounded-none px-5 py-3 outline-none focus:border-primary transition" />
                </div>
                
                <Button className="w-full py-4 text-xs uppercase tracking-[0.3em] rounded-none shadow-lg hover:shadow-primary/20" onClick={() => router.push('/auth')}>Login</Button>
                
                <div className="relative py-4">
                  <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-zinc-100"></div></div>
                  <div className="relative flex justify-center text-[9px] uppercase tracking-[0.4em]"><span className="bg-white px-4 text-zinc-300">OR</span></div>
                </div>

                <Button variant="secondary" className="w-full py-4 text-[10px] uppercase tracking-[0.2em] border-zinc-200 rounded-none hover:bg-zinc-50" onClick={() => router.push('/auth')}>
                  Continue with Google
                </Button>
              </div>

              <p className="mt-10 text-center text-zinc-400 text-[9px] uppercase tracking-widest font-medium">
                Don't have an account? <button onClick={() => router.push('/auth')} className="text-primary hover:text-[#121212] transition-colors font-bold">Sign Up</button>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <Section 
        subtitle="About Us" 
        title="Bridging Cinema"
        containerClassName="text-center relative z-10"
        className="relative bg-white border-t border-zinc-100 overflow-hidden py-32"
      >
        <div className="absolute inset-0 bg-grid opacity-25 pointer-events-none" />
        
        <p className="mt-8 text-zinc-500 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto font-light relative z-10">
          FilmBridge helps aspiring filmmakers understand the real process behind 
          cinema — from writing to distribution.
        </p>

        <div className="grid md:grid-cols-3 gap-6 mt-24 text-left relative z-10">
          {WHY_FILMBRIDGE.map((item, index) => (
            <div key={index} className="p-10 border border-zinc-100 bg-white hover:border-primary transition-all duration-500 shadow-sm hover:shadow-xl group">
              <div className="text-2xl mb-8 w-14 h-14 flex items-center justify-center bg-[#fafafa] border border-zinc-100 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-500">
                {item.emoji}
              </div>
              <h3 className="text-lg font-black uppercase tracking-tight italic mb-4 text-[#121212]">{item.title}</h3>
              <p className="text-zinc-400 text-sm leading-relaxed font-medium">
                {item.description}
              </p>
              <div className="mt-8 pt-6 border-t border-zinc-50">
                <span className="text-[9px] uppercase tracking-[0.3em] font-bold text-zinc-300">Phase {index + 1}</span>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Footer />
    </div>
  );
}
