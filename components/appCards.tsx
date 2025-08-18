import { Download, ExternalLink, CalendarSync, ChevronDown} from "lucide-react";
import React, { FC } from "react";
import { AppLatestServer } from "../types/release";
import { formatCompactNumber } from "../utils/formatNumber";
import ReleasesDropdown from "./ReleasesDropdown";

interface OfficialAppCardProps {
  app: AppLatestServer;
}

export const OfficialAppCard: FC<OfficialAppCardProps> = ({ app }) => {
  const manifest = app.mainRelease.appManifest;

  return (
    <div
      className="p-6 border border-neutral-800 rounded-lg flex flex-col gap-3
      bg-neutral-925 hoverDropShadow justify-between transition ease-in-out duration-200"
    >
      <div className="flex flex-col gap-2">
        <div>
          <h4 className="text-left text-2xl w-full font-medium text-green-600">
            {manifest.label || app.id}
          </h4>
          <p className="text-left font-mono text-neutral-400 text-sm">
            v{manifest.version || "unknown"} by {manifest.author || "Unknown"}
          </p>
        </div>
        {manifest.description && (
          <p className="text-left w-full mb-1">{manifest.description}</p>
        )}
      </div>

      <div className="flex flex-col gap-2">
          <div className="flex gap-2 items-center text-neutral-500 text-sm">
            <Download size={16} />
            <p>{formatCompactNumber(app.totalDownloads)} Downloads</p>
          </div>
          <div className="flex gap-2 items-center text-neutral-500 text-sm">
            <CalendarSync size={16} />
            <p>{new Date(app.lastUpdated).toLocaleDateString()}</p>
          </div>
        <div className="flex flex-row gap-2 relative">
          <a
            href={manifest.updateUrl || app.mainRelease.updateUrl}
            target="_blank"
            className="px-3 py-2 border border-neutral-800 w-full rounded-lg flex flex-row justify-between items-center text-sm 
            hover:bg-green-600 transition ease-in-out duration-200 hoverDropShadow"
          >
            Latest
            <Download size="20px" />
          </a>
          <ReleasesDropdown pastReleases={app.pastReleases ?? []} />
        </div>
      </div>
    </div>
  );
};

/*
export const OfficialAppCard: FC<OfficialAppCardProps> = ({ app }) => {
  const manifest = app.mainRelease.appManifest;

  return (
    <div
      className="p-6 border border-neutral-800 rounded-lg flex flex-col gap-3
      bg-neutral-925 hoverDropShadow justify-between transition ease-in-out duration-200"
    >
      <div className="flex flex-col gap-2">
        <div>
          <h4 className="text-left text-2xl w-full font-medium text-green-600">
            {manifest.label || app.id}
          </h4>
          <p className="text-left font-mono text-neutral-400 text-sm">
            v{manifest.version || "unknown"} by {manifest.author || "Unknown"}
          </p>
        </div>
        {manifest.description && (
          <p className="text-left w-full mb-1">{manifest.description}</p>
        )}
      </div>

      <div className="flex flex-col gap-2">
          <div className="flex gap-2 items-center text-neutral-500 text-sm">
            <Download size={16} />
            <p>{formatCompactNumber(app.totalDownloads)} Downloads</p>
          </div>
          <div className="flex gap-2 items-center text-neutral-500 text-sm">
            <CalendarSync size={16} />
            <p>{new Date(app.lastUpdated).toLocaleDateString()}</p>
          </div>
        <div className="flex flex-row gap-2">
          <a
            href={manifest.updateUrl || app.mainRelease.updateUrl}
            target="_blank"
            className="px-3 py-2 border border-neutral-800 w-full rounded-lg flex flex-row justify-between items-center text-sm 
            hover:bg-green-600 transition ease-in-out duration-200 hoverDropShadow"
          >
            Latest
            <Download size="20px" />
          </a>
        </div>
        {app.pastReleases && app.pastReleases.length > 0 && (
          <details className="mt-2">
            <summary className="cursor-pointer text-neutral-400 text-xs">
              Past Releases
            </summary>
            <ul className="mt-2 flex flex-col gap-1">
              {app.pastReleases.map((release, index) => (
                <li
                  key={index}
                  className="flex flex-row justify-between items-center bg-neutral-900 px-2 py-1 rounded text-xs"
                >
                  <span>
                    {release.name || release.tag} (
                    {new Date(release.created_at).toLocaleDateString()})
                  </span>
                  <span className="flex flex-col items-end">
                    <a
                      href={release.download_url}
                      target="_blank"
                      className="text-green-600 hover:underline flex items-center gap-1"
                    >
                      Download
                      <Download size="16px" />
                    </a>
                    <span>
                      <span className="ml-2 text-neutral-400">
                        {release.downloads} dl
                      </span>
                      <span className="ml-2 text-neutral-400">
                        {(release.size / 1024 / 1024).toFixed(2)} MB
                      </span>
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </details>
        )}
      </div>
    </div>
  );
};*/

interface AppCardProps {
  appName: string;
  authorName: string;
  description: string;
  latestReleaseUrl: string;
  repoUrl: string;
}

export const AppCard: FC<AppCardProps> = ({
  appName,
  authorName,
  description,
  latestReleaseUrl,
  repoUrl,
}) => {
  return (
    <div
      className="w-full max-w-full p-6 border border-neutral-800 rounded-lg flex flex-col justify-between gap-2
    bg-neutral-925 hoverDropShadow transition ease-in-out duration-200"
    >
      <div className="flex flex-col gap-2">
        <h5 className="text-left text-2xl w-full font-medium text-green-600 wrap-anywhere" style={{overflowWrap: 'anywhere'}}>
          {appName}
        </h5>
        <p className="text-left w-full font-mono text-neutral-400 text-sm">
          by {authorName}
        </p>
        <p className="text-left w-full mb-1">{description}</p>
      </div>
      <div className="flex flex-row gap-2">
        <a
          href={latestReleaseUrl}
          target="_blank"
          className="px-3 py-2 border border-neutral-800 w-full rounded-lg flex flex-row justify-between items-center text-sm 
          hover:bg-green-600 transition ease-in-out duration-200 hoverDropShadow"
        >
          Latest
          <Download size="20px" />
        </a>
        <a
          href={repoUrl}
          target="_blank"
          className="px-3 py-2 border border-neutral-800 w-full rounded-lg flex flex-row justify-between items-center text-sm text-neutral-400
          hover:bg-neutral-50/10 transition ease-in-out duration-200"
        >
          App Repo
          <ExternalLink size="20px" />
        </a>
      </div>
    </div>
  );
};
