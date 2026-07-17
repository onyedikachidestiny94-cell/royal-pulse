import React, { useEffect, useState } from 'react';
import { useGetBreakingNews } from '@workspace/api-client-react';
import { Link } from 'wouter';

export function BreakingNewsTicker() {
  const { data: articles, isLoading } = useGetBreakingNews();

  if (isLoading || !articles || articles.length === 0) {
    return null;
  }

  return (
    <div className="bg-primary text-primary-foreground py-2 overflow-hidden flex items-center border-b-2 border-black">
      <div className="bg-black text-white font-bold px-4 py-1 text-sm uppercase tracking-wider whitespace-nowrap z-10 shrink-0 ml-4 hidden md:block">
        Breaking News
      </div>
      <div className="flex flex-1 overflow-hidden whitespace-nowrap relative group">
        <div className="animate-marquee flex items-center gap-8 pl-4 pr-12 min-w-full">
          {articles.map((article) => (
            <Link key={article.id} href={`/article/${article.slug}`} className="hover:underline flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-white block animate-pulse" />
              <span className="font-medium">{article.title}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
