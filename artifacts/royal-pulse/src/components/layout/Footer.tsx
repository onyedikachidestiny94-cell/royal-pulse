import React from 'react';
import { Link } from 'wouter';
import { Mail, MapPin } from 'lucide-react';
import { FaWhatsapp, FaFacebook, FaTwitter } from 'react-icons/fa';
import { useListCategories } from '@workspace/api-client-react';

export function Footer() {
  const { data: categories } = useListCategories();
  
  const navCategories = categories || [
    { name: 'Politics', slug: 'politics', articleCount: 0 },
    { name: 'Entertainment', slug: 'entertainment', articleCount: 0 },
    { name: 'Sports', slug: 'sports', articleCount: 0 },
    { name: 'Business', slug: 'business', articleCount: 0 },
    { name: 'Technology', slug: 'technology', articleCount: 0 },
    { name: 'World', slug: 'world', articleCount: 0 },
  ];

  return (
    <footer className="bg-[#0A0A0A] text-white border-t-4 border-primary mt-auto">
      <div className="container mx-auto px-4 py-12 md:py-16 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          <div className="flex flex-col gap-4">
            <Link href="/">
              <span className="font-serif text-3xl font-bold tracking-tight text-white hover:text-primary transition-colors cursor-pointer">
                Royal Pulse
              </span>
            </Link>
            <p className="text-zinc-400 text-sm leading-relaxed max-w-sm font-medium italic">
              Your Trusted Source for Real Stories
            </p>
            <p className="text-zinc-500 text-sm leading-relaxed max-w-sm">
              The authoritative voice of news from Enugu, Nigeria and beyond. Unbiased reporting, bold analysis, and stories that matter.
            </p>
          </div>

          <div>
            <h3 className="font-serif font-bold text-lg mb-6 text-white uppercase tracking-wider relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-12 after:h-1 after:bg-primary">
              Categories
            </h3>
            <ul className="space-y-3">
              {navCategories.map((cat) => (
                <li key={cat.slug}>
                  <Link href={`/category/${cat.slug}`} className="text-zinc-400 hover:text-primary transition-colors text-sm font-medium block w-fit">
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-serif font-bold text-lg mb-6 text-white uppercase tracking-wider relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-12 after:h-1 after:bg-primary">
              Company
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-zinc-400 hover:text-primary transition-colors text-sm font-medium block w-fit">About Us</Link>
              </li>
              <li>
                <Link href="/contact" className="text-zinc-400 hover:text-primary transition-colors text-sm font-medium block w-fit">Contact Us</Link>
              </li>
              <li>
                <Link href="/advertise" className="text-zinc-400 hover:text-primary transition-colors text-sm font-medium block w-fit">Advertise</Link>
              </li>
              <li>
                <Link href="/tips" className="text-zinc-400 hover:text-primary transition-colors text-sm font-medium block w-fit">Submit a Tip</Link>
              </li>
              <li>
                <Link href="/privacy" className="text-zinc-400 hover:text-primary transition-colors text-sm font-medium block w-fit">Privacy Policy</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-serif font-bold text-lg mb-6 text-white uppercase tracking-wider relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-12 after:h-1 after:bg-primary">
              Contact
            </h3>
            <ul className="space-y-4">
              <li>
                <a href="https://wa.me/2349016473025" target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 text-zinc-400 hover:text-[#25D366] transition-colors group">
                  <FaWhatsapp className="w-5 h-5 mt-0.5 shrink-0" />
                  <span className="text-sm font-medium">+234 901 647 3025</span>
                </a>
              </li>
              <li>
                <a href="mailto:royalpulsenews@gmail.com" className="flex items-start gap-3 text-zinc-400 hover:text-primary transition-colors group">
                  <Mail className="w-5 h-5 mt-0.5 shrink-0" />
                  <span className="text-sm font-medium">royalpulsenews@gmail.com</span>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-zinc-400">
                  <MapPin className="w-5 h-5 mt-0.5 shrink-0" />
                  <span className="text-sm font-medium">Enugu, Nigeria</span>
                </div>
              </li>
            </ul>
            <div className="mt-8 flex gap-4">
              <a href="#" className="w-10 h-10 rounded bg-zinc-800 flex items-center justify-center text-white hover:bg-[#1877F2] transition-colors">
                <FaFacebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded bg-zinc-800 flex items-center justify-center text-white hover:bg-black transition-colors">
                <FaTwitter className="w-5 h-5" />
              </a>
              <a href="https://wa.me/2349016473025" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded bg-zinc-800 flex items-center justify-center text-white hover:bg-[#25D366] transition-colors">
                <FaWhatsapp className="w-5 h-5" />
              </a>
            </div>
          </div>

        </div>

        <div className="mt-16 pt-8 border-t border-zinc-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-zinc-500 text-sm font-medium">
            &copy; {new Date().getFullYear()} Royal Pulse. All Rights Reserved.
          </p>
          <div className="text-zinc-600 text-sm flex gap-4 font-medium">
            <Link href="/privacy" className="hover:text-primary">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-primary">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
