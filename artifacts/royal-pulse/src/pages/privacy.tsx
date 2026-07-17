import React from 'react';
import { Layout } from '@/components/layout/Layout';

export default function PrivacyPage() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="mb-12 border-b-4 border-black pb-6">
          <h1 className="font-serif text-4xl md:text-5xl font-bold uppercase tracking-tight mb-4">Privacy Policy</h1>
          <p className="text-zinc-500 font-medium uppercase tracking-widest text-sm">Last Updated: October 2023</p>
        </div>

        <div className="prose prose-lg prose-zinc max-w-none prose-headings:font-serif prose-headings:font-bold prose-h2:border-l-4 prose-h2:border-primary prose-h2:pl-4 prose-h2:mt-12">
          <p>
            At Royal Pulse, we are committed to protecting the privacy and security of our readers. This Privacy Policy outlines how we collect, use, disclose, and safeguard your information when you visit our website.
          </p>

          <h2>Information We Collect</h2>
          <p>We may collect information about you in a variety of ways. The information we may collect on the Site includes:</p>
          <ul>
            <li><strong>Personal Data:</strong> Personally identifiable information, such as your name, shipping address, email address, and telephone number, and demographic information that you voluntarily give to us when you register with the Site, subscribe to our newsletter, or submit a news tip.</li>
            <li><strong>Derivative Data:</strong> Information our servers automatically collect when you access the Site, such as your IP address, your browser type, your operating system, your access times, and the pages you have viewed directly before and after accessing the Site.</li>
          </ul>

          <h2>Use of Your Information</h2>
          <p>Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site to:</p>
          <ul>
            <li>Deliver targeted advertising, newsletters, and other information regarding promotions and the Site to you.</li>
            <li>Email you regarding your account, subscriptions, or tips.</li>
            <li>Monitor and analyze usage and trends to improve your experience with the Site.</li>
            <li>Perform other business activities as needed.</li>
          </ul>

          <h2>Disclosure of Your Information</h2>
          <p>We may share information we have collected about you in certain situations. Your information may be disclosed as follows:</p>
          <ul>
            <li><strong>By Law or to Protect Rights:</strong> If we believe the release of information about you is necessary to respond to legal process, to investigate or remedy potential violations of our policies, or to protect the rights, property, and safety of others.</li>
            <li><strong>Third-Party Service Providers:</strong> We may share your information with third parties that perform services for us or on our behalf, including payment processing, data analysis, email delivery, hosting services, customer service, and marketing assistance.</li>
          </ul>

          <h2>Protection of Journalistic Sources</h2>
          <p>Information submitted through our encrypted News Tips portal is handled with strict confidentiality protocols. We go to extraordinary lengths to protect the identities of whistleblowers and journalistic sources under applicable shield laws.</p>

          <h2>Contact Us</h2>
          <p>If you have questions or comments about this Privacy Policy, please contact us at:</p>
          <p className="font-bold">
            Royal Pulse Newsroom<br/>
            Enugu, Nigeria<br/>
            Email: royalpulsenews@gmail.com
          </p>
        </div>
      </div>
    </Layout>
  );
}
