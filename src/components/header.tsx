import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Bot } from "lucide-react"

export function Header() {
  return (
    <header className="px-4 lg:px-6 h-14 flex items-center border-b">
      <Link className="flex items-center justify-center" href="#">
        <Bot className="h-6 w-6 text-primary" />
        <span className="sr-only">Service Estimator</span>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6">
        <Button asChild variant="ghost">
            <Link href="/admin">
                Admin Panel
            </Link>
        </Button>
      </nav>
    </header>
  )
}
