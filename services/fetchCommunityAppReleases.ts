import { GithubRelease, GithubRepository } from "../types/release";
import { convertToApiUrl } from "./fetchUtils/fetchUtils";

// Repos to pull for Community Apps
const defaultRepos: string[] = [
  "RandomDebugGuy/DeskThing-GMP",
  "dakota-kallas/DeskThing-GitHub",
  "grahamplace/pomodoro-thing",
  "dakota-kallas/DeskThing-SportsHub",
  "dakota-kallas/DeskThing-MarketHub",
  "ankziety/DeskThingDiscord",
  "espeon/lyrthing",
  "nwo122383/sonos-webapp",
  "Jarsa132/deskthing-volctrl",
  "ankziety/DeskThingDiscord",
  "TylStres/DeskThing-Timer",
];

interface ReleaseData {
  appName: string;
  authorName: string;
  description: string;
  date: string;
  latestReleaseUrl: string;
  repoUrl: string;
}

export async function fetchCommunityReleasesFromRepos(repos: string[] = defaultRepos): Promise<(ReleaseData)[]> {
  const fetchRepoData = async (repo: string): Promise<ReleaseData | null> => {
    const repoApiUrl: string = convertToApiUrl(repo)
    const releasesApiUrl: string = `${repoApiUrl}/releases`;

    try {
      const repoResponse: Response = await fetch(repoApiUrl, {
        headers: { Accept: "application/vnd.github+json" },
        next: { revalidate: 1800 }, // Cache revalidation every 30 minutes
      });

      if (!repoResponse.ok) {
        console.error(`Failed to fetch repository data for ${repo}: ${repoResponse.statusText}`);
        return null;
      }

      const repoData: GithubRepository = await repoResponse.json();
      const { description, html_url, owner, name } = repoData;

      const releaseResponse: Response = await fetch(releasesApiUrl, {
        headers: { Accept: "application/vnd.github+json" },
        next: { revalidate: 1800 }, // Cache revalidation every 30 minutes
      });

      if (!releaseResponse.ok) {
        console.error(`Failed to fetch releases for ${repo}: ${releaseResponse.statusText}`);
        return null;
      }

      const releases: GithubRelease[] = await releaseResponse.json();
      if (releases.length === 0) {
        console.warn(`No releases found for ${repo}`);
        return null;
      }

      const latestRelease = releases[0];
      const { html_url: latestReleaseUrl, published_at: date, author } = latestRelease;

      return {
        appName: name, // Extract the repository name as app name
        authorName: author?.login || owner?.login || "Unknown", 
        description: description || "No description available.",
        date: new Date(date).toLocaleDateString(),
        latestReleaseUrl,
        repoUrl: html_url,
      };
    } catch (error) {
      console.error(`Error fetching data for ${repo}:`, error);
      return null;
    }
  };

  const releaseData: (ReleaseData | null)[] = await Promise.all(repos.map(fetchRepoData));

  return releaseData.filter(Boolean) as ReleaseData[];
}