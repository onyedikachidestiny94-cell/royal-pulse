import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { ArticleCard } from '@/components/ArticleCard';
import { NewsletterSection } from '@/components/NewsletterSection';
import { 
  useGetFeaturedArticles, 
  useGetTrendingArticles, 
  useListArticles,
  useGetPopularArticles
} from '@workspace/api-client-react';
import { Link } from 'wouter';


const FALLBACK_ARTICLES = [
  { id: -1, title: "Enugu Set for Major Development as New Projects Take Shape", slug: "enugu-major-development-projects", excerpt: "New projects and public investments are reshaping opportunities across Enugu and the wider Southeast.", category: "News", author: "Royal Pulse Desk", imageUrl: "https://images.unsplash.com/photo-1495020689067-958852a7765e?w=1200", publishedAt: "2026-08-17T10:00:00.000Z", views: 0, status: "published", isFeatured: true, isBreaking: false, readTime: 4 },
  { id: -2, title: "Burna Boy Announces Coal City Nights Concert in Enugu", slug: "burna-boy-coal-city-nights-enugu", excerpt: "Burna Boy announces a major Enugu concert at the Nnamdi Azikiwe Stadium this December.", category: "Entertainment", author: "Adaeze Nwosu", imageUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200", publishedAt: "2026-08-16T10:00:00.000Z", views: 0, status: "published", isFeatured: false, isBreaking: false, readTime: 3 },
  { id: -3, title: "CBN Raises Interest Rate to 27.5% to Combat Inflation", slug: "cbn-raises-interest-rate-27-5-percent", excerpt: "The Central Bank raises interest rates as it battles persistent inflation and works to restore price stability.", category: "Business", author: "Kelechi Ugwu", imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200", publishedAt: "2026-08-15T10:00:00.000Z", views: 0, status: "published", isFeatured: false, isBreaking: false, readTime: 4 },
];

export default function HomePage() {
  const { data: featured, isLoading: featuredLoading } = useGetFeaturedArticles();
  const { data: trending, isLoading: trendingLoading } = useGetTrendingArticles();
  const { data: latest, isLoading: latestLoading } = useListArticles({ limit: 6 });
  const { data: popular, isLoading: popularLoading } = useGetPopularArticles();

  const featuredArticles = featured?.length ? featured : FALLBACK_ARTICLES.slice(0, 3);
  const latestArticles = latest?.articles?.length ? latest.articles : FALLBACK_ARTICLES;
  const popularArticles = popular?.length ? popular : FALLBACK_ARTICLES;
  const trendingArticles = trending?.length ? trending : FALLBACK_ARTICLES;

  const heroArticle = featuredArticles[0];
  const subFeatured = featuredArticles.slice(1, 4);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="border-b border-border bg-black">
        <div className="container mx-auto px-0 md:px-6 py-0 md:py-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 md:gap-6 lg:h-[600px]">
            {/* Main Featured */}
            <div className="lg:col-span-8 h-[500px] lg:h-full relative group cursor-pointer overflow-hidden">
              {featuredLoading ? (
                <div className="w-full h-full bg-zinc-900 animate-pulse" />
              ) : heroArticle ? (
                <ArticleCard article={heroArticle} featured />
              ) : null}
            </div>

            {/* Sub Featured */}
            <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-[1px] md:gap-6 bg-border md:bg-transparent">
              {featuredLoading ? (
                Array(3).fill(0).map((_, i) => (
                  <div key={i} className="h-full min-h-[150px] bg-zinc-900 animate-pulse" />
                ))
              ) : subFeatured.map((article) => (
                <Link key={article.id} href={`/article/${article.slug}`} className="bg-zinc-950 p-6 flex flex-col justify-center group hover:bg-zinc-900 transition-colors h-full border border-zinc-800">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-primary text-xs font-bold uppercase tracking-wider">
                      {article.category}
                    </span>
                  </div>
                  <h3 className="font-serif text-xl font-bold text-white leading-tight group-hover:text-primary transition-colors line-clamp-3">
                    {article.title}
                  </h3>
                  <div className="text-zinc-500 text-xs mt-3 font-medium flex items-center gap-2">
                    <span>{article.author}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Latest News */}
            <div className="lg:col-span-8">
              <div className="flex items-center justify-between mb-8 border-b-2 border-black pb-4">
                <h2 className="font-serif text-3xl font-bold uppercase tracking-tight">Latest News</h2>
                <Link href="/search" className="text-primary font-bold text-sm hover:underline uppercase tracking-wider">View All</Link>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                {latestLoading ? (
                  Array(6).fill(0).map((_, i) => (
                    <div key={i} className="h-80 bg-zinc-100 animate-pulse" />
                  ))
                ) : latestArticles.map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>

              {/* Popular Stories */}
              <div className="flex items-center justify-between mb-8 border-b-2 border-black pb-4">
                <h2 className="font-serif text-3xl font-bold uppercase tracking-tight">Popular Stories</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {popularLoading ? (
                  Array(4).fill(0).map((_, i) => (
                    <div key={i} className="h-32 bg-zinc-100 animate-pulse" />
                  ))
                ) : popularArticles.slice(0, 4).map((article) => (
                  <ArticleCard key={article.id} article={article} compact />
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-4 space-y-12">
              
              {/* Trending */}
              <div>
                <div className="flex items-center justify-between mb-8 border-b-2 border-black pb-4">
                  <h2 className="font-serif text-2xl font-bold uppercase tracking-tight flex items-center gap-2">
                    <span className="w-3 h-3 bg-primary rounded-full animate-pulse inline-block" />
                    Trending Now
                  </h2>
                </div>
                
                <div className="flex flex-col gap-6">
                  {trendingLoading ? (
                    Array(5).fill(0).map((_, i) => (
                      <div key={i} className="flex gap-4">
                        <div className="w-8 h-8 bg-zinc-100 animate-pulse shrink-0" />
                        <div className="h-16 flex-1 bg-zinc-100 animate-pulse" />
                      </div>
                    ))
                  ) : trending?.slice(0, 5).map((article, i) => (
                    <div key={article.id} className="flex gap-4 items-start group">
                      <span className="font-serif text-4xl font-bold text-zinc-200 group-hover:text-primary transition-colors leading-none shrink-0 w-8">
                        {i + 1}
                      </span>
                      <Link href={`/article/${article.slug}`} className="flex-1 pt-1">
                        <h4 className="font-serif font-bold text-lg leading-tight group-hover:text-primary transition-colors">
                          {article.title}
                        </h4>
                        <div className="text-xs text-muted-foreground mt-2 font-medium">
                          {new Date(article.publishedAt).toLocaleDateString()}
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Advertisement Placeholder */}
              <div className="bg-zinc-50 border border-zinc-200 p-8 flex flex-col items-center justify-center text-center">
                <span className="text-zinc-400 text-xs font-bold uppercase tracking-widest mb-2">Advertisement</span>
                <div className="w-full h-[250px] bg-zinc-200 flex items-center justify-center border border-zinc-300">
                  <span className="text-zinc-400 font-serif italic">Ad Space</span>
                </div>
                <Link href="/advertise" className="mt-4 text-xs font-bold text-primary hover:underline uppercase tracking-wider">
                  Advertise with us
                </Link>
              </div>
            </aside>

          </div>
        </div>
      </section>

      <NewsletterSection />
    </Layout>
  );
}
