'use client';

import React, { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';
import { ARTICLES_DATA, COLLECTIONS_DATA } from '@/data/articles';
import { useAuth } from '@/context/AuthContext';

const CATEGORIES = ['All Archives', 'Production', 'Technical', 'Storytelling', 'Post-Production', 'Assets'];

const LIBRARY_ITEMS = Object.values(ARTICLES_DATA);

const FEATURED_RESOURCE = ARTICLES_DATA['the-editors-rhythm'] || LIBRARY_ITEMS[0];
const FEATURED_STATS = ['450+ Pages', 'Video Breakdowns', 'PDF Manuals'];

const COLLECTIONS = COLLECTIONS_DATA;

export default function LibraryPage() {
  const router = useRouter();
  const { user, toggleSaveArticle } = useAuth();
  const [activeCategory, setActiveCategory] = useState('All Archives');
  const [query, setQuery] = useState('');
  const [sortMode, setSortMode] = useState('Newest');

  const filteredItems = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return LIBRARY_ITEMS.filter((item) => {
      const categoryMatch = activeCategory === 'All Archives' || item.category === activeCategory;
      const queryMatch = [item.title, item.type, item.category, item.description, item.level]
        .join(' ')
        .toLowerCase()
        .includes(normalizedQuery);

      return categoryMatch && queryMatch;
    }).sort((a, b) => {
      if (sortMode === 'Title') return a.title.localeCompare(b.title);
      if (sortMode === 'Level') return a.level.localeCompare(b.level);
      return b.date.localeCompare(a.date);
    });
  }, [activeCategory, query, sortMode]);

  const categoryCounts = useMemo(
    () =>
      CATEGORIES.reduce((counts, category) => {
        counts[category] =
          category === 'All Archives'
            ? LIBRARY_ITEMS.length
            : LIBRARY_ITEMS.filter((item) => item.category === category).length;
        return counts;
      }, {}),
    []
  );

  return (
    <div className="min-h-screen bg-white text-[#121212] selection:bg-primary selection:text-white">
      <Navbar />

      <section className="relative overflow-hidden border-b border-zinc-100 bg-white px-6 pb-16 pt-36 md:pt-44">
        <div className="absolute inset-0 bg-grid opacity-35 pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-white to-transparent pointer-events-none" />

        <div className="relative z-10 mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <div className="mb-7 flex items-center gap-4">
              <span className="h-px w-12 bg-primary" />
              <span className="text-[10px] font-bold uppercase tracking-[0.35em] text-primary">Technical Library</span>
            </div>
            <h1 className="max-w-4xl text-6xl font-black uppercase italic leading-[0.88] tracking-tight text-[#121212] md:text-8xl lg:text-9xl">
              Cinema <span className="text-zinc-200">Resources</span>
            </h1>
            <p className="mt-8 max-w-2xl text-base font-light leading-relaxed text-zinc-500 md:text-lg">
              Practical cinema resources, production templates, and technical breakdowns organized for quick study between drafts, shoots, and edits.
            </p>
          </div>
        </div>
      </section>

      {/* <section className="relative overflow-hidden bg-[#FAFAFA] px-6 py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:items-stretch">
          <button
            type="button"
            onClick={() => router.push(`/articles/${FEATURED_RESOURCE.id}`)}
            className="group grid overflow-hidden border border-zinc-100 bg-white text-left shadow-2xl lg:grid-cols-[1.1fr_0.9fr]"
          >
            <div className="relative min-h-[320px] overflow-hidden">
              <img
                src={FEATURED_RESOURCE.image}
                alt={FEATURED_RESOURCE.title}
                className="h-full w-full object-cover grayscale transition duration-1000 group-hover:scale-105 group-hover:grayscale-0"
              />
              <div className="absolute left-6 top-6">
                <Badge className="border-none bg-white/95 text-primary shadow-sm backdrop-blur">Editor&apos;s Choice</Badge>
              </div>
            </div>

            <div className="flex flex-col justify-center p-8 md:p-12">
              <div className="flex items-center gap-4">
                <span className="text-[10px] font-bold uppercase tracking-[0.35em] text-primary">{FEATURED_RESOURCE.type}</span>
                <span className="bg-primary/10 text-primary text-[8px] font-black uppercase tracking-widest px-3 py-1">Member Exclusive</span>
              </div>
              <h2 className="mt-5 text-3xl font-black uppercase italic leading-tight tracking-tight text-[#121212] md:text-5xl">
                {FEATURED_RESOURCE.title}
              </h2>
              <p className="mt-6 text-sm font-light leading-relaxed text-zinc-500 md:text-base">{FEATURED_RESOURCE.description}</p>

              <div className="mt-8 grid grid-cols-2 gap-3 border-y border-zinc-100 py-6">
                {[...FEATURED_STATS, FEATURED_RESOURCE.level, FEATURED_RESOURCE.readTime].map((stat) => (
                  <div key={stat} className="flex items-center gap-3">
                    <span className="h-1.5 w-1.5 bg-primary" />
                    <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-500">{stat}</span>
                  </div>
                ))}
              </div>

              <span className="mt-8 inline-flex items-center text-[10px] font-black uppercase tracking-[0.3em] text-[#121212] group-hover:text-primary">
                Unlock Featured File <span className="ml-3">-&gt;</span>
              </span>
            </div>
          </button>

          <div className="border border-zinc-100 bg-white p-8 shadow-sm">
            <Badge variant="secondary" className="mb-6 rounded-none">Study Collections</Badge>
            <div className="space-y-6">
              {COLLECTIONS.map((collection) => (
                <div key={collection.title} className="border-t border-zinc-100 pt-6 first:border-t-0 first:pt-0">
                  <div className="flex items-start justify-between gap-6">
                    <h3 className="text-lg font-black uppercase italic tracking-tight text-[#121212]">{collection.title}</h3>
                    <span className="shrink-0 text-[9px] font-bold uppercase tracking-widest text-primary">{collection.count}</span>
                  </div>
                  <p className="mt-3 text-sm font-medium leading-relaxed text-zinc-500">{collection.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section> */}

      <section className="border-t border-zinc-100 bg-white px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-primary">Resource Browser</p>
              <h2 className="mt-3 text-4xl font-black uppercase italic tracking-tight text-[#121212] md:text-6xl">Find the right file</h2>
            </div>

            <div className="grid gap-3 sm:grid-cols-[minmax(220px,320px)_160px]">
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search title, topic, level"
                className="h-12 border border-zinc-200 bg-white px-4 text-sm font-medium text-[#121212] outline-none placeholder:text-zinc-300 focus:border-primary"
              />
              <select
                value={sortMode}
                onChange={(event) => setSortMode(event.target.value)}
                className="h-12 border border-zinc-200 bg-white px-4 text-[10px] font-bold uppercase tracking-widest text-zinc-500 outline-none focus:border-primary"
              >
                <option>Newest</option>
                <option>Title</option>
                <option>Level</option>
              </select>
            </div>
          </div>

          <div className="mb-12 flex flex-wrap gap-3">
            {CATEGORIES.map((category) => (
              <button
                type="button"
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`border px-5 py-3 text-[9px] font-bold uppercase tracking-[0.25em] transition-all ${
                  activeCategory === category
                    ? 'border-[#121212] bg-[#121212] text-white'
                    : 'border-zinc-100 bg-white text-zinc-400 hover:border-primary hover:text-primary'
                }`}
              >
                {category} <span className="ml-2 opacity-60">{categoryCounts[category]}</span>
              </button>
            ))}
          </div>

          <div className="mb-6 flex items-center justify-between border-y border-zinc-100 py-4">
            <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-zinc-400">
              Showing {filteredItems.length} of {LIBRARY_ITEMS.length} files
            </span>
            <span className="hidden text-[9px] font-bold uppercase tracking-[0.3em] text-zinc-300 sm:block">FILMBRIDGE_COLLECTION</span>
          </div>

          {filteredItems.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="group flex h-full flex-col overflow-hidden border border-zinc-100 bg-white text-left shadow-sm hover:border-primary hover:shadow-xl relative cursor-pointer"
                  onClick={() => router.push(`/articles/${item.id}`)}
                >
                  <div className="relative aspect-[16/10] overflow-hidden border-b border-zinc-100">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-cover grayscale transition duration-1000 group-hover:scale-105 group-hover:grayscale-0"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-70" />
                    
                    {/* Save Button */}
                    {user && (
                      <button 
                        onClick={(e) => { e.stopPropagation(); toggleSaveArticle(item.id); }}
                        className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur-md p-2 shadow-lg hover:bg-white transition-colors"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill={user.savedArticles?.includes(item.id) ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={user.savedArticles?.includes(item.id) ? "text-primary" : "text-[#121212]"}><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
                      </button>
                    )}

                    <div className="absolute top-4 right-4">
                      {item.isPremium && (
                        <div className="bg-primary/95 backdrop-blur-md p-2 shadow-lg">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                        </div>
                      )}
                    </div>
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3">
                      <Badge variant="secondary" className="rounded-none border-none bg-white/95 text-zinc-900 shadow-sm backdrop-blur">
                        {item.category}
                      </Badge>
                      <span className="bg-[#121212]/80 px-3 py-1 text-[9px] font-bold uppercase tracking-widest text-white backdrop-blur">
                        {item.readTime}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col p-7">
                    <div className="mb-5 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <span className="text-[9px] font-bold uppercase tracking-[0.35em] text-primary">{item.type}</span>
                        {item.isPremium && (
                          <span className="text-[8px] font-black uppercase tracking-[0.2em] bg-zinc-100 px-2 py-0.5 text-zinc-400">Premium</span>
                        )}
                      </div>
                      <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-zinc-300">{item.level}</span>
                    </div>
                    <h3 className="text-xl font-black uppercase leading-tight tracking-tight text-[#121212] transition-colors group-hover:text-primary">
                      {item.title}
                    </h3>
                    <p className="mt-4 line-clamp-3 text-sm font-medium leading-relaxed text-zinc-500">{item.description}</p>
                    <div className="mt-auto flex items-center justify-between border-t border-zinc-100 pt-6">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#121212]">
                        {item.type === 'Asset' ? 'Download Asset' : (item.isPremium ? 'Unlock File' : 'Enter File')}
                      </span>
                      <span className="text-sm font-black text-primary transition-transform group-hover:translate-x-1">-&gt;</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="border border-zinc-100 bg-[#FAFAFA] px-6 py-16 text-center">
              <Badge variant="outline" className="mb-5 rounded-none">No Matches</Badge>
              <h3 className="text-2xl font-black uppercase italic tracking-tight text-[#121212]">No resources found</h3>
              <p className="mx-auto mt-4 max-w-md text-sm font-medium leading-relaxed text-zinc-500">
                Try a broader search term or switch back to the full collection.
              </p>
              <Button
                variant="outline"
                className="mt-8 rounded-none"
                onClick={() => {
                  setQuery('');
                  setActiveCategory('All Archives');
                }}
              >
                Reset Browser
              </Button>
            </div>
          )}
        </div>
      </section>

      <section className="relative overflow-hidden border-y border-zinc-100 bg-[#121212] px-6 py-24 text-white">
        <div className="absolute inset-0 bg-grid-dark opacity-25 pointer-events-none" />
        <div className="relative z-10 mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <Badge className="mb-6 border-white/10 bg-white/10 text-white">Support & Intake</Badge>
            <h2 className="text-4xl font-black uppercase italic leading-tight tracking-tight md:text-6xl">
              Need a specific breakdown?
            </h2>
          </div>
          <div>
            <p className="max-w-2xl text-lg font-light leading-relaxed text-zinc-300">
              Request a topic for the next publication cycle, from camera tests and script coverage to distribution workflows and post-production delivery.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Button size="lg" className="rounded-none px-12" onClick={() => router.push('/contact')}>
                Submit Request
              </Button>
              <Button
                variant="secondary"
                size="lg"
                className="rounded-none border-white/20 bg-white text-[#121212] hover:bg-zinc-100"
                onClick={() => router.push('/auth')}
              >
                Join Library
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
