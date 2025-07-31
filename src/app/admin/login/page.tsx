"use client";

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, ArrowLeft } from 'lucide-react';
import { RecaptchaVerifier, signInWithPhoneNumber, ConfirmationResult } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useToast } from "@/hooks/use-toast"
import Link from 'next/link';


export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
  
  const otpInputs = useRef<(HTMLInputElement | null)[]>([]);
  
  // This ref will hold the RecaptchaVerifier instance
  const recaptchaVerifierRef = useRef<RecaptchaVerifier | null>(null);

  // This effect sets up the invisible reCAPTCHA container
  useEffect(() => {
    if (!recaptchaVerifierRef.current) {
        const recaptchaContainer = document.createElement('div');
        recaptchaContainer.id = 'recaptcha-container';
        document.body.appendChild(recaptchaContainer);

        recaptchaVerifierRef.current = new RecaptchaVerifier(auth, recaptchaContainer, {
            'size': 'invisible',
            'callback': () => {
              // reCAPTCHA solved, allow signInWithPhoneNumber.
            }
        });
    }
  }, []);


  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!/^\+?91\d{10}$/.test(phoneNumber)) {
      setError('Please enter a valid 10-digit Indian phone number (e.g., +919876543210).');
      return;
    }
    
    if (!recaptchaVerifierRef.current) {
        setError("reCAPTCHA not initialized. Please refresh the page and try again.");
        return;
    }
    
    setIsLoading(true);
    
    try {
        const verifier = recaptchaVerifierRef.current;
        const result = await signInWithPhoneNumber(auth, phoneNumber, verifier);
        setConfirmationResult(result);
        setStep('otp');
        toast({
          title: "OTP Sent",
          description: `An OTP has been sent to ${phoneNumber}.`,
        })
    } catch (err: any) {
        console.error("Firebase Auth Error:", err);
        // It's often better to just inform the user and let them retry,
        // as reCAPTCHA handles its own reset logic internally on subsequent attempts.
        setError(err.message || 'Failed to send OTP. Please try again.');
    } finally {
        setIsLoading(false);
    }
  };
  
  const handleOtpChange = (element: HTMLInputElement, index: number) => {
    if (isNaN(Number(element.value))) return;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    // Focus next input
    if (element.nextSibling && element.value) {
      (element.nextSibling as HTMLInputElement).focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
        otpInputs.current[index - 1]?.focus();
    }
  }

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    const enteredOtp = otp.join('');

    if (!confirmationResult) {
        setError("Something went wrong. Please try sending the OTP again.");
        setIsLoading(false);
        return;
    }

    try {
        await confirmationResult.confirm(enteredOtp);
        toast({
          title: "Login Successful",
          description: "You have been successfully logged in.",
        })
        router.push('/admin');
    } catch (err: any) {
        console.error("Firebase OTP Error:", err);
        setError('Invalid OTP or the code has expired. Please try again.');
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-50 dark:bg-gray-900">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Admin Login</CardTitle>
          <CardDescription>
            {step === 'phone' ? 'Enter your mobile number to receive an OTP' : 'Enter the OTP sent to your mobile'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {step === 'phone' ? (
            <form onSubmit={handlePhoneSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Mobile Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+919876543210"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                />
              </div>
              {error && <Alert variant="destructive"><AlertDescription>{error}</AlertDescription></Alert>}
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Send OTP'}
              </Button>
            </form>
          ) : (
            <form onSubmit={handleOtpSubmit} className="space-y-6">
              <div className="flex justify-center gap-2">
                {otp.map((data, index) => (
                  <Input
                    key={index}
                    type="text"
                    maxLength={1}
                    className="w-12 h-12 text-center text-xl"
                    value={data}
                    onChange={(e) => handleOtpChange(e.target, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    ref={(el) => (otpInputs.current[index] = el)}
                  />
                ))}
              </div>
               {error && <Alert variant="destructive"><AlertDescription>{error}</AlertDescription></Alert>}
              <Button type="submit" className="w-full" disabled={isLoading}>
                 {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Verify & Login'}
              </Button>
              <Button variant="link" size="sm" onClick={() => { setStep('phone'); setError(''); setOtp(new Array(6).fill("")); }} className="w-full">
                Back to phone number entry
              </Button>
            </form>
          )}
        </CardContent>
        <CardFooter className="flex justify-center">
             <Button variant="link" asChild>
                <Link href="/">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Home
                </Link>
            </Button>
        </CardFooter>
      </Card>
    </main>
  );
}
