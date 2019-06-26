## Description

Removes all javascript files created by Gatsby from the static HTML files. This

## How to install

`npm install gatsby-plugin-no-javascript` or `yarn add gatsby-plugin-no-javascript`

:warning: This plugin should be included last in your `gatsby-config.js` as it relies on [onPreRenderHTML](https://www.gatsbyjs.org/docs/ssr-apis/#onPreRenderHTML)
`replaceHeadComponents` and `replacePostBodyComponents`. :warning:

## When do I use this plugin?

Use this plugin if you want to remove the javascript that comes out of the box with Gatsby. This is useful if your site is truly a static site with no interactivity or maybe the
interactivity is handled by different javascript than your React components.

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

## How to run tests
`npm run test`

## How to develop locally

This project relies on typescript for all the type safety goodness which can be found in the `src` directory. The compiled output goes directly into the root of the project because
Gatsby expects [certain files](https://www.gatsbyjs.org/docs/files-gatsby-looks-for-in-a-plugin/) to be in the root.

### Dev workflow

1. Get the latest updates `npm install`.
2. Run `npm run watch` to tell typescript to listen to changes in the `src` directory and recompile on the fly.
3. Link this package to an actual gatsby project to test the plugin working, there is a good article for this
[here](https://medium.com/@the1mills/how-to-test-your-npm-module-without-publishing-it-every-5-minutes-1c4cb4b369be).

## How to contribute

1. Please open an issue first so that it can be determined that the feature / issue needs to be implemented / fixed.
2. If it is determined that it is something this plugin should address then feel free to fork the repo and make a pull request.
3. Before making a pull request please make sure the tests are passing `npm run test` and the linter is happy `npm run lint`.
