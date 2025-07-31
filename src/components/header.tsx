import Link from "next/link"
import { Bot, Settings } from "lucide-react"
import { Button } from "./ui/button"

export function Header() {
  return (
    <header className="px-4 lg:px-6 h-14 flex items-center border-b">
      <Link className="flex items-center justify-center" href="/">
        <Bot className="h-6 w-6 text-primary" />
        <span className="sr-only">Service Estimator</span>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6">
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          href="/admin"
        >
          <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
              <span className="sr-only">Admin</span>
          </Button>
        </Link>
      </nav>
    </header>
  )
}
