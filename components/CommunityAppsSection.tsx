import { fetchCommunityReleasesFromRepos } from "../services";
import { fetchAppReleaseFile } from "../services/fetchUtils/appFetchUtils";
import { AppCard } from "./appCards";

interface ReleaseData {
  appName: string;
  authorName: string;
  description: string;
  date: string;
  latestReleaseUrl: string;
  repoUrl: string;
}

export async function CommunityAppsSection() {
  
  const appReleaseFile = await fetchAppReleaseFile();
  const communityRepos = appReleaseFile.repositories || [];

  // Then fetch community releases
  const releases = await fetchCommunityReleasesFromRepos(communityRepos);

  // render logic...
  return (
    <section className="w-full flex flex-col gap-4">
      <h2>Community Apps</h2>
      <div className="mb-3 -mt-3 text-neutral-400">
        Installing Community Apps:
        <ol className="list-decimal ml-6 mt-1">
          <li>Download the app release .zip</li>
          <li>Go to Downloads {">"} App in the Deskthing server app.</li>
          <li>Click the “Upload App” button on the sidebar.</li>
          <li>Navigate to the apps .zip and open.</li>
        </ol>
      </div>
      <div className="grid rid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {releases.length === 0 && (
          <div className="p-6 border border-neutral-800 rounded-lg flex flex-col gap-2 bg-neutral-925">
            <h4 className="text-left w-full font-medium">No community apps found.</h4>
          </div>
        )}
        {releases.map((release: ReleaseData, index: number) => (
          <AppCard
            key={index}
            appName={release.appName}
            authorName={release.authorName}
            description={release.description}
            latestReleaseUrl={release.latestReleaseUrl}
            repoUrl={release.repoUrl}
          />
        ))}
      </div>
    </section>
  );
}

export async function CommunityAppsLoading() {
  return (
    <div
      className="p-6 border border-neutral-800 rounded-lg flex flex-col gap-2
    bg-neutral-925"
    >
      <h4 className="text-left w-full font-medium">
        Loading Community Apps...
      </h4>
    </div>
  );
}
