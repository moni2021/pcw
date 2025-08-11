
"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, Forward } from 'lucide-react';
import { eventsData } from '@/lib/events-data';

export function UpcomingEvents() {
  const [upcomingEvents, setUpcomingEvents] = useState<any[]>([]);

  useEffect(() => {
    const calculateDaysLeft = (dateString: string) => {
      const eventDate = new Date(dateString);
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Normalize today's date
      eventDate.setHours(0, 0, 0, 0); // Normalize event date
      
      const diffTime = eventDate.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays;
    };

    const processedEvents = eventsData
      .map(event => ({
        ...event,
        daysLeft: calculateDaysLeft(event.date),
      }))
      .filter(event => event.daysLeft >= 0) // Filter for today and future events
      .sort((a, b) => a.daysLeft - b.daysLeft); // Sort by the nearest event first

    setUpcomingEvents(processedEvents);
  }, []);

  if (upcomingEvents.length === 0) {
    return null; // Don't render the component if there are no upcoming events
  }

  return (
    <Card className="bg-card/50 backdrop-blur-sm animate-fade-in-up">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CalendarDays className="h-6 w-6 text-primary" />
          Upcoming Events & Holidays
        </CardTitle>
        <CardDescription>
          Plan ahead with this quick look at important upcoming dates.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {upcomingEvents.map((event, index) => (
            <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <div className="space-y-1">
                <p className="font-semibold">{event.name}</p>
                <p className="text-sm text-muted-foreground">{new Date(event.date).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
              </div>
              <Badge variant={event.daysLeft === 0 ? 'default' : 'secondary'} className="flex items-center gap-1.5 text-sm">
                {event.daysLeft === 0 ? (
                  <>Today</>
                ) : (
                  <>
                    <Forward className="h-3 w-3" />
                    {event.daysLeft} {event.daysLeft === 1 ? 'day' : 'days'} left
                  </>
                )}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
