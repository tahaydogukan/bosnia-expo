'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { format } from 'date-fns';
import { Plus, Edit, Eye, EyeOff, Trash2 } from 'lucide-react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { createClient } from '@/lib/supabase/client';
import { BlogPost } from '@/types';

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setPosts(data);
    }
    setIsLoading(false);
  }

  async function togglePublish(post: BlogPost) {
    const supabase = createClient();
    const { error } = await supabase
      .from('blog_posts')
      .update({ published: !post.published })
      .eq('id', post.id);

    if (!error) {
      fetchPosts();
    }
  }

  async function deletePost(id: string) {
    if (!confirm('Are you sure you want to delete this post?')) return;

    const supabase = createClient();
    const { error } = await supabase.from('blog_posts').delete().eq('id', id);

    if (!error) {
      fetchPosts();
    }
  }

  return (
    <div className="flex min-h-screen bg-muted/30">
      <AdminSidebar />
      <div className="flex-1">
        <AdminHeader title="Blog Posts" />
        <main className="p-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <p className="text-muted-foreground">
              Manage your blog posts and articles.
            </p>
            <Button asChild>
              <Link href="/admin/blog/new">
                <Plus className="w-4 h-4 mr-2" />
                New Post
              </Link>
            </Button>
          </div>

          {/* Posts Grid */}
          {isLoading ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground">Loading...</p>
            </div>
          ) : posts.length === 0 ? (
            <Card>
              <CardContent className="text-center py-20">
                <p className="text-muted-foreground mb-4">
                  No blog posts yet.
                </p>
                <Button asChild>
                  <Link href="/admin/blog/new">
                    <Plus className="w-4 h-4 mr-2" />
                    Create your first post
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {posts.map((post) => (
                <Card key={post.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      {/* Cover Image Thumbnail */}
                      <div className="w-32 h-20 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                        {post.cover_image_url ? (
                          <img
                            src={post.cover_image_url}
                            alt={post.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">
                            No image
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-lg truncate">
                            {post.title}
                          </h3>
                          <Badge
                            variant={post.published ? 'default' : 'secondary'}
                          >
                            {post.published ? 'Published' : 'Draft'}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground text-sm line-clamp-1 mb-2">
                          {post.excerpt}
                        </p>
                        <div className="text-xs text-muted-foreground">
                          Created {format(new Date(post.created_at), 'MMM d, yyyy')}
                          {post.updated_at !== post.created_at && (
                            <> · Updated {format(new Date(post.updated_at), 'MMM d, yyyy')}</>
                          )}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => togglePublish(post)}
                          title={post.published ? 'Unpublish' : 'Publish'}
                        >
                          {post.published ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </Button>
                        <Button variant="ghost" size="icon" asChild>
                          <Link href={`/admin/blog/${post.id}`}>
                            <Edit className="w-4 h-4" />
                          </Link>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive hover:text-destructive"
                          onClick={() => deletePost(post.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
