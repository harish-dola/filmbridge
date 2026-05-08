'use client';

import React, { use } from 'react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';

// Professional Content Database - Pre-Backend Population
const ARTICLES = {
  "the-editors-rhythm": {
    title: "The Editor's Rhythm: Mastering the Invisible Art",
    subtitle: "Understanding the psychological impact of pacing and narrative flow in the cutting room.",
    author: "Vignesh Shivan",
    role: "Lead Editor / Director",
    date: "May 12, 2024",
    category: "Post-Production",
    readTime: "12 min read",
    image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1200&auto=format&fit=crop",
    specs: { software: "Avid Media Composer", resolution: "4K DCI", pipeline: "ACES v1.2" },
    content: [
      { type: "paragraph", text: "Editing is often called the 'final rewrite' of a film. It is where the raw materials of performance, cinematography, and sound design are woven into a single, cohesive tapestry." },
      { type: "heading", text: "The Heartbeat of the Scene" },
      { type: "paragraph", text: "Every scene has a natural heartbeat. As an editor, your job is to find it. This isn't just about cutting on the action or matching eyelines. It's about feeling the breath of the actor." },
      { type: "quote", text: "A good cut is one that the audience doesn't notice, but the story couldn't live without." }
    ]
  },
  "cinematic-lighting": {
    title: "Cinematic Lighting: Technical Guide",
    subtitle: "Understanding photons, sensors, and the psychological impact of light placement.",
    author: "Kiran Kumar",
    role: "Cinematographer",
    date: "May 10, 2024",
    category: "Technical",
    readTime: "15 min read",
    image: "https://images.unsplash.com/photo-1492691523567-6170f0295df1?q=80&w=1200&auto=format&fit=crop",
    specs: { camera: "ARRI Alexa Mini LF", lenses: "Signature Primes", lighting: "Skypanels" },
    content: [{ type: "paragraph", text: "Lighting is the brush with which a cinematographer paints. It defines the mood, the depth, and the emotional context of every frame." }]
  },
  "script-to-screen": {
    title: "Script to Screen: Case Studies",
    subtitle: "A deep dive into how 3 award-winning scripts were translated into visual language.",
    author: "Anjali Menon",
    role: "Screenwriter / Director",
    date: "May 08, 2024",
    category: "Storytelling",
    readTime: "10 min read",
    image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=1200&auto=format&fit=crop",
    specs: { drafts: "Final Draft 12", format: "Standard Screenplay", process: "Beat Sheet" },
    content: [{ type: "paragraph", text: "The journey from a blank page to a finished film is long and fraught with challenges. But the script remains the most vital document." }]
  },
  "color-science": {
    title: "Color Science: The Digital Negative",
    subtitle: "Mastering Log profiles, LUTs, and the color pipeline for high-end digital cinema.",
    author: "Sanjay Reddy",
    role: "Senior Colorist",
    date: "May 05, 2024",
    category: "Technical",
    readTime: "18 min read",
    image: "https://images.unsplash.com/photo-1550684376-efcbd6e3f031?q=80&w=1200&auto=format&fit=crop",
    specs: { grading: "DaVinci Resolve 19", monitoring: "Flanders Scientific", color: "Rec.709 / Rec.2020" },
    content: [{ type: "paragraph", text: "Color is not just about aesthetics; it's about the physics of light and the biology of human perception." }]
  },
  "sound-scapes": {
    title: "Designing Soundscapes: Audio Narrative",
    subtitle: "How to use foley, ambience, and silence to drive the emotional core of your film.",
    author: "Praveen Mani",
    role: "Sound Designer",
    date: "May 01, 2024",
    category: "Post-Production",
    readTime: "14 min read",
    image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=1200&auto=format&fit=crop",
    specs: { daw: "Pro Tools Ultimate", mixing: "Dolby Atmos", library: "Sound Ideas" },
    content: [{ type: "paragraph", text: "Sound is 50% of the cinema experience. It is the invisible force that guides the audience's attention." }]
  },
  "production-management": {
    title: "Production Management: The Grid",
    subtitle: "The logistics of managing a 200+ person crew without losing your creative mind.",
    author: "Meera Nair",
    role: "Executive Producer",
    date: "April 28, 2024",
    category: "Production",
    readTime: "20 min read",
    image: "https://images.unsplash.com/photo-1492691523567-6170f0295df1?q=80&w=1200&auto=format&fit=crop",
    specs: { scheduling: "Movie Magic", budgeting: "Gorilla Rate", paperwork: "Docusign" },
    content: [{ type: "paragraph", text: "Production is the management of chaos. Efficiency is the bridge between a good idea and a great film." }]
  },
  "visual-effects-vfx": {
    title: "VFX Integration: Practical to Digital",
    subtitle: "Achieving seamless visual effects by mastering on-set data collection and lighting.",
    author: "Arjun Das",
    role: "VFX Supervisor",
    date: "April 25, 2024",
    category: "Technical",
    readTime: "16 min read",
    image: "https://images.unsplash.com/photo-1535016120720-40c646bebbfc?q=80&w=1200&auto=format&fit=crop",
    specs: { engine: "Unreal Engine 5", compositing: "Nuke", data: "Silverstack" },
    content: [{ type: "paragraph", text: "Visual effects start on the day of the shoot, not in post. Data is the bridge between the set and the screen." }]
  },
  "indie-distribution": {
    title: "Indie Distribution: The New Era",
    subtitle: "Navigating the landscape of streaming, festivals, and direct-to-consumer releases.",
    author: "Ritu Varma",
    role: "Distributor",
    date: "April 20, 2024",
    category: "Production",
    readTime: "15 min read",
    image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=1200&auto=format&fit=crop",
    specs: { market: "Global", rights: "Theatrical/OTT", delivery: "DCP / IMF" },
    content: [{ type: "paragraph", text: "The festival run is just the beginning. Distribution is about understanding your audience's digital habits." }]
  },
  "the-actors-arc": {
    title: "The Actor's Arc: From Text to Soul",
    subtitle: "Bridging the gap between the written dialogue and the internal emotional landscape.",
    author: "Nawazuddin Siddiqui",
    role: "Actor",
    date: "April 15, 2024",
    category: "Storytelling",
    readTime: "12 min read",
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=1200&auto=format&fit=crop",
    specs: { method: "Stanislavski", preparation: "Internal Monologue", tools: "Observation" },
    content: [{ type: "paragraph", text: "Acting is not about pretending; it's about finding the truth within the given circumstances." }]
  },
  "directing-the-camera": {
    title: "Directing the Camera: Block to Shoot",
    subtitle: "Translating performance blocking into a comprehensive and dynamic shot list.",
    author: "Gautham Menon",
    role: "Director",
    date: "April 10, 2024",
    category: "Storytelling",
    readTime: "14 min read",
    image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=1200&auto=format&fit=crop",
    specs: { style: "Steady / Dynamic", coverage: "Multi-cam", lens: "50mm Prime" },
    content: [{ type: "paragraph", text: "The camera is a character. Its movement should always be an emotional response to the performance." }]
  }
};

export async function generateStaticParams() {
  return Object.keys(ARTICLES).map((id) => ({
    id: id,
  }));
}

export default function ArticleDetailPage({ params }) {
  const resolvedParams = use(params);
  const id = resolvedParams?.id;
  const data = ARTICLES[id] || ARTICLES["the-editors-rhythm"];

  return (
    <div className="min-h-screen bg-white text-[#121212] selection:bg-primary selection:text-white pb-0">
      <Navbar />
      
      {/* 1. Immersive Technical Header */}
      <header className="relative pt-48 pb-24 px-6 border-b border-zinc-100 overflow-hidden bg-white">
        <div className="absolute inset-0 bg-grid opacity-[0.08] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-12 gap-16 items-end">
            <div className="lg:col-span-8">
              <div className="flex items-center gap-4 mb-10">
                <Badge variant="primary" className="px-6 py-2">Technical Breakdown</Badge>
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-300">File_Ref: FB_{id?.toUpperCase().replace(/-/g, '_') || 'DEF_001'}</span>
              </div>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter italic leading-[0.9] mb-10 text-[#121212]">
                {data.title}
              </h1>
              <p className="text-zinc-500 text-xl md:text-2xl font-light leading-relaxed max-w-2xl italic">
                {data.subtitle}
              </p>
            </div>
            
            <div className="lg:col-span-4 border-l border-zinc-100 pl-12 pb-4 hidden lg:block">
               <div className="space-y-8">
                  <div>
                    <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-primary block mb-2">Author</span>
                    <p className="text-lg font-black uppercase italic">{data.author}</p>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">{data.role}</p>
                  </div>
                  <div className="flex gap-12">
                    <div>
                      <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-zinc-300 block mb-2">Published</span>
                      <p className="text-xs font-bold uppercase">{data.date}</p>
                    </div>
                    <div>
                      <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-zinc-300 block mb-2">Complexity</span>
                      <p className="text-xs font-bold uppercase">Advanced</p>
                    </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </header>

      {/* 2. Structured Content Layer */}
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-20">
        
        {/* Left Sidebar: Specs & Progress */}
        <aside className="lg:col-span-3 pt-24 hidden lg:block h-fit sticky top-32">
          <div className="space-y-12">
            <div className="bg-[#fafafa] border border-zinc-100 p-8">
               <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#121212] mb-8 border-b border-zinc-200 pb-4">Technical Specs</h4>
               <div className="space-y-6">
                  {data.specs && Object.entries(data.specs).map(([key, val]) => (
                    <div key={key}>
                       <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-400 block mb-1">{key}</span>
                       <p className="text-[11px] font-bold uppercase text-[#121212]">{val}</p>
                    </div>
                  ))}
               </div>
            </div>

            <div className="px-4">
               <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-300 block mb-6">Archive Navigation</span>
               <ul className="space-y-4 text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                  <li className="text-primary">01 Introduction</li>
                  <li className="hover:text-[#121212] cursor-pointer transition-colors">02 Technical Pipeline</li>
                  <li className="hover:text-[#121212] cursor-pointer transition-colors">03 Emotional Resonance</li>
                  <li className="hover:text-[#121212] cursor-pointer transition-colors">04 Case Study</li>
               </ul>
            </div>
          </div>
        </aside>

        {/* Center: Main Reading Experience */}
        <main className="lg:col-span-9 pt-24 pb-32">
          <div className="relative aspect-[21/9] overflow-hidden border border-zinc-100 shadow-2xl bg-white p-1 mb-24">
             <img src={data.image} alt={data.title} className="w-full h-full object-cover" />
             <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />
          </div>

          <div className="max-w-3xl space-y-12">
            {data.content.map((block, index) => {
              if (block.type === 'paragraph') {
                return <p key={index} className="text-xl text-zinc-600 leading-relaxed font-light">{block.text}</p>;
              }
              if (block.type === 'heading') {
                return <h2 key={index} className="text-4xl font-black uppercase tracking-tighter italic text-[#121212] pt-8">{block.text}</h2>;
              }
              if (block.type === 'quote') {
                return (
                  <blockquote key={index} className="pl-12 border-l-4 border-primary py-6 my-16 bg-[#fafafa]">
                    <p className="text-3xl font-black italic text-[#121212] tracking-tight leading-tight uppercase">
                      "{block.text}"
                    </p>
                  </blockquote>
                );
              }
              return null;
            })}
          </div>

          {/* Footer Actions */}
          <div className="mt-32 pt-12 border-t border-zinc-100 flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="flex items-center gap-6">
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-400">Distribute Archive</span>
              <div className="flex gap-3">
                {['TW', 'IG', 'LI'].map(s => (
                  <button key={s} className="w-10 h-10 border border-zinc-100 flex items-center justify-center text-[10px] font-bold hover:bg-[#121212] hover:text-white transition-all">{s}</button>
                ))}
              </div>
            </div>
            <Button variant="outline" className="rounded-none px-12 border-zinc-200" onClick={() => router.push('/library')}>
              Return to Library
            </Button>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}
