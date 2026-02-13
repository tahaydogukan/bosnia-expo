'use client';

import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Download, Search, Filter } from 'lucide-react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { createClient } from '@/lib/supabase/client';
import { Invitation } from '@/types';

export default function AdminInvitationsPage() {
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [filteredInvitations, setFilteredInvitations] = useState<Invitation[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(true);
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    async function fetchInvitations() {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('invitations')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) {
        setInvitations(data);
        setFilteredInvitations(data);
      }
      setIsLoading(false);
    }
    fetchInvitations();
  }, []);

  useEffect(() => {
    let filtered = invitations;

    // Type filter
    if (typeFilter !== 'all') {
      filtered = filtered.filter((inv) => inv.type === typeFilter);
    }

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (inv) =>
          inv.email.toLowerCase().includes(query) ||
          inv.full_name?.toLowerCase().includes(query) ||
          inv.company_name?.toLowerCase().includes(query) ||
          inv.ticket_no.toLowerCase().includes(query)
      );
    }

    setFilteredInvitations(filtered);
  }, [typeFilter, searchQuery, invitations]);

  const handleExportCSV = () => {
    const headers = [
      'Type',
      'Name/Company',
      'Contact Name',
      'Email',
      'Phone',
      'Country',
      'City',
      'Interest/Service Area',
      'Ticket No',
      'Created At',
    ];

    const rows = filteredInvitations.map((inv) => [
      inv.type,
      inv.type === 'visitor' ? inv.full_name : inv.company_name,
      inv.type === 'exhibitor' ? inv.contact_name : '',
      inv.email,
      inv.phone,
      inv.country,
      inv.city,
      inv.type === 'visitor' ? inv.interest_area : inv.service_area,
      inv.ticket_no,
      format(new Date(inv.created_at), 'yyyy-MM-dd HH:mm'),
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map((row) =>
        row.map((cell) => `"${cell || ''}"`).join(',')
      ),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `invitations-${format(new Date(), 'yyyy-MM-dd')}.csv`;
    link.click();
  };

  return (
    <div className="flex min-h-screen bg-muted/30">
      <AdminSidebar />
      <div className="flex-1">
        <AdminHeader title="Invitations" />
        <main className="p-8">
          {/* Filters */}
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="flex flex-wrap gap-4 items-center">
                <div className="flex items-center gap-2 flex-1 min-w-[200px]">
                  <Search className="w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by name, email, or ticket..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-muted-foreground" />
                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Filter type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="visitor">Visitors</SelectItem>
                      <SelectItem value="exhibitor">Exhibitors</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button variant="outline" onClick={handleExportCSV}>
                  <Download className="w-4 h-4 mr-2" />
                  Export CSV
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Table */}
          <Card>
            <CardContent className="p-0">
              {isLoading ? (
                <div className="text-center py-20">
                  <p className="text-muted-foreground">Loading...</p>
                </div>
              ) : filteredInvitations.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-muted-foreground">No invitations found.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b bg-muted/50">
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
                          Phone
                        </th>
                        <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                          Location
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
                      {filteredInvitations.map((inv) => (
                        <tr
                          key={inv.id}
                          className="border-b last:border-0 hover:bg-muted/30"
                        >
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
                          <td className="py-3 px-4">
                            <div className="font-medium">
                              {inv.type === 'visitor'
                                ? inv.full_name
                                : inv.company_name}
                            </div>
                            {inv.type === 'exhibitor' && inv.contact_name && (
                              <div className="text-sm text-muted-foreground">
                                {inv.contact_name}
                              </div>
                            )}
                          </td>
                          <td className="py-3 px-4 text-muted-foreground">
                            {inv.email}
                          </td>
                          <td className="py-3 px-4 text-muted-foreground">
                            {inv.phone}
                          </td>
                          <td className="py-3 px-4 text-muted-foreground">
                            {inv.city}, {inv.country}
                          </td>
                          <td className="py-3 px-4">
                            <code className="text-xs bg-muted px-2 py-1 rounded">
                              {inv.ticket_no}
                            </code>
                          </td>
                          <td className="py-3 px-4 text-muted-foreground text-sm">
                            {format(
                              new Date(inv.created_at),
                              'MMM d, yyyy HH:mm'
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Summary */}
          <div className="mt-4 text-sm text-muted-foreground">
            Showing {filteredInvitations.length} of {invitations.length}{' '}
            registrations
          </div>
        </main>
      </div>
    </div>
  );
}
