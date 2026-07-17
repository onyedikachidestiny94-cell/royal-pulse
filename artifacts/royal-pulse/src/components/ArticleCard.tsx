import React from 'react';
import { Link } from 'wouter';
import type { Article } from '@workspace/api-client-react';

interface ArticleCardProps {
  article: Article;
  featured?: boolean;
  compact?: boolean;
}

export function ArticleCard({ article, featured = false, compact = false }: ArticleCardProps) {
  const publishedDate = new Date(article.publishedAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  if (compact) {
    return (
      <Link href={`/article/${article.slug}`} className="group flex gap-4 items-start">
        {article.imageUrl && (
          <div className="w-24 h-24 shrink-0 overflow-hidden bg-zinc-100">
            <img 
              src={article.imageUrl} 
              alt={article.title} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        )}
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">
              {article.category}
            </span>
          </div>
          <h3 className="font-serif font-bold text-base leading-tight group-hover:text-primary transition-colors line-clamp-3">
            {article.title}
          </h3>
          <div className="text-xs text-muted-foreground mt-1">
            {publishedDate}
          </div>
        </div>
      </Link>
    );
  }

  if (featured) {
    return (
      <Link href={`/article/${article.slug}`} className="group block h-full w-full relative overflow-hidden bg-black aspect-[4/3] md:aspect-auto md:min-h-[500px]">
        {article.imageUrl ? (
          <img 
            src={article.imageUrl} 
            alt={article.title}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
          />
        ) : (
          <div className="absolute inset-0 w-full h-full bg-zinc-900" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <span className="bg-primary text-white text-xs font-bold uppercase tracking-widest px-3 py-1">
              {article.category}
            </span>
            {article.isBreaking && (
              <span className="bg-red-600 text-white text-xs font-bold uppercase tracking-widest px-3 py-1 animate-pulse">
                Breaking
              </span>
            )}
          </div>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-white leading-tight group-hover:text-primary-foreground transition-colors">
            {article.title}
          </h2>
          <p className="text-zinc-300 line-clamp-2 md:text-lg font-medium max-w-3xl mt-2 hidden sm:block">
            {article.excerpt}
          </p>
          <div className="flex items-center gap-4 text-zinc-400 text-sm mt-2 font-medium">
            <span>By <span className="text-white">{article.author}</span></span>
            <span className="w-1 h-1 rounded-full bg-zinc-600" />
            <span>{publishedDate}</span>
            {article.readTime && (
              <>
                <span className="w-1 h-1 rounded-full bg-zinc-600 hidden sm:block" />
                <span className="hidden sm:block">{article.readTime} min read</span>
              </>
            )}
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/article/${article.slug}`} className="group flex flex-col h-full bg-card border border-border hover:shadow-lg transition-shadow duration-300">
      <div className="relative aspect-[3/2] overflow-hidden bg-zinc-100 border-b border-border">
        {article.imageUrl ? (
          <img 
            src={article.imageUrl} 
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-zinc-200 flex items-center justify-center">
            <span className="text-zinc-400 font-serif italic">No image</span>
          </div>
        )}
        <div className="absolute top-4 left-4">
          <span className="bg-primary text-white text-xs font-bold uppercase tracking-widest px-2 py-1 shadow-sm">
            {article.category}
          </span>
        </div>
      </div>
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-serif text-xl font-bold leading-snug mb-3 group-hover:text-primary transition-colors line-clamp-3">
          {article.title}
        </h3>
        <p className="text-muted-foreground text-sm line-clamp-2 mb-4 font-medium flex-1">
          {article.excerpt}
        </p>
        <div className="mt-auto pt-4 border-t border-border flex items-center justify-between text-xs text-muted-foreground font-medium">
          <span className="text-foreground">{article.author}</span>
          <span>{publishedDate}</span>
        </div>
      </div>
    </Link>
  );
}
