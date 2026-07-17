import React from 'react';
import { Layout } from '@/components/layout/Layout';

export default function AboutPage() {
  return (
    <Layout>
      <div className="bg-black text-white pt-20 pb-16">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl text-center">
          <h1 className="font-serif text-5xl md:text-6xl font-bold uppercase tracking-tight mb-6">
            About Royal Pulse
          </h1>
          <p className="text-xl md:text-2xl text-zinc-400 font-serif italic max-w-2xl mx-auto">
            Your Trusted Source for Real Stories
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-16 max-w-4xl">
        <div className="prose prose-lg prose-zinc max-w-none">
          <h2 className="font-serif text-3xl font-bold text-black border-l-4 border-primary pl-4 mb-6">Our Mission</h2>
          <p className="text-lg text-zinc-700 leading-relaxed mb-8">
            Based in the heart of Enugu, Nigeria, Royal Pulse is an authoritative digital newsroom committed to delivering unvarnished truth, bold analysis, and comprehensive coverage of the stories that shape our nation and our world. 
          </p>
          <p className="text-lg text-zinc-700 leading-relaxed mb-12">
            In an era of clickbait and misinformation, we stand as a bastion of journalistic integrity. We believe that a well-informed citizenry is the foundation of a strong society. Every article we publish, every story we investigate, is driven by a singular mandate: to empower our readers with factual, unbiased, and deeply researched journalism.
          </p>

          <h2 className="font-serif text-3xl font-bold text-black border-l-4 border-primary pl-4 mb-6">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 not-prose">
            <div className="bg-zinc-50 p-6 border border-zinc-200">
              <h3 className="font-bold uppercase tracking-wider mb-2 flex items-center gap-2">
                <span className="w-2 h-2 bg-primary block" /> Truth
              </h3>
              <p className="text-zinc-600 font-medium">We pursue the facts relentlessly, correcting the record without hesitation when necessary.</p>
            </div>
            <div className="bg-zinc-50 p-6 border border-zinc-200">
              <h3 className="font-bold uppercase tracking-wider mb-2 flex items-center gap-2">
                <span className="w-2 h-2 bg-primary block" /> Independence
              </h3>
              <p className="text-zinc-600 font-medium">Our editorial judgment is fiercely independent, unswayed by political or corporate influence.</p>
            </div>
            <div className="bg-zinc-50 p-6 border border-zinc-200">
              <h3 className="font-bold uppercase tracking-wider mb-2 flex items-center gap-2">
                <span className="w-2 h-2 bg-primary block" /> Courage
              </h3>
              <p className="text-zinc-600 font-medium">We do not shy away from difficult stories or powerful interests when the public deserves to know.</p>
            </div>
            <div className="bg-zinc-50 p-6 border border-zinc-200">
              <h3 className="font-bold uppercase tracking-wider mb-2 flex items-center gap-2">
                <span className="w-2 h-2 bg-primary block" /> Excellence
              </h3>
              <p className="text-zinc-600 font-medium">Every pixel, every word earns its place. We demand the highest standards of craft from our team.</p>
            </div>
          </div>

          <h2 className="font-serif text-3xl font-bold text-black border-l-4 border-primary pl-4 mb-6">Editorial Team</h2>
          <p className="text-lg text-zinc-700 leading-relaxed mb-8">
            The Royal Pulse newsroom comprises veteran journalists, sharp analysts, and dedicated investigative reporters drawn from across Nigeria's vibrant media landscape. We are united by a shared passion for exceptional storytelling.
          </p>
        </div>
      </div>
    </Layout>
  );
}
