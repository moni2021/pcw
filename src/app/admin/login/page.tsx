"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { auth } from '@/lib/firebase';
import { RecaptchaVerifier, signInWithPhoneNumber, onAuthStateChanged, User } from 'firebase/auth';
import { Loader2, KeyRound } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from '@/components/ui/alert';

declare global {
  interface Window {
    recaptchaVerifier: RecaptchaVerifier;
    confirmationResult: any;
  }
}

export default function AdminLoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        router.push('/admin');
      }
    });
    return () => unsubscribe();
  }, [router]);

  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        'size': 'invisible',
        'callback': (response: any) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
        },
        'expired-callback': () => {
          // Response expired. Ask user to solve reCAPTCHA again.
          setError("reCAPTCHA expired. Please try again.");
          resetRecaptcha();
        }
      });
    }
  };
  
  const resetRecaptcha = () => {
    const recaptchaContainer = document.getElementById('recaptcha-container');
    if (recaptchaContainer) {
      recaptchaContainer.innerHTML = '';
      const newRecaptchaContainer = document.createElement('div');
      newRecaptchaContainer.id = 'recaptcha-container';
      document.body.appendChild(newRecaptchaContainer);
      // @ts-ignore
      window.recaptchaVerifier = null;
    }
    setupRecaptcha();
  };

  useEffect(() => {
    setupRecaptcha();
  }, []);

  const onSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const appVerifier = window.recaptchaVerifier;
    const formattedPhoneNumber = `+${phoneNumber.replace(/\D/g, '')}`;

    try {
      const confirmationResult = await signInWithPhoneNumber(auth, formattedPhoneNumber, appVerifier);
      window.confirmationResult = confirmationResult;
      setStep('otp');
      toast({
        title: "OTP Sent",
        description: `An OTP has been sent to ${formattedPhoneNumber}.`,
      });
    } catch (error: any) {
      console.error("SMS Error:", error);
      setError(`Failed to send OTP: ${error.message}. Please check the phone number and reCAPTCHA.`);
      resetRecaptcha();
    } finally {
      setIsLoading(false);
    }
  };

  const onVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await window.confirmationResult.confirm(otp);
      toast({
        title: "Login Successful",
        description: "You are now logged in.",
      });
      router.push('/admin');
    } catch (error: any) {
      console.error("OTP Error:", error);
      setError(`Invalid OTP or error during verification: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };
  
  if (user) {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-50 dark:bg-gray-900">
            <Loader2 className="h-16 w-16 animate-spin text-primary" />
            <p className="mt-4 text-lg">Redirecting to Admin Panel...</p>
        </main>
    )
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-50 dark:bg-gray-900">
      <div id="recaptcha-container"></div>
      <Card className="w-full max-w-sm shadow-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><KeyRound/> Admin Login</CardTitle>
          <CardDescription>Enter your phone number to receive a one-time password (OTP).</CardDescription>
        </CardHeader>
        <CardContent>
          {step === 'phone' ? (
            <form onSubmit={onSendOtp} className="space-y-4">
              <div className="space-y-2">
                <Input
                  id="phone"
                  type="tel"
                  placeholder="e.g., 911234567890"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Send OTP'}
              </Button>
            </form>
          ) : (
            <form onSubmit={onVerifyOtp} className="space-y-4">
              <div className="space-y-2">
                <Input
                  id="otp"
                  type="text"
                  placeholder="Enter 6-digit OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                  maxLength={6}
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Verify OTP'}
              </Button>
              <Button variant="link" size="sm" onClick={() => { setStep('phone'); setError(''); }}>
                Entered the wrong number?
              </Button>
            </form>
          )}
          {error && <Alert variant="destructive" className="mt-4"><AlertDescription>{error}</AlertDescription></Alert>}
        </CardContent>
      </Card>
    </main>
  );
}
