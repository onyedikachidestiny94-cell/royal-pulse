import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { Link } from 'wouter';
import { BarChart, Users, Target, CheckCircle2 } from 'lucide-react';

export default function AdvertisePage() {
  return (
    <Layout>
      <div className="bg-black text-white pt-20 pb-16 border-b-4 border-primary">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl text-center">
          <h1 className="font-serif text-5xl md:text-6xl font-bold uppercase tracking-tight mb-6">
            Advertise With Us
          </h1>
          <p className="text-xl text-zinc-400 font-medium max-w-2xl mx-auto">
            Connect your brand with Nigeria's most engaged, informed, and influential audience.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="bg-zinc-50 p-8 border border-zinc-200 text-center">
            <Users className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="font-serif text-2xl font-bold mb-2">Premium Audience</h3>
            <p className="text-zinc-600 font-medium">Reach professionals, decision-makers, and highly educated readers who value quality journalism.</p>
          </div>
          <div className="bg-zinc-50 p-8 border border-zinc-200 text-center">
            <Target className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="font-serif text-2xl font-bold mb-2">High Impact</h3>
            <p className="text-zinc-600 font-medium">Clean, uncrowded ad environments that ensure your message stands out, not blends in.</p>
          </div>
          <div className="bg-zinc-50 p-8 border border-zinc-200 text-center">
            <BarChart className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="font-serif text-2xl font-bold mb-2">Measurable Results</h3>
            <p className="text-zinc-600 font-medium">Transparent reporting and analytics to track your campaign's performance and ROI.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-16">
          <div>
            <h2 className="font-serif text-3xl font-bold border-l-4 border-primary pl-4 mb-6">Ad Placement Options</h2>
            <div className="space-y-6">
              {[
                { title: 'Homepage Hero Banner', desc: 'Premium placement above the fold for maximum visibility.' },
                { title: 'In-Article Native', desc: 'Seamlessly integrated within our high-engagement editorial content.' },
                { title: 'Newsletter Sponsorship', desc: 'Reach our most loyal readers directly in their inbox daily.' },
                { title: 'Section Takeovers', desc: 'Own a specific category (e.g., Business or Technology) for targeted impact.' }
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-lg">{item.title}</h4>
                    <p className="text-zinc-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-zinc-950 p-8 md:p-10 text-white">
            <h3 className="font-serif text-2xl font-bold mb-6">Request a Media Kit</h3>
            <form className="space-y-4" onSubmit={e => { e.preventDefault(); alert('Request sent'); }}>
              <div>
                <label className="text-sm font-bold text-zinc-400 mb-1.5 block">Company Name</label>
                <input required type="text" className="w-full bg-zinc-900 border border-zinc-800 p-3 text-white focus:border-primary focus:outline-none" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-bold text-zinc-400 mb-1.5 block">Contact Name</label>
                  <input required type="text" className="w-full bg-zinc-900 border border-zinc-800 p-3 text-white focus:border-primary focus:outline-none" />
                </div>
                <div>
                  <label className="text-sm font-bold text-zinc-400 mb-1.5 block">Work Email</label>
                  <input required type="email" className="w-full bg-zinc-900 border border-zinc-800 p-3 text-white focus:border-primary focus:outline-none" />
                </div>
              </div>
              <div>
                <label className="text-sm font-bold text-zinc-400 mb-1.5 block">Monthly Budget Range</label>
                <select className="w-full bg-zinc-900 border border-zinc-800 p-3 text-white focus:border-primary focus:outline-none">
                  <option>Under ₦500,000</option>
                  <option>₦500,000 - ₦2,000,000</option>
                  <option>Over ₦2,000,000</option>
                </select>
              </div>
              <button className="w-full bg-primary hover:bg-primary/90 text-white font-bold uppercase tracking-wider py-4 mt-4 transition-colors">
                Get Media Kit & Pricing
              </button>
            </form>
          </div>
        </div>
        
        <div className="text-center pt-12 border-t border-zinc-200">
          <p className="text-lg text-zinc-600 font-medium mb-4">Direct Advertising Inquiries</p>
          <a href="mailto:royalpulsenews@gmail.com" className="font-bold text-2xl hover:text-primary transition-colors">royalpulsenews@gmail.com</a>
        </div>
      </div>
    </Layout>
  );
}
