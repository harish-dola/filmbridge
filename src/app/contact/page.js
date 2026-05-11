'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';

const CONTACT_CHANNELS = [
  {
    label: 'General Desk',
    value: 'hello@filmbridge.com',
    note: 'For memberships, archive access, and platform questions.',
  },
  {
    label: 'Editorial Lab',
    value: 'editorial@filmbridge.com',
    note: 'For article pitches, resource requests, and corrections.',
  },
  {
    label: 'Studio Base',
    value: 'Hyderabad, IN',
    note: 'Remote-first collaboration across production and post.',
  },
];

const REQUEST_TYPES = ['Resource Request', 'Collaboration', 'Membership', 'Editorial Pitch'];

const RESPONSE_STEPS = [
  ['01', 'Triage', 'We route your note to the right desk.'],
  ['02', 'Review', 'A FilmBridge editor checks scope and next steps.'],
  ['03', 'Reply', 'You get a clear response with the right contact path.'],
];

export default function ContactPage() {
  const [requestType, setRequestType] = useState(REQUEST_TYPES[0]);

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-white text-[#121212] selection:bg-primary selection:text-white">
      <Navbar />

      <main className="relative flex-grow px-6 pb-24 pt-36 md:pt-44">
        <div className="absolute inset-0 bg-grid opacity-60 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_white_76%)] opacity-95 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,_var(--color-primary)_0%,_transparent_34%)] opacity-[0.07] pointer-events-none" />

        <div className="relative z-10 mx-auto max-w-7xl">
          <section className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <div className="mb-7 flex items-center gap-4">
                <span className="h-px w-12 bg-primary" />
                <span className="text-[10px] font-bold uppercase tracking-[0.35em] text-primary">Contact Desk</span>
              </div>
              <h1 className="max-w-3xl text-6xl font-black uppercase italic leading-[0.88] tracking-tight text-[#121212] md:text-8xl">
                Open a <span className="text-zinc-200">Signal</span>
              </h1>
            </div>

            <div className="border-l-2 border-zinc-100 pl-6">
              <p className="max-w-xl text-base font-light leading-relaxed text-zinc-500 md:text-lg">
                Send questions, collaboration ideas, resource requests, or editorial notes to the FilmBridge team. Keep it specific and we will route it cleanly.
              </p>
              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {[
                  ['24-48h', 'Typical Reply'],
                  ['4', 'Request Types'],
                  ['Remote', 'Studio Mode'],
                ].map(([value, label]) => (
                  <div key={label} className="border border-zinc-100 bg-white/90 p-4 shadow-sm backdrop-blur">
                    <p className="text-xl font-black uppercase italic tracking-tight text-[#121212]">{value}</p>
                    <p className="mt-2 text-[9px] font-bold uppercase tracking-[0.25em] text-zinc-400">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="mt-16 grid overflow-hidden border border-zinc-100 bg-white shadow-2xl lg:grid-cols-[0.82fr_1.18fr]">
            <aside className="bg-[#121212] p-8 text-white md:p-12">
              <Badge className="mb-8 border-white/10 bg-white/10 text-white">Response Routing</Badge>
              <h2 className="text-3xl font-black uppercase italic leading-tight tracking-tight md:text-5xl">
                Pick the right lane.
              </h2>
              <p className="mt-6 max-w-md text-sm font-light leading-relaxed text-white/55">
                The more context you provide, the faster we can match your note to an editor, producer, or community lead.
              </p>

              <div className="mt-12 space-y-7">
                {CONTACT_CHANNELS.map((channel) => (
                  <div key={channel.label} className="border-t border-white/10 pt-6">
                    <p className="text-[9px] font-bold uppercase tracking-[0.35em] text-primary">{channel.label}</p>
                    <p className="mt-2 text-sm font-black uppercase italic tracking-tight text-white">{channel.value}</p>
                    <p className="mt-3 text-xs font-medium leading-relaxed text-white/40">{channel.note}</p>
                  </div>
                ))}
              </div>
            </aside>

            <div className="relative p-8 md:p-12">
              <div className="absolute inset-0 bg-grid opacity-[0.025] pointer-events-none" />
              <div className="relative z-10">
                <div className="mb-9 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-primary">Message Intake</p>
                    <h3 className="mt-3 text-3xl font-black uppercase italic tracking-tight text-[#121212]">Send a message</h3>
                  </div>
                </div>

                <form className="grid gap-6 sm:grid-cols-2" onSubmit={(event) => event.preventDefault()}>
                  <Input label="Name" placeholder="Your name" className="rounded-none border-zinc-100 bg-[#FAFAFA] focus:border-primary" />
                  <Input label="Email Address" type="email" placeholder="you@example.com" className="rounded-none border-zinc-100 bg-[#FAFAFA] focus:border-primary" />

                  <div className="sm:col-span-2">
                    <span className="mb-3 block text-[10px] font-bold uppercase tracking-widest text-zinc-400">Request Type</span>
                    <div className="grid gap-2 sm:grid-cols-4">
                      {REQUEST_TYPES.map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setRequestType(type)}
                          className={`border px-3 py-3 text-[9px] font-bold uppercase tracking-[0.18em] ${
                            requestType === type
                              ? 'border-[#121212] bg-[#121212] text-white'
                              : 'border-zinc-100 bg-[#FAFAFA] text-zinc-400 hover:border-primary hover:text-primary'
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  <Input label="Subject" placeholder="Short request title" className="rounded-none border-zinc-100 bg-[#FAFAFA] focus:border-primary sm:col-span-2" />

                  <div className="space-y-2 sm:col-span-2">
                    <label className="ml-1 text-[10px] font-bold uppercase tracking-widest text-zinc-400">Message</label>
                    <textarea
                      rows="6"
                      className="w-full resize-none border border-zinc-100 bg-[#FAFAFA] px-5 py-4 text-sm outline-none transition focus:border-primary"
                      placeholder="Describe your request, timeline, and the best next step..."
                    />
                  </div>

                  <div className="flex flex-col gap-4 border-t border-zinc-100 pt-6 sm:col-span-2 md:flex-row md:items-center md:justify-between">
                    <p className="max-w-sm text-xs font-medium leading-relaxed text-zinc-400">
                      Selected lane: <span className="font-bold uppercase text-primary">{requestType}</span>
                    </p>
                    <Button className="rounded-none px-10 py-5 text-xs uppercase tracking-[0.3em] shadow-xl hover:shadow-primary/20">
                      Submit Message
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </section>

          <section className="mt-10 grid gap-4 md:grid-cols-3">
            {RESPONSE_STEPS.map(([step, title, description]) => (
              <div key={step} className="border border-zinc-100 bg-white p-7 shadow-sm">
                <div className="flex items-center justify-between gap-5">
                  <h4 className="text-lg font-black uppercase italic tracking-tight text-[#121212]">{title}</h4>
                  <span className="text-[10px] font-black text-primary">{step}</span>
                </div>
                <p className="mt-4 text-sm font-medium leading-relaxed text-zinc-500">{description}</p>
              </div>
            ))}
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
