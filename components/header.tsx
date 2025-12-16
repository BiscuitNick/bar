import Link from "next/link"
import { Gamepad2 } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Gamepad2 className="size-6" />
          <span className="text-xl font-bold">Retro Games Hub</span>
        </Link>
        <ThemeToggle />
      </div>
    </header>
  )
}
