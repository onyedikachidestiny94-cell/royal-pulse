import React, { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { MapPin, Mail, MessageSquare } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

export default function ContactPage() {
  const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app this would send an email
    alert("Message received. Thank you for contacting Royal Pulse.");
    setFormState({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <Layout>
      <div className="bg-zinc-100 border-b border-border py-12 md:py-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h1 className="font-serif text-4xl md:text-5xl font-bold uppercase tracking-tight mb-4 text-black">
              Contact Us
            </h1>
            <p className="text-lg text-zinc-600 font-medium">
              We value your feedback, inquiries, and news tips. Reach out to the Royal Pulse newsroom using the channels below.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <a href="https://wa.me/2349016473025" target="_blank" rel="noopener noreferrer" className="bg-white p-8 text-center border border-zinc-200 hover:border-[#25D366] transition-colors group cursor-pointer">
              <div className="w-14 h-14 bg-zinc-50 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-[#25D366]/10 transition-colors">
                <FaWhatsapp className="w-7 h-7 text-zinc-400 group-hover:text-[#25D366] transition-colors" />
              </div>
              <h3 className="font-bold uppercase tracking-wider mb-2">WhatsApp</h3>
              <p className="text-lg font-serif font-bold text-black">+234 901 647 3025</p>
              <span className="text-xs text-zinc-400 mt-2 block uppercase tracking-widest font-bold">Fastest Response</span>
            </a>
            
            <a href="mailto:royalpulsenews@gmail.com" className="bg-white p-8 text-center border border-zinc-200 hover:border-primary transition-colors group cursor-pointer">
              <div className="w-14 h-14 bg-zinc-50 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/10 transition-colors">
                <Mail className="w-7 h-7 text-zinc-400 group-hover:text-primary transition-colors" />
              </div>
              <h3 className="font-bold uppercase tracking-wider mb-2">Email</h3>
              <p className="text-sm font-bold text-black truncate px-2">royalpulsenews@gmail.com</p>
              <span className="text-xs text-zinc-400 mt-2 block uppercase tracking-widest font-bold">General Inquiries</span>
            </a>
            
            <div className="bg-white p-8 text-center border border-zinc-200">
              <div className="w-14 h-14 bg-zinc-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-7 h-7 text-zinc-400" />
              </div>
              <h3 className="font-bold uppercase tracking-wider mb-2">Newsroom</h3>
              <p className="text-sm font-bold text-black">Enugu, Nigeria</p>
              <span className="text-xs text-zinc-400 mt-2 block uppercase tracking-widest font-bold">Headquarters</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          <div>
            <div className="flex items-center gap-3 mb-6">
              <MessageSquare className="w-6 h-6 text-primary" />
              <h2 className="font-serif text-3xl font-bold">Send a Message</h2>
            </div>
            <p className="text-zinc-600 mb-8 font-medium leading-relaxed">
              Use the form below for general inquiries, feedback on our reporting, or technical issues with the website. For sensitive news tips, please use our dedicated tips form instead.
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-zinc-700">Full Name *</label>
                  <input 
                    type="text" 
                    required 
                    value={formState.name}
                    onChange={e => setFormState({...formState, name: e.target.value})}
                    className="w-full bg-zinc-50 border border-zinc-300 p-3 focus:outline-none focus:border-primary focus:bg-white"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-zinc-700">Email Address *</label>
                  <input 
                    type="email" 
                    required 
                    value={formState.email}
                    onChange={e => setFormState({...formState, email: e.target.value})}
                    className="w-full bg-zinc-50 border border-zinc-300 p-3 focus:outline-none focus:border-primary focus:bg-white"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-bold text-zinc-700">Subject *</label>
                <input 
                  type="text" 
                  required 
                  value={formState.subject}
                  onChange={e => setFormState({...formState, subject: e.target.value})}
                  className="w-full bg-zinc-50 border border-zinc-300 p-3 focus:outline-none focus:border-primary focus:bg-white"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-bold text-zinc-700">Message *</label>
                <textarea 
                  required 
                  rows={6}
                  value={formState.message}
                  onChange={e => setFormState({...formState, message: e.target.value})}
                  className="w-full bg-zinc-50 border border-zinc-300 p-3 focus:outline-none focus:border-primary focus:bg-white resize-y"
                ></textarea>
              </div>
              <button type="submit" className="w-full sm:w-auto bg-black hover:bg-primary text-white font-bold uppercase tracking-wider text-sm px-8 py-4 transition-colors">
                Send Message
              </button>
            </form>
          </div>
          
          <div className="bg-zinc-100 p-2 h-[500px] border border-zinc-300 relative">
            <div className="absolute inset-0 m-2 border-2 border-dashed border-zinc-300 flex flex-col items-center justify-center bg-white/50">
              <MapPin className="w-12 h-12 text-zinc-300 mb-4" />
              <p className="font-serif text-lg text-zinc-500 italic">Map Placeholder: Enugu, Nigeria</p>
            </div>
          </div>
          
        </div>
      </div>
    </Layout>
  );
}
