import Link from "next/link"
import { Bot } from "lucide-react"
import { cn } from "@/lib/utils"

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
    </header>
  )
}
