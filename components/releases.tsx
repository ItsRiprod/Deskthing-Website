'use client';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ExternalLink, X } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { FaDownload } from 'react-icons/fa6';

type Release = {
  title: string;
  releaseNotes: string[];
  url: string;
  prerelease: boolean;
  draft: boolean;
  pubishedDate: string;
  totalDownloads: number;
  tags: string[];
};

const tagColors: Record<string, string> = {
  stable: 'bg-green-500/10 text-green-500 hover:bg-green-500/20',
  beta: 'bg-orange-500/10 text-orange-500 hover:bg-orange-500/20',
  prerelease: 'bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20',
  alpha: 'bg-red-500/10 text-red-500 hover:bg-red-500/20',
  draft: 'bg-purple-500/10 text-purple-500 hover:bg-purple-500/20',
};

async function fetchReleases(): Promise<Release[]> {
  const response = await fetch(
    'https://api.github.com/repos/itsriprod/deskthing/releases'
  );

  if (!response.ok) {
    throw new Error('Failed to fetch releases');
  }

  const releasesData = await response.json();
  return releasesData.map((release: any) => {
    const tags = [];
    if (release.name?.includes('alpha')) {
      tags.push('alpha');
    }
    if (release.name?.includes('beta')) {
      tags.push('beta');
    }
    if (release.prerelease) {
      tags.push('prerelease');
    }
    if (release.draft) {
      tags.push('draft');
    }
    if (!tags.length && release.published_at) {
      tags.push('stable');
    }

    return {
      title: release.name,
      releaseNotes: release.body ? parseReleaseNotes(release.body) : [],
      url: release.html_url,
      prerelease: release.prerelease,
      draft: release.draft,
      pubishedDate: release.published_at
        ? new Date(release.published_at).toLocaleDateString()
        : '',
      tags,
      totalDownloads: release.assets
        .filter(
          (asset: any) =>
            asset.name.endsWith('.exe') ||
            asset.name.endsWith('.dmg') ||
            asset.name.endsWith('.AppImage') ||
            asset.name.endsWith('.deb')
        )
        .reduce((acc: number, asset: any) => acc + asset.download_count, 0),
    };
  });
}

function parseReleaseNotes(body: string): string[] {
  // Split the body by line breaks and filter for lines that start with "-"
  return body
    .split('\r\n')
    .filter((line) => line.trim().startsWith('-'))
    .map((line) => line.trim().slice(1).trim());
}

export function Releases({ limit }: { limit?: number }) {
  const [releases, setReleases] = useState<Release[]>([]);

  useEffect(() => {
    const loadReleases = async () => {
      try {
        const data = await fetchReleases();
        setReleases(data);
      } catch (error) {}
    };

    loadReleases();
  }, []);

  // Replace the uniqueTags definition with this:
  const uniqueTags = Array.from(
    new Set(releases.flatMap((app) => app.tags))
  ).sort((a, b) => {
    // Get the indices from the tagColors object keys
    const aIndex = Object.keys(tagColors).indexOf(a);
    const bIndex = Object.keys(tagColors).indexOf(b);

    // If both tags are in tagColors, sort by their order
    if (aIndex !== -1 && bIndex !== -1) {
      return aIndex - bIndex;
    }

    // If only one tag is in tagColors, prioritize it
    if (aIndex !== -1) return -1;
    if (bIndex !== -1) return 1;

    // If neither tag is in tagColors, sort alphabetically
    return a.localeCompare(b);
  });

  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const filteredReleases = releases.filter((release) =>
    selectedTags.length === 0
      ? true
      : selectedTags.some((tag) => release.tags.includes(tag))
  );

  if (releases.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className='space-y-6'>
      <div className='flex flex-wrap gap-2'>
        {uniqueTags.map((tag) => (
          <Badge
            key={tag}
            variant='outline'
            className={`${
              tagColors[tag] || 'bg-gray-500/10 text-gray-500'
            } border-none cursor-pointer ${
              selectedTags.includes(tag)
                ? 'ring-2 ring-offset-2 ring-offset-background'
                : ''
            }`}
            onClick={() => toggleTag(tag)}
          >
            {tag}
          </Badge>
        ))}
        {selectedTags.length > 0 && (
          <Badge
            variant='outline'
            className='bg-red-500/10 text-red-500 hover:bg-red-500/20 ring-1 ring-red-500 cursor-pointer'
            onClick={() => setSelectedTags([])}
          >
            Clear filters <X className='w-3 h-3 ml-1' />
          </Badge>
        )}
      </div>
      <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {filteredReleases.map((release) => (
          <Card
            key={release.title}
            className='dark:bg-black/40 bg-neutral-300/40 border-green-900/20 backdrop-blur-sm hover:border-green-900/40 transition-colors flex flex-col'
          >
            <CardHeader>
              <div className='flex justify-between items-start'>
                <div>
                  <CardTitle className='text-xl mb-2'>
                    {release.title}
                  </CardTitle>
                  <p className='text-gray-600 dark:text-gray-500'>
                    {release.pubishedDate}
                  </p>
                </div>
                {release.url && (
                  <Button variant='ghost'>
                    <Link
                      href={release.url}
                      className='flex items-center gap-1 text-gray-600 dark:text-gray-400 hover:text-white transition-colors'
                    >
                      <ExternalLink className='w-4 h-4' />
                    </Link>
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent className='flex-1 flex flex-col justify-between -mt-4'>
              <ul className='mb-4'>
                {release.releaseNotes.slice(0, 3).map((note) => (
                  <li key={note} className='text-gray-600 dark:text-gray-400'>
                    - {note}
                  </li>
                ))}
                {release.releaseNotes.length > 3 && (
                  <li className='text-gray-600 dark:text-gray-500'>
                    and {release.releaseNotes.length - 3} more...
                  </li>
                )}
                {release.releaseNotes.length == 0 && (
                  <li className='text-gray-600 dark:text-gray-500'>
                    No release notes
                  </li>
                )}
              </ul>
              <div className='flex justify-between'>
                <div className='flex flex-wrap gap-2'>
                  {release.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant='outline'
                      className={`${
                        tagColors[tag] || 'bg-gray-500/10 text-gray-500'
                      } border-none cursor-pointer`}
                      onClick={() => toggleTag(tag)}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className='flex gap-1 items-center text-gray-600 dark:text-gray-40'>
                  <FaDownload size={14} />
                  <p className='mt-1'>{release.totalDownloads}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
