import React, { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { useGetArticleBySlug, useIncrementArticleView, useCreateComment, useListComments, getListCommentsQueryKey } from '@workspace/api-client-react';
import { useParams, Link } from 'wouter';
import { ArticleCard } from '@/components/ArticleCard';
import { Clock, User, Share2, MessageCircle, AlertCircle, Copy, Check } from 'lucide-react';
import { FaWhatsapp, FaFacebook, FaTwitter } from 'react-icons/fa';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';
import ReactMarkdown from 'react-markdown';

export default function ArticlePage() {
  const { slug } = useParams();
  const [hasIncremented, setHasIncremented] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  
  const queryClient = useQueryClient();
  const incrementView = useIncrementArticleView();

  const { data: article, isLoading, error } = useGetArticleBySlug(slug || '', {
    query: {
      enabled: !!slug
    }
  });

  const { data: comments } = useListComments(article?.id || 0, {
    query: {
      enabled: !!article?.id
    }
  });

  const createComment = useCreateComment({
    mutation: {
      onSuccess: () => {
        toast.success('Comment posted successfully');
        if (article) {
          queryClient.invalidateQueries({ queryKey: getListCommentsQueryKey(article.id) });
        }
        setCommentForm({ authorName: '', authorEmail: '', content: '' });
      },
      onError: () => toast.error('Failed to post comment')
    }
  });

  const [commentForm, setCommentForm] = useState({
    authorName: '',
    authorEmail: '',
    content: ''
  });

  React.useEffect(() => {
    if (article?.id && !hasIncremented) {
      incrementView.mutate({ id: article.id });
      setHasIncremented(true);
    }
  }, [article?.id, hasIncremented, incrementView]);

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 max-w-4xl animate-pulse">
          <div className="h-6 w-32 bg-zinc-200 mb-6" />
          <div className="h-12 md:h-20 w-full bg-zinc-200 mb-6" />
          <div className="h-8 w-2/3 bg-zinc-200 mb-10" />
          <div className="h-[400px] w-full bg-zinc-200 mb-10" />
          <div className="space-y-4">
            <div className="h-4 w-full bg-zinc-200" />
            <div className="h-4 w-full bg-zinc-200" />
            <div className="h-4 w-5/6 bg-zinc-200" />
          </div>
        </div>
      </Layout>
    );
  }

  if (error || !article) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
          <AlertCircle className="w-16 h-16 text-primary mx-auto mb-4" />
          <h1 className="font-serif text-3xl font-bold mb-4">Article Not Found</h1>
          <p className="text-muted-foreground mb-8">The story you're looking for doesn't exist or has been removed.</p>
          <Link href="/" className="bg-black text-white px-6 py-3 font-bold uppercase tracking-wider text-sm hover:bg-primary transition-colors">
            Return to Homepage
          </Link>
        </div>
      </Layout>
    );
  }

  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareText = encodeURIComponent(`Read: ${article.title} on Royal Pulse`);
  const shareUrl = encodeURIComponent(currentUrl);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopiedLink(true);
    toast.success('Link copied to clipboard');
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const submitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentForm.authorName || !commentForm.content) return;
    createComment.mutate({
      articleId: article.id,
      data: commentForm
    });
  };

  return (
    <Layout>
      <article className="bg-white">
        {/* Article Header */}
        <header className="container mx-auto px-4 pt-12 pb-8 max-w-4xl">
          <div className="flex items-center gap-3 mb-6">
            <Link href={`/category/${article.category.toLowerCase()}`} className="text-primary font-bold uppercase tracking-widest text-sm hover:underline">
              {article.category}
            </Link>
            {article.isBreaking && (
              <span className="bg-red-600 text-white text-xs font-bold uppercase tracking-widest px-2 py-0.5 animate-pulse">
                Breaking
              </span>
            )}
          </div>
          
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] mb-6 text-black">
            {article.title}
          </h1>
          
          <p className="text-xl md:text-2xl text-zinc-600 font-serif italic leading-relaxed mb-8 border-l-4 border-primary pl-6 py-1">
            {article.excerpt}
          </p>
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between py-6 border-y border-zinc-200 gap-4">
            <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-zinc-500">
              <div className="flex items-center gap-2 text-black">
                <div className="w-8 h-8 rounded-full bg-zinc-100 border border-zinc-200 flex items-center justify-center">
                  <User className="w-4 h-4 text-zinc-600" />
                </div>
                <span className="font-bold">{article.author}</span>
              </div>
              <span className="hidden sm:inline w-1 h-1 rounded-full bg-zinc-300" />
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                {new Date(article.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </div>
              {article.readTime && (
                <>
                  <span className="w-1 h-1 rounded-full bg-zinc-300" />
                  <span>{article.readTime} min read</span>
                </>
              )}
              <span className="w-1 h-1 rounded-full bg-zinc-300" />
              <div className="flex items-center gap-1.5">
                <EyeIcon className="w-4 h-4" />
                {article.views.toLocaleString()} views
              </div>
            </div>
            
            {/* Share Buttons */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-widest text-zinc-400 mr-2">Share</span>
              <a href={`https://wa.me/?text=${shareText}%20${shareUrl}`} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-600 hover:bg-[#25D366] hover:text-white transition-colors">
                <FaWhatsapp className="w-4 h-4" />
              </a>
              <a href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-600 hover:bg-[#1877F2] hover:text-white transition-colors">
                <FaFacebook className="w-4 h-4" />
              </a>
              <a href={`https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-600 hover:bg-black hover:text-white transition-colors">
                <FaTwitter className="w-4 h-4" />
              </a>
              <button onClick={handleCopyLink} className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-600 hover:bg-zinc-200 transition-colors" title="Copy Link">
                {copiedLink ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        {article.imageUrl && (
          <div className="container mx-auto px-4 max-w-5xl mb-12">
            <div className="aspect-video w-full bg-zinc-100 relative">
              <img 
                src={article.imageUrl} 
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}

        {/* Article Body */}
        <div className="container mx-auto px-4 max-w-3xl mb-16">
          <div className="prose prose-lg md:prose-xl prose-zinc max-w-none prose-headings:font-serif prose-headings:font-bold prose-a:text-primary prose-a:no-underline hover:prose-a:underline">
            <ReactMarkdown>{article.content}</ReactMarkdown>
          </div>
          
          <div className="mt-12 pt-8 border-t border-zinc-200 flex flex-wrap gap-2">
            <span className="text-sm font-bold uppercase tracking-wider text-zinc-500 mr-2 self-center">Tags:</span>
            <Link href={`/category/${article.category.toLowerCase()}`} className="bg-zinc-100 text-zinc-700 px-3 py-1 text-sm font-medium hover:bg-zinc-200 transition-colors capitalize">
              {article.category}
            </Link>
          </div>
        </div>

        {/* Comments Section */}
        <div className="bg-zinc-50 border-t border-zinc-200 py-16">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="flex items-center gap-3 mb-8">
              <MessageCircle className="w-6 h-6 text-primary" />
              <h2 className="font-serif text-2xl font-bold">Comments ({comments?.length || 0})</h2>
            </div>

            {/* Comment Form */}
            <form onSubmit={submitComment} className="bg-white p-6 border border-zinc-200 shadow-sm mb-12">
              <h3 className="font-bold text-lg mb-4">Leave a Reply</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <input 
                  type="text" 
                  required
                  placeholder="Name *" 
                  value={commentForm.authorName}
                  onChange={e => setCommentForm({...commentForm, authorName: e.target.value})}
                  className="w-full border border-zinc-300 p-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary font-medium"
                />
                <input 
                  type="email" 
                  placeholder="Email (optional)" 
                  value={commentForm.authorEmail}
                  onChange={e => setCommentForm({...commentForm, authorEmail: e.target.value})}
                  className="w-full border border-zinc-300 p-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary font-medium"
                />
              </div>
              <textarea 
                required
                placeholder="Your comment *" 
                rows={4}
                value={commentForm.content}
                onChange={e => setCommentForm({...commentForm, content: e.target.value})}
                className="w-full border border-zinc-300 p-3 text-sm mb-4 resize-none focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              />
              <button 
                type="submit"
                disabled={createComment.isPending}
                className="bg-primary text-white px-8 py-3 font-bold uppercase tracking-wider text-sm hover:bg-primary/90 transition-colors disabled:opacity-50"
              >
                {createComment.isPending ? 'Posting...' : 'Post Comment'}
              </button>
            </form>

            {/* Comments List */}
            <div className="space-y-6">
              {comments?.map(comment => (
                <div key={comment.id} className="bg-white p-6 border border-zinc-200">
                  <div className="flex items-center justify-between mb-3">
                    <div className="font-bold text-black">{comment.authorName}</div>
                    <div className="text-xs text-zinc-500 font-medium">
                      {new Date(comment.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </div>
                  </div>
                  <p className="text-zinc-700">{comment.content}</p>
                </div>
              ))}
              {comments?.length === 0 && (
                <div className="text-center text-zinc-500 py-8 italic font-serif">
                  No comments yet. Be the first to share your thoughts.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Related Articles */}
        {article.related && article.related.length > 0 && (
          <div className="bg-black py-16 text-white border-t-4 border-primary">
            <div className="container mx-auto px-4 max-w-6xl">
              <h2 className="font-serif text-3xl font-bold mb-8 uppercase tracking-tight text-center md:text-left">
                Read Next
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {article.related.slice(0, 3).map(related => (
                  <Link key={related.id} href={`/article/${related.slug}`} className="group block">
                    <div className="aspect-[3/2] bg-zinc-800 mb-4 overflow-hidden relative border border-zinc-800">
                      {related.imageUrl && (
                        <img 
                          src={related.imageUrl} 
                          alt={related.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                        />
                      )}
                      <div className="absolute top-0 left-0 bg-primary px-2 py-1 text-xs font-bold uppercase tracking-widest text-white">
                        {related.category}
                      </div>
                    </div>
                    <h3 className="font-serif text-lg font-bold leading-tight group-hover:text-primary transition-colors line-clamp-3">
                      {related.title}
                    </h3>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </article>
    </Layout>
  );
}

// Simple Eye icon since we can't import FaEye easily if not in lucide
function EyeIcon(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}
