import { PluginOptions } from './gatsby-ssr'

export function checkPathExclusion (pathname: string, pluginOptions: PluginOptions): boolean {
  if (!pluginOptions.excludePaths) return false

  return RegExp(pluginOptions.excludePaths).test(pathname)
}
