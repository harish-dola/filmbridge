'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Section } from '@/components/ui/Section';
import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';
import { ARTICLES_DATA } from '@/data/articles';

const FEATURED_RESOURCES = [
  ARTICLES_DATA["the-editors-rhythm"],
  ARTICLES_DATA["cinematic-lighting"],
  ARTICLES_DATA["color-science"],
  ARTICLES_DATA["directing-the-camera"],
];

const WHY_FILMBRIDGE = [
  {
    emoji: "🎬",
    title: "Process First",
    description: "Learn how films actually move from rough idea to script, schedule, shoot, edit, and release."
  },
  {
    emoji: "📖",
    title: "Usable Resources",
    description: "Study focused lessons, templates, and breakdowns built for creators who want practical next steps."
  },
  {
    emoji: "🚀",
    title: "Creator Network",
    description: "Connect with people learning the same craft and turn isolated study into steady collaboration."
  }
];

export default function FilmBridgeLandingPage() {
  const router = useRouter();
  const [showNewsletter, setShowNewsletter] = useState(false);
  const [hasShownThisSession, setHasShownThisSession] = useState(() => {
    if (typeof window === 'undefined') return false;
    return sessionStorage.getItem('fb_newsletter_shown') === 'true';
  });

  useEffect(() => {
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
              New: The Editor&apos;s Rhythm Breakdown
            </span>
          </div>

          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black leading-[0.9] tracking-tighter uppercase mb-8 text-[#121212]">
            Cinema <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary/60 to-primary/40">In & Out</span>
          </h1>

          <p className="mt-8 text-zinc-500 text-lg md:text-2xl leading-relaxed max-w-2xl mx-auto font-light tracking-wide">
            Learn the real process behind filmmaking. 
            Practical resources for aspiring creators.
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
          {FEATURED_RESOURCES.map((item, index) => {
            const isPremium = item.isPremium;
            return (
              <div key={index} className="group flex flex-col bg-white border border-zinc-100 hover:border-primary transition-all duration-500 shadow-sm hover:shadow-xl cursor-pointer" onClick={() => router.push(`/articles/${item.id}`)}>
                <div className="relative aspect-[4/5] overflow-hidden border-b border-zinc-100">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-1000 grayscale group-hover:grayscale-0"
                  />
                  <div className="absolute top-4 left-4">
                     <Badge variant="primary" className="bg-white/95 backdrop-blur-md text-primary border-none shadow-sm">{item.category}</Badge>
                  </div>
                  {isPremium && (
                    <div className="absolute top-4 right-4 bg-primary/95 backdrop-blur-md p-2 shadow-lg">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                    </div>
                  )}
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-lg font-black uppercase tracking-tight group-hover:text-primary transition text-[#121212] leading-tight">
                    {item.title.split(':')[0]}
                  </h3>
                  <p className="mt-3 text-zinc-500 text-xs leading-relaxed font-medium line-clamp-3">
                    {item.subtitle || item.description}
                  </p>
                  <div className="mt-auto pt-6 flex items-center justify-between border-t border-zinc-50">
                    <span className="text-[9px] uppercase tracking-widest font-bold text-zinc-300">
                      {isPremium ? 'Premium' : 'Available'}
                    </span>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-[#121212] group-hover:text-primary flex items-center gap-2 transition-colors">
                      {isPremium ? 'Unlock' : 'Access'} <span className="text-sm">→</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      {/* Access Section */}
      <section id="access" className="relative overflow-hidden border-b border-zinc-100 bg-white px-6 py-28 md:py-40">
        <div className="absolute inset-0 bg-grid opacity-70" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_white_82%)] opacity-90" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_25%,_var(--color-primary)_0%,_transparent_34%)] opacity-[0.08]" />

        <div className="relative z-10 mx-auto grid max-w-7xl gap-20 lg:grid-cols-[1fr_0.82fr] lg:items-center">
          <div>
            <Badge className="mb-8 rounded-none px-4 py-1.5 uppercase tracking-[0.3em]">Full Access</Badge>
            <h2 className="max-w-3xl text-6xl md:text-8xl font-black uppercase italic leading-[0.85] tracking-tight text-[#121212]">
              Unlock <br />
              <span className="text-primary not-italic">Resources.</span>
            </h2>

            <p className="mt-10 max-w-xl text-lg md:text-xl font-light leading-relaxed text-zinc-500">
              FilmBridge is a professional filmmaking community. Join to access 
              in-depth analysis, technical breakdowns, and exclusive articles shared by active creators.
            </p>

            <div className="mt-12 grid sm:grid-cols-2 gap-8">
              {[
                { title: "Exclusive Articles", desc: "In-depth technical analysis", icon: "📄" },
                { title: "E-Books & Manuals", desc: "Downloadable study guides", icon: "📚" },
                { title: "Community Forum", desc: "Collaborate with peers", icon: "💬" },
                { title: "Project Assets", desc: "Shot lists & schedules", icon: "📂" }
              ].map((feature, i) => (
                <div key={i} className="group flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-zinc-50 border border-zinc-100 text-lg group-hover:border-primary/30 transition-colors">
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-[#121212] mb-1">{feature.title}</h4>
                    <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative border border-zinc-100 bg-white p-12 md:p-16 shadow-2xl">
              <div className="flex flex-col gap-8">
                <div>
                  <Badge variant="primary" className="mb-6 rounded-none px-4 py-1 uppercase tracking-[0.3em]">Workspace</Badge>
                  <h3 className="text-4xl font-black uppercase italic tracking-tighter text-[#121212] leading-none mb-6">
                    Join the <br />
                    Network.
                  </h3>
                  <p className="text-zinc-500 text-sm font-medium leading-relaxed max-w-[280px]">
                    Create your profile to save articles, access technical assets, and join the filmmaking community.
                  </p>
                </div>
                
                <div className="space-y-4">
                  <Button 
                    className="w-full py-5 rounded-none text-[10px] font-black uppercase tracking-[0.4em] shadow-xl hover:shadow-primary/20 transition-all"
                    onClick={() => router.push('/auth?mode=signup')}
                  >
                    Create Account
                  </Button>
                  <Button 
                    variant="secondary" 
                    className="w-full py-5 rounded-none text-[10px] font-black uppercase tracking-[0.4em] border-zinc-100 bg-white text-zinc-400 hover:text-[#121212] transition-all"
                    onClick={() => router.push('/auth')}
                  >
                    Member Login
                  </Button>
                </div>

                <div className="pt-8 border-t border-zinc-50 flex items-center justify-between">
                  <span className="text-[8px] font-bold uppercase tracking-[0.3em] text-zinc-300">FilmBridge Community</span>
                  <div className="flex gap-1.5">
                    <div className="w-1 h-1 rounded-full bg-zinc-200" />
                    <div className="w-1 h-1 rounded-full bg-zinc-200" />
                    <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section - Immersive Storytelling */}
      <section id="about" className="relative overflow-hidden border-t border-zinc-100 bg-white px-6 py-32 md:py-56">
        <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,_var(--color-primary)_0%,_transparent_35%)] opacity-[0.06] pointer-events-none" />
        
        {/* Decorative Optical Frame */}
        <div className="absolute -left-20 top-1/4 opacity-[0.03] pointer-events-none select-none">
          <svg width="600" height="600" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.5">
            <circle cx="50" cy="50" r="45" />
            <circle cx="50" cy="50" r="35" />
            <line x1="0" y1="50" x2="100" y2="50" />
            <line x1="50" y1="0" x2="50" y2="100" />
          </svg>
        </div>

        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-5 mb-10">
              <span className="h-px w-10 bg-primary" />
              <Badge className="rounded-none border-primary/20 bg-primary/5 px-4 py-1.5 text-primary uppercase tracking-[0.4em] font-black text-[9px]">The Mission</Badge>
              <span className="h-px w-10 bg-primary" />
            </div>
            
            <h2 className="text-7xl md:text-9xl font-black uppercase italic leading-[0.82] tracking-tighter text-[#121212]">
              Bridging <br />
              <span className="text-zinc-200">The Gap.</span>
            </h2>
            
            <div className="mt-14 space-y-10">
              <p className="text-2xl md:text-3xl font-light leading-snug tracking-tight text-zinc-500">
                FilmBridge is a filmmaking community dedicated to the <span className="text-[#121212] font-black italic underline decoration-primary/40 underline-offset-8">technical truth</span> of cinema. 
              </p>
              <p className="text-lg font-medium leading-relaxed text-zinc-400 max-w-2xl uppercase tracking-wide">
                We observe that the distance between a good idea and a professional film is often a matter of process. We provide the industry-standard frameworks and in-depth analysis typically reserved for studio systems.
              </p>
            </div>

            <div className="mt-20 grid grid-cols-2 gap-12 border-t border-zinc-100 pt-16 w-full text-left">
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-1.5 h-1.5 bg-primary" />
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#121212]">Technical Depth</span>
                </div>
                <p className="text-xs font-bold text-zinc-400 leading-relaxed uppercase tracking-widest">
                  Vetted by active industry professionals to ensure technical accuracy and practical utility.
                </p>
              </div>
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-1.5 h-1.5 bg-primary" />
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#121212]">Peer Network</span>
                </div>
                <p className="text-xs font-bold text-zinc-400 leading-relaxed uppercase tracking-widest">
                  Join a global collective of technical creators sharing notes, breakdowns, and production assets.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
