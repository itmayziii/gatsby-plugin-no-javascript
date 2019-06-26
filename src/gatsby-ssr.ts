import { ReactElement, ReactNode } from 'react'

interface OnRenderBodyArgs {
  scripts?: Scripts[]
}

interface OnPreRenderHTMLArgs {
  getHeadComponents (): ReactNode[]
  replaceHeadComponents (reactNodes: ReactNode[]): void
  getPostBodyComponents (): ReactNode[]
  replacePostBodyComponents (ReactNode: ReactNode[]): void
}

interface Scripts {
  name: string
  rel: string
}

let pageScripts: Scripts[]

/*
 * The "scripts" variable is not documented by Gatsby, https://www.gatsbyjs.org/docs/ssr-apis/#onRenderBody, and that is probably for a good reason. The variable contains
 * the scripts the Gatsby internals, https://github.com/gatsbyjs/gatsby/blob/d9cf5a21403c474846ebdf7a0508902b9b8a2ea9/packages/gatsby/cache-dir/static-entry.js#L270-L283, puts into
 * the head and post body. We will be relying on this undocumented variable until it does not work anymore as the alternative is to read the webpack.stats.json file and parse it ourselves.
 */
export function onRenderBody ({ scripts }: OnRenderBodyArgs) {
  // TODO maybe we should not even wait and see if Gatsby removes this internal "script" variable and code around the issue if the variable is not there.
  if (!scripts) {
    throw new Error('gatsby-plugin-no-javascript: Gatsby removed an internal detail that this plugin relied upon, please submit this issue to https://www.github.com/itmayziii/gatsby-plugin-no-javascript.')
  }
  pageScripts = scripts
}

// Here we rely on the fact that onPreRenderHTML is called after onRenderBody so we have access to the scripts Gatsby inserted into the HTML.
export function onPreRenderHTML ({ getHeadComponents, replaceHeadComponents, getPostBodyComponents, replacePostBodyComponents }: OnPreRenderHTMLArgs) {
  replaceHeadComponents(getHeadComponentsNoJS(getHeadComponents()))
  replacePostBodyComponents(getPostBodyComponentsNoJS(getPostBodyComponents()))
}

function getHeadComponentsNoJS (headComponents: ReactNode[]): ReactNode[] {
  return headComponents.filter((headComponent) => {
    // Not a react component and therefore not a <script>.
    if (!isReactElement(headComponent)) {
      return true
    }

    return pageScripts.find((script) => {
      const matchesScript = headComponent.props.as === 'script' && `/${script.name}` === headComponent.props.href && script.rel === headComponent.props.rel
      const isJSONFile = headComponent.props.href && headComponent.props.href.endsWith('.json')
      return matchesScript || isJSONFile
    }) === undefined
  })
}

function getPostBodyComponentsNoJS (postBodyComponents: ReactNode[]): ReactNode[] {
  return postBodyComponents.filter((postBodyComponent) => {
    // Not a react component and therefore not a <script>.
    if (!isReactElement(postBodyComponent)) {
      return true
    }

    // These are special Gatsby files we are calling out specifically.
    if (postBodyComponent.props.id && (postBodyComponent.props.id === 'gatsby-script-loader' || postBodyComponent.props.id === 'gatsby-chunk-mapping')) {
      return false
    }

    return pageScripts.find((script) => postBodyComponent.type === 'script' && `/${script.name}` === postBodyComponent.props.src) === undefined
  })
}

function isReactElement (reactNode: ReactNode): reactNode is ReactElement {
  return (<ReactElement>reactNode).props !== undefined
}
