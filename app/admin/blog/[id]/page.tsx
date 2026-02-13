'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Loader2, Save } from 'lucide-react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';
import { blogPostSchema, BlogPostFormValues } from '@/lib/validations';
import { createClient } from '@/lib/supabase/client';
import { BlogPost } from '@/types';

interface Props {
  params: Promise<{ id: string }>;
}

export default function EditBlogPostPage({ params }: Props) {
  const { id } = use(params);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [post, setPost] = useState<BlogPost | null>(null);

  const form = useForm<BlogPostFormValues>({
    resolver: zodResolver(blogPostSchema),
    defaultValues: {
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      cover_image_url: '',
      published: false,
    },
  });

  useEffect(() => {
    async function fetchPost() {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('id', id)
        .single();

      if (error || !data) {
        router.push('/admin/blog');
        return;
      }

      setPost(data);
      form.reset({
        title: data.title,
        slug: data.slug,
        excerpt: data.excerpt,
        content: data.content,
        cover_image_url: data.cover_image_url || '',
        published: data.published,
      });
      setIsLoading(false);
    }
    fetchPost();
  }, [id, form, router]);

  const onSubmit = async (data: BlogPostFormValues) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const supabase = createClient();
      const { error } = await supabase
        .from('blog_posts')
        .update({
          title: data.title,
          slug: data.slug,
          excerpt: data.excerpt,
          content: data.content,
          cover_image_url: data.cover_image_url || null,
          published: data.published,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id);

      if (error) {
        if (error.code === '23505') {
          throw new Error('A post with this slug already exists');
        }
        throw error;
      }

      router.push('/admin/blog');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update post');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen bg-muted/30">
        <AdminSidebar />
        <div className="flex-1">
          <AdminHeader title="Edit Blog Post" />
          <main className="p-8">
            <div className="text-center py-20">
              <Loader2 className="w-8 h-8 animate-spin mx-auto text-muted-foreground" />
              <p className="text-muted-foreground mt-4">Loading...</p>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-muted/30">
      <AdminSidebar />
      <div className="flex-1">
        <AdminHeader title="Edit Blog Post" />
        <main className="p-8">
          <Button asChild variant="ghost" className="mb-6">
            <Link href="/admin/blog">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog Posts
            </Link>
          </Button>

          <Card>
            <CardHeader>
              <CardTitle>Edit Post</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  {error && (
                    <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-lg">
                      {error}
                    </div>
                  )}

                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title *</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter post title" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="slug"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Slug *</FormLabel>
                        <FormControl>
                          <Input placeholder="post-url-slug" {...field} />
                        </FormControl>
                        <FormDescription>
                          URL-friendly version of the title
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="excerpt"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Excerpt *</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Brief summary of the post..."
                            rows={3}
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Short description shown in post cards
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="cover_image_url"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cover Image URL</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="https://example.com/image.jpg"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          URL to the cover image (optional)
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Content *</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Write your post content here... (Markdown supported)"
                            rows={15}
                            className="font-mono"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Supports basic Markdown: **bold**, *italic*,
                          [links](url), # headers
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="published"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Published</FormLabel>
                          <FormDescription>
                            If unchecked, the post will be saved as a draft
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />

                  <div className="flex gap-4">
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="mr-2 h-4 w-4" />
                          Save Changes
                        </>
                      )}
                    </Button>
                    <Button type="button" variant="outline" asChild>
                      <Link href="/admin/blog">Cancel</Link>
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
