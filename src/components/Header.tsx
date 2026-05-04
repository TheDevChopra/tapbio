import Link from "next/link";
import { Button } from "./ui/button";

export function Header() {
  return (
    <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="font-bold text-xl tracking-tight flex items-center gap-2">
          <div className="w-6 h-6 bg-foreground rounded-md flex items-center justify-center">
            <div className="w-2 h-2 bg-background rounded-full" />
          </div>
          TapBio
        </Link>
        <nav className="flex items-center gap-4">
          <Link href="/dashboard">
            <Button variant="ghost" className="hidden sm:inline-flex">Dashboard</Button>
          </Link>
          <Link href="/dashboard">
            <Button variant="primary">Sign In</Button>
          </Link>
        </nav>
      </div>
    </header>
  );
}
