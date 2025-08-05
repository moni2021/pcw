
"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Bot, Car } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      router.replace('/estimator');
    }
  }, [user, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      // The user object from onAuthStateChanged will be used for redirection
      
      // Check if the user is disabled. The onAuthStateChanged listener in AuthContext handles this,
      // but we can pre-emptively check to avoid a redirect flicker.
      if (auth.currentUser && auth.currentUser.emailVerified === false) {
           await auth.signOut();
           toast({
            variant: 'destructive',
            title: 'Account Pending Approval',
            description: 'Your account has been created but needs to be activated by an admin.',
          });
      } else {
        toast({ title: "Login Successful", description: "Redirecting to the estimator..." });
        router.push('/estimator');
      }

    } catch (error: any) {
       toast({
        variant: 'destructive',
        title: 'Login Failed',
        description: 'Please check your email and password, or your account may be pending approval.',
      });
    } finally {
      setLoading(false);
    }
  };
  
  const handleForgotPassword = async () => {
    if (!email) {
      toast({
        variant: 'destructive',
        title: 'Email Required',
        description: 'Please enter your email address to reset your password.',
      });
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      toast({
        title: 'Password Reset Email Sent',
        description: 'Check your inbox for instructions to reset your password.',
      });
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message,
      });
    }
  };


  if (user) {
    return null; // or a loading spinner, while redirecting
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Car className="h-8 w-8" />
          </div>
          <CardTitle>Service Estimator</CardTitle>
          <CardDescription>Please sign in to continue</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                   <Button variant="link" type="button" onClick={handleForgotPassword} className="px-0 text-xs h-auto">
                        Forgot Password?
                    </Button>
                </div>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Signing In...' : 'Sign In'}
            </Button>
             <div className="text-center text-sm">
                Don't have an account?{' '}
                <Link href="/signup" className="underline">
                    Create one
                </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
