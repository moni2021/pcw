
"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { Loader2 } from 'lucide-react';
import { Inter } from "next/font/google";
import { useToast } from '@/hooks/use-toast';


const inter = Inter({ subsets: ["latin"] });


interface AuthContextType {
  user: User | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Manually trigger token refresh to get latest user properties
        const tokenResult = await user.getIdTokenResult(true);
        // In our flow, disabled users have emailVerified set to false.
        if (tokenResult.claims.disabled) {
            toast({
                variant: 'destructive',
                title: 'Account Disabled',
                description: 'Your account is currently disabled or pending approval.',
            });
           await auth.signOut();
           setUser(null);
        } else {
             setUser(user);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [toast]);

  if (loading) {
      return (
        <html lang="en" className="dark">
            <body className={`${inter.className} antialiased`}>
                <div className="flex h-screen w-full items-center justify-center bg-background">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
            </body>
        </html>
      )
  }

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
