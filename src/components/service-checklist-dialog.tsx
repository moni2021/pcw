
"use client";

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CheckCircle2, AlertTriangle, Sparkles } from 'lucide-react';
import type { ChecklistCategory } from '@/lib/pms-checklists';
import { Separator } from './ui/separator';

interface ServiceChecklistDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  serviceType: string;
  checklist: ChecklistCategory[] | null;
}

export function ServiceChecklistDialog({
  isOpen,
  onOpenChange,
  serviceType,
  checklist,
}: ServiceChecklistDialogProps) {
  if (!checklist) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">Service Details: {serviceType}</DialogTitle>
          <DialogDescription>
            Here is a summary of the checks and recommended actions for the selected service.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-[60vh] pr-6">
            <div className="space-y-6 my-4">
                {checklist.map((category, index) => (
                <div key={index}>
                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                        {category.icon === 'check' && <CheckCircle2 className="h-5 w-5 text-green-500" />}
                        {category.icon === 'warn' && <AlertTriangle className="h-5 w-5 text-yellow-500" />}
                        {category.icon === 'sparkle' && <Sparkles className="h-5 w-5 text-primary" />}
                        {category.title}
                    </h3>
                    <ul className="space-y-2 list-disc list-inside text-muted-foreground">
                        {category.items.map((item, itemIndex) => (
                        <li key={itemIndex}>{item}</li>
                        ))}
                    </ul>
                </div>
                ))}
            </div>
        </ScrollArea>
        <DialogFooter>
          <Button onClick={() => onOpenChange(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
