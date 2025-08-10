
"use client";

import React from 'react';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Users, Package, Wrench, Car, ArrowRight } from 'lucide-react';

export default function AdminDashboard() {
  const managementCards = [
    {
      title: "User Management",
      description: "Manage user accounts and permissions.",
      icon: <Users />,
      href: "/admin/users",
      cta: "Go to Users"
    },
    {
      title: "Parts Management",
      description: "Add, edit, or remove parts from the price list.",
      icon: <Package />,
      href: "/admin/parts",
      cta: "Go to Parts"
    },
    {
      title: "Labour Management",
      description: "Set and adjust custom labour charges for services.",
      icon: <Wrench />,
      href: "/admin/labour",
      cta: "Go to Labour"
    },
    {
      title: "Vehicle Management",
      description: "Manage the vehicle models available in the estimator.",
      icon: <Car />,
      href: "/admin/vehicles",
      cta: "Go to Vehicles"
    },
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to the admin panel. Here you can manage all the data for the service estimator.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {managementCards.map((card) => (
          <Card key={card.title}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {card.icon} {card.title}
              </CardTitle>
              <CardDescription>{card.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild>
                <Link href={card.href}>
                  {card.cta} <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
