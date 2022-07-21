import * as core from '@actions/core'
import cache from '@actions/cache'

export async function restoreCache(
  paths: string[],
  key: string
): Promise<string | undefined> {
  function restoreKey(value: string, index: number, list: string[]): string {
    return list.slice(0, index).concat(value).join('-')
  }

  try {
    const restoreKeys = key.split('-').map(restoreKey)

    return await cache.restoreCache(paths, key, restoreKeys)
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}
