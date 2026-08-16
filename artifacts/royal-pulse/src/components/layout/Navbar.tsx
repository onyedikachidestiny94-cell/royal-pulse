import React, { useMemo, useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Search, Menu, X, ArrowUpRight } from 'lucide-react';
import { BreakingNewsTicker } from '../BreakingNewsTicker';
import { useListCategories } from '@workspace/api-client-react';

const requestedCategories = [
  { name: 'Home', slug: '' },
  { name: 'News', slug: 'news' },
  { name: 'Breaking News', slug: 'breaking-news' },
  { name: 'Politics', slug: 'politics' },
  { name: 'Entertainment', slug: 'entertainment' },
  { name: 'Sports', slug: 'sports' },
  { name: 'Business', slug: 'business' },
  { name: 'Technology', slug: 'technology' },
  { name: 'World', slug: 'world' },
  { name: 'Lifestyle', slug: 'lifestyle' },
  { name: 'Metro', slug: 'metro' },
  { name: 'Opinion', slug: 'opinion' },
];

export function Navbar() {
  const [location, setLocation] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { data: categories } = useListCategories();

  const navCategories = useMemo(() => {
    const dynamicNames = new Set((categories || []).map((category) => category.slug));
    return requestedCategories.map((category) => {
      const dynamicCategory = categories?.find((item) => item.slug === category.slug);
      return dynamicCategory
        ? { ...category, name: dynamicCategory.name }
        : category;
    }).filter((category, index, all) => (
      all.findIndex((item) => item.slug === category.slug) === index ||
      dynamicNames.has(category.slug)
    ));
  }, [categories]);

  const isActive = (slug: string) => (
    slug === '' ? location === '/' : location === `/category/${slug}`
  );

  const submitSearch = (event: React.FormEvent) => {
    event.preventDefault();
    const query = searchQuery.trim();
    if (!query) {
      setLocation('/search');
      return;
    }
    setLocation(`/search?q=${encodeURIComponent(query)}`);
    setIsSearchOpen(false);
    setSearchQuery('');
  };

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200 bg-white/95 shadow-[0_1px_0_rgba(0,0,0,0.04)] backdrop-blur-md">
      {/* Main masthead */}
      <div className="container mx-auto px-4 md:px-6">
        <div className="relative flex h-[4.5rem] items-center justify-between md:h-24">
          <button
            type="button"
            aria-label={isSearchOpen ? 'Close search' : 'Open search'}
            onClick={() => setIsSearchOpen((open) => !open)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 text-zinc-700 transition-colors hover:border-primary hover:text-primary md:absolute md:left-6 md:top-1/2 md:-translate-y-1/2"
          >
            {isSearchOpen ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
          </button>

          <Link
            href="/"
            aria-label="Royal Pulse home"
            className="absolute left-1/2 -translate-x-1/2 text-center"
          >
            <span className="block font-serif text-[1.85rem] font-bold leading-none tracking-[-0.04em] text-zinc-950 transition-colors hover:text-primary md:text-5xl">
              Royal Pulse
            </span>
            <span className="mt-1 hidden text-[0.58rem] font-bold uppercase tracking-[0.28em] text-primary md:block">
              Your trusted source for real stories
            </span>
          </Link>

          <div className="ml-auto flex items-center gap-3">
            <div className="hidden text-right md:block">
              <p className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-primary">Enugu, Nigeria</p>
              <p className="mt-1 text-xs font-medium text-zinc-500">
                {new Date().toLocaleDateString('en-NG', {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </p>
            </div>
            <button
              type="button"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setIsMobileMenuOpen((open) => !open)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 text-zinc-700 transition-colors hover:border-primary hover:text-primary md:hidden"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {isSearchOpen && (
          <form onSubmit={submitSearch} className="border-t border-zinc-100 py-3 md:py-4">
            <div className="flex items-center gap-3 rounded-lg border border-zinc-300 bg-zinc-50 px-3 py-2 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/10">
              <Search className="h-5 w-5 shrink-0 text-primary" />
              <input
                autoFocus
                type="search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search headlines, topics, categories or keywords..."
                className="min-w-0 flex-1 bg-transparent text-sm text-zinc-900 outline-none placeholder:text-zinc-400 md:text-base"
              />
              <button
                type="submit"
                className="shrink-0 rounded-md bg-primary px-4 py-2 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-red-700"
              >
                Search
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Always-visible newspaper category rail */}
      <nav aria-label="News categories" className="border-y border-zinc-200 bg-zinc-950 text-white">
        <div className="container mx-auto px-0 md:px-6">
          <ul className="flex snap-x snap-mandatory items-center overflow-x-auto overscroll-x-contain px-3 scrollbar-none md:justify-center md:overflow-visible">
            {navCategories.map((category) => {
              const href = category.slug ? `/category/${category.slug}` : '/';
              return (
                <li key={category.slug || 'home'} className="shrink-0 snap-start">
                  <Link
                    href={href}
                    className={`relative block whitespace-nowrap px-3.5 py-3 text-[0.7rem] font-bold uppercase tracking-[0.08em] transition-colors md:px-4 md:py-3.5 md:text-xs ${
                      isActive(category.slug)
                        ? 'text-white after:absolute after:bottom-0 after:left-3 after:right-3 after:h-1 after:bg-primary md:after:left-4 md:after:right-4'
                        : 'text-zinc-400 hover:bg-zinc-900 hover:text-white'
                    }`}
                  >
                    {category.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      {/* Breaking news follows the category rail */}
      <BreakingNewsTicker />

      {/* Secondary mobile menu remains available for utility links */}
      {isMobileMenuOpen && (
        <div className="border-b-2 border-primary bg-zinc-950 text-white md:hidden">
          <div className="container mx-auto grid grid-cols-2 gap-2 px-4 py-3">
            <Link href="/about" onClick={closeMobileMenu} className="flex items-center justify-between rounded-md px-3 py-3 text-sm text-zinc-300 hover:bg-zinc-900 hover:text-white">
              About Royal Pulse <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link href="/contact" onClick={closeMobileMenu} className="flex items-center justify-between rounded-md px-3 py-3 text-sm text-zinc-300 hover:bg-zinc-900 hover:text-white">
              Contact <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link href="/advertise" onClick={closeMobileMenu} className="flex items-center justify-between rounded-md px-3 py-3 text-sm text-zinc-300 hover:bg-zinc-900 hover:text-white">
              Advertise <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link href="/tips" onClick={closeMobileMenu} className="flex items-center justify-between rounded-md px-3 py-3 text-sm text-zinc-300 hover:bg-zinc-900 hover:text-white">
              Send a tip <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}