import React, { useState, useEffect } from 'react';
import { Layout } from '@/components/layout/Layout';
import { useSearchArticles } from '@workspace/api-client-react';
import { ArticleCard } from '@/components/ArticleCard';
import { Search, Loader2 } from 'lucide-react';
import { useLocation } from 'wouter';

export default function SearchPage() {
  const [searchParams] = useState(() => new URLSearchParams(window.location.search));
  const initialQuery = searchParams.get('q') || '';
  
  const [query, setQuery] = useState(initialQuery);
  const [activeQuery, setActiveQuery] = useState(initialQuery);
  const [page, setPage] = useState(1);
  const [, setLocation] = useLocation();

  const { data, isLoading, isFetching } = useSearchArticles({ 
    q: activeQuery,
    page,
    limit: 12
  }, {
    query: {
      enabled: activeQuery.length > 0
    }
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setActiveQuery(query);
    setPage(1);
    // Update URL without refreshing
    const newUrl = `/search?q=${encodeURIComponent(query)}`;
    setLocation(newUrl);
  };

  return (
    <Layout>
      <div className="bg-zinc-100 py-12 border-b border-border">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h1 className="font-serif text-4xl font-bold mb-6">Search Royal Pulse</h1>
          <form onSubmit={handleSearch} className="flex max-w-2xl mx-auto shadow-xl">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 w-5 h-5" />
              <input 
                type="search"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search news, topics, authors..."
                className="w-full h-14 pl-12 pr-4 text-lg border-0 focus:ring-2 focus:ring-primary outline-none"
              />
            </div>
            <button 
              type="submit"
              className="px-8 h-14 bg-black text-white font-bold uppercase tracking-widest text-sm hover:bg-primary transition-colors flex items-center justify-center min-w-[120px]"
            >
              {isFetching ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Search'}
            </button>
          </form>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {!activeQuery ? (
          <div className="text-center py-20 text-muted-foreground">
            Enter a search term above to find articles.
          </div>
        ) : isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array(8).fill(0).map((_, i) => (
              <div key={i} className="h-[400px] bg-zinc-100 animate-pulse" />
            ))}
          </div>
        ) : !data?.articles || data.articles.length === 0 ? (
          <div className="text-center py-20">
            <Search className="w-12 h-12 text-zinc-300 mx-auto mb-4" />
            <h2 className="font-serif text-2xl font-bold mb-2">No results for "{activeQuery}"</h2>
            <p className="text-muted-foreground">Try checking your spelling or using different keywords.</p>
          </div>
        ) : (
          <>
            <div className="mb-8 border-b-2 border-black pb-4 flex items-center justify-between">
              <h2 className="font-serif text-2xl font-bold">
                Results for "{activeQuery}" <span className="text-muted-foreground text-lg font-normal">({data.total})</span>
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
              {data.articles.map(article => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
            
            {data.totalPages > 1 && (
              <div className="flex justify-center items-center gap-4 py-8 border-t border-zinc-200">
                <button
                  onClick={() => {
                    setPage(p => Math.max(1, p - 1));
                    window.scrollTo(0, 0);
                  }}
                  disabled={page === 1}
                  className="px-6 py-3 bg-black text-white font-bold uppercase tracking-wider text-sm disabled:opacity-50 hover:bg-zinc-800 transition-colors"
                >
                  Previous
                </button>
                <span className="font-bold text-zinc-500">
                  Page {page} of {data.totalPages}
                </span>
                <button
                  onClick={() => {
                    setPage(p => Math.min(data.totalPages, p + 1));
                    window.scrollTo(0, 0);
                  }}
                  disabled={page === data.totalPages}
                  className="px-6 py-3 bg-black text-white font-bold uppercase tracking-wider text-sm disabled:opacity-50 hover:bg-zinc-800 transition-colors"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </Layout>
  );
}
