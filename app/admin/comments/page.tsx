'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { format } from 'date-fns';
import {
  Check,
  X,
  MessageSquare,
  Send,
  Loader2,
  ExternalLink,
} from 'lucide-react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { createClient } from '@/lib/supabase/client';
import { Comment } from '@/types';

export default function AdminCommentsPage() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>('pending');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchComments();
  }, [statusFilter]);

  async function fetchComments() {
    setIsLoading(true);
    const supabase = createClient();

    let query = supabase
      .from('comments')
      .select('*, blog_posts(title, slug)')
      .order('created_at', { ascending: false });

    if (statusFilter !== 'all') {
      query = query.eq('status', statusFilter);
    }

    const { data, error } = await query;

    if (!error && data) {
      setComments(data);
    }
    setIsLoading(false);
  }

  async function updateStatus(id: string, status: 'approved' | 'rejected') {
    const supabase = createClient();
    const { error } = await supabase
      .from('comments')
      .update({ status })
      .eq('id', id);

    if (!error) {
      fetchComments();
    }
  }

  async function submitReply(commentId: string) {
    if (!replyText.trim()) return;

    setIsSubmitting(true);
    const supabase = createClient();

    const { error } = await supabase
      .from('comments')
      .update({ admin_reply: replyText })
      .eq('id', commentId);

    if (!error) {
      setReplyingTo(null);
      setReplyText('');
      fetchComments();
    }
    setIsSubmitting(false);
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-emerald-100 text-emerald-700">Approved</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-700">Rejected</Badge>;
      default:
        return <Badge className="bg-amber-100 text-amber-700">Pending</Badge>;
    }
  };

  return (
    <div className="flex min-h-screen bg-muted/30">
      <AdminSidebar />
      <div className="flex-1">
        <AdminHeader title="Comments" />
        <main className="p-8">
          {/* Filters */}
          <div className="flex items-center gap-4 mb-6">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Comments</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            <span className="text-sm text-muted-foreground">
              {comments.length} comments
            </span>
          </div>

          {/* Comments List */}
          {isLoading ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground">Loading...</p>
            </div>
          ) : comments.length === 0 ? (
            <Card>
              <CardContent className="text-center py-20">
                <MessageSquare className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">
                  No {statusFilter !== 'all' ? statusFilter : ''} comments found.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {comments.map((comment) => (
                <Card key={comment.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        {/* Header */}
                        <div className="flex items-center gap-3 mb-2">
                          <span className="font-semibold">{comment.name}</span>
                          <span className="text-muted-foreground text-sm">
                            {comment.email}
                          </span>
                          {getStatusBadge(comment.status)}
                        </div>

                        {/* Post Link */}
                        {comment.blog_posts && (
                          <div className="mb-3">
                            <Link
                              href={`/blog/${comment.blog_posts.slug}`}
                              target="_blank"
                              className="text-sm text-primary hover:underline inline-flex items-center gap-1"
                            >
                              On: {comment.blog_posts.title}
                              <ExternalLink className="w-3 h-3" />
                            </Link>
                          </div>
                        )}

                        {/* Content */}
                        <p className="text-muted-foreground mb-3">
                          {comment.content}
                        </p>

                        {/* Admin Reply */}
                        {comment.admin_reply && (
                          <div className="bg-primary/5 border-l-2 border-primary p-3 rounded-r-lg mb-3">
                            <p className="text-sm font-medium text-primary mb-1">
                              Your Reply:
                            </p>
                            <p className="text-sm">{comment.admin_reply}</p>
                          </div>
                        )}

                        {/* Reply Form */}
                        {replyingTo === comment.id && (
                          <div className="mt-4 space-y-3">
                            <Textarea
                              placeholder="Write your reply..."
                              value={replyText}
                              onChange={(e) => setReplyText(e.target.value)}
                              rows={3}
                            />
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                onClick={() => submitReply(comment.id)}
                                disabled={isSubmitting}
                              >
                                {isSubmitting ? (
                                  <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                  <>
                                    <Send className="w-4 h-4 mr-1" />
                                    Send Reply
                                  </>
                                )}
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => {
                                  setReplyingTo(null);
                                  setReplyText('');
                                }}
                              >
                                Cancel
                              </Button>
                            </div>
                          </div>
                        )}

                        {/* Date */}
                        <p className="text-xs text-muted-foreground mt-3">
                          {format(
                            new Date(comment.created_at),
                            'MMM d, yyyy at HH:mm'
                          )}
                        </p>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-col gap-2">
                        {comment.status === 'pending' && (
                          <>
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-emerald-600 hover:text-emerald-700"
                              onClick={() => updateStatus(comment.id, 'approved')}
                            >
                              <Check className="w-4 h-4 mr-1" />
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-destructive hover:text-destructive"
                              onClick={() => updateStatus(comment.id, 'rejected')}
                            >
                              <X className="w-4 h-4 mr-1" />
                              Reject
                            </Button>
                          </>
                        )}
                        {comment.status === 'approved' && !comment.admin_reply && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setReplyingTo(comment.id);
                              setReplyText('');
                            }}
                          >
                            <MessageSquare className="w-4 h-4 mr-1" />
                            Reply
                          </Button>
                        )}
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
