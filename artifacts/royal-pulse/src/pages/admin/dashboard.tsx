import React from 'react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { withAuth } from '@/components/layout/withAuth';
import { useGetArticleStats } from '@workspace/api-client-react';
import { FileText, Eye, AlertCircle, Star, BarChart2 } from 'lucide-react';
import { Link } from 'wouter';

function AdminDashboard() {
  const { data: stats, isLoading } = useGetArticleStats();

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="animate-pulse space-y-6">
          <div className="h-8 w-64 bg-zinc-900 rounded" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map(i => <div key={i} className="h-32 bg-zinc-900 rounded-xl" />)}
          </div>
        </div>
      </AdminLayout>
    );
  }

  const statCards = [
    { label: 'Total Articles', value: stats?.totalArticles || 0, icon: FileText, color: 'text-blue-500' },
    { label: 'Total Views', value: stats?.totalViews || 0, icon: Eye, color: 'text-green-500' },
    { label: 'Breaking News', value: stats?.breakingCount || 0, icon: AlertCircle, color: 'text-red-500' },
    { label: 'Featured', value: stats?.featuredCount || 0, icon: Star, color: 'text-amber-500' },
  ];

  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Dashboard Overview</h1>
            <p className="text-zinc-400">Welcome to the Royal Pulse administrative portal.</p>
          </div>
          <Link 
            href="/admin/articles/new" 
            className="bg-primary hover:bg-primary/90 text-white font-bold py-2.5 px-6 rounded-md transition-colors inline-flex items-center justify-center gap-2"
          >
            <FileText className="w-4 h-4" />
            Write Article
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {statCards.map((stat, idx) => (
            <div key={idx} className="bg-zinc-950 border border-zinc-800 rounded-xl p-6 flex items-start gap-4">
              <div className={`p-3 bg-zinc-900 rounded-lg ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-zinc-400 text-sm font-medium mb-1">{stat.label}</p>
                <h3 className="text-2xl font-bold text-white">{stat.value.toLocaleString()}</h3>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Category Breakdown */}
          <div className="lg:col-span-2 bg-zinc-950 border border-zinc-800 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <BarChart2 className="text-primary w-5 h-5" />
              <h2 className="text-xl font-bold text-white">Articles by Category</h2>
            </div>
            
            <div className="space-y-4">
              {stats?.categoryBreakdown.map((cat) => {
                const percentage = stats.totalArticles > 0 
                  ? Math.round((cat.count / stats.totalArticles) * 100) 
                  : 0;
                  
                return (
                  <div key={cat.category}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-zinc-300 font-medium capitalize">{cat.category}</span>
                      <span className="text-zinc-500">{cat.count} ({percentage}%)</span>
                    </div>
                    <div className="w-full bg-zinc-900 rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full" 
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
              
              {(!stats?.categoryBreakdown || stats.categoryBreakdown.length === 0) && (
                <div className="text-center py-8 text-zinc-500 italic">
                  No article data available
                </div>
              )}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-6">Publishing Status</h2>
            
            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-zinc-800 before:to-transparent">
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-zinc-900 border-4 border-zinc-950 text-green-500 shadow shrink-0 z-10">
                  <div className="w-3 h-3 bg-green-500 rounded-full" />
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-zinc-800 bg-zinc-900/50">
                  <h3 className="font-bold text-white mb-1">Published</h3>
                  <p className="text-3xl font-bold text-zinc-300">{stats?.publishedArticles}</p>
                </div>
              </div>
              
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-zinc-900 border-4 border-zinc-950 text-amber-500 shadow shrink-0 z-10">
                  <div className="w-3 h-3 bg-amber-500 rounded-full" />
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-zinc-800 bg-zinc-900/50">
                  <h3 className="font-bold text-white mb-1">Drafts</h3>
                  <p className="text-3xl font-bold text-zinc-300">{stats?.draftArticles}</p>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default withAuth(AdminDashboard);
