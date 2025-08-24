
"use client";

import React, { useState, useEffect } from 'react';
import { getFeedback } from '@/app/admin/data/actions';
import type { Feedback } from '@/lib/types';
import { MessageSquareDashed } from 'lucide-react';
import { Skeleton } from './ui/skeleton';

export function LiveFeedbackTicker() {
  const [tickets, setTickets] = useState<Feedback[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchTickets() {
      setIsLoading(true);
      const result = await getFeedback();
      if (result.success && result.data) {
        // Filter for open tickets only
        const openTickets = result.data.filter(t => t.status === 'Open');
        setTickets(openTickets);
      }
      setIsLoading(false);
    }
    fetchTickets();
  }, []);

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex items-center space-x-4">
            <Skeleton className="h-4 w-[100px]" />
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[150px]" />
        </div>
      );
    }

    if (tickets.length === 0) {
      return <p>Be the first to give feedback! All open tickets will be displayed here.</p>;
    }
    
    // We render two lists side-by-side to create the seamless loop.
    // The key difference is giving the cloned list a unique key.
    return (
      <>
        <div className="flex animate-marquee space-x-8">
            {tickets.map((ticket) => (
                <div key={ticket.id} className="flex items-center space-x-2 whitespace-nowrap">
                    <MessageSquareDashed className="h-4 w-4 text-primary" />
                    <p className="font-semibold">{ticket.id}:</p>
                    <p className="text-muted-foreground">{ticket.feedback}</p>
                </div>
            ))}
        </div>
        <div className="absolute top-0 flex animate-marquee2 space-x-8 pl-8">
             {tickets.map((ticket) => (
                <div key={`${ticket.id}-clone`} className="flex items-center space-x-2 whitespace-nowrap">
                    <MessageSquareDashed className="h-4 w-4 text-primary" />
                    <p className="font-semibold">{ticket.id}:</p>
                    <p className="text-muted-foreground">{ticket.feedback}</p>
                </div>
            ))}
        </div>
      </>
    );
  };

  return (
    <div className="relative flex w-full overflow-x-hidden rounded-lg border bg-muted/30 p-4">
        {renderContent()}
    </div>
  );
}
