'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { BlogPost } from '@/types';
import { format } from 'date-fns';

interface BlogTeaserProps {
  posts: BlogPost[];
}

export default function BlogTeaser({ posts }: BlogTeaserProps) {
  if (posts.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end md:justify-between mb-12"
        >
          <div>
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">
              Latest News
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2">
              From Our Blog
            </h2>
          </div>
          <Button asChild variant="ghost" className="mt-4 md:mt-0">
            <Link href="/blog">
              View all posts <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.slice(0, 3).map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={`/blog/${post.slug}`}>
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
                    <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    {/* Excerpt */}
                    <p className="text-muted-foreground text-sm line-clamp-3">
                      {post.excerpt}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
