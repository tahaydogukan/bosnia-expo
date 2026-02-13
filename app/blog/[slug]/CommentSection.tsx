'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { MessageSquare, Send, Loader2, User, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Card, CardContent } from '@/components/ui/card';
import { commentFormSchema, CommentFormValues } from '@/lib/validations';
import { Comment } from '@/types';

interface CommentSectionProps {
  postId: string;
  comments: Comment[];
}

export default function CommentSection({
  postId,
  comments: initialComments,
}: CommentSectionProps) {
  const [comments, setComments] = useState(initialComments);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<CommentFormValues>({
    resolver: zodResolver(commentFormSchema),
    defaultValues: {
      name: '',
      email: '',
      content: '',
    },
  });

  const onSubmit = async (data: CommentFormValues) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          post_id: postId,
          ...data,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit comment');
      }

      setSubmitSuccess(true);
      form.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
        <MessageSquare className="w-6 h-6" />
        Comments ({comments.length})
      </h2>

      {/* Comments List */}
      {comments.length > 0 ? (
        <div className="space-y-6 mb-12">
          {comments.map((comment) => (
            <Card key={comment.id}>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <User className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-semibold">{comment.name}</span>
                      <span className="text-muted-foreground text-sm">
                        {format(new Date(comment.created_at), 'MMM d, yyyy')}
                      </span>
                    </div>
                    <p className="text-muted-foreground">{comment.content}</p>

                    {/* Admin Reply */}
                    {comment.admin_reply && (
                      <div className="mt-4 pl-4 border-l-2 border-primary bg-primary/5 rounded-r-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Shield className="w-4 h-4 text-primary" />
                          <span className="font-semibold text-sm text-primary">
                            Organizer Reply
                          </span>
                        </div>
                        <p className="text-sm">{comment.admin_reply}</p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground text-center py-8 mb-8">
          No comments yet. Be the first to comment!
        </p>
      )}

      {/* Comment Form */}
      <div className="bg-muted/50 rounded-xl p-6">
        <h3 className="font-semibold text-lg mb-4">Leave a Comment</h3>

        {submitSuccess ? (
          <div className="bg-accent/10 text-accent-foreground p-4 rounded-lg">
            <p className="font-medium">Thank you for your comment!</p>
            <p className="text-sm text-muted-foreground mt-1">
              Your comment has been submitted and is awaiting moderation.
            </p>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {error && (
                <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-lg">
                  {error}
                </div>
              )}

              <div className="grid sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="Your name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email *</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="your@email.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Comment *</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Write your comment..."
                        rows={4}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Submit Comment
                  </>
                )}
              </Button>
            </form>
          </Form>
        )}
      </div>
    </div>
  );
}
