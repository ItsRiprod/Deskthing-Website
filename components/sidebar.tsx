// components/sidebar.tsx
import React, { FC } from 'react';
import { BtnIcon, BtnArrow } from '../components/buttons';
import IconApple from "../components/assets/icons/Apple";
import IconWindows from "../components/assets/icons/Windows";
import IconLinux from "../components/assets/icons/Ubuntu";
import IconRasberry from "../components/assets/icons/Rasberry";
import { fetchServerReleases } from "../services";

interface DownloadUrls {
  latestVersion?: string;
  windows?: string;
  macArm64?: string;
  macX64?: string;
  linuxAppImage?: string;
  raspberry?: string;
}

interface SidebarProps {
  /** Optional. If omitted, the component will fetch the latest release and build these for you. */
  downloadUrls?: DownloadUrls;
}

const Sidebar: FC<SidebarProps> = async ({ downloadUrls }) => {
  // If no URLs passed in, fetch from the server
  let urls: DownloadUrls | undefined = downloadUrls;
  let latestVersion: string | undefined = downloadUrls?.latestVersion;

  if (!urls) {
    const serverReleases = await fetchServerReleases();
    const latestRelease = serverReleases?.[0];
    // Assume the API shape: latestRelease.platforms contains the platform URLs,
    // and latestRelease.version (or similar) contains the version string.
    urls = latestRelease?.platforms ?? {};
    latestVersion = latestRelease?.version ?? urls?.latestVersion;
  } else {
    latestVersion = urls.latestVersion;
  }

  return (
    <aside className="p-6 hidden lg:flex flex-col gap-4 w-sidebar sticky top-nav h-full lg:max-xl:pr-0">
      <div className="flex flex-col gap-1">
        <h4 className="font-bold text-xl mb-1">Latest Release</h4>
        <p className="font-mono text-neutral-400 leading-3">{latestVersion}</p>
      </div>
      <hr className="border-neutral-800" />

      {urls?.windows && (
        <BtnIcon to={urls.windows} label="Windows" icon={<IconWindows />} />
      )}
      {urls?.macArm64 && (
        <BtnIcon to={urls.macArm64} label="Mac Arm" icon={<IconApple />} />
      )}
      {urls?.macX64 && (
        <BtnIcon to={urls.macX64} label="Mac x64" icon={<IconApple />} />
      )}
      {urls?.linuxAppImage && (
        <BtnIcon to={urls.linuxAppImage} label="Linux" icon={<IconLinux />} />
      )}
      {urls?.raspberry && (
        <BtnIcon to={urls.raspberry} label="Raspberry" icon={<IconRasberry />} />
      )}

      <hr className="border-neutral-800" />
      <BtnArrow to="./releases#previousreleases" label="Previous Releases" />
    </aside>
  );
};

export default Sidebar;
