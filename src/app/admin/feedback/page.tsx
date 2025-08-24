
"use client";

import React, { useState, useEffect, useCallback } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MessageSquareHeart, Loader2, RefreshCw, Mail, Phone, Ticket, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import type { Feedback } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { getFeedback, updateFeedbackStatus } from '../data/actions';
import { formatDistanceToNow } from 'date-fns';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export default function FeedbackManagementPage() {
  const [feedbackList, setFeedbackList] = useState<Feedback[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMutating, setIsMutating] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const { toast } = useToast();

  const loadFeedback = useCallback(async () => {
    setIsLoading(true);
    try {
      const result = await getFeedback();
      if (result.success && result.data) {
        setFeedbackList(result.data);
      } else {
        toast({ variant: 'destructive', title: 'Error', description: result.error || 'Could not fetch feedback.' });
      }
    } catch (error: any) {
      toast({ variant: 'destructive', title: 'Error', description: error.message });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    loadFeedback();
  }, [loadFeedback]);

  const handleResolve = async (ticketId: string) => {
    if (!ticketId) {
        toast({ variant: 'destructive', title: 'Error', description: 'Invalid ticket ID.' });
        return;
    }

    setIsMutating(true);
    const result = await updateFeedbackStatus(ticketId, 'Resolved');
    if (result.success) {
      setFeedbackList(prev =>
        prev.map(fb => (fb.id === ticketId ? { ...fb, status: 'Resolved' } : fb))
      );
      toast({ title: 'Ticket Resolved', description: `Ticket ${ticketId} has been marked as resolved.` });
    } else {
      toast({ variant: 'destructive', title: 'Error', description: result.error });
    }
    setIsMutating(false);
  };
  
  const handleViewDetails = (feedback: Feedback) => {
    setSelectedFeedback(feedback);
    setIsDetailsOpen(true);
  };

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <MessageSquareHeart /> User Feedback
            </CardTitle>
            <CardDescription>
              View and manage all submitted feedback and suggestions.
            </CardDescription>
          </div>
          <Button onClick={() => loadFeedback()} variant="outline" size="sm" disabled={isLoading}>
            <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[70vh] relative border rounded-md">
            <Table>
              <TableHeader className="sticky top-0 bg-background z-10">
                <TableRow>
                  <TableHead>Ticket ID</TableHead>
                  <TableHead>Submitted</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow key="loading">
                    <TableCell colSpan={5} className="h-48 text-center">
                      <div className="flex flex-col items-center gap-2">
                        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                        <span className="text-muted-foreground">Loading Feedback...</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : feedbackList.length === 0 ? (
                  <TableRow key="empty">
                    <TableCell colSpan={5} className="h-24 text-center">
                      No feedback submitted yet.
                    </TableCell>
                  </TableRow>
                ) : (
                  feedbackList.map((feedback) => (
                    <TableRow key={feedback.id} className={feedback.status === 'Resolved' ? 'bg-muted/50' : ''}>
                      <TableCell className="font-mono">{feedback.id || 'N/A'}</TableCell>
                      <TableCell>{feedback.createdAt ? formatDistanceToNow(new Date(feedback.createdAt), { addSuffix: true }) : 'Just now'}</TableCell>
                      <TableCell>{feedback.name}</TableCell>
                      <TableCell>
                        <Badge variant={feedback.status === 'Resolved' ? 'secondary' : 'default'}>
                          {feedback.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm" onClick={() => handleViewDetails(feedback)} className="mr-2">
                          View
                        </Button>
                        {feedback.status === 'Open' && (
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => handleResolve(feedback.id)}
                            disabled={isMutating}
                          >
                           {isMutating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <CheckCircle2 className="mr-2 h-4 w-4" />}
                            Resolve
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
      </Card>
      
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          <DialogContent>
            {selectedFeedback && (
              <>
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <Ticket /> Feedback Details: {selectedFeedback.id}
                  </DialogTitle>
                  <DialogDescription>
                    Submitted {selectedFeedback.createdAt ? formatDistanceToNow(new Date(selectedFeedback.createdAt), { addSuffix: true }) : 'just now'}
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4 text-sm">
                    <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground"/>
                        <a href={`mailto:${selectedFeedback.email}`} className="text-primary hover:underline">{selectedFeedback.email}</a>
                    </div>
                     <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground"/>
                        <span>{selectedFeedback.mobile}</span>
                    </div>
                    <div className="pt-2">
                        <h4 className="font-semibold mb-2">Feedback:</h4>
                        <p className="p-3 bg-muted rounded-md text-muted-foreground">{selectedFeedback.feedback}</p>
                    </div>
                </div>
              </>
            )}
          </DialogContent>
      </Dialog>
    </>
  );
}
