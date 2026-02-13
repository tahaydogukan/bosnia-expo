import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calendar, User } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { BlogPost, Comment } from '@/types';
import CommentSection from './CommentSection';

interface Props {
  params: Promise<{ slug: string }>;
}

async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single();

  if (error) {
    return null;
  }

  return data;
}

async function getComments(postId: string): Promise<Comment[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('comments')
    .select('*')
    .eq('post_id', postId)
    .eq('status', 'approved')
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Error fetching comments:', error);
    return [];
  }

  return data || [];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.created_at,
      images: post.cover_image_url ? [post.cover_image_url] : [],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const comments = await getComments(post.id);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-gradient-hero py-16 text-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <Button
            asChild
            variant="ghost"
            className="mb-6 text-white/80 hover:text-white hover:bg-white/10"
          >
            <Link href="/blog">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>
          </Button>

          <div className="flex items-center gap-4 text-sm text-white/70 mb-4">
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {format(new Date(post.created_at), 'MMMM d, yyyy')}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
            {post.title}
          </h1>

          <p className="text-white/80 text-lg mt-4 max-w-2xl">{post.excerpt}</p>
        </div>
      </div>

      {/* Cover Image */}
      {post.cover_image_url && (
        <div className="container mx-auto px-4 max-w-4xl -mt-8 relative z-10">
          <div className="aspect-video rounded-2xl overflow-hidden shadow-xl">
            <img
              src={post.cover_image_url}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}

      {/* Content */}
      <article className="container mx-auto px-4 max-w-4xl py-12">
        <div
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: formatContent(post.content) }}
        />
      </article>

      {/* Comments Section */}
      <div className="border-t">
        <div className="container mx-auto px-4 max-w-4xl py-12">
          <CommentSection postId={post.id} comments={comments} />
        </div>
      </div>
    </div>
  );
}

// Simple markdown-like formatting (basic implementation)
function formatContent(content: string): string {
  const formatted = content
    // Headers
    .replace(/^### (.*$)/gim, '<h3 class="text-xl font-semibold mt-8 mb-4">$1</h3>')
    .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-semibold mt-10 mb-4">$1</h2>')
    .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold mt-12 mb-6">$1</h1>')
    // Bold
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    // Italic
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-primary hover:underline" target="_blank" rel="noopener">$1</a>')
    // Line breaks
    .replace(/\n\n/g, '</p><p class="mb-4">')
    .replace(/\n/g, '<br />');

  // Wrap in paragraph
  return `<p class="mb-4">${formatted}</p>`;
}
