import React, { useEffect, useRef } from 'react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { withAuth } from '@/components/layout/withAuth';
import { 
  useCreateArticle, 
  useUpdateArticle, 
  useGetArticleBySlug,
  useUploadImage
} from '@workspace/api-client-react';
import { useLocation, useParams } from 'wouter';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage,
  FormDescription
} from '@/components/ui/form';
import { toast } from 'sonner';
import { Save, ArrowLeft, Image as ImageIcon, Loader2 } from 'lucide-react';
import { Link } from 'wouter';

const articleSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  excerpt: z.string().min(10, 'Excerpt must be at least 10 characters'),
  content: z.string().min(50, 'Content must be at least 50 characters'),
  category: z.string().min(2, 'Please select a category'),
  author: z.string().min(2, 'Author name is required'),
  imageUrl: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  status: z.enum(['draft', 'published']),
  isFeatured: z.boolean().default(false),
  isBreaking: z.boolean().default(false),
  readTime: z.coerce.number().min(1).optional()
});

type ArticleFormValues = z.infer<typeof articleSchema>;

const categories = [
  'politics', 'entertainment', 'sports', 'business', 'technology', 'world', 'local'
];

function ArticleForm() {
  const [, setLocation] = useLocation();
  const params = useParams();
  
  // Use params.id as slug if it exists, since we use slugs for fetching
  // Wait, the API uses ID for update but slug for fetch. 
  // Let's assume params.id is the slug for editing.
  // We need to fetch by slug, get the ID, then update by ID.
  const isEditing = !!params.id && params.id !== 'new';
  const slugToFetch = isEditing ? params.id : '';
  
  const { data: existingArticle, isLoading: isLoadingArticle } = useGetArticleBySlug(slugToFetch as string, {
    query: {
      enabled: isEditing
    }
  });

  const createMutation = useCreateArticle();
  const updateMutation = useUpdateArticle();
  const uploadMutation = useUploadImage();

  const form = useForm<ArticleFormValues>({
    resolver: zodResolver(articleSchema),
    defaultValues: {
      title: '',
      excerpt: '',
      content: '',
      category: 'politics',
      author: 'Royal Pulse Staff',
      imageUrl: '',
      status: 'draft',
      isFeatured: false,
      isBreaking: false,
      readTime: 5
    }
  });

  const initRef = useRef(false);
  useEffect(() => {
    if (existingArticle && !initRef.current) {
      initRef.current = true;
      form.reset({
        title: existingArticle.title,
        excerpt: existingArticle.excerpt,
        content: existingArticle.content,
        category: existingArticle.category,
        author: existingArticle.author,
        imageUrl: existingArticle.imageUrl || '',
        status: existingArticle.status,
        isFeatured: existingArticle.isFeatured,
        isBreaking: existingArticle.isBreaking,
        readTime: existingArticle.readTime || 5
      });
    }
  }, [existingArticle, form]);

  const onSubmit = (values: ArticleFormValues) => {
    const payload = {
      ...values,
      imageUrl: values.imageUrl || undefined
    };

    if (isEditing && existingArticle) {
      updateMutation.mutate(
        { id: existingArticle.id, data: payload },
        {
          onSuccess: () => {
            toast.success('Article updated successfully');
            setLocation('/admin/articles');
          },
          onError: (err) => {
            toast.error('Failed to update article');
            console.error(err);
          }
        }
      );
    } else {
      createMutation.mutate(
        { data: payload },
        {
          onSuccess: () => {
            toast.success('Article created successfully');
            setLocation('/admin/articles');
          },
          onError: (err) => {
            toast.error('Failed to create article');
            console.error(err);
          }
        }
      );
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Convert file to data URL for the mock API
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64Url = reader.result as string;
      
      const toastId = toast.loading('Uploading image...');
      
      uploadMutation.mutate(
        { data: { imageUrl: base64Url } },
        {
          onSuccess: (res) => {
            form.setValue('imageUrl', res.url);
            toast.success('Image uploaded', { id: toastId });
          },
          onError: () => {
            // Fallback for mock API if needed
            form.setValue('imageUrl', base64Url);
            toast.success('Image loaded locally (mock)', { id: toastId });
          }
        }
      );
    };
    reader.readAsDataURL(file);
  };

  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  if (isEditing && isLoadingArticle) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="max-w-5xl mx-auto pb-20">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/admin/articles" className="p-2 bg-zinc-900 rounded-md text-zinc-400 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-white">
              {isEditing ? 'Edit Article' : 'New Article'}
            </h1>
            <p className="text-zinc-400">
              {isEditing ? 'Update existing content' : 'Create and publish a new story'}
            </p>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Main Content Area */}
              <div className="lg:col-span-2 space-y-6 bg-zinc-950 border border-zinc-800 p-6 rounded-xl">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-zinc-300">Headline</FormLabel>
                      <FormControl>
                        <input 
                          {...field} 
                          className="w-full bg-zinc-900 border border-zinc-700 text-white h-12 px-4 rounded-md font-serif text-lg focus:outline-none focus:border-primary"
                          placeholder="Enter article headline..."
                        />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="excerpt"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-zinc-300">Excerpt / Summary</FormLabel>
                      <FormControl>
                        <textarea 
                          {...field} 
                          className="w-full bg-zinc-900 border border-zinc-700 text-white p-4 rounded-md focus:outline-none focus:border-primary resize-none h-24"
                          placeholder="A brief summary for cards and meta description..."
                        />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-zinc-300">Article Content (Markdown supported)</FormLabel>
                      <FormControl>
                        <textarea 
                          {...field} 
                          className="w-full bg-zinc-900 border border-zinc-700 text-white p-4 rounded-md focus:outline-none focus:border-primary font-mono text-sm resize-y min-h-[400px]"
                          placeholder="Write the full story here..."
                        />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />
              </div>

              {/* Sidebar Controls */}
              <div className="space-y-6">
                
                {/* Publish Settings */}
                <div className="bg-zinc-950 border border-zinc-800 p-6 rounded-xl space-y-6">
                  <h3 className="font-bold text-white text-lg border-b border-zinc-800 pb-3">Publish Settings</h3>
                  
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-zinc-300">Status</FormLabel>
                        <FormControl>
                          <select 
                            {...field}
                            className="w-full bg-zinc-900 border border-zinc-700 text-white h-10 px-3 rounded-md focus:outline-none focus:border-primary"
                          >
                            <option value="draft">Draft</option>
                            <option value="published">Published</option>
                          </select>
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <div className="space-y-4 pt-4 border-t border-zinc-800">
                    <FormField
                      control={form.control}
                      name="isFeatured"
                      render={({ field }) => (
                        <FormItem className="flex items-center justify-between gap-2 space-y-0">
                          <div className="space-y-0.5">
                            <FormLabel className="text-zinc-300 text-base">Featured</FormLabel>
                            <FormDescription className="text-zinc-500 text-xs">Show in homepage hero</FormDescription>
                          </div>
                          <FormControl>
                            <input 
                              type="checkbox" 
                              checked={field.value} 
                              onChange={field.onChange}
                              className="w-5 h-5 accent-primary rounded bg-zinc-900 border-zinc-700"
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="isBreaking"
                      render={({ field }) => (
                        <FormItem className="flex items-center justify-between gap-2 space-y-0">
                          <div className="space-y-0.5">
                            <FormLabel className="text-zinc-300 text-base">Breaking News</FormLabel>
                            <FormDescription className="text-zinc-500 text-xs">Show in top ticker</FormDescription>
                          </div>
                          <FormControl>
                            <input 
                              type="checkbox" 
                              checked={field.value} 
                              onChange={field.onChange}
                              className="w-5 h-5 accent-red-600 rounded bg-zinc-900 border-zinc-700"
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Metadata */}
                <div className="bg-zinc-950 border border-zinc-800 p-6 rounded-xl space-y-4">
                  <h3 className="font-bold text-white text-lg border-b border-zinc-800 pb-3">Metadata</h3>
                  
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-zinc-300">Category</FormLabel>
                        <FormControl>
                          <select 
                            {...field}
                            className="w-full bg-zinc-900 border border-zinc-700 text-white h-10 px-3 rounded-md focus:outline-none focus:border-primary capitalize"
                          >
                            {categories.map(c => <option key={c} value={c}>{c}</option>)}
                          </select>
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="author"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-zinc-300">Author</FormLabel>
                        <FormControl>
                          <input 
                            {...field} 
                            className="w-full bg-zinc-900 border border-zinc-700 text-white h-10 px-3 rounded-md focus:outline-none focus:border-primary"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="readTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-zinc-300">Read Time (mins)</FormLabel>
                        <FormControl>
                          <input 
                            type="number"
                            {...field} 
                            className="w-full bg-zinc-900 border border-zinc-700 text-white h-10 px-3 rounded-md focus:outline-none focus:border-primary"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                {/* Image */}
                <div className="bg-zinc-950 border border-zinc-800 p-6 rounded-xl space-y-4">
                  <h3 className="font-bold text-white text-lg border-b border-zinc-800 pb-3">Featured Image</h3>
                  
                  <div className="space-y-4">
                    {form.watch('imageUrl') ? (
                      <div className="relative aspect-video rounded-md overflow-hidden border border-zinc-700 group">
                        <img 
                          src={form.watch('imageUrl')} 
                          alt="Featured preview" 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <button 
                            type="button"
                            onClick={() => form.setValue('imageUrl', '')}
                            className="px-3 py-1.5 bg-red-600 text-white rounded text-sm font-medium"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ) : (
                      <label className="flex flex-col items-center justify-center border-2 border-dashed border-zinc-700 rounded-lg p-6 cursor-pointer hover:bg-zinc-900 hover:border-zinc-500 transition-colors">
                        <ImageIcon className="w-8 h-8 text-zinc-500 mb-2" />
                        <span className="text-sm font-medium text-zinc-300">Click to upload image</span>
                        <input 
                          type="file" 
                          accept="image/*" 
                          className="hidden" 
                          onChange={handleImageUpload}
                        />
                      </label>
                    )}
                    
                    <FormField
                      control={form.control}
                      name="imageUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-zinc-400 text-xs">Or use Image URL</FormLabel>
                          <FormControl>
                            <input 
                              {...field} 
                              placeholder="https://..."
                              className="w-full bg-zinc-900 border border-zinc-700 text-white h-9 px-3 rounded-md text-sm focus:outline-none focus:border-primary"
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

              </div>
            </div>

            {/* Bottom Actions */}
            <div className="fixed bottom-0 left-0 md:left-64 right-0 p-4 bg-zinc-950 border-t border-zinc-800 flex justify-end gap-4 z-10">
              <Link 
                href="/admin/articles"
                className="px-6 py-2.5 rounded-md text-zinc-300 hover:text-white font-medium hover:bg-zinc-900 transition-colors"
              >
                Cancel
              </Link>
              <button 
                type="submit"
                disabled={isSubmitting}
                className="bg-primary hover:bg-primary/90 text-white font-bold py-2.5 px-8 rounded-md transition-colors flex items-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                {isEditing ? 'Update Article' : 'Publish Article'}
              </button>
            </div>
          </form>
        </Form>
      </div>
    </AdminLayout>
  );
}

export default withAuth(ArticleForm);
