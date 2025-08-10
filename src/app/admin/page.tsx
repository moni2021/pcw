
"use client";

import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function AdminDashboard() {

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to the admin panel. Use the sidebar to navigate and manage the estimator data.
        </p>
      </div>
       <Card>
        <CardHeader>
            <CardTitle>Getting Started</CardTitle>
            <CardDescription>
                Select a management section from the sidebar to begin.
            </CardDescription>
        </CardHeader>
        <CardContent>
            <p>You can manage parts, labour charges, vehicle models, and users using the links in the sidebar navigation.</p>
        </CardContent>
       </Card>
    </div>
  );
}
