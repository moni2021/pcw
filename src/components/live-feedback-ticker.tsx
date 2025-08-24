
"use client";

import React, { useState, useEffect, useMemo } from 'react';
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
        const openTickets = result.data.filter(t => t.status === 'Open');
        setTickets(openTickets);
      }
      setIsLoading(false);
    }
    fetchTickets();
  }, []);

  // Memoize the duplicated list to avoid re-computation on every render
  const marqueeTickets = useMemo(() => {
    if (tickets.length === 0) return [];
    // Create a single list containing original and cloned items with unique keys
    const original = tickets.map(ticket => ({ ...ticket, uniqueId: ticket.id }));
    const cloned = tickets.map(ticket => ({ ...ticket, uniqueId: `${ticket.id}-clone` }));
    return [...original, ...cloned];
  }, [tickets]);

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

    if (marqueeTickets.length === 0) {
      return <p>Be the first to give feedback! All open tickets will be displayed here.</p>;
    }
    
    return (
        <div className="flex animate-marquee space-x-8">
            {marqueeTickets.map((ticket) => (
                <div key={ticket.uniqueId} className="flex items-center space-x-2 whitespace-nowrap">
                    <MessageSquareDashed className="h-4 w-4 text-primary" />
                    <p className="font-semibold">{ticket.id}:</p>
                    <p className="text-muted-foreground">{ticket.feedback}</p>
                </div>
            ))}
        </div>
    );
  };

  return (
    <div className="relative flex w-full overflow-x-hidden rounded-lg border bg-muted/30 p-4">
        {renderContent()}
        {/* The second div for seamless animation */}
        {marqueeTickets.length > 0 && <div className="absolute top-0 flex animate-marquee2 space-x-8 p-4">{renderContent()}</div>}
    </div>
  );
}
