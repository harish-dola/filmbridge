'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Section } from '@/components/ui/Section';
import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';

const CATEGORIES = ["All Archives", "Production", "Technical", "Storytelling", "Post-Production"];

const FEATURED_RESOURCE = {
  id: "the-editors-rhythm",
  title: "The Editor's Rhythm: Mastering the Invisible Art",
  type: "Premium E-Book",
  category: "Production",
  description: "An exhaustive breakdown of the modern production pipeline, from pre-visualization to global distribution. Learn the professional standards used by top-tier studios.",
  image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1200&auto=format&fit=crop",
  stats: ["450+ Pages", "Video Breakdowns", "PDF Manuals"]
};

const LIBRARY_ITEMS = [
  {
    id: "cinematic-lighting",
    title: "Cinematic Lighting: Technical Guide",
    type: "Manual",
    category: "Technical",
    description: "Understanding photons, sensors, and the psychological impact of light placement.",
    image: "https://images.unsplash.com/photo-1492691523567-6170f0295df1?q=80&w=1200&auto=format&fit=crop",
    date: "2024"
  },
  {
    id: "script-to-screen",
    title: "Script to Screen: Case Studies",
    type: "Article",
    category: "Storytelling",
    description: "A deep dive into how 3 award-winning scripts were translated into visual language.",
    image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=1200&auto=format&fit=crop",
    date: "2024"
  },
  {
    id: "color-science",
    title: "Color Science: The Digital Negative",
    type: "Technical Guide",
    category: "Technical",
    description: "Mastering Log profiles, LUTs, and the color pipeline for high-end digital cinema.",
    image: "https://images.unsplash.com/photo-1550684376-efcbd6e3f031?q=80&w=1200&auto=format&fit=crop",
    date: "2024"
  },
  {
    id: "sound-scapes",
    title: "Designing Soundscapes: Audio Narrative",
    type: "Article",
    category: "Post-Production",
    description: "How to use foley, ambience, and silence to drive the emotional core of your film.",
    image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=1200&auto=format&fit=crop",
    date: "2024"
  },
  {
    id: "production-management",
    title: "Production Management: The Grid",
    type: "Manual",
    category: "Production",
    description: "The logistics of managing a 200+ person crew without losing your creative mind.",
    image: "https://images.unsplash.com/photo-1492691523567-6170f0295df1?q=80&w=1200&auto=format&fit=crop",
    date: "2024"
  },
  {
    id: "visual-effects-vfx",
    title: "VFX Integration: Practical to Digital",
    type: "Technical Guide",
    category: "Technical",
    description: "Achieving seamless visual effects by mastering on-set data collection and lighting.",
    image: "https://images.unsplash.com/photo-1535016120720-40c646bebbfc?q=80&w=1200&auto=format&fit=crop",
    date: "2024"
  },
  {
    id: "indie-distribution",
    title: "Indie Distribution: The New Era",
    type: "Article",
    category: "Production",
    description: "Navigating the landscape of streaming, festivals, and direct-to-consumer releases.",
    image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=1200&auto=format&fit=crop",
    date: "2024"
  },
  {
    id: "the-actors-arc",
    title: "The Actor's Arc: From Text to Soul",
    type: "Article",
    category: "Storytelling",
    description: "Bridging the gap between the written dialogue and the internal emotional landscape.",
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=1200&auto=format&fit=crop",
    date: "2024"
  },
  {
    id: "directing-the-camera",
    title: "Directing the Camera: Block to Shoot",
    type: "Manual",
    category: "Storytelling",
    description: "Translating performance blocking into a comprehensive and dynamic shot list.",
    image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=1200&auto=format&fit=crop",
    date: "2024"
  }
];

export default function LibraryPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white text-[#121212] selection:bg-primary selection:text-white">
      <Navbar />
      
      {/* 1. Technical Header Layer */}
      <section className="relative pt-48 pb-20 px-6 border-b border-zinc-100 overflow-hidden bg-white">
        <div className="absolute inset-0 bg-grid opacity-40 pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12">
            <div className="max-w-2xl">
              <div className="flex items-center gap-4 mb-8">
                <span className="w-12 h-[1px] bg-primary"></span>
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary">Technical Archive</span>
              </div>
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter italic leading-[0.85] mb-8">
                Resource <br /> <span className="text-zinc-200">Library</span>
              </h1>
            </div>
            <div className="pb-4">
              <p className="text-zinc-400 text-[10px] font-bold uppercase tracking-[0.3em] mb-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                Live Database Update: May 2024
              </p>
              <p className="text-zinc-500 text-sm font-medium leading-relaxed max-w-xs border-l-2 border-zinc-100 pl-6">
                Direct access to the premier standard of filmmaking knowledge. Professional guides for the modern era.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Featured Spotlight Layer */}
      <section className="px-6 py-24 bg-[#FAFAFA] relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="bg-white border border-zinc-100 shadow-2xl flex flex-col lg:flex-row overflow-hidden group">
            <div className="lg:w-3/5 relative aspect-video lg:aspect-auto overflow-hidden">
              <img 
                src={FEATURED_RESOURCE.image} 
                alt={FEATURED_RESOURCE.title} 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition duration-1000" 
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="absolute top-8 left-8">
                <Badge className="bg-white/90 backdrop-blur-md text-primary border-none px-6 py-2 shadow-xl">Editor's Choice</Badge>
              </div>
            </div>
            <div className="lg:w-2/5 p-12 lg:p-16 flex flex-col justify-center relative">
              <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none">
                 <h4 className="text-9xl font-black italic uppercase">Vault</h4>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary mb-6 block">{FEATURED_RESOURCE.type}</span>
              <h2 className="text-4xl font-black uppercase tracking-tight italic mb-8 leading-tight text-[#121212]">
                {FEATURED_RESOURCE.title}
              </h2>
              <p className="text-zinc-500 text-base leading-relaxed font-light mb-10">
                {FEATURED_RESOURCE.description}
              </p>
              <div className="grid grid-cols-2 gap-6 mb-12 border-y border-zinc-50 py-8">
                {FEATURED_RESOURCE.stats.map(stat => (
                  <div key={stat} className="flex items-center gap-3">
                    <span className="w-1 h-1 bg-primary"></span>
                    <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-400">{stat}</span>
                  </div>
                ))}
              </div>
              <Button size="lg" className="rounded-none shadow-xl" onClick={() => router.push(`/articles/${FEATURED_RESOURCE.id}`)}>
                Access Resource
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Archives Filter & Grid Layer */}
      <section className="px-6 py-24 bg-white border-t border-zinc-100">
        <div className="max-w-7xl mx-auto">
          {/* Technical Filter Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-12 mb-20">
            <div className="flex flex-wrap gap-4">
              {CATEGORIES.map(cat => (
                <button 
                  key={cat} 
                  className={`text-[9px] font-bold uppercase tracking-[0.3em] px-6 py-3 border transition-all ${cat === "All Archives" ? 'bg-[#121212] text-white border-[#121212]' : 'border-zinc-100 text-zinc-400 hover:border-primary hover:text-primary'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="text-[9px] font-bold uppercase tracking-[0.3em] text-zinc-300">
              Database Search <span className="ml-2 text-zinc-500">/ FILMBRIDGE_v1.2</span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {LIBRARY_ITEMS.map((item, index) => (
              <div 
                key={index} 
                className="group bg-white border border-zinc-100 hover:border-primary transition-all duration-500 flex flex-col cursor-pointer"
                onClick={() => router.push(`/articles/${item.id}`)}
              >
                <div className="relative aspect-[3/4] overflow-hidden border-b border-zinc-100">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition duration-1000" />
                  <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none group-hover:opacity-0 transition-opacity" />
                  <div className="absolute bottom-6 left-6">
                    <Badge variant="secondary" className="bg-white/95 backdrop-blur-sm text-zinc-900 border-none shadow-sm">{item.category}</Badge>
                  </div>
                </div>
                <div className="p-10 flex flex-col flex-grow">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-primary">{item.type}</span>
                    <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-zinc-300">{item.date}</span>
                  </div>
                  <h3 className="text-xl font-black uppercase tracking-tight text-[#121212] group-hover:text-primary transition-colors leading-tight mb-6">
                    {item.title}
                  </h3>
                  <p className="text-zinc-500 text-xs leading-relaxed font-medium line-clamp-3 mb-8">
                    {item.description}
                  </p>
                  <div className="mt-auto pt-6 border-t border-zinc-50 flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#121212]">Enter File</span>
                    <span className="text-lg text-primary transform group-hover:translate-x-2 transition-transform">→</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-20 text-center">
             <Button variant="outline" className="rounded-none px-12 border-zinc-200">Load More Archives</Button>
          </div>
        </div>
      </section>

      {/* 4. Industrial Support Layer */}
      <section className="bg-zinc-50 py-32 px-6 border-y border-zinc-100 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <Badge className="mb-8">Support & Intake</Badge>
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter italic text-[#121212] mb-8 leading-tight">
            Missing a technical <br /> <span className="text-primary underline underline-offset-8">Breakdown</span>?
          </h2>
          <p className="text-zinc-500 text-lg font-light mb-12 leading-relaxed">
            Our vault is updated weekly with new professional guides and breakdowns. 
            Request a specific topic for our next publication.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
             <Button size="lg" className="rounded-none px-12">Submit Request</Button>
             <Button variant="outline" size="lg" className="rounded-none px-12 border-zinc-200">Contact Lab</Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
