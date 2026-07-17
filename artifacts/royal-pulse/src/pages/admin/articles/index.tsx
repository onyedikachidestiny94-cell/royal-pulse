import React from 'react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { withAuth } from '@/components/layout/withAuth';
import { 
  useListAdminArticles, 
  useDeleteArticle,
  getListAdminArticlesQueryKey
} from '@workspace/api-client-react';
import { Link } from 'wouter';
import { Edit, Trash2, ExternalLink, PlusCircle, Search } from 'lucide-react';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';

function AdminArticlesPage() {
  const [page, setPage] = React.useState(1);
  const [status, setStatus] = React.useState<'all' | 'published' | 'draft'>('all');
  
  const queryClient = useQueryClient();
  const { data, isLoading } = useListAdminArticles({ 
    page, 
    limit: 10,
    status: status === 'all' ? undefined : status
  });
  
  const deleteMutation = useDeleteArticle({
    mutation: {
      onSuccess: () => {
        toast.success('Article deleted successfully');
        queryClient.invalidateQueries({ queryKey: getListAdminArticlesQueryKey() });
      },
      onError: () => {
        toast.error('Failed to delete article');
      }
    }
  });

  const handleDelete = (id: number, title: string) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      deleteMutation.mutate({ id });
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Manage Articles</h1>
            <p className="text-zinc-400">View, edit, and manage all your news content.</p>
          </div>
          <Link 
            href="/admin/articles/new" 
            className="bg-primary hover:bg-primary/90 text-white font-bold py-2.5 px-6 rounded-md transition-colors inline-flex items-center justify-center gap-2"
          >
            <PlusCircle className="w-5 h-5" />
            New Article
          </Link>
        </div>

        <div className="bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden shadow-xl">
          <div className="p-4 border-b border-zinc-800 flex flex-col sm:flex-row gap-4 justify-between items-center bg-zinc-900/50">
            <div className="flex gap-2 w-full sm:w-auto">
              {(['all', 'published', 'draft'] as const).map(s => (
                <button
                  key={s}
                  onClick={() => { setStatus(s); setPage(1); }}
                  className={`px-4 py-2 rounded-md text-sm font-medium capitalize transition-colors ${
                    status === s 
                      ? 'bg-zinc-800 text-white' 
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
            
            {/* Search Placeholder - if we had admin search endpoint */}
            <div className="relative w-full sm:w-64 hidden md:block">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
              <input 
                type="text" 
                placeholder="Filter (UI only placeholder)..." 
                className="w-full bg-zinc-900 border border-zinc-700 text-white h-9 pl-9 pr-4 rounded-md text-sm focus:outline-none focus:border-primary disabled:opacity-50"
                disabled
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-zinc-900/80 text-zinc-400 text-xs uppercase tracking-wider border-b border-zinc-800">
                  <th className="p-4 font-medium">Title</th>
                  <th className="p-4 font-medium">Category</th>
                  <th className="p-4 font-medium">Status</th>
                  <th className="p-4 font-medium">Date</th>
                  <th className="p-4 font-medium">Views</th>
                  <th className="p-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800 text-sm">
                {isLoading ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-zinc-500">Loading articles...</td>
                  </tr>
                ) : !data?.articles || data.articles.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-zinc-500">No articles found.</td>
                  </tr>
                ) : (
                  data.articles.map((article) => (
                    <tr key={article.id} className="hover:bg-zinc-900/30 transition-colors group">
                      <td className="p-4">
                        <div className="font-bold text-white mb-1 truncate max-w-[300px]" title={article.title}>
                          {article.title}
                        </div>
                        <div className="flex gap-2">
                          {article.isBreaking && <span className="text-[10px] text-red-500 font-bold uppercase border border-red-500/30 px-1.5 rounded bg-red-500/10">Breaking</span>}
                          {article.isFeatured && <span className="text-[10px] text-amber-500 font-bold uppercase border border-amber-500/30 px-1.5 rounded bg-amber-500/10">Featured</span>}
                        </div>
                      </td>
                      <td className="p-4 text-zinc-300 capitalize">{article.category}</td>
                      <td className="p-4">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                          article.status === 'published' 
                            ? 'bg-green-500/10 text-green-500 border border-green-500/20' 
                            : 'bg-zinc-800 text-zinc-400 border border-zinc-700'
                        }`}>
                          {article.status}
                        </span>
                      </td>
                      <td className="p-4 text-zinc-400 whitespace-nowrap">
                        {new Date(article.publishedAt).toLocaleDateString()}
                      </td>
                      <td className="p-4 text-zinc-400">{article.views.toLocaleString()}</td>
                      <td className="p-4">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          {article.status === 'published' && (
                            <Link href={`/article/${article.slug}`} target="_blank" className="p-2 text-zinc-400 hover:text-white bg-zinc-900 rounded-md transition-colors" title="View">
                              <ExternalLink className="w-4 h-4" />
                            </Link>
                          )}
                          <Link href={`/admin/articles/${article.id}/edit`} className="p-2 text-zinc-400 hover:text-white bg-zinc-900 rounded-md transition-colors" title="Edit">
                            <Edit className="w-4 h-4" />
                          </Link>
                          <button 
                            onClick={() => handleDelete(article.id, article.title)}
                            disabled={deleteMutation.isPending}
                            className="p-2 text-zinc-400 hover:text-red-500 bg-zinc-900 rounded-md transition-colors disabled:opacity-50" 
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {data && data.totalPages > 1 && (
            <div className="p-4 border-t border-zinc-800 flex items-center justify-between bg-zinc-900/50">
              <div className="text-sm text-zinc-400">
                Showing page <span className="font-bold text-white">{data.page}</span> of <span className="font-bold text-white">{data.totalPages}</span>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-4 py-2 border border-zinc-700 rounded-md text-sm text-white disabled:opacity-50 hover:bg-zinc-800 transition-colors"
                >
                  Previous
                </button>
                <button 
                  onClick={() => setPage(p => Math.min(data.totalPages, p + 1))}
                  disabled={page === data.totalPages}
                  className="px-4 py-2 border border-zinc-700 rounded-md text-sm text-white disabled:opacity-50 hover:bg-zinc-800 transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}

export default withAuth(AdminArticlesPage);
