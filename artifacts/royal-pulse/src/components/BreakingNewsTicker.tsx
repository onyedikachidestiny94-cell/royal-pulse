import React, { useEffect, useState } from 'react';
import { useGetBreakingNews } from '@workspace/api-client-react';
import { Link } from 'wouter';

export function BreakingNewsTicker() {
  const { data: articles, isLoading } = useGetBreakingNews();

  if (isLoading || !articles || articles.length === 0) {
    return null;
  }

  return (
    <div className="flex items-center overflow-hidden border-b border-red-950 bg-primary py-2.5 text-primary-foreground">
      <div className="z-10 ml-3 shrink-0 whitespace-nowrap bg-black px-3 py-1.5 text-[0.62rem] font-bold uppercase tracking-[0.14em] text-white md:ml-6 md:px-4 md:text-xs">
        Breaking News
      </div>
      <div className="flex flex-1 overflow-hidden whitespace-nowrap relative group">
        <div className="animate-marquee flex min-w-full items-center gap-8 pl-5 pr-12">
          {articles.map((article) => (
            <Link key={article.id} href={`/article/${article.slug}`} className="flex items-center gap-2 text-xs font-medium hover:underline md:text-sm">
              <span className="block h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
              <span>{article.title}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
