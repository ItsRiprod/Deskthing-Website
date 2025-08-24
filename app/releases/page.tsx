import { Download } from 'lucide-react';
import { fetchServerReleases } from '../../services';
import { JSX } from 'react';
import Sidebar from '../../components/sidebar';

export const metadata: { title: string } = {
  title: 'DeskThing | Releases',
}

interface SmallReleaseDownloadProps {
  label: string;
  url: string;
}

function SmallReleaseDownload({ label, url }: SmallReleaseDownloadProps): JSX.Element {
  return (
    <a
      href={url}
      className="flex flex-row gap-2 items-center hover:text-green-400 transition ease-in-out duration-100"
    >
      <Download size="14" strokeWidth="3" />
      <p className="font-medium">{label}</p>
    </a>
  );
}

interface Release {
  version: string;
  releaseDate: string;
  releaseNotes: string;
  rawFiles: { name: string; url: string }[];
  platforms: { [key: string]: string };
}

interface ReleasesCardProps {
  release: Release;
}

function ReleasesCard({ release }: ReleasesCardProps): JSX.Element {
  return (
    <div className="p-6 border bg-neutral-925 border-neutral-800 rounded-lg flex flex-col gap-4 w-full">
      <div className="flex flex-col gap-1">
        <h4 className="font-mono text-green-600 font-bold">{release.version}</h4>
        <p className="font-medium text-neutral-400 font-mono">
          {new Date(release.releaseDate).toLocaleDateString()}
        </p>
        <p className="text-sm text-neutral-400 break-words">
          {release.releaseNotes.slice(0, 200)}...
        </p>
      </div>
      <div className="flex flex-col gap-2">
        {release.rawFiles.map((file, index) => (
          <SmallReleaseDownload key={index} label={file.name} url={file.url} />
        ))}
      </div>
    </div>
  );
}

export default async function ReleasesPage(): Promise<JSX.Element> {
  const releases: Release[] = await fetchServerReleases();
  const latestRelease: Release | undefined = releases[0];
  const previousReleases: Release[] = releases.slice(1);

  const getPreviewNotes = (notes: string | null | undefined, charLimit: number = 200): string => {
    if (!notes) return '';
    return notes.length > charLimit ? `${notes.slice(0, charLimit)}...` : notes;
  };

  return (
    <div className="min-h-svh flex flex-row justify-between pt-nav mx-6 xl:mx-0">
      <div className="lg:border-r border-neutral-800 w-full lg:pr-6 xl:px-6 2xl:px-0">
        <div className="wideContainer xl:px-6 flex flex-col mx-auto gap-6">
          {latestRelease && (
            <>
              <h2 className="mb-auto">Latest Release</h2>
              <div className="flex flex-col gap-1 -mt-3">
                <h3 className="font-mono text-green-600">
                  {latestRelease.version}
                </h3>
                <p className="font-medium text-neutral-400 font-mono">
                  {new Date(latestRelease.releaseDate).toLocaleDateString()}
                </p>
                <p className="font-medium">{`${latestRelease.version} Release Notes`}</p>
                <p className="text-sm text-neutral-400 break-words characterLimit">
                  {latestRelease.releaseNotes}
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 gap-4 w-full">
                {Object.entries(latestRelease.platforms)
                  .filter(([, url]) => url)
                  .map(([platform, url]) => (
                    <a
                      key={platform}
                      href={url}
                      className="p-6 border border-neutral-800 rounded-lg flex flex-row justify-between 
              items-center bg-neutral-925 hoverDropShadow hover:text-green-600 transform ease-in-out duration-200"
                    >
                      <div>
                        <h3 className="font-sans font-medium text-3xl text-neutral-50">
                          {platform}
                        </h3>
                        <p className="font-mono text-neutral-400">
                          {latestRelease.version}
                        </p>
                      </div>
                      <Download size="2rem" />
                    </a>
                  ))}
              </div>
            </>
          )}

          <h2 id="previousreleases" className="mb-auto mt-4 scroll-mt-[8rem]">
            Previous Releases
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-4 w-full">
            {previousReleases.map((release, index) => (
              <ReleasesCard key={index} release={release} />
            ))}
          </div>
        </div>
      </div>
      <Sidebar />
    </div>
  );
}