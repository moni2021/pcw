
'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';
import { Header } from '@/components/header';
import Link from 'next/link';
import { Settings, LogOut } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function EstimatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/');
    }
  }, [user, loading, router]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      toast({ title: 'Signed Out', description: 'You have been successfully signed out.' });
      router.push('/');
    } catch (error) {
      toast({ variant: 'destructive', title: 'Error', description: 'Failed to sign out.' });
    }
  };

  if (loading || !user) {
    return null; // Or a loading spinner
  }

  return (
    <>
      <Header className="no-print" />
      {children}
       <div className="fixed bottom-4 right-4 z-50 no-print flex gap-2">
        <Button asChild size="icon" variant="secondary" className="rounded-full shadow-lg">
          <Link href="/admin">
            <Settings className="h-5 w-5" />
            <span className="sr-only">Go to Admin</span>
          </Link>
        </Button>
         <Button onClick={handleSignOut} size="icon" variant="destructive" className="rounded-full shadow-lg">
            <LogOut className="h-5 w-5" />
            <span className="sr-only">Sign Out</span>
        </Button>
      </div>
    </>
  );
}
