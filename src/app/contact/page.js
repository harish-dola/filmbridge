'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white text-[#121212] selection:bg-primary selection:text-white flex flex-col relative overflow-hidden">
      <Navbar />
      
      <main className="flex-grow flex flex-col items-center justify-center p-6 pt-40 relative">
        {/* Background Visuals - Consistent with Studio Aesthetic */}
        <div className="absolute inset-0 bg-grid opacity-100 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_white_100%)] opacity-80 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--color-primary)_0%,_transparent_100%)] opacity-[0.05] pointer-events-none" />

        <div className="relative z-10 w-full max-w-5xl flex flex-col lg:flex-row items-stretch bg-white border border-zinc-100 shadow-2xl overflow-hidden">
          {/* Left Side: Contact Info */}
          <div className="lg:w-2/5 p-12 lg:p-16 bg-[#fafafa] border-r border-zinc-100 flex flex-col justify-between">
            <div>
              <Badge variant="primary" className="mb-8">Contact Us</Badge>
              <h1 className="text-5xl font-black uppercase tracking-tighter italic leading-none mb-10 text-[#121212]">
                Let's <br /> <span className="text-primary">Connect</span>
              </h1>
              <p className="text-zinc-500 text-lg font-light leading-relaxed mb-12">
                Have a technical question or want to collaborate with our lab? Reach out to our professional network.
              </p>
              
              <div className="space-y-8">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-400 block mb-2">Email</span>
                  <p className="text-sm font-black uppercase italic text-[#121212]">hello@filmbridge.com</p>
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-400 block mb-2">Studio</span>
                  <p className="text-sm font-black uppercase italic text-[#121212]">Hyderabad, IN</p>
                </div>
              </div>
            </div>

            <div className="pt-12 border-t border-zinc-200">
              <div className="flex gap-4">
                {['TW', 'IG', 'YT', 'LI'].map((social) => (
                  <a key={social} href="#" className="w-10 h-10 border border-zinc-200 flex items-center justify-center text-[10px] font-bold hover:bg-[#121212] hover:text-white transition-all">
                    {social}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side: Form */}
          <div className="lg:w-3/5 p-12 lg:p-16 bg-white relative">
            <div className="absolute inset-0 bg-grid opacity-[0.02] pointer-events-none" />
            <div className="relative z-10">
              <h3 className="text-2xl font-black mb-10 uppercase tracking-tighter italic text-[#121212]">Send a Message</h3>
              
              <form className="grid sm:grid-cols-2 gap-8" onSubmit={(e) => e.preventDefault()}>
                <Input label="Name" placeholder="Your Name" className="bg-[#fafafa] rounded-none border-zinc-100 focus:border-primary" />
                <Input label="Email Address" type="email" placeholder="you@example.com" className="bg-[#fafafa] rounded-none border-zinc-100 focus:border-primary" />
                
                <div className="sm:col-span-2 space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 ml-1">Message</label>
                  <textarea 
                    rows="5" 
                    className="w-full bg-[#fafafa] border border-zinc-100 rounded-none px-5 py-4 outline-none focus:border-primary transition text-sm"
                    placeholder="Describe your request..."
                  ></textarea>
                </div>

                <div className="sm:col-span-2">
                  <Button className="w-full py-5 text-xs uppercase tracking-[0.3em] rounded-none shadow-xl hover:shadow-primary/20">
                    Submit Message
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
