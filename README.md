[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

# gatsby-plugin-no-javascript

Removes all javascript files created by Gatsby from the static HTML files. This plugin does **NOT** remove all javascript, but only the
javascript that Gatsby is adding to the page.

:warning: The Gatsby javascript is only removed from the production build `gatsby build` and not during the dev build `gatsby develop`.
If you do not write any state logic or event handlers then this should not effect you. This feature may be something this plugin wants to
tackle in the future.

## How to install

`npm install gatsby-plugin-no-javascript` or `yarn add gatsby-plugin-no-javascript`

:warning: This plugin should be included last in your `gatsby-config.js` as it relies on [onPreRenderHTML](https://www.gatsbyjs.org/docs/ssr-apis/#onPreRenderHTML)
`replaceHeadComponents` and `replacePostBodyComponents`.

## Available options

* `excludeFiles`: `string (optional)`
    * Will be used as a regular expression to test whether or not a Gatsby javascript file should be excluded by this plugin. The default
      behavior is that all Gatsby javascript files are removed by this plugin, so this option gives you a chance to "exclude them from being
      excluded :sweat_smile:".
    * A use case for this option is to not remove the webpack-runtime.js file that Gatsby ships by default in case you have other javascript
      that relies on that runtime.
    * :warning: Make sure you enter a string 'a-string' instead of JS regexp like `/a-string/`, Gatsby has trouble handing off regular
      expressions to plugins. The string you pass in will be handled as a regular expression for you. 

* `excludePaths`: `string (optional)`
    * An array of paths that are to be excluded from removing all the JS. The code runs a "contains" so this can be used to block a
      directory and all subdirectories, or to get as specific as you want.

## When do I use this plugin?

Use this plugin if you want to remove the javascript that comes out of the box with Gatsby. This is useful if your site is truly a static
site with no interactivity or maybe the interactivity is handled by different javascript than your React components.

## Examples of usage

```javascript
module.exports = {
  siteMetadata: {
    title: 'Budget Dumpster',
    description: 'Budget Dumpster specializes in local dumpster rentals for homeowners and contractors alike. Call us to rent a dumpster in your area.'
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-remove-trailing-slashes',
    'gatsby-plugin-postcss',
    'gatsby-plugin-react-svg', 
    {
      resolve: `gatsby-plugin-google-tagmanager`,
      options: {
        id: process.env.GATSBY_GTM_ID,
        includeInDevelopment: true
      }
    },
    'gatsby-plugin-no-javascript' // <-- Here is the plugin, make sure it is included last in the plugins array.
  ]
}
```

## Upgrade Guide v1 -> v2
* Update the `exclude` pluginOption to `excludeFiles` in your gatsby-config file. The value passed in is exactly the same as it was before.

## How to run tests
`npm run test`

### Node versions
We also test against the [minimum supported Node version of Gatsby](https://www.gatsbyjs.org/docs/upgrading-node-js/#gatsbys-nodejs-support-policy) up
to the latest version during each pull request to make sure the code will work for all supported NodeJS versions. You can find this configuration in the 
[Cloud Build config file](cloudbuild.yaml).

## How to develop locally

This project relies on Typescript for all the type safety goodness which can be found in the `src` directory. The compiled output goes
directly into the root of the project because Gatsby expects [certain files](https://www.gatsbyjs.org/docs/files-gatsby-looks-for-in-a-plugin/)
to be in the root.

### Dev workflow

1. Get the latest updates `npm install`.
2. Run `npm run watch` to tell Typescript to listen to changes in the `src` directory and recompile on the fly.
3. Link this package to an actual gatsby project to test the plugin working, there is a good article for this
[here](https://medium.com/@the1mills/how-to-test-your-npm-module-without-publishing-it-every-5-minutes-1c4cb4b369be).

## How to contribute
See the [contributing docs](CONTRIBUTING.md)

### Code of conduct
Our code of conduct can be found [here](CODE_OF_CONDUCT.md)
