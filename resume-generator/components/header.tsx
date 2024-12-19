import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Star } from 'lucide-react'

export function Header() {
  return (
    <header className="border-b">
      <div className="container flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <div className="h-6 w-6 rounded-full bg-blue-600" />
          <span className="text-xl font-semibold">Resume Pro</span>
        </Link>
        <nav className="flex items-center space-x-6">
          <Link href="/resume-builder" className="text-sm font-medium">
            Builder
          </Link>
          <Link href="/parser" className="text-sm font-medium">
            Parser
          </Link>
          <Button variant="outline" size="sm">
            <Star className="mr-2 h-4 w-4" />
            Star
          </Button>
        </nav>
      </div>
    </header>
  )
}

