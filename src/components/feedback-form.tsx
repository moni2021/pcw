
"use client";

import React, { useState } from 'react';
import { CardContent, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { addFeedback } from '@/app/admin/data/actions';
import { Loader2, Send } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from './ui/alert';

export function FeedbackForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [feedback, setFeedback] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [submittedTicketId, setSubmittedTicketId] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !mobile || !feedback) {
      toast({
        variant: 'destructive',
        title: 'Missing Fields',
        description: 'Please fill out all fields before submitting.',
      });
      return;
    }

    setIsLoading(true);
    setSubmittedTicketId(null);

    const result = await addFeedback({ name, email, mobile, feedback });

    if (result.success && result.id) {
      toast({
        title: 'Feedback Submitted!',
        description: `Thank you! Your ticket ID is ${result.id}.`,
      });
      setSubmittedTicketId(result.id);
      // Reset form
      setName('');
      setEmail('');
      setMobile('');
      setFeedback('');
    } else {
      toast({
        variant: 'destructive',
        title: 'Submission Failed',
        description: result.error || 'An unknown error occurred.',
      });
    }

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardContent className="space-y-4 pt-6">
        {submittedTicketId && (
          <Alert variant="default" className="bg-green-500/10 border-green-500/50">
            <AlertTitle className="text-green-700">Submission Successful!</AlertTitle>
            <AlertDescription className="text-green-700/80">
              Your ticket ID is <strong>{submittedTicketId}</strong>. The developers have been notified.
            </AlertDescription>
          </Alert>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="mobile">Mobile Number</Label>
            <Input id="mobile" placeholder="Your Mobile Number" value={mobile} onChange={(e) => setMobile(e.target.value)} required />
          </div>
        </div>
        <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="Your Email Address" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="feedback">Feedback / Suggestion</Label>
          <Textarea id="feedback" placeholder="Tell us how we can improve..." value={feedback} onChange={(e) => setFeedback(e.target.value)} required />
        </div>
      </CardContent>
      <CardFooter>
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
          Submit Feedback
        </Button>
      </CardFooter>
    </form>
  );
}
