'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';
import { ARTICLES_DATA } from '@/data/articles';
import { useAuth } from '@/context/AuthContext';

// Initial Mock Data from Centralized Store
const INITIAL_ARTICLES = Object.values(ARTICLES_DATA).map(item => ({
  id: item.id,
  title: item.title.split(':')[0], // Simplify title for list
  author: item.author,
  category: item.category,
  date: item.date,
  isPremium: item.isPremium,
}));

export default function AdminPage() {
  const router = useRouter();
  const { user, isInitialized } = useAuth();
  const [view, setView] = useState('list'); // 'list', 'create', or 'preview'
  const [articles, setArticles] = useState(INITIAL_ARTICLES);
  
  useEffect(() => {
    if (isInitialized && !user?.isAdmin) {
      router.push('/');
    }
  }, [user, isInitialized, router]);

  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    author: '',
    role: '',
    category: 'Production',
    readTime: '',
    image: '',
    isPremium: false,
    specs: { key1: 'Software', val1: '', key2: 'Resolution', val2: '' },
    content: [{ type: 'paragraph', text: '' }]
  });

  const resetForm = () => {
    setFormData({
      title: '',
      subtitle: '',
      author: '',
      role: '',
      category: 'Production',
      readTime: '',
      image: '',
      isPremium: false,
      specs: { key1: 'Software', val1: '', key2: 'Resolution', val2: '' },
      content: [{ type: 'paragraph', text: '' }]
    });
    setEditingId(null);
  };

  const handleAddContentBlock = (type) => {
    setFormData({
      ...formData,
      content: [...formData.content, { type, text: '' }]
    });
  };

  const handleContentChange = (index, value) => {
    const newContent = [...formData.content];
    newContent[index].text = value;
    setFormData({ ...formData, content: newContent });
  };

  const handleRemoveContentBlock = (index) => {
    const newContent = [...formData.content];
    newContent.splice(index, 1);
    setFormData({ ...formData, content: newContent });
  };

  const handleEdit = (id) => {
    const articleToEdit = ARTICLES_DATA[id];
    if (articleToEdit) {
      setFormData({
        title: articleToEdit.title,
        subtitle: articleToEdit.subtitle,
        author: articleToEdit.author,
        role: articleToEdit.role,
        category: articleToEdit.category,
        readTime: articleToEdit.readTime,
        image: articleToEdit.image,
        isPremium: articleToEdit.isPremium,
        specs: {
          key1: Object.keys(articleToEdit.specs)[0] || 'Software',
          val1: Object.values(articleToEdit.specs)[0] || '',
          key2: Object.keys(articleToEdit.specs)[1] || 'Resolution',
          val2: Object.values(articleToEdit.specs)[1] || ''
        },
        content: articleToEdit.content
      });
      setEditingId(id);
      setView('create');
    }
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this article?')) {
      setArticles(articles.filter(a => a.id !== id));
      // In a real app, delete from ARTICLES_DATA/API too
    }
  };

  const handlePublish = (e) => {
    if (e) e.preventDefault();
    const articleId = editingId || formData.title.toLowerCase().replace(/\s+/g, '-');
    
    const articleObj = {
      id: articleId,
      title: formData.title,
      author: formData.author,
      category: formData.category,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      isPremium: formData.isPremium,
    };

    if (editingId) {
      setArticles(articles.map(a => a.id === editingId ? articleObj : a));
      alert('Article Updated Successfully');
    } else {
      setArticles([articleObj, ...articles]);
      alert('Article Published Successfully');
    }
    
    resetForm();
    setView('list');
  };

  return (
    <div className="min-h-screen bg-white text-[#121212] selection:bg-primary selection:text-white">
      <Navbar />
      
      <main className={`pt-32 pb-20 px-6 ${view === 'preview' ? 'bg-[#FAFAFA]' : ''}`}>
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          {view !== 'preview' && (
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <span className="h-px w-12 bg-primary" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.35em] text-primary">Admin Control</span>
                </div>
                <h1 className="text-5xl md:text-7xl font-black uppercase italic leading-none tracking-tighter">
                  {editingId ? 'Edit' : 'Content'} <span className="text-zinc-200">{editingId ? 'Article' : 'Manager'}</span>
                </h1>
              </div>
              
              <div className="flex gap-4">
                {view === 'list' ? (
                  <Button className="rounded-none px-8 py-4 uppercase text-xs tracking-widest" onClick={() => { resetForm(); setView('create'); }}>
                    Create Article
                  </Button>
                ) : (
                  <>
                    <Button variant="secondary" className="rounded-none px-8 py-4 uppercase text-xs tracking-widest border-zinc-200" onClick={() => setView('preview')}>
                      Preview Mode
                    </Button>
                    <Button variant="secondary" className="rounded-none px-8 py-4 uppercase text-xs tracking-widest border-zinc-200" onClick={() => { resetForm(); setView('list'); }}>
                      Cancel
                    </Button>
                  </>
                )}
              </div>
            </div>
          )}

          {view === 'list' ? (
            <div className="border border-zinc-100 bg-[#FAFAFA] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-zinc-100 bg-white">
                      <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Article</th>
                      <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Category</th>
                      <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Status</th>
                      <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100">
                    {articles.map((article) => (
                      <tr key={article.id} className="hover:bg-white transition-colors group">
                        <td className="px-8 py-6">
                          <div className="flex flex-col">
                            <span className="text-sm font-black uppercase tracking-tight text-[#121212] group-hover:text-primary transition-colors">{article.title}</span>
                            <span className="text-[10px] font-medium text-zinc-400 uppercase tracking-widest mt-1">By {article.author} • {article.date}</span>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <Badge variant="secondary" className="rounded-none border-zinc-100 bg-zinc-50 text-[9px]">{article.category}</Badge>
                        </td>
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-2">
                            <span className={`w-1.5 h-1.5 rounded-full ${article.isPremium ? 'bg-primary' : 'bg-green-500'}`} />
                            <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                              {article.isPremium ? 'Premium' : 'Free'}
                            </span>
                          </div>
                        </td>
                        <td className="px-8 py-6 text-right">
                          <button onClick={() => handleEdit(article.id)} className="text-[10px] font-black uppercase tracking-widest text-zinc-300 hover:text-[#121212] transition-colors">Edit</button>
                          <span className="mx-3 text-zinc-100">|</span>
                          <button onClick={() => handleDelete(article.id)} className="text-[10px] font-black uppercase tracking-widest text-zinc-300 hover:text-red-500 transition-colors">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : view === 'create' ? (
            <form className="grid lg:grid-cols-[1.2fr_0.8fr] gap-12" onSubmit={handlePublish}>
              {/* Primary Content Editor */}
              <div className="space-y-12">
                <section>
                  <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-primary mb-6">Core Information</p>
                  <div className="space-y-6">
                    <Input 
                      label="Article Title" 
                      placeholder="e.g., The Cinematographer's Eye" 
                      className="rounded-none border-zinc-100 bg-[#FAFAFA] py-4 focus:border-primary text-xl font-black uppercase italic"
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      required
                    />
                    <Input 
                      label="Subtitle" 
                      placeholder="Short teaser description..." 
                      className="rounded-none border-zinc-100 bg-[#FAFAFA] py-4 focus:border-primary"
                      value={formData.subtitle}
                      onChange={(e) => setFormData({...formData, subtitle: e.target.value})}
                    />
                    <div className="grid grid-cols-2 gap-6">
                      <Input label="Author Name" placeholder="Full name" className="rounded-none border-zinc-100 bg-[#FAFAFA]" value={formData.author} onChange={(e) => setFormData({...formData, author: e.target.value})} required />
                      <Input label="Author Role" placeholder="e.g., Director" className="rounded-none border-zinc-100 bg-[#FAFAFA]" value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})} />
                    </div>
                  </div>
                </section>

                <section>
                  <div className="flex items-center justify-between mb-6">
                    <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-primary">Content Blocks</p>
                    <div className="flex gap-2">
                      <button type="button" onClick={() => handleAddContentBlock('paragraph')} className="px-3 py-1 bg-zinc-50 border border-zinc-100 text-[9px] font-black uppercase tracking-widest hover:border-primary transition-colors">Add Paragraph</button>
                      <button type="button" onClick={() => handleAddContentBlock('heading')} className="px-3 py-1 bg-zinc-50 border border-zinc-100 text-[9px] font-black uppercase tracking-widest hover:border-primary transition-colors">Add Heading</button>
                      <button type="button" onClick={() => handleAddContentBlock('quote')} className="px-3 py-1 bg-zinc-50 border border-zinc-100 text-[9px] font-black uppercase tracking-widest hover:border-primary transition-colors">Add Quote</button>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    {formData.content.map((block, i) => (
                      <div key={i} className="relative group border border-zinc-100 bg-white p-6">
                        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button type="button" onClick={() => handleRemoveContentBlock(i)} className="text-[9px] font-bold text-red-400 hover:text-red-500">REMOVE</button>
                        </div>
                        <span className="block text-[8px] font-black uppercase tracking-[0.3em] text-zinc-300 mb-4">{block.type} BLOCK</span>
                        <textarea 
                          className="w-full bg-[#fafafa] border border-zinc-50 p-4 text-sm outline-none focus:border-primary/30 transition-colors min-h-[120px] font-medium leading-relaxed"
                          value={block.text}
                          onChange={(e) => handleContentChange(i, e.target.value)}
                          placeholder={`Enter ${block.type} content...`}
                        />
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              {/* Sidebar Metadata */}
              <div className="space-y-12">
                <section className="border border-zinc-100 bg-[#FAFAFA] p-8">
                  <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-primary mb-8">Metadata & Specs</p>
                  
                  <div className="space-y-8">
                    <div>
                      <label className="text-[10px] font-black uppercase tracking-widest text-[#121212] block mb-3">Access Level</label>
                      <div className="grid grid-cols-2 gap-2">
                        <button type="button" onClick={() => setFormData({...formData, isPremium: false})} className={`py-3 text-[10px] font-black uppercase tracking-widest border transition-all ${!formData.isPremium ? 'bg-[#121212] text-white border-[#121212]' : 'bg-white text-zinc-400 border-zinc-100'}`}>Free</button>
                        <button type="button" onClick={() => setFormData({...formData, isPremium: true})} className={`py-3 text-[10px] font-black uppercase tracking-widest border transition-all ${formData.isPremium ? 'bg-primary text-white border-primary' : 'bg-white text-zinc-400 border-zinc-100'}`}>Premium</button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <Input label="Category" placeholder="e.g. Technical" className="rounded-none" value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} />
                      <Input label="Read Time" placeholder="e.g. 12 min" className="rounded-none" value={formData.readTime} onChange={(e) => setFormData({...formData, readTime: e.target.value})} />
                    </div>

                    <Input label="Hero Image URL" placeholder="https://..." className="rounded-none" value={formData.image} onChange={(e) => setFormData({...formData, image: e.target.value})} />

                    <div>
                      <label className="text-[10px] font-black uppercase tracking-widest text-[#121212] block mb-4">Technical Specs</label>
                      <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-2">
                          <input placeholder="Key" className="bg-white border border-zinc-100 px-3 py-2 text-[10px] outline-none focus:border-primary" value={formData.specs.key1} onChange={(e) => setFormData({...formData, specs: {...formData.specs, key1: e.target.value}})} />
                          <input placeholder="Value" className="bg-white border border-zinc-100 px-3 py-2 text-[10px] outline-none focus:border-primary" value={formData.specs.val1} onChange={(e) => setFormData({...formData, specs: {...formData.specs, val1: e.target.value}})} />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <input placeholder="Key" className="bg-white border border-zinc-100 px-3 py-2 text-[10px] outline-none focus:border-primary" value={formData.specs.key2} onChange={(e) => setFormData({...formData, specs: {...formData.specs, key2: e.target.value}})} />
                          <input placeholder="Value" className="bg-white border border-zinc-100 px-3 py-2 text-[10px] outline-none focus:border-primary" value={formData.specs.val2} onChange={(e) => setFormData({...formData, specs: {...formData.specs, val2: e.target.value}})} />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-12 space-y-4">
                    <Button type="submit" className="w-full py-5 rounded-none uppercase text-xs tracking-[0.3em] shadow-xl hover:shadow-primary/20">
                      Publish Article
                    </Button>
                    <p className="text-center text-[8px] font-bold uppercase tracking-[0.3em] text-zinc-300">
                      Visible in Library immediately after publishing
                    </p>
                  </div>
                </section>
                
                <section className="border border-zinc-100 bg-white p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <p className="text-[10px] font-black uppercase tracking-widest text-[#121212]">Status: Ready to File</p>
                  </div>
                  <p className="text-xs font-medium leading-relaxed text-zinc-400 italic">
                    All articles are indexed in the FilmBridge Archive under standard protocols.
                  </p>
                </section>
              </div>
            </form>
          ) : (
            /* PREVIEW VIEW */
            <div className="relative animate-in fade-in duration-700">
              <div className="fixed top-24 right-10 z-[60] flex gap-4">
                <Button variant="secondary" className="rounded-none bg-white/90 backdrop-blur shadow-xl border-zinc-200 uppercase text-[10px] tracking-widest px-8" onClick={() => setView('create')}>
                  Back to Editor
                </Button>
                <Button className="rounded-none shadow-xl uppercase text-[10px] tracking-widest px-8" onClick={() => handlePublish()}>
                  Publish Now
                </Button>
              </div>

              {/* Simplified Article Detail Mockup */}
              <div className="bg-white border border-zinc-200 shadow-2xl overflow-hidden">
                <header className="relative overflow-hidden border-b border-zinc-100 bg-white px-8 pt-20 pb-16">
                  <div className="absolute inset-0 bg-grid opacity-20" />
                  <div className="relative z-10 max-w-4xl mx-auto text-center">
                    <div className="mb-8 flex flex-wrap items-center justify-center gap-3">
                      <Badge variant="primary" className="rounded-none bg-primary px-4 py-2 text-white">{formData.category}</Badge>
                      {formData.isPremium && (
                        <Badge variant="secondary" className="rounded-none border-primary/20 bg-primary/5 text-primary">Member Exclusive</Badge>
                      )}
                      <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-zinc-400">MAY 10, 2026</span>
                      <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-zinc-400">• {formData.readTime || '5 min read'}</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black uppercase leading-[0.9] tracking-tight text-[#121212]">
                      {formData.title || "Untitled Article"}
                    </h1>
                    <p className="mt-8 text-lg font-light leading-relaxed text-zinc-500">
                      {formData.subtitle || "Article subtitle will appear here."}
                    </p>
                  </div>
                </header>

                <div className="max-w-4xl mx-auto px-8 py-16 grid lg:grid-cols-[1fr_300px] gap-16">
                  <div className="space-y-10">
                    {formData.content.map((block, i) => {
                      if (block.type === 'paragraph') return <p key={i} className="text-lg leading-8 text-zinc-600">{block.text || "Paragraph content..."}</p>;
                      if (block.type === 'heading') return <h2 key={i} className="pt-8 text-3xl font-black uppercase leading-tight tracking-tight text-[#121212]">{block.text || "Section Heading"}</h2>;
                      if (block.type === 'quote') return (
                        <blockquote key={i} className="my-10 border-l-4 border-primary bg-[#121212] px-8 py-10 text-white">
                          <p className="text-2xl font-semibold leading-tight tracking-tight">&ldquo;{block.text || "Inspirational quote..."}&rdquo;</p>
                        </blockquote>
                      );
                      return null;
                    })}

                    {formData.isPremium && (
                      <div className="relative mt-20 overflow-hidden border border-zinc-100 bg-[#FAFAFA] p-10 md:p-16">
                        <div className="absolute inset-0 bg-grid opacity-40" />
                        <div className="relative z-10 text-center">
                          <div className="mx-auto mb-8 flex h-16 w-16 items-center justify-center bg-white border border-zinc-100 shadow-sm">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                          </div>
                          <Badge variant="primary" className="mb-6 rounded-none">Unlock Full Library</Badge>
                          <h3 className="text-3xl font-black uppercase italic leading-tight tracking-tight text-[#121212] md:text-5xl">
                            The study continues <br />
                            <span className="text-primary not-italic">Inside.</span>
                          </h3>
                          <p className="mx-auto mt-6 max-w-lg text-base font-medium leading-relaxed text-zinc-500">
                            This technical breakdown is part of the FilmBridge premium library. 
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  <aside>
                    <div className="sticky top-32 border border-zinc-100 bg-[#FAFAFA] p-8">
                      <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-zinc-400 mb-6">Technical Context</p>
                      <div className="space-y-6">
                        <div>
                          <span className="block text-[10px] font-black uppercase tracking-widest text-[#121212] mb-1">{formData.specs.key1 || "Spec 1"}</span>
                          <p className="text-sm font-medium text-zinc-500">{formData.specs.val1 || "N/A"}</p>
                        </div>
                        <div>
                          <span className="block text-[10px] font-black uppercase tracking-widest text-[#121212] mb-1">{formData.specs.key2 || "Spec 2"}</span>
                          <p className="text-sm font-medium text-zinc-500">{formData.specs.val2 || "N/A"}</p>
                        </div>
                      </div>
                    </div>
                  </aside>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
