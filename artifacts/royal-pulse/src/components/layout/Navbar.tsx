import React, { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Search, Menu, X } from 'lucide-react';
import { BreakingNewsTicker } from '../BreakingNewsTicker';
import { useListCategories } from '@workspace/api-client-react';

export function Navbar() {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
    <header className="w-full bg-background border-b border-border sticky top-0 z-50">
      <BreakingNewsTicker />
      
      {/* Top Header */}
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex flex-col items-start cursor-pointer group">
            <span className="font-serif text-3xl md:text-4xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
              Royal Pulse
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <div className="text-sm font-medium text-muted-foreground">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
            <Link href="/search" className="text-foreground hover:text-primary transition-colors p-2">
              <Search className="w-5 h-5" />
            </Link>
          </div>

          <button 
            className="md:hidden p-2 text-foreground hover:text-primary"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Main Navigation (Desktop) */}
      <nav className="hidden md:block bg-black text-white w-full border-t border-b-4 border-primary">
        <div className="container mx-auto px-4 md:px-6">
          <ul className="flex items-center space-x-1 overflow-x-auto font-medium text-sm">
            <li>
              <Link href="/" className={`px-4 py-4 block hover:text-primary hover:bg-zinc-900 transition-colors ${location === '/' ? 'text-primary border-b-2 border-primary' : ''}`}>
                Home
              </Link>
            </li>
            <li>
              <Link href="/category/breaking-news" className={`px-4 py-4 block hover:text-primary hover:bg-zinc-900 transition-colors ${location === '/category/breaking-news' ? 'text-primary border-b-2 border-primary' : ''}`}>
                Breaking News
              </Link>
            </li>
            {navCategories.map((cat) => (
              <li key={cat.slug}>
                <Link href={`/category/${cat.slug}`} className={`px-4 py-4 block hover:text-primary hover:bg-zinc-900 transition-colors ${location === `/category/${cat.slug}` ? 'text-primary border-b-2 border-primary' : ''}`}>
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-black text-white w-full border-t-2 border-primary">
          <ul className="flex flex-col py-2 font-medium">
            <li>
              <Link href="/" className="block px-6 py-3 hover:bg-zinc-900 hover:text-primary" onClick={() => setIsMobileMenuOpen(false)}>
                Home
              </Link>
            </li>
            <li>
              <Link href="/category/breaking-news" className="block px-6 py-3 hover:bg-zinc-900 hover:text-primary" onClick={() => setIsMobileMenuOpen(false)}>
                Breaking News
              </Link>
            </li>
            {navCategories.map((cat) => (
              <li key={cat.slug}>
                <Link href={`/category/${cat.slug}`} className="block px-6 py-3 hover:bg-zinc-900 hover:text-primary" onClick={() => setIsMobileMenuOpen(false)}>
                  {cat.name}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/search" className="block px-6 py-3 hover:bg-zinc-900 hover:text-primary border-t border-zinc-800 mt-2" onClick={() => setIsMobileMenuOpen(false)}>
                Search
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
