'use client';

import React, { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';
import { ARTICLES_DATA } from '@/data/articles';
import { useAuth } from '@/context/AuthContext';

export default function DashboardPage() {
  const router = useRouter();
  const { user, isInitialized } = useAuth();

  const savedArticles = useMemo(() => {
    if (!user?.savedArticles) return [];
    return user.savedArticles.map(id => ARTICLES_DATA[id]).filter(Boolean);
  }, [user]);

  if (isInitialized && !user) {
    router.push('/auth');
    return null;
  }

  return (
    <div className="min-h-screen bg-white text-[#121212] selection:bg-primary selection:text-white">
      <Navbar />

      <main className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-4">
              <span className="h-px w-12 bg-primary" />
              <span className="text-[10px] font-bold uppercase tracking-[0.35em] text-primary">Member Workspace</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black uppercase italic leading-none tracking-tighter mb-6">
              Library <span className="text-zinc-200">Session</span>
            </h1>
            <p className="text-lg md:text-xl font-light text-zinc-500 max-w-2xl leading-relaxed">
              Welcome back, <span className="text-[#121212] font-medium">{user?.name}</span>. Your saved resources and production notes are synchronized across the FilmBridge network.
            </p>
          </div>

          <div className="grid lg:grid-cols-[1fr_320px] gap-12">
            <div>
              <div className="flex items-center justify-between mb-8 border-b border-zinc-100 pb-6">
                <h3 className="text-xl font-black uppercase italic tracking-tight">Saved Resources</h3>
                <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-300">{savedArticles.length} items saved</span>
              </div>

              {savedArticles.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-6">
                  {savedArticles.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => router.push(`/articles/${item.id}`)}
                      className="group border border-zinc-100 bg-[#FAFAFA] p-6 text-left hover:border-primary/40 hover:bg-white hover:shadow-xl transition-all"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <Badge variant="secondary" className="rounded-none border-zinc-100 bg-white text-[9px]">{item.category}</Badge>
                        <span className="text-[9px] font-bold text-zinc-300 uppercase tracking-widest">{item.readTime}</span>
                      </div>
                      <h4 className="text-xl font-black uppercase tracking-tight text-[#121212] mb-3 group-hover:text-primary transition-colors">{item.title.split(':')[0]}</h4>
                      <p className="text-xs font-medium text-zinc-500 leading-relaxed line-clamp-2 mb-6">{item.subtitle}</p>
                      <div className="flex items-center justify-between pt-4 border-t border-zinc-50">
                        <span className="text-[9px] font-black uppercase tracking-widest text-[#121212]">Enter File</span>
                        <span className="text-sm font-black text-primary transition-transform group-hover:translate-x-1">→</span>
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="border border-dashed border-zinc-200 p-16 text-center">
                  <p className="text-sm font-medium text-zinc-400 mb-8">You haven&apos;t saved any resources to your archive yet.</p>
                  <Button variant="secondary" className="rounded-none border-zinc-200 px-8 py-4 uppercase text-[10px] tracking-widest" onClick={() => router.push('/library')}>
                    Browse Library
                  </Button>
                </div>
              )}
            </div>

            <aside className="space-y-8">
              <div className="border border-zinc-100 bg-[#FAFAFA] p-8">
                <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-primary mb-6">Member Status</p>
                <div className="space-y-6">
                  {[
                    ['Level', 'Professional'],
                    ['Plan', 'Premium Access'],
                    ['Sync', 'Active'],
                  ].map(([label, val]) => (
                    <div key={label} className="border-b border-zinc-100 pb-4 last:border-0 last:pb-0">
                      <span className="block text-[9px] font-bold uppercase tracking-widest text-zinc-400 mb-1">{label}</span>
                      <span className="text-sm font-black uppercase italic text-[#121212]">{val}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border border-zinc-100 bg-white p-8 shadow-sm">
                <Badge variant="secondary" className="mb-6 rounded-none">Study Progress</Badge>
                <div className="space-y-8">
                  <div>
                    <div className="flex justify-between mb-3">
                      <span className="text-[10px] font-black uppercase tracking-widest text-[#121212]">Technical Mastery</span>
                      <span className="text-[10px] font-bold text-primary">68%</span>
                    </div>
                    <div className="h-1 bg-zinc-100 w-full">
                      <div className="h-full bg-primary w-[68%]" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-3">
                      <span className="text-[10px] font-black uppercase tracking-widest text-[#121212]">Resource Coverage</span>
                      <span className="text-[10px] font-bold text-primary">12/48</span>
                    </div>
                    <div className="h-1 bg-zinc-100 w-full">
                      <div className="h-full bg-primary w-[25%]" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-8 border border-zinc-100 bg-[#121212] text-white">
                <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-primary mb-4">Laboratory Note</p>
                <p className="text-xs font-medium leading-relaxed opacity-60 italic">
                  &ldquo;Your cinema workspace is a reflection of your discipline. Keep filing, keep studying, keep moving.&rdquo;
                </p>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
