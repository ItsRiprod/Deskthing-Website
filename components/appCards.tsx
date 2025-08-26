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
