import { ClientLatestJSONLatest, MultiReleaseJSONLatest, AppLatestJSONLatest } from '@deskthing/types'
import { AppLatestServer, AppReleaseFile01111, GithubRelease } from '../../types/release'
import { convertMultiToReleaseServer, convertToApiUrl, fetchWrapper } from './fetchUtils'

const appsRepo = 'https://api.github.com/repos/itsriprod/deskthing-apps'

export const defaultAppLatestJSONFallback: AppReleaseFile01111 = {
  version: '0.11.11',
  type: 'app',
  repositories: [appsRepo],
  releases: [],
  timestamp: 0
}

const fetchOptions: RequestInit = {
  headers: { Accept: 'application/vnd.github+json' },
  next: { revalidate: 1800 } // Cache revalidation every 30 minutes
}

export const fetchAppReleaseFile = async (force = false): Promise<AppReleaseFile01111> => {
  try {

    const validatedUrl = convertToApiUrl(appsRepo) + '/releases'

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

    if (adaptedRelease.meta_type == 'client')
      throw new Error(`Received meta type 'client' when expecting Multi or App`)

    if (adaptedRelease.meta_type == 'multi') {

      const result = await convertMultiToReleaseServer(adaptedRelease, releaseAssets)

      if (result.type == 'converted-repos') {
        return {
          version: '0.11.11',
          type: 'app',
          repositories: result.repos,
          releases: [],
          timestamp: Date.now()
        }
      }

      if (result.type == 'converted-clients')
        throw new Error('Received "client" type when expecting multi or client')

      const appReleaseFile: AppReleaseFile01111 = {
        version: '0.11.11',
        type: 'app',
        repositories: result.repos,
        releases: result.releases,
        timestamp: Date.now()
      }



      return appReleaseFile
    }

    const latestServer: AppLatestServer = {
      id: adaptedRelease.appManifest.id,
      type: 'app',
      mainRelease: adaptedRelease,
      lastUpdated: Date.now(),
      totalDownloads: 0,
      pastReleases: []
    }

    const finalAppReleaseFile: AppReleaseFile01111 = {
      version: '0.11.11',
      type: 'app',
      repositories: adaptedRelease.repository ? [adaptedRelease.repository] : [],
      releases: [latestServer],
      timestamp: Date.now()
    }

    return finalAppReleaseFile
  } catch (error) {
    console.error('Unable to create app release file:', error)
    return defaultAppLatestJSONFallback
  }
}