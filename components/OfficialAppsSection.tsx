import { fetchAppReleaseFile } from "../services/fetchUtils/appFetchUtils";
import { OfficialAppCard } from "./appCards";

export async function OfficialAppsSection() {

  const appReleaseFile = await fetchAppReleaseFile();

  if (!appReleaseFile) {
    return <div>Error loading official apps</div>;
  }

  return (
    <section className="w-full flex flex-col gap-4">
      <h2>Official Apps</h2>
      <p className="mb-3 -mt-3 text-neutral-400">
        Official apps can also be downloaded directly in the desktop app.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
        {appReleaseFile.releases.map((app, index: number) => (
          <OfficialAppCard key={index} app={app} />
        ))}
      </div>
    </section>
  );
}
export async function OfficialAppsLoading() {
  return (
    <div
      className="p-6 border border-neutral-800 rounded-lg flex flex-col gap-2
    bg-neutral-925"
    >
      <h4 className="text-left w-full font-medium">Loading Official Apps...</h4>
    </div>
  );
}
