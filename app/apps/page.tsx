import { CommunityApps } from '@/components/community-apps';
import { Button } from '@/components/ui/button';
import { Github, Heart } from 'lucide-react';
import Link from 'next/link';

export default function About() {
  return (
    <section className="container mx-auto px-4 py-24">
      <div className="max-w-screen-xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-500 to-emerald-600 text-transparent bg-clip-text">
          Apps
        </h1>
        <div className="prose prose-invert max-w-none">
          <h2 className="text-xl mb-8">
            Discover a variety of powerful tools designed to help you get the
            most out of DeskThing.
          </h2>
          <CommunityApps />
        </div>
      </div>
    </section>
  );
}
