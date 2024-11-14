import { CommunityApps } from '@/components/community-apps';
import { Releases } from '@/components/releases';
export default function About() {
  return (
    <section className='container mx-auto px-4 py-24'>
      <div className='max-w-screen-xl mx-auto'>
        <h1 className='text-4xl font-bold mb-4 bg-gradient-to-r from-green-500 to-emerald-600 text-transparent bg-clip-text'>
          Releases
        </h1>
        <div className='prose prose-invert max-w-none'>
          <h2 className='text-xl mb-8'>
            Stay up-to-date with the latest versions of DeskThing!
          </h2>
          <Releases />
        </div>
      </div>
    </section>
  );
}
