import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Github } from 'lucide-react';
import { ThemeSwitch } from './theme-switch';

export function Navbar() {
  return (
    <header className="border-b border-green-900/20 sticky top-0 z-50 bg-background/80 backdrop-blur-sm">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="text-xl font-bold text-green-500 hover:text-green-400 transition-colors font-mono"
          >
            DeskThing
          </Link>
          <div className="hidden md:flex gap-6">
            <Link
              href="/"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              About
            </Link>
            <Link
              href="#"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Docs
            </Link>
            <Link
              href="/apps"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Apps
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <ThemeSwitch />
          <Link
            href="https://github.com/yourusername/deskthing"
            target="_blank"
          >
            <Button
              variant="ghost"
              size="icon"
              className="hover:text-green-400"
            >
              <Github className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </nav>
    </header>
  );
}
