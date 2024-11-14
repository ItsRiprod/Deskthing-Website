import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ThemeSwitch } from './theme-switch';
import {
  SiGithub,
  SiDiscord,
  SiReddit,
  SiTrello,
  SiBuymeacoffee,
  SiBluesky,
} from 'react-icons/si';

export function Footer() {
  return (
    <header className="border-t border-green-900/20 sticky top-0 z-50 bg-background/80 backdrop-blur-sm mt-auto">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex flex-col">
          <div>
            <div className="font-mono">DeskThing</div>
            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} DeskThing Contributors
            </div>
          </div>
          <div className="text-sm text-muted-foreground">
            Forever Open Source
          </div>
        </div>
        <div className="flex items-center gap-2">
          <ThemeSwitch />
          <Link href="https://github.com/itsriprod/deskthing" target="_blank">
            <Button
              variant="ghost"
              size="icon"
              className="hover:text-green-400"
            >
              <SiGithub />
            </Button>
          </Link>
          <Link href="https://github.com/itsriprod/deskthing" target="_blank">
            <Button
              variant="ghost"
              size="icon"
              className="hover:text-green-400"
            >
              <SiDiscord />
            </Button>
          </Link>
          <Link href="https://github.com/itsriprod/deskthing" target="_blank">
            <Button
              variant="ghost"
              size="icon"
              className="hover:text-green-400"
            >
              <SiBluesky />
            </Button>
          </Link>
          <Link
            href="https://github.com/itsriprod/deskthing"
            target="_blank"
            className="border-r pr-2"
          >
            <Button
              variant="ghost"
              size="icon"
              className="hover:text-green-400"
            >
              <SiReddit />
            </Button>
          </Link>
          <Link href="https://github.com/itsriprod/deskthing" target="_blank">
            <Button
              variant="ghost"
              size="icon"
              className="hover:text-green-400"
            >
              <SiTrello />
            </Button>
          </Link>
          <Link href="https://github.com/itsriprod/deskthing" target="_blank">
            <Button
              variant="ghost"
              size="icon"
              className="hover:text-green-400"
            >
              <SiBuymeacoffee />
            </Button>
          </Link>
        </div>
      </nav>
    </header>
  );
}
