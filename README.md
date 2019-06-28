## Description

Removes all javascript files created by Gatsby from the static HTML files. This plugin is not meant to remove all javascript, but only the javascript that Gatsby is adding to the 
page. 
 
A code coverage tool is not set up for this repository yet to add a nice badge for the percent covered,
but rest knowing that this plugin is currently 100% unit tested. Go ahead and run `npm run test` to see the `instanbul` code coverage output.

:warning: The Gatsby javascript is only removed from the production build `gatsby build` and not during the dev build `gatsby develop`. If you do not write any state logic or event
handlers then this should not effect you. This feature may be something this plugin wants to tackle in the future.

## How to install

`npm install gatsby-plugin-no-javascript` or `yarn add gatsby-plugin-no-javascript`

:warning: This plugin should be included last in your `gatsby-config.js` as it relies on [onPreRenderHTML](https://www.gatsbyjs.org/docs/ssr-apis/#onPreRenderHTML)
`replaceHeadComponents` and `replacePostBodyComponents`.

## Available options

`exclude`: `string (optional)`
* Will be used as a regular expression to test whether or not a Gatsby javascript file should be excluded by this plugin. The default behavior is that all Gatsby javascript files 
are removed by this plugin, so this option gives you a chance to "exclude them from being excluded :sweat_smile:".
* A use case for this option is to not remove the webpack-runtime.js file that Gatsby ships by default in case you have other javascript that relies on that runtime.
* :warning: Make sure you enter a string 'a-string' instead of JS regexp like `/a-string/`, Gatsby has trouble handing off regular expressions to plugins. The string you pass in
will be handled as a regular expression for you. 

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

* Please open an issue first so that it can be determined that the feature / issue needs to be implemented / fixed.
* If it is determined that the feature / issue is something this plugin should address then feel free to fork the repo and make a pull request.
* This project makes use of [conventional commits](https://www.conventionalcommits.org/en/v1.0.0-beta.2/) and your commits should follow this standard. In order to make following
this convention easy this project uses an NPM package called [commitizen](https://www.npmjs.com/package/commitizen). Now this isn't just an arbitrary spec that this package is
forcing on you, as it turns out when you have standards around things you can build automation on top of it very easily. In the case of these standardized commit messages when this
package releases a new version it auto generates a changelog / version bump based on the commit messages. In order to easily commit just run `npm run commit` and you will guided
through a series of questions which will auto format the commit message for you.
* Before making a pull request please make sure the tests are passing `npm run test` and the linter is happy `npm run lint`.
