
import Link from "next/link"
import { Bot, Settings, MessageSquare } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "./ui/button";

interface HeaderProps {
    className?: string;
}

export function Header({ className }: HeaderProps) {
  return (
    <header className={cn("px-4 lg:px-6 h-14 flex items-center border-b", className)}>
      <Link className="flex items-center justify-center" href="/">
        <Bot className="h-6 w-6 text-primary" />
        <span className="sr-only">Service Estimator</span>
      </Link>
      <nav className="ml-auto flex items-center gap-4">
        <Button asChild variant="ghost" >
          <Link href="/chat">
            <MessageSquare className="mr-2 h-4 w-4"/> AI Advisor
          </Link>
        </Button>
        <Button asChild variant="ghost" size="icon">
          <Link href="/admin">
            <Settings />
          </Link>
        </Button>
      </nav>
    </header>
  )
}
