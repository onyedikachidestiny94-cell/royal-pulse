import React, { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { useSubmitTip } from '@workspace/api-client-react';
import { Shield, Lock, AlertTriangle, Send } from 'lucide-react';
import { toast } from 'sonner';

export default function TipsPage() {
  const submitTip = useSubmitTip();
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    tipContent: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.tipContent.length < 10) {
      toast.error('Tip content must be at least 10 characters.');
      return;
    }

    submitTip.mutate({ data: form }, {
      onSuccess: () => {
        toast.success('Your tip has been securely submitted.');
        setForm({ name: '', email: '', phone: '', tipContent: '' });
      },
      onError: () => {
        toast.error('Failed to submit tip. Please try again.');
      }
    });
  };

  return (
    <Layout>
      <div className="bg-zinc-950 text-white pt-20 pb-16 border-b-4 border-primary">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl text-center">
          <Shield className="w-16 h-16 text-primary mx-auto mb-6" />
          <h1 className="font-serif text-4xl md:text-6xl font-bold uppercase tracking-tight mb-6">
            Confidential News Tips
          </h1>
          <p className="text-lg md:text-xl text-zinc-400 font-medium max-w-2xl mx-auto">
            Got a story we should investigate? Submit it securely. We protect our sources.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          
          <div className="md:col-span-1 space-y-8">
            <div>
              <div className="flex items-center gap-2 mb-3 text-black">
                <Lock className="w-5 h-5" />
                <h3 className="font-bold text-lg">Secure & Private</h3>
              </div>
              <p className="text-zinc-600 text-sm leading-relaxed">
                Your submission is encrypted. While providing contact info helps our reporters verify details, you may leave personal fields blank to remain anonymous.
              </p>
            </div>
            
            <div>
              <div className="flex items-center gap-2 mb-3 text-black">
                <AlertTriangle className="w-5 h-5 text-primary" />
                <h3 className="font-bold text-lg">What makes a good tip?</h3>
              </div>
              <ul className="text-zinc-600 text-sm leading-relaxed space-y-2 list-disc pl-5">
                <li>Evidence of corruption or wrongdoing</li>
                <li>Undisclosed public interest documents</li>
                <li>Clear, specific facts rather than rumors</li>
                <li>First-hand knowledge of an event</li>
              </ul>
            </div>
          </div>
          
          <div className="md:col-span-2">
            <div className="bg-zinc-50 border border-zinc-200 p-6 md:p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="bg-blue-50 border border-blue-200 p-4 rounded text-sm text-blue-800 mb-6 font-medium">
                  <strong>Note:</strong> All fields except the tip content are optional if you wish to remain anonymous.
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-zinc-700 mb-1.5">Name</label>
                    <input 
                      type="text" 
                      placeholder="Optional"
                      value={form.name}
                      onChange={e => setForm({...form, name: e.target.value})}
                      className="w-full bg-white border border-zinc-300 p-3 focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-zinc-700 mb-1.5">Email</label>
                      <input 
                        type="email" 
                        placeholder="Optional"
                        value={form.email}
                        onChange={e => setForm({...form, email: e.target.value})}
                        className="w-full bg-white border border-zinc-300 p-3 focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-zinc-700 mb-1.5">Phone / WhatsApp</label>
                      <input 
                        type="tel" 
                        placeholder="Optional"
                        value={form.phone}
                        onChange={e => setForm({...form, phone: e.target.value})}
                        className="w-full bg-white border border-zinc-300 p-3 focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-zinc-200">
                  <label className="block text-sm font-bold text-black mb-1.5">Your Tip *</label>
                  <textarea 
                    required 
                    rows={8}
                    placeholder="Provide as much detail as possible. Who, what, when, where, and why?"
                    value={form.tipContent}
                    onChange={e => setForm({...form, tipContent: e.target.value})}
                    className="w-full bg-white border border-zinc-300 p-3 focus:border-primary focus:ring-1 focus:ring-primary outline-none resize-y"
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  disabled={submitTip.isPending}
                  className="w-full bg-black hover:bg-primary text-white font-bold uppercase tracking-wider py-4 flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
                >
                  <Send className="w-5 h-5" />
                  {submitTip.isPending ? 'Encrypting & Sending...' : 'Submit Tip Securely'}
                </button>
              </form>
            </div>
          </div>
          
        </div>
      </div>
    </Layout>
  );
}
