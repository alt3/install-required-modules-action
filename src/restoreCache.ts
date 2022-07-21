const cache = require('@actions/cache')

export async function restoreCache(
  paths: Array<string>,
  key: string
): Promise<any> {
  function restoreKey(value: string, index: number, list: Array<string>) {
    return list.slice(0, index).concat(value).join('-')
  }

  try {
    const restoreKeys = key.split('-').map(restoreKey)

    return await cache.restoreCache(paths, key, restoreKeys)
  } catch (error) {}
}
