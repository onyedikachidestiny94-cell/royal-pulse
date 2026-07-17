import React, { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { useListArticles } from '@workspace/api-client-react';
import { useParams, Link } from 'wouter';
import { ArticleCard } from '@/components/ArticleCard';

export default function CategoryPage() {
  const { slug } = useParams();
  const [page, setPage] = useState(1);
  
  const categoryName = slug ? slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') : 'Category';

  const { data, isLoading } = useListArticles({ 
    category: slug,
    page,
    limit: 12
  }, {
    query: {
      enabled: !!slug
    }
  });

  return (
    <Layout>
      {/* Category Header */}
      <div className="bg-black text-white py-12 border-b-4 border-primary">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl">
            <h1 className="font-serif text-4xl md:text-5xl font-bold uppercase tracking-tight mb-4">
              {categoryName}
            </h1>
            <p className="text-zinc-400 text-lg font-serif italic">
              The latest news, analysis, and deep dives in {categoryName.toLowerCase()}.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 md:px-6 py-12">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array(8).fill(0).map((_, i) => (
              <div key={i} className="h-[400px] bg-zinc-100 animate-pulse" />
            ))}
          </div>
        ) : !data?.articles || data.articles.length === 0 ? (
          <div className="text-center py-20">
            <h2 className="font-serif text-2xl font-bold text-zinc-800 mb-2">No articles found</h2>
            <p className="text-muted-foreground">We don't have any articles in this category yet.</p>
            <Link href="/" className="inline-block mt-6 px-6 py-3 bg-primary text-white font-bold uppercase tracking-wider text-sm">
              Return Home
            </Link>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
              {data.articles.map(article => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
            
            {/* Pagination */}
            {data.totalPages > 1 && (
              <div className="flex justify-center items-center gap-4 py-8 border-t border-zinc-200">
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-6 py-3 bg-black text-white font-bold uppercase tracking-wider text-sm disabled:opacity-50 hover:bg-zinc-800 transition-colors"
                >
                  Previous
                </button>
                <span className="font-bold text-zinc-500">
                  Page {page} of {data.totalPages}
                </span>
                <button
                  onClick={() => setPage(p => Math.min(data.totalPages, p + 1))}
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
