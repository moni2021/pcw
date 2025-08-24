
"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { getFeedback } from '@/app/admin/data/actions';
import type { Feedback } from '@/lib/types';
import { MessageSquareDashed } from 'lucide-react';
import { Skeleton } from './ui/skeleton';
import { cn } from '@/lib/utils';

export function LiveFeedbackTicker() {
  const [tickets, setTickets] = useState<Feedback[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchTickets() {
      setIsLoading(true);
      const result = await getFeedback();
      if (result.success && result.data) {
        const openTickets = result.data.filter(t => t.status === 'Open');
        setTickets(openTickets);
      }
      setIsLoading(false);
    }
    fetchTickets();
  }, []);

  const enableMarquee = tickets.length >= 4;

  const marqueeTickets = useMemo(() => {
    if (!enableMarquee) return tickets;
    
    // Duplicate the list for a seamless marquee effect
    return [...tickets, ...tickets];
  }, [tickets, enableMarquee]);

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
    
    return (
        <div className={cn("flex space-x-8", enableMarquee && "animate-marquee")}>
            {marqueeTickets.map((ticket, index) => (
                <div key={`${ticket.id}-${index}`} className="flex items-center space-x-2 whitespace-nowrap">
                    <MessageSquareDashed className="h-4 w-4 text-primary" />
                    <p className="font-semibold">{ticket.id}:</p>
                    <p className="text-muted-foreground truncate max-w-xs">"{ticket.feedback}"</p>
                    <p className="text-xs text-muted-foreground/80">- {ticket.name}</p>
                </div>
            ))}
        </div>
    );
  };

  return (
    <div className="relative flex w-full overflow-x-hidden rounded-lg border bg-muted/30 p-4">
        {renderContent()}
    </div>
  );
}
