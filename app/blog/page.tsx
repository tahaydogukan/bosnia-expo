import { Metadata } from 'next';
import Link from 'next/link';
import { Calendar, ArrowLeft } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { BlogPost } from '@/types';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Latest news, insights, and updates from Bosnia Healthcare Expo.',
};

async function getBlogPosts(): Promise<BlogPost[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching posts:', error);
    return [];
  }

  return data || [];
}

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <div className="bg-gradient-hero py-20 text-white">
        <div className="container mx-auto px-4">
          <Button asChild variant="ghost" className="mb-6 text-white/80 hover:text-white hover:bg-white/10">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog</h1>
          <p className="text-white/80 text-lg max-w-2xl">
            Stay updated with the latest news, industry insights, and event
            updates from Bosnia Healthcare Expo.
          </p>
        </div>
      </div>

      {/* Posts Grid */}
      <div className="container mx-auto px-4 py-16">
        {posts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">
              No blog posts yet. Check back soon!
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`}>
                <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow group">
                  {/* Cover Image */}
                  <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 relative overflow-hidden">
                    {post.cover_image_url ? (
                      <img
                        src={post.cover_image_url}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-muted-foreground text-sm">
                          No image
                        </span>
                      </div>
                    )}
                  </div>
                  <CardContent className="p-6">
                    {/* Date */}
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {format(new Date(post.created_at), 'MMM d, yyyy')}
                      </span>
                    </div>
                    {/* Title */}
                    <h2 className="font-semibold text-xl mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h2>
                    {/* Excerpt */}
                    <p className="text-muted-foreground line-clamp-3">
                      {post.excerpt}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
