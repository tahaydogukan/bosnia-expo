'use client';

import { useEffect, useState } from 'react';
import { User } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

interface AdminHeaderProps {
  title: string;
}

export default function AdminHeader({ title }: AdminHeaderProps) {
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    async function getUser() {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUserEmail(user?.email || null);
    }
    getUser();
  }, []);

  return (
    <header className="bg-white border-b px-8 py-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{title}</h1>
        {userEmail && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <User className="w-4 h-4" />
            {userEmail}
          </div>
        )}
      </div>
    </header>
  );
}
