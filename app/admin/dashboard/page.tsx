import { createClient } from '@/lib/supabase/server';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Users, Building2, FileText, MessageSquare } from 'lucide-react';
import { format } from 'date-fns';
import Link from 'next/link';

async function getDashboardStats() {
  const supabase = await createClient();

  const [
    { count: visitorCount },
    { count: exhibitorCount },
    { count: blogCount },
    { count: pendingCommentCount },
    { data: recentInvitations },
  ] = await Promise.all([
    supabase
      .from('invitations')
      .select('*', { count: 'exact', head: true })
      .eq('type', 'visitor'),
    supabase
      .from('invitations')
      .select('*', { count: 'exact', head: true })
      .eq('type', 'exhibitor'),
    supabase
      .from('blog_posts')
      .select('*', { count: 'exact', head: true }),
    supabase
      .from('comments')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'pending'),
    supabase
      .from('invitations')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(5),
  ]);

  return {
    visitorCount: visitorCount || 0,
    exhibitorCount: exhibitorCount || 0,
    blogCount: blogCount || 0,
    pendingCommentCount: pendingCommentCount || 0,
    recentInvitations: recentInvitations || [],
  };
}

export default async function AdminDashboardPage() {
  const stats = await getDashboardStats();

  const statCards = [
    {
      title: 'Visitors',
      value: stats.visitorCount,
      icon: Users,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
      href: '/admin/invitations?type=visitor',
    },
    {
      title: 'Exhibitors',
      value: stats.exhibitorCount,
      icon: Building2,
      color: 'text-emerald-500',
      bgColor: 'bg-emerald-500/10',
      href: '/admin/invitations?type=exhibitor',
    },
    {
      title: 'Blog Posts',
      value: stats.blogCount,
      icon: FileText,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
      href: '/admin/blog',
    },
    {
      title: 'Pending Comments',
      value: stats.pendingCommentCount,
      icon: MessageSquare,
      color: 'text-amber-500',
      bgColor: 'bg-amber-500/10',
      href: '/admin/comments',
    },
  ];

  return (
    <div className="flex min-h-screen bg-muted/30">
      <AdminSidebar />
      <div className="flex-1">
        <AdminHeader title="Dashboard" />
        <main className="p-8">
          {/* Stats Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {statCards.map((stat) => {
              const Icon = stat.icon;
              return (
                <Link key={stat.title} href={stat.href}>
                  <Card className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">
                            {stat.title}
                          </p>
                          <p className="text-3xl font-bold mt-1">{stat.value}</p>
                        </div>
                        <div
                          className={`w-12 h-12 rounded-lg ${stat.bgColor} flex items-center justify-center`}
                        >
                          <Icon className={`w-6 h-6 ${stat.color}`} />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>

          {/* Recent Registrations */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Registrations</CardTitle>
            </CardHeader>
            <CardContent>
              {stats.recentInvitations.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">
                  No registrations yet.
                </p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                          Type
                        </th>
                        <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                          Name/Company
                        </th>
                        <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                          Email
                        </th>
                        <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                          Ticket No
                        </th>
                        <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                          Date
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {stats.recentInvitations.map((inv: any) => (
                        <tr key={inv.id} className="border-b last:border-0">
                          <td className="py-3 px-4">
                            <span
                              className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                inv.type === 'visitor'
                                  ? 'bg-blue-100 text-blue-700'
                                  : 'bg-emerald-100 text-emerald-700'
                              }`}
                            >
                              {inv.type}
                            </span>
                          </td>
                          <td className="py-3 px-4 font-medium">
                            {inv.type === 'visitor'
                              ? inv.full_name
                              : inv.company_name}
                          </td>
                          <td className="py-3 px-4 text-muted-foreground">
                            {inv.email}
                          </td>
                          <td className="py-3 px-4 font-mono text-sm">
                            {inv.ticket_no}
                          </td>
                          <td className="py-3 px-4 text-muted-foreground">
                            {format(new Date(inv.created_at), 'MMM d, HH:mm')}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              <div className="mt-4 text-center">
                <Link
                  href="/admin/invitations"
                  className="text-primary hover:underline text-sm"
                >
                  View all registrations →
                </Link>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
