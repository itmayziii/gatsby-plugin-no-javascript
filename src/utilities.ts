import { PluginOptions } from './gatsby-ssr'
import { relative, isAbsolute } from 'path'

export function checkPathExclusion (pathname: string, pluginOptions: PluginOptions): boolean {
  if (!pluginOptions.excludePaths) return false

  return RegExp(pluginOptions.excludePaths).test(pathname)
}

/**
 * Checks if a given pathname is a child of a given dirname
 */
export function isChildOfDirectory (dirname: string, pathname: string): boolean {
  const resolution = relative(dirname, pathname)
  return !!(resolution && !resolution.startsWith('..') && !isAbsolute(resolution))
}
