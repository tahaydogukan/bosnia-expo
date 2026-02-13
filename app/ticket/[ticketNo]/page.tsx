import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import { Button } from '@/components/ui/button';
import TicketCard from '@/components/ticket/TicketCard';
import { Invitation } from '@/types';

interface Props {
  params: Promise<{ ticketNo: string }>;
}

async function getTicket(ticketNo: string): Promise<Invitation | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('invitations')
    .select('*')
    .eq('ticket_no', ticketNo)
    .single();

  if (error) {
    return null;
  }

  return data;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { ticketNo } = await params;
  const ticket = await getTicket(ticketNo);

  if (!ticket) {
    return {
      title: 'Ticket Not Found',
    };
  }

  const displayName =
    ticket.type === 'visitor' ? ticket.full_name : ticket.company_name;

  return {
    title: `Ticket: ${ticketNo}`,
    description: `Event ticket for ${displayName} - Bosnia Healthcare Expo 2025`,
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function TicketPage({ params }: Props) {
  const { ticketNo } = await params;
  const ticket = await getTicket(ticketNo);

  if (!ticket) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-muted/30 py-20">
      <div className="container mx-auto px-4 max-w-lg">
        <Button
          asChild
          variant="ghost"
          className="mb-8"
        >
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>

        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold">Your Event Ticket</h1>
          <p className="text-muted-foreground mt-2">
            Present this ticket at the event entrance
          </p>
        </div>

        <TicketCard invitation={ticket} />

        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>
            Lost your ticket? Contact us at{' '}
            <a
              href="mailto:info@bosniahealthexpo.com"
              className="text-primary hover:underline"
            >
              info@bosniahealthexpo.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
