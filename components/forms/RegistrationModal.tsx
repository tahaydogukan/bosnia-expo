'use client';

import { useState } from 'react';
import { X, Users, Building2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import VisitorForm from './VisitorForm';
import ExhibitorForm from './ExhibitorForm';
import TicketCard from '@/components/ticket/TicketCard';
import { VisitorFormValues, ExhibitorFormValues } from '@/lib/validations';
import { Invitation } from '@/types';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab: 'visitor' | 'exhibitor';
}

export default function RegistrationModal({
  isOpen,
  onClose,
  initialTab,
}: RegistrationModalProps) {
  const [activeTab, setActiveTab] = useState<'visitor' | 'exhibitor'>(
    initialTab
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registrationResult, setRegistrationResult] =
    useState<Invitation | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Reset state when modal opens
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      onClose();
      // Reset after animation
      setTimeout(() => {
        setRegistrationResult(null);
        setError(null);
      }, 300);
    }
  };

  const handleVisitorSubmit = async (data: VisitorFormValues) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/invitations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'visitor',
          ...data,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Registration failed');
      }

      setRegistrationResult(result.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleExhibitorSubmit = async (data: ExhibitorFormValues) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/invitations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'exhibitor',
          ...data,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Registration failed');
      }

      setRegistrationResult(result.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        {registrationResult ? (
          // Success - Show Ticket
          <div className="py-4">
            <DialogHeader className="mb-6">
              <DialogTitle className="text-center text-2xl">
                Registration Successful!
              </DialogTitle>
              <p className="text-center text-muted-foreground mt-2">
                Your ticket has been generated. Save it for entry.
              </p>
            </DialogHeader>
            <TicketCard invitation={registrationResult} />
          </div>
        ) : (
          // Registration Form
          <>
            <DialogHeader>
              <DialogTitle className="text-xl">
                Register for Bosnia Healthcare Expo
              </DialogTitle>
            </DialogHeader>

            {error && (
              <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-lg mb-4">
                {error}
              </div>
            )}

            <Tabs
              value={activeTab}
              onValueChange={(v) => setActiveTab(v as 'visitor' | 'exhibitor')}
            >
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="visitor" className="gap-2">
                  <Users className="w-4 h-4" />
                  Visitor
                </TabsTrigger>
                <TabsTrigger value="exhibitor" className="gap-2">
                  <Building2 className="w-4 h-4" />
                  Exhibitor
                </TabsTrigger>
              </TabsList>

              <TabsContent value="visitor">
                <VisitorForm
                  onSubmit={handleVisitorSubmit}
                  isSubmitting={isSubmitting}
                />
              </TabsContent>

              <TabsContent value="exhibitor">
                <ExhibitorForm
                  onSubmit={handleExhibitorSubmit}
                  isSubmitting={isSubmitting}
                />
              </TabsContent>
            </Tabs>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
