# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [2.0.1](https://github.com/itmayziii/gatsby-plugin-no-javascript/compare/v2.0.0...v2.0.1) (2019-07-22)


### Build System

* **package.json:** Updated dev dependencies to fix vulnerabilities. ([9ed858d](https://github.com/itmayziii/gatsby-plugin-no-javascript/commit/9ed858d))



## [2.0.0](https://github.com/itmayziii/gatsby-plugin-no-javascript/compare/v1.1.2...v2.0.0) (2019-07-22)


### Features

* **gatsby-ssr:** add excludePaths option ([2719468](https://github.com/itmayziii/gatsby-plugin-no-javascript/commit/2719468))
* **gatsby-ssr:** update checkpathexclusion to use RegExp instead of an array of strings ([3dc084a](https://github.com/itmayziii/gatsby-plugin-no-javascript/commit/3dc084a))
* **gatsby-ssr:** update exclude to excludeFiles ([057bc58](https://github.com/itmayziii/gatsby-plugin-no-javascript/commit/057bc58))


### Tests

* **gatsby-ssr.spec.ts:** update some tests ([703d72d](https://github.com/itmayziii/gatsby-plugin-no-javascript/commit/703d72d))


### BREAKING CHANGES

* **gatsby-ssr:** the option of exclude has been changed to excludeFiles. Anything using exclude
still will not have stuff excluded



### [1.1.2](https://github.com/itmayziii/gatsby-plugin-no-javascript/compare/v1.1.1...v1.1.2) (2019-06-28)


### Bug Fixes

* **gatsby-ssr:** Ignored all actions during dev build. ([2f9c265](https://github.com/itmayziii/gatsby-plugin-no-javascript/commit/2f9c265))


### Tests

* **instanbul source maps:** Added source maps for code coverage. ([9c11787](https://github.com/itmayziii/gatsby-plugin-no-javascript/commit/9c11787))



### [1.1.1](https://github.com/itmayziii/gatsby-plugin-no-javascript/compare/v1.1.0...v1.1.1) (2019-06-27)


### Bug Fixes

* **gatsby-ssr:** Added a check for href and src in props before regexp testing them. ([8eb6565](https://github.com/itmayziii/gatsby-plugin-no-javascript/commit/8eb6565))



## [1.1.0](https://github.com/itmayziii/gatsby-plugin-no-javascript/compare/v1.0.2...v1.1.0) (2019-06-27)


### Features

* **gatsby-ssr:** Added the ability to exclude files that get removed. ([395d4a1](https://github.com/itmayziii/gatsby-plugin-no-javascript/commit/395d4a1))



### [1.0.2](https://github.com/itmayziii/gatsby-plugin-no-javascript/compare/v1.0.1...v1.0.2) (2019-06-27)


### Build System

* **.npmignore:** Removed files by adding them to .npmignore. ([7f2b4f8](https://github.com/itmayziii/gatsby-plugin-no-javascript/commit/7f2b4f8))



### [1.0.1](https://github.com/itmayziii/gatsby-plugin-no-javascript/compare/v1.0.0...v1.0.1) (2019-06-27)


### Bug Fixes

* **package.json:** Changed gatsby plugin to gatsby-plugin as per requirements. ([f8bbbf2](https://github.com/itmayziii/gatsby-plugin-no-javascript/commit/f8bbbf2))


### Build System

* **Cloudbuild:** Added cloud build to test pull requests. ([2896fd7](https://github.com/itmayziii/gatsby-plugin-no-javascript/commit/2896fd7))


### Tests

* **gatsby-ssr.spec:** Renamed on of the tests. ([1c04ae5](https://github.com/itmayziii/gatsby-plugin-no-javascript/commit/1c04ae5))



# [1.0.0](https://github.com/itmayziii/gatsby-plugin-no-javascript/compare/v0.1.0...v1.0.0) (2019-06-26)


### Features

* **testing:** added jasmine for testing ([907403f](https://github.com/itmayziii/gatsby-plugin-no-javascript/commit/907403f))



## 0.1.0 (2019-06-26)


### Build System

* **Standard version:** Added a library to help with changelogs. ([c6dd92a](https://github.com/itmayziii/gatsby-plugin-no-javascript/commit/c6dd92a))


### Features

* **No Javascript Plugin:** Added all logic to remove JS from a Gatsby project. ([67bad8e](https://github.com/itmayziii/gatsby-plugin-no-javascript/commit/67bad8e))
