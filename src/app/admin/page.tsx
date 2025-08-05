
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Construction } from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
      <div className="flex flex-col items-center gap-2 text-center">
        <Construction className="h-12 w-12 text-muted-foreground" />
        <h3 className="text-2xl font-bold tracking-tight">
          Admin Panel Under Construction
        </h3>
        <p className="text-sm text-muted-foreground">
          The user sign-in feature has been temporarily removed. This admin panel will be re-enabled soon.
        </p>
      </div>
    </div>
  );
}
