import React, { useState } from 'react';
import { useSubscribeNewsletter } from '@workspace/api-client-react';
import { Mail } from 'lucide-react';
import { toast } from 'sonner';

export function NewsletterSection() {
  const [email, setEmail] = useState('');
  const subscribe = useSubscribeNewsletter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    subscribe.mutate({ data: { email } }, {
      onSuccess: () => {
        toast.success('Successfully subscribed to newsletter!');
        setEmail('');
      },
      onError: () => {
        toast.error('Failed to subscribe. Please try again.');
      }
    });
  };

  return (
    <section className="bg-zinc-100 border-y border-border py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <Mail className="w-12 h-12 text-primary mx-auto mb-6" />
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
            The pulse of Nigeria, delivered daily.
          </h2>
          <p className="text-muted-foreground mb-8 text-lg font-medium">
            Get the most important stories, breaking news, and in-depth analysis sent directly to your inbox. Unbiased and unfiltered.
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Your email address" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 h-12 px-4 border border-input bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
            />
            <button 
              type="submit" 
              disabled={subscribe.isPending}
              className="h-12 px-8 bg-primary hover:bg-primary/90 text-primary-foreground font-bold uppercase tracking-wider text-sm transition-colors disabled:opacity-50"
            >
              {subscribe.isPending ? 'Subscribing...' : 'Subscribe'}
            </button>
          </form>
          <p className="text-xs text-muted-foreground mt-4 font-medium">
            By subscribing, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
    </section>
  );
}
