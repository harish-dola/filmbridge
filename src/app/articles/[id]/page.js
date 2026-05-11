'use client';

import React, { use } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';
import { ARTICLES_DATA } from '@/data/articles';
import { useAuth } from '@/context/AuthContext';

export default function ArticleDetailPage({ params }) {
  const resolvedParams = use(params);
  const id = resolvedParams?.id;
  const { user, isInitialized, toggleSaveArticle } = useAuth();
  
  const data = ARTICLES_DATA[id] || ARTICLES_DATA["the-editors-rhythm"];
  const isLocked = data.isPremium && !user;
  const isSaved = user?.savedArticles?.includes(id);
  
  const specEntries = data.specs ? Object.entries(data.specs) : [];
  const relatedArticles = Object.entries(ARTICLES_DATA)
    .filter(([articleId]) => articleId !== id)
    .slice(0, 3);
  const articleSlugLabel = id?.replace(/-/g, ' ') || data.category;

  return (
    <div className="min-h-screen bg-white text-[#121212] selection:bg-primary selection:text-white">
      <Navbar />

      <header className="relative overflow-hidden border-b border-zinc-100 bg-white px-6 pt-32 md:pt-40">
        <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.40),#ffffff_82%)] pointer-events-none" />

        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="grid min-h-[78vh] gap-10 lg:grid-cols-[minmax(0,0.92fr)_minmax(420px,1.08fr)] lg:items-end">
            <div className="pb-12 lg:pb-20">
              <Link href="/library" className="mb-10 inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.28em] text-zinc-400 hover:text-primary">
                <span className="h-px w-8 bg-current" />
                Library
              </Link>

              <div className="mb-8 flex flex-wrap items-center gap-3">
                <Badge variant="primary" className="rounded-none bg-primary px-4 py-2 text-white">{data.category}</Badge>
                {data.isPremium && (
                  <Badge variant="secondary" className="rounded-none border-primary/20 bg-primary/5 text-primary">Member Exclusive</Badge>
                )}
                <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-zinc-400">{data.date}</span>
                <span className="h-px w-8 bg-zinc-200" />
                <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-zinc-400">{data.readTime}</span>
              </div>

              <h1 className="max-w-4xl text-5xl font-black uppercase leading-[0.9] tracking-tight text-[#121212] md:text-7xl lg:text-8xl">
                {data.title}
              </h1>

              <p className="mt-8 max-w-2xl text-lg font-light leading-8 text-zinc-500 md:text-2xl md:leading-9">
                {data.subtitle}
              </p>

              <div className="mt-12 grid max-w-xl grid-cols-[auto_1fr] gap-5 border-y border-zinc-100 py-6">
                <div className="flex h-14 w-14 items-center justify-center bg-[#121212] text-sm font-black text-white">
                  {data.author.split(' ').map(name => name[0]).join('').slice(0, 2)}
                </div>
                <div className="grid gap-1">
                  <p className="text-sm font-black uppercase tracking-tight text-[#121212]">{data.author}</p>
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-zinc-400">{data.role}</p>
                </div>
              </div>
            </div>

            <div className="relative -mx-6 lg:mx-0">
              <div className="relative aspect-[4/5] overflow-hidden border border-zinc-100 bg-zinc-100 md:aspect-[16/10] lg:aspect-[5/6]">
                <img src={data.image} alt={data.title} className="h-full w-full object-cover grayscale contrast-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 grid gap-4 border-t border-white/15 bg-[#121212]/82 p-6 text-white backdrop-blur-md sm:grid-cols-3">
                  {specEntries.map(([key, val]) => (
                    <div key={key}>
                      <span className="block text-[10px] font-bold uppercase tracking-[0.24em] text-white/35">{key}</span>
                      <p className="mt-2 text-sm font-semibold leading-snug">{val}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="sticky top-[73px] z-40 border-b border-zinc-100 bg-white/90 px-6 py-4 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3 text-[10px] font-bold uppercase tracking-[0.24em] text-zinc-400">
            <span className="text-[#121212]">Article</span>
            <span>/</span>
            <span>{data.category}</span>
            <span>/</span>
            <span className="max-w-[180px] truncate sm:max-w-none">{articleSlugLabel}</span>
          </div>
          <div className="flex items-center gap-3">
            {user && (
              <button 
                onClick={() => toggleSaveArticle(id)}
                className={`flex h-9 items-center justify-center border px-4 text-[10px] font-bold uppercase tracking-widest transition-all ${isSaved ? 'bg-[#121212] text-white border-[#121212]' : 'bg-white text-zinc-500 border-zinc-200 hover:border-primary hover:text-primary'}`}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill={isSaved ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
                {isSaved ? 'Saved to Archive' : 'Save File'}
              </button>
            )}
            {['TW', 'IG', 'LI'].map(s => (
              <button key={s} className="flex h-9 w-9 items-center justify-center border border-zinc-200 bg-white text-[10px] font-bold text-zinc-500 hover:border-primary hover:text-primary">
                {s}
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-14 lg:grid-cols-[240px_minmax(0,1fr)_300px] lg:py-24">
        <aside className="hidden lg:block">
          <div className="sticky top-36 space-y-8">
            <div>
              <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.28em] text-zinc-400">Index</p>
              <nav className="border-l border-zinc-100 text-sm font-semibold text-zinc-400">
                <a href="#" className="block border-l-2 border-primary py-2 pl-4 text-primary">Opening Frame</a>
                {data.content
                  .filter(block => block.type === 'heading')
                  .map(block => (
                    <a key={block.text} href="#" className="block py-2 pl-4 hover:text-[#121212]">{block.text}</a>
                  ))}
                <a href="#" className="block py-2 pl-4 hover:text-[#121212]">Related reading</a>
              </nav>
            </div>

            <div className="border border-zinc-100 bg-[#fafafa] p-6">
              <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.28em] text-zinc-400">Production Notes</p>
              <div className="space-y-5">
                {specEntries.map(([key, val]) => (
                  <div key={key}>
                    <span className="block text-[11px] font-bold uppercase tracking-widest text-zinc-400">{key}</span>
                    <p className="mt-1 text-sm font-semibold text-[#121212]">{val}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </aside>

        <main>
          <article className="mx-auto max-w-3xl">
            <div className="mb-12 border border-zinc-100 bg-white p-5 md:p-6">
              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <span className="block text-[10px] font-bold uppercase tracking-[0.28em] text-zinc-400">Author</span>
                  <p className="mt-2 text-sm font-semibold text-[#121212]">{data.author}</p>
                </div>
                <div>
                  <span className="block text-[10px] font-bold uppercase tracking-[0.28em] text-zinc-400">Published</span>
                  <p className="mt-2 text-sm font-semibold text-[#121212]">{data.date}</p>
                </div>
                <div>
                  <span className="block text-[10px] font-bold uppercase tracking-[0.28em] text-zinc-400">Read Time</span>
                  <p className="mt-2 text-sm font-semibold text-[#121212]">{data.readTime}</p>
                </div>
              </div>
            </div>

            <div className="space-y-10 relative">
              {data.content.map((block, index) => {
                const isBlurred = isLocked && index > 0;
                if (block.type === 'paragraph') {
                  return <p key={index} className={`text-lg leading-8 text-zinc-600 first:border-l-4 first:border-primary first:pl-6 first:text-2xl first:font-light first:leading-10 first:text-[#121212] ${isBlurred ? 'blur-sm select-none opacity-40' : ''}`}>{block.text}</p>;
                }
                if (block.type === 'heading') {
                  return <h2 key={index} className={`pt-8 text-3xl font-black uppercase leading-tight tracking-tight text-[#121212] md:text-5xl ${isBlurred ? 'blur-sm select-none opacity-40' : ''}`}>{block.text}</h2>;
                }
                if (block.type === 'quote') {
                  return (
                    <blockquote key={index} className={`my-14 border-l-4 border-primary bg-[#121212] px-8 py-10 text-white md:px-12 ${isBlurred ? 'blur-sm select-none opacity-20' : ''}`}>
                      <p className="text-2xl font-semibold leading-tight tracking-tight md:text-4xl">
                        &ldquo;{block.text}&rdquo;
                      </p>
                    </blockquote>
                  );
                }
                return null;
              })}

              {isLocked && (
                <div className="relative mt-20 overflow-hidden border border-zinc-100 bg-[#FAFAFA] p-10 md:p-16">
                  <div className="absolute inset-0 bg-grid opacity-40" />
                  <div className="relative z-10 text-center">
                    <div className="mx-auto mb-8 flex h-16 w-16 items-center justify-center bg-white border border-zinc-100 shadow-sm">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                    </div>
                    <Badge variant="primary" className="mb-6 rounded-none">{data.type === 'Asset' ? 'Download Asset' : 'Unlock Full Archive'}</Badge>
                    <h3 className="text-3xl font-black uppercase italic leading-tight tracking-tight text-[#121212] md:text-5xl">
                      {data.type === 'Asset' ? 'Template restricted' : 'The study continues'} <br />
                      <span className="text-primary not-italic">{data.type === 'Asset' ? 'Join to File.' : 'Inside.'}</span>
                    </h3>
                    <p className="mx-auto mt-6 max-w-lg text-base font-medium leading-relaxed text-zinc-500">
                      {data.type === 'Asset' 
                        ? 'This production template is part of the FilmBridge premium asset library.' 
                        : 'This technical breakdown is part of the FilmBridge premium archive.'}
                      Unlock all articles, templates, and production manuals.
                    </p>
                    <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                      <Link href="/auth?mode=signup">
                        <Button className="rounded-none px-10 py-5 text-[10px] uppercase tracking-[0.3em] shadow-xl hover:shadow-primary/20">Create Account</Button>
                      </Link>
                      <Link href="/auth">
                        <Button variant="secondary" className="rounded-none px-10 py-5 text-[10px] uppercase tracking-[0.3em] border-zinc-200 bg-white">Member Login</Button>
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-16 border border-zinc-100 bg-[#fafafa] p-6 md:p-8">
              <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-zinc-400">Key technical context</p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {specEntries.map(([key, val]) => (
                  <div key={key} className="border border-zinc-100 bg-white p-5">
                    <span className="block text-[11px] font-bold uppercase tracking-widest text-zinc-400">{key}</span>
                    <p className="mt-2 text-sm font-semibold text-[#121212]">{val}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-14 flex flex-col gap-4 border-t border-zinc-200 pt-8 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm font-medium text-zinc-500">Continue exploring FilmBridge articles and resources.</p>
              <Link href="/library">
                <Button variant="outline" className="rounded-none border-zinc-300 bg-white px-8">
                  Return to Library
                </Button>
              </Link>
            </div>
          </article>
        </main>

        <aside className="lg:pt-2">
          <div className="sticky top-36 border border-zinc-100 bg-white p-6">
            <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.28em] text-zinc-400">Related</p>
            <div className="space-y-5">
              {relatedArticles.map(([articleId, article]) => (
                <Link key={articleId} href={`/articles/${articleId}`} className="group block">
                  <div className="overflow-hidden border border-zinc-100 bg-zinc-100">
                    <img src={article.image} alt={article.title} className="aspect-[16/10] w-full object-cover grayscale group-hover:scale-105 group-hover:grayscale-0" />
                  </div>
                  <Badge variant="secondary" className="mt-4 rounded-none">{article.category}</Badge>
                  <h3 className="mt-3 text-base font-black uppercase leading-snug tracking-tight text-[#121212] group-hover:text-primary">
                    {article.title}
                  </h3>
                  <p className="mt-2 text-xs font-medium text-zinc-500">{article.readTime}</p>
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </div>

      <Footer />
    </div>
  );
}
