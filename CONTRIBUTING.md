# Contributing

* Please open an issue first so that it can be determined that the feature / issue needs to be implemented / fixed.
* If we determine the feature / issue is something this plugin should address then feel free to fork the repo and make a pull request.
* This project makes use of [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) and your commits should follow
this standard. In order to make following this convention easy this project uses an NPM package called [commitizen](https://www.npmjs.com/package/commitizen).
Now this isn't just an arbitrary spec this package is forcing on you, as it turns out when you have standards around things you can
build automation on top of it very easily. In the case of these standardized commit messages when this package releases a new version it
auto-generate a changelog / version bump based on the commit messages. In order to easily commit just run `npm run commit` and you will be guided 
through a series of questions which will auto-format the commit message for you.
* Before making a pull request please make sure the tests are passing `npm run test` and the linter is happy `npm run lint`.
