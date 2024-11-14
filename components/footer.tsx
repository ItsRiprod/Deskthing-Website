import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ThemeSwitch } from './theme-switch';
import {
  SiGithub,
  SiDiscord,
  SiReddit,
  SiTrello,
  SiBuymeacoffee,
  SiX,
  SiYoutube,
} from 'react-icons/si';

export function Footer() {
  return (
    <header className='border-t border-green-900/20 sticky top-0 z-50 bg-background/80 backdrop-blur-sm mt-auto'>
      <nav className='container mx-auto px-4 py-4 flex justify-between items-center'>
        <div className='flex flex-col'>
          <div>
            <div className='font-mono'>DeskThing</div>
            <div className='text-sm text-muted-foreground'>
              © {new Date().getFullYear()} DeskThing Contributors
            </div>
          </div>
          <div className='text-sm text-muted-foreground'>
            Forever Open Source
          </div>
        </div>
        <div className='flex items-center gap-2'>
          <ThemeSwitch />
          <Link href='https://github.com/itsriprod/deskthing' target='_blank'>
            <Button
              variant='ghost'
              size='icon'
              className='hover:text-green-400'
            >
              <SiGithub />
            </Button>
          </Link>
          <Link href='https://deskthing.app/discord' target='_blank'>
            <Button
              variant='ghost'
              size='icon'
              className='hover:text-green-400'
            >
              <SiDiscord />
            </Button>
          </Link>
          <Link href='https://x.com/TheDeskThing' target='_blank'>
            <Button
              variant='ghost'
              size='icon'
              className='hover:text-green-400'
            >
              <SiX />
            </Button>
          </Link>
          <Link href='https://www.youtube.com/@deskthing' target='_blank'>
            <Button
              variant='ghost'
              size='icon'
              className='hover:text-green-400'
            >
              <SiYoutube />
            </Button>
          </Link>
          <Link
            href='https://www.reddit.com/r/DeskThing/'
            target='_blank'
            className='border-r pr-2'
          >
            <Button
              variant='ghost'
              size='icon'
              className='hover:text-green-400'
            >
              <SiReddit />
            </Button>
          </Link>
          <Link href='https://trello.com/b/6v0paxqV/deskthing' target='_blank'>
            <Button
              variant='ghost'
              size='icon'
              className='hover:text-green-400'
            >
              <SiTrello />
            </Button>
          </Link>
          <Link href='https://buymeacoffee.com/riprod' target='_blank'>
            <Button
              variant='ghost'
              size='icon'
              className='hover:text-green-400'
            >
              <SiBuymeacoffee />
            </Button>
          </Link>
        </div>
      </nav>
    </header>
  );
}
