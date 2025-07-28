import { AppLatestJSONLatest, AppManifest, ClientLatestJSONLatest, ClientManifest, GitDownloadUrl, GitRepoUrl, MultiReleaseJSONLatest } from "@deskthing/types"
import { satisfies } from "semver"
import { GithubRelease, GithubAsset, PastReleaseInfo, AppLatestServer, ClientLatestServer } from "../../types/release"

/**
 * Converts a GitHub repository URL to the corresponding API URL for releases.
 * @param repoUrl The GitHub repository URL (e.g., "https://github.com/user/repo")
 * @returns The API URL for the repository's releases (e.g., "https://api.github.com/repos/user/repo")
 * @throws Will throw an error if the input URL is invalid or not a GitHub repository.
 */
export const convertToApiUrl = (repoUrl: string): string => {
  // Remove trailing slash
  const cleanUrl = repoUrl.replace(/\/$/, '')

  let owner: string | undefined, repo: string | undefined

  // Handle API URL
  const apiMatch = cleanUrl.match(/api\.github\.com\/repos\/([^/]+)\/([^/]+)/)
  if (apiMatch) {
    ;[, owner, repo] = apiMatch
  } else {
    // Handle full GitHub URL
    const urlMatch = cleanUrl.match(/github\.com\/([^/]+)\/([^/]+)/)
    if (urlMatch) {
      ;[, owner, repo] = urlMatch
    } else {
      // Handle owner/repo format
      const simpleMatch = cleanUrl.match(/^([^/]+)\/([^/]+)$/)
      if (simpleMatch) {
        ;[, owner, repo] = simpleMatch
      }
    }
  }

  if (!owner || !repo) {
    throw new Error(`Invalid GitHub repository URL or format: ${repoUrl}`)
  }

  return `https://api.github.com/repos/${owner}/${repo}`
}

const defaultFetchOptions: RequestInit = {
  headers: { Accept: 'application/vnd.github+json' },
  next: { revalidate: 1800 } // Cache revalidation every 30 minutes
}

export const fetchWrapper = async <T>(url: string, options: RequestInit = defaultFetchOptions): Promise<T> => {
  const response = await fetch(url, options)
  
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.statusText}`)
  }
  
  return response.json()
}

/**
 * Finds a valid github URL
 * @param urls - An array of possible github URLs
 * @returns A valid github URL
 */
export const determineValidUrl = async (urls: string[]): Promise<GitRepoUrl> => {

  // Try to reconstruct repository URL from various URL formats
  for (const url of urls) {
    try {
      const urlParts = url.split('/')
      let owner: string | undefined = undefined
      let repo: string | undefined = undefined

      if (url.includes('api.github.com')) {
        // Handle API URLs
        const repoIndex = urlParts.findIndex((part) => part === 'repos' || part === 'repository')
        if (repoIndex !== -1) {
          owner = urlParts[repoIndex + 1]
          repo = urlParts[repoIndex + 2]
        }
      } else if (url.includes('github.com')) {
        // Handle direct GitHub URLs
        const githubIndex = urlParts.findIndex((part) => part === 'github.com')
        if (githubIndex !== -1) {
          owner = urlParts[githubIndex + 1]
          repo = urlParts[githubIndex + 2]
        }
      }

      if (owner && repo) {
        return `https://api.github.com/repos/${owner}/${repo}/releases` as GitRepoUrl
      }
    } catch (error) {
      // error loading url - dont log
    }
  }

  throw new Error('No valid GitHub repository URL found')
}

/**
 * Sanitizes a multi-release JSON asset
 * @param asset - The asset to sanitize. Should be a JSON type and not a Server or File type
 * @throws Will throw an error if the asset is not a valid JSON type
 * @returns The sanitized asset
 */
export const sanitizeLatestMultiJSON = (
  typedAsset: Partial<MultiReleaseJSONLatest>
): MultiReleaseJSONLatest => {
  if (!('repository' in typedAsset)) {
    throw new Error('Asset must have repository')
  }

  if (!('fileIds' in typedAsset) || !Array.isArray(typedAsset.fileIds)) {
    typedAsset.fileIds = []
  }

  if (!('repositories' in typedAsset) || !Array.isArray(typedAsset.repositories)) {
    typedAsset.repositories = []
  }

  return {
    meta_version: '0.11.8',
    meta_type: 'multi',
    repository: typedAsset.repository as GitRepoUrl,
    fileIds: typedAsset.fileIds || [],
    repositories: typedAsset.repositories || []
  }
}

/**
 * Sanitizes a client-release JSON asset
 * @param asset - The asset to sanitize. Should be a JSON type and not a Server or File type
 * @throws Will throw an error if the asset is not a valid JSON type
 * @returns The sanitized asset
 */
export const sanitizeLatestClientJSON = (
  typedAsset: Partial<ClientLatestJSONLatest>
): ClientLatestJSONLatest => {
  if (!('clientManifest' in typedAsset)) {
    throw new Error('Asset must contain clientManifest')
  }

  if (!('repository' in typedAsset)) {
    throw new Error('Asset must contain repository')
  }

  if (!('updateUrl' in typedAsset)) {
    throw new Error('Asset must contain updateUrl')
  }

  if (!('downloads' in typedAsset)) {
    typedAsset.downloads = 0
  }

  if (!('size' in typedAsset)) {
    typedAsset.size = 0
  }

  if (!('updatedAt' in typedAsset)) {
    typedAsset.updatedAt = Date.now()
  }

  if (!('createdAt' in typedAsset)) {
    typedAsset.createdAt = Date.now()
  }

  return {
    meta_version: '0.11.8',
    meta_type: 'client',
    clientManifest: typedAsset.clientManifest as ClientManifest,
    icon: 'icon' in typedAsset ? (typedAsset.icon as string) : undefined,
    hash: 'hash' in typedAsset ? (typedAsset.hash as string) : undefined,
    hashAlgorithm: 'hashAlgorithm' in typedAsset ? (typedAsset.hashAlgorithm as string) : undefined,
    repository: typedAsset.repository as GitRepoUrl,
    updateUrl: typedAsset.updateUrl as string,
    downloads: typedAsset.downloads as number,
    updatedAt: typedAsset.updatedAt as number,
    createdAt: typedAsset.createdAt as number,
    size: typedAsset.size as number
  }
}

/**
 * Sanitizes a app-release JSON asset
 * @param asset - The asset to sanitize. Should be a JSON type and not a Server or File type
 * @throws Will throw an error if the asset is not a valid JSON type
 * @returns The sanitized asset
 */
export const sanitizeLatestAppJSON = (
  typedAsset: Partial<AppLatestJSONLatest>
): AppLatestJSONLatest => {
  if (!('appManifest' in typedAsset)) {
    throw new Error('Asset must contain appManifest')
  }

  if (!('repository' in typedAsset)) {
    throw new Error('Asset must contain repository')
  }

  if (!('updateUrl' in typedAsset)) {
    throw new Error('Asset must contain updateUrl')
  }

  if (!('downloads' in typedAsset)) {
    typedAsset.downloads = 0
  }

  if (!('size' in typedAsset)) {
    typedAsset.size = 0
  }

  if (!('updatedAt' in typedAsset)) {
    typedAsset.updatedAt = Date.now()
  }

  if (!('createdAt' in typedAsset)) {
    typedAsset.createdAt = Date.now()
  }

  return {
    meta_version: '0.11.8',
    meta_type: 'app',
    appManifest: typedAsset.appManifest as AppManifest,
    icon: 'icon' in typedAsset ? (typedAsset.icon as string) : undefined,
    hash: 'hash' in typedAsset ? (typedAsset.hash as string) : undefined,
    hashAlgorithm: 'hashAlgorithm' in typedAsset ? (typedAsset.hashAlgorithm as string) : undefined,
    repository: typedAsset.repository as GitRepoUrl,
    updateUrl: typedAsset.updateUrl as string,
    downloads: typedAsset.downloads as number,
    updatedAt: typedAsset.updatedAt as number,
    createdAt: typedAsset.createdAt as number,
    size: typedAsset.size as number
  }
}

export const findAllZipAssets = (
  release: GithubRelease,
  appId: string
): GithubAsset[] | undefined => {
  // This ensures the latest (if there are multiple similar ones) is always chosen first
  const sortedAssets = release.assets.sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  )

  // This may inflate apps that have multiple types (i.e. weather will have all weather assets AND all weatherwaves assets )
  return sortedAssets.filter(
    (asset) =>
      asset.name.includes(appId) && (asset.name.endsWith('.zip') || asset.name.endsWith('.tar.gz'))
  )
}

export const collectPastReleases = (
  ghReleases: GithubRelease[],
  fileId: string
): PastReleaseInfo[] => {
  return ghReleases.flatMap((release) => {
    const zipAssets = findAllZipAssets(release, fileId)
    if (!zipAssets) return []

    return zipAssets.map((zipAsset) => {
      return {
        tag: release.tag_name,
        downloads: zipAsset.download_count,
        size: zipAsset.size,
        name: zipAsset.name,
        download_url: zipAsset.browser_download_url,
        created_at: release.created_at
      }
    })
  })
}

type ConversionReturnData =
  | { repos: string[]; type: 'converted-clients'; releases: ClientLatestServer[] }
  | { repos: string[]; type: 'converted-apps'; releases: AppLatestServer[] }
  | { repos: string[]; type: 'converted-repos'; releases: [] }


export const convertMultiToReleaseServer = async (
  releaseMulti: MultiReleaseJSONLatest,
  ghReleases: GithubRelease[] = []
): Promise<ConversionReturnData> => {
  // Handle iterating through all of the releases to generate

  if (!ghReleases) {
    const validRepoUrl = await determineValidUrl(releaseMulti.repositories || [])
  
    ghReleases = await fetchWrapper<GithubRelease[]>(convertToApiUrl(validRepoUrl) + '/releases')
  
    if (!ghReleases) throw new Error(`Releases at the end of ${releaseMulti.repository} were empty!`)
  }


  if (releaseMulti.fileIds && releaseMulti.fileIds.length > 0) {
    // Convert all of the IDs to releases
    const results = await Promise.allSettled(
      releaseMulti.fileIds?.map(async (fileId) =>
        convertIdToReleaseServer(fileId, releaseMulti.repository, ghReleases)
      ) ?? []
    )

    // Get the successful results
    const apps = results
      .filter((result) => result.status === 'fulfilled')
      .map((result) => result.value) as AppLatestServer[] | ClientLatestServer[]

    // Handle logging the errors
    results
      .filter((result): result is PromiseRejectedResult => result.status === 'rejected')
      .forEach((result, index) => {
        const fileId = releaseMulti.fileIds?.[index]
      })

    const type = apps[0].type

    return {
      repos: releaseMulti.repositories || [],
      type: `converted-${type}s`,
      releases: apps
    } as ConversionReturnData
  }

  return {
    repos: releaseMulti.repositories || [],
    type: 'converted-repos',
    releases: []
  }
}

export const findFirstJsonAsset = (
  ghReleases: GithubRelease[],
  appId: string
): GithubAsset | undefined => {
  for (const release of ghReleases) {
    const jsonAsset = findJsonAsset(release, appId, true)
    if (jsonAsset) {
      return jsonAsset
    }
  }
  return undefined
}

export const findFirstZipAsset = (
  ghReleases: GithubRelease[],
  appId: string
): GithubAsset | undefined => {
  for (const release of ghReleases) {
    const zipAsset = findZipAsset(release, appId)
    if (zipAsset) {
      return zipAsset
    }
  }
  return undefined
}

export const findJsonAsset = (
  release: GithubRelease,
  appId: string,
  strict = false
): GithubAsset | undefined => {
  // This ensures the latest (if there are multiple similar ones) is always chosen first
  const sortedAssets = release.assets.sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  )

  // Priority: appId.json > latest.json
  const appIdJson = sortedAssets.find((asset) => asset.name === `${appId}.json`)
  if (appIdJson) return appIdJson

  if (strict) return // return early if strict is enabled

  const latestJson = sortedAssets.find((asset) => asset.name === 'latest.json')
  return latestJson
}

export const findZipAsset = (release: GithubRelease, appId: string): GithubAsset | undefined => {
  // This ensures the latest (if there are multiple similar ones) is always chosen first
  const sortedAssets = release.assets.sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  )

  return sortedAssets.find(
    (asset) =>
      asset.name.includes(appId) && (asset.name.endsWith('.zip') || asset.name.endsWith('.tar.gz'))
  )
}

export const convertIdToReleaseServer = async (
  appId: string,
  repository: GitRepoUrl,
  ghReleases: GithubRelease[]
): Promise<ClientLatestServer | AppLatestServer> => {

  // Find first release containing the app ID

  const firstJsonAsset = findFirstJsonAsset(ghReleases, appId)
  const firstZipAsset = findFirstZipAsset(ghReleases, appId)
  let mainRelease: AppLatestJSONLatest | ClientLatestJSONLatest | MultiReleaseJSONLatest

  // This will split the logic between migration logic and up-to-date logic

  if (!firstJsonAsset && ghReleases.length > 0) {
    
    // fails
    throw new Error(`No release found containing app ID: ${appId}`)

  } else {
    if (!firstJsonAsset) {
      throw new Error(`No release found containing app ID: ${appId}`)
    }

    // We are relatively confident that this jsonAsset is up-to-date because it is name.json and not latest.json - which is the newer way of doing it

    // Download and parse the JSON content
    const preMainRelease = await fetchWrapper<
      AppLatestJSONLatest | ClientLatestJSONLatest | MultiReleaseJSONLatest
    >(firstJsonAsset.browser_download_url)

    if (!preMainRelease) throw new Error(`No release found containing app ID: ${appId}`)

    // Finally assign mainRelease - this will migrate it as well if need be
    mainRelease = preMainRelease
  }

  if (mainRelease.meta_type == 'multi') throw new Error('Unable to hande meta_type equaling multi')

  // Collect past releases
  const pastReleases: PastReleaseInfo[] = collectPastReleases(ghReleases, appId)

  // Calculate total downloads
  const totalDownloads = pastReleases.reduce((sum, release) => sum + release.downloads, 0)

  if (firstZipAsset) mainRelease.downloads = firstZipAsset.download_count
  if (firstZipAsset) mainRelease.updateUrl = firstZipAsset.browser_download_url

  // This is the way it must be done for type-safety despite the fact that it is the same as just a single return - oh well
  if (mainRelease.meta_type === 'app') {
    return {
      type: mainRelease.meta_type,
      id: appId,
      mainRelease: mainRelease,
      lastUpdated: Date.now(),
      totalDownloads: totalDownloads,
      pastReleases: pastReleases
    }
  } else {
    return {
      type: mainRelease.meta_type,
      id: appId,
      mainRelease: mainRelease,
      lastUpdated: Date.now(),
      totalDownloads: totalDownloads,
      pastReleases: pastReleases
    }
  }
}