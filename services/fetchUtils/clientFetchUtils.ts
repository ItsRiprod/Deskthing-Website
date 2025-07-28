import { ClientLatestJSONLatest, MultiReleaseJSONLatest, AppLatestJSONLatest } from '@deskthing/types'
import { ClientReleaseFile01111, ClientLatestServer, GithubRelease } from '../../types/release'
import { convertToApiUrl, fetchWrapper } from './fetchUtils'

const clientRepo = 'https://api.github.com/repos/itsriprod/deskthing-client'

export const defaultClientLatestJSONFallback: ClientReleaseFile01111 = {
  version: '0.11.11',
  type: 'client',
  repositories: [clientRepo],
  releases: [],
  timestamp: 0
}

const fetchOptions: RequestInit = {
  headers: { Accept: 'application/vnd.github+json' },
  next: { revalidate: 1800 } // Cache revalidation every 30 minutes
}

export const fetchClientReleaseFile = async (force = false): Promise<ClientReleaseFile01111> => {

  try {
  
    const validatedUrl = convertToApiUrl(clientRepo) + '/releases'

    const releaseAssets = await fetchWrapper<GithubRelease[]>(validatedUrl, fetchOptions)

    const latestReleaseAssets = releaseAssets[0]

    if (!latestReleaseAssets) {
      throw new Error('Unable to find latest release assets')
    }

    const latestReleaseJsonAsset = latestReleaseAssets.assets.find(
      (asset) => asset.name == 'latest.json'
    )

    if (!latestReleaseJsonAsset) {
      throw new Error('Unable to find latest.json asset in releases')
    }

    const adaptedRelease = await fetchWrapper<
      ClientLatestJSONLatest | MultiReleaseJSONLatest | AppLatestJSONLatest
    >(latestReleaseJsonAsset.browser_download_url, fetchOptions)

    if (!adaptedRelease) {
      throw new Error('Unable to fetch latest.json')
    }

    if (adaptedRelease.meta_type == 'app')
      throw new Error(`Received meta type 'app' when expecting Multi or Client`)

    if (adaptedRelease.meta_type == 'multi') {
      throw new Error(`Received meta type 'multi' when expecting Client`)
    }

    adaptedRelease.updateUrl = latestReleaseJsonAsset.browser_download_url

    const latestServer: ClientLatestServer = {
      id: adaptedRelease.clientManifest.id,
      type: 'client',
      mainRelease: adaptedRelease,
      lastUpdated: Date.now(),
      totalDownloads: 0,
      pastReleases: []
    }

    const finalClientReleaseFile: ClientReleaseFile01111 = {
      version: '0.11.11',
      type: 'client',
      repositories: adaptedRelease.repository ? [adaptedRelease.repository] : [],
      releases: [latestServer],
      timestamp: Date.now()
    }

    return finalClientReleaseFile
  } catch (error) {
    return defaultClientLatestJSONFallback
  }
}