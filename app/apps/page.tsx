import { Suspense } from 'react';
import { OfficialAppsLoading, OfficialAppsSection } from '../../components/OfficialAppsSection';
import { CommunityAppsLoading, CommunityAppsSection } from '../../components/CommunityAppsSection';
import Sidebar from '../../components/sidebar';

export const metadata: { title: string; description: string } = {
  title: 'DeskThing | Apps',
  description: 'Explore core and community-built applications that expand your Car Thing\'s functionality.',
}

interface App {
  appName: string;
  appVersion: string;
}

interface Release {
  appName: string;
  authorName: string;
  description: string;
  latestReleaseUrl: string;
  repoUrl: string;
}

export default function AppPage() {
  return (
    <>
      <div className="min-h-svh flex flex-row justify-between pt-nav mx-6 xl:mx-0">
        <div className="lg:border-r border-neutral-800 w-full lg:pr-6 xl:px-6 2xl:px-0">
          <div className="wideContainer xl:px-6 flex flex-col mx-auto gap-columnGap items-center">
            <Suspense fallback={<OfficialAppsLoading />}>
              <OfficialAppsSection />
            </Suspense>
            <Suspense fallback={<CommunityAppsLoading />}>
              <CommunityAppsSection />
            </Suspense>
          </div>
        </div>
        <Sidebar />
      </div>
      
    </>
  );
}
