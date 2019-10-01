import { onPreRenderHTML, onRenderBody } from './gatsby-ssr'
import { headComponentsData, postBodyComponentsData, scriptsData } from './fake-data.spec'
import { ReactNode } from 'react'
import Spy = jasmine.Spy

describe('gatsby-ssr.js', (): void => {
  beforeEach((): void => {
    process.env.NODE_ENV = 'production' // Testing Gatsby production builds by default.
  })

  describe('onRenderBody', (): void => {
    it('throws an error when no scripts are passed in', (): void => {
      expect((): void => { onRenderBody({}) }).toThrow(new Error('gatsby-plugin-no-javascript: Gatsby removed an internal detail that this plugin relied upon, please submit this issue to https://www.github.com/itmayziii/gatsby-plugin-no-javascript.'))
    })
  })

  describe('onPreRenderHTML', (): void => {
    const pathname = '/my-cool-page'
    let replaceHeadComponentsSpy: Spy
    let replacePostBodyComponentsSpy: Spy

    beforeEach((): void => {
      replaceHeadComponentsSpy = jasmine.createSpy<any>('replaceHeadComponents')
      replacePostBodyComponentsSpy = jasmine.createSpy<any>('replacePostBodyComponents')
    })

    it('does not remove non react components from the head, (checks for props)', function (): void {
      function getHeadComponents (): ReactNode[] {
        return [headComponentsData[2], headComponentsData[3]]
      }
      function getPostBodyComponents (): ReactNode[] {
        return []
      }

      onPreRenderHTML({ getHeadComponents, pathname, replaceHeadComponents: replaceHeadComponentsSpy, getPostBodyComponents, replacePostBodyComponents: replacePostBodyComponentsSpy }, {})
      expect(replaceHeadComponentsSpy).toHaveBeenCalledWith([headComponentsData[2], headComponentsData[3]])
    })

    it('does not remove scripts in the head marked as excluded from plugin options', (): void => {
      onRenderBody({ scripts: scriptsData })
      function getHeadComponents (): ReactNode[] {
        return [headComponentsData[13]]
      }
      function getPostBodyComponents (): ReactNode[] {
        return []
      }

      onPreRenderHTML({
        pathname: '/my-cool-page',
        getHeadComponents,
        replaceHeadComponents: replaceHeadComponentsSpy,
        getPostBodyComponents,
        replacePostBodyComponents: replacePostBodyComponentsSpy
      }, { excludeFiles: /webpack-runtime/ })
      expect(replaceHeadComponentsSpy).toHaveBeenCalledWith([headComponentsData[13]])
    })

    it('should remove static files like JSON from the head as these files are always added by Gatsby', (): void => {
      const pathname = '/my-cool-page'

      onRenderBody({ scripts: [] })
      function getHeadComponents (): ReactNode[] {
        return [headComponentsData[0], headComponentsData[1], headComponentsData[14], headComponentsData[15]]
      }
      function getPostBodyComponents (): ReactNode[] {
        return []
      }

      onPreRenderHTML({ getHeadComponents, pathname, replaceHeadComponents: replaceHeadComponentsSpy, getPostBodyComponents, replacePostBodyComponents: replacePostBodyComponentsSpy }, {})
      expect(replaceHeadComponentsSpy).toHaveBeenCalledWith([headComponentsData[0], headComponentsData[1]])
    })

    it('should remove preload scripts from the head that are called out by Gatsby during onRenderBody', (): void => {
      const pathname = '/my-cool-page'
      onRenderBody({ scripts: scriptsData })

      function getHeadComponents (): ReactNode[] {
        return [
          headComponentsData[0], headComponentsData[1], headComponentsData[8], headComponentsData[9], headComponentsData[10], headComponentsData[11],
          headComponentsData[12], headComponentsData[13], headComponentsData[14]
        ]
      }
      function getPostBodyComponents (): ReactNode[] {
        return []
      }

      onPreRenderHTML({ getHeadComponents, pathname, replaceHeadComponents: replaceHeadComponentsSpy, getPostBodyComponents, replacePostBodyComponents: replacePostBodyComponentsSpy }, {})
      expect(replaceHeadComponentsSpy).toHaveBeenCalledTimes(1)
      expect(replaceHeadComponentsSpy.calls.argsFor(0)[0].length).toEqual(2)
      expect(replaceHeadComponentsSpy).toHaveBeenCalledWith([headComponentsData[0], headComponentsData[1]])
    })

    it('does not remove non react components from the body, (checks for props)', function (): void {
      const pathname = '/my-cool-page'
      const fakeBodyComponents = [
        {
          type: 'link',
          key: 'styles-module1.css'
        },
        {
          type: 'link',
          key: 'styles-module2.css'
        }
      ]

      function getHeadComponents (): ReactNode[] {
        return []
      }
      function getPostBodyComponents (): ReactNode[] {
        return fakeBodyComponents
      }

      onPreRenderHTML({ getHeadComponents, pathname, replaceHeadComponents: replaceHeadComponentsSpy, getPostBodyComponents, replacePostBodyComponents: replacePostBodyComponentsSpy }, {})
      expect(replacePostBodyComponentsSpy).toHaveBeenCalledWith(fakeBodyComponents)
    })

    it('does not remove scripts in the body marked as excluded from plugin options', (): void => {
      onRenderBody({ scripts: scriptsData })
      function getHeadComponents (): ReactNode[] {
        return []
      }
      function getPostBodyComponents (): ReactNode[] {
        return [postBodyComponentsData[3]]
      }

      onPreRenderHTML({
        pathname: '/my-cool-page',
        getHeadComponents,
        replaceHeadComponents: replaceHeadComponentsSpy,
        getPostBodyComponents,
        replacePostBodyComponents: replacePostBodyComponentsSpy
      }, { excludeFiles: /webpack-runtime/ })
      expect(replacePostBodyComponentsSpy).toHaveBeenCalledWith([postBodyComponentsData[3]])
    })

    it('should remove special Gatsby scripts from the body', (): void => {
      const pathname = '/my-cool-page'

      onRenderBody({ scripts: [] })
      function getHeadComponents (): ReactNode[] {
        return []
      }
      function getPostBodyComponents (): ReactNode[] {
        return [postBodyComponentsData[0], postBodyComponentsData[1], postBodyComponentsData[2]]
      }

      onPreRenderHTML({ getHeadComponents, pathname, replaceHeadComponents: replaceHeadComponentsSpy, getPostBodyComponents, replacePostBodyComponents: replacePostBodyComponentsSpy }, {})
      expect(replacePostBodyComponentsSpy).toHaveBeenCalledWith([postBodyComponentsData[0]])
    })

    it('should remove preload scripts from the body that are called out by Gatsby during onRenderBody', (): void => {
      const pathname = '/my-cool-page'

      onRenderBody({ scripts: scriptsData })
      function getHeadComponents (): ReactNode[] {
        return []
      }
      function getPostBodyComponents (): ReactNode[] {
        return [postBodyComponentsData[0], postBodyComponentsData[3], postBodyComponentsData[4], postBodyComponentsData[5], postBodyComponentsData[6], postBodyComponentsData[7]]
      }

      onPreRenderHTML({ getHeadComponents, pathname, replaceHeadComponents: replaceHeadComponentsSpy, getPostBodyComponents, replacePostBodyComponents: replacePostBodyComponentsSpy }, {})
      expect(replacePostBodyComponentsSpy).toHaveBeenCalledTimes(1)
      expect(replacePostBodyComponentsSpy.calls.argsFor(0)[0].length).toEqual(1)
      expect(replacePostBodyComponentsSpy).toHaveBeenCalledWith([postBodyComponentsData[0]])
    })

    it('should not remove anything during a non production build', (): void => {
      const pathname = '/my-cool-page'
      const oldEnv = process.env.NODE_ENV

      process.env.NODE_ENV = 'development'
      onRenderBody({})
      function getHeadComponents (): ReactNode[] {
        return headComponentsData
      }
      function getPostBodyComponents (): ReactNode[] {
        return postBodyComponentsData
      }

      onPreRenderHTML({ getHeadComponents, pathname, replaceHeadComponents: replaceHeadComponentsSpy, getPostBodyComponents, replacePostBodyComponents: replacePostBodyComponentsSpy }, {})

      expect(replaceHeadComponentsSpy).toHaveBeenCalledTimes(0)
      expect(replacePostBodyComponentsSpy).toHaveBeenCalledTimes(0)

      process.env.NODE_ENV = oldEnv
    })

    it('should not remove anything because of page exclusion ', (): void => {
      const pathname = '/my-cool-page'

      function getHeadComponents (): ReactNode[] {
        return headComponentsData
      }
      function getPostBodyComponents (): ReactNode[] {
        return postBodyComponentsData
      }

      onPreRenderHTML({ getHeadComponents, pathname, replaceHeadComponents: replaceHeadComponentsSpy, getPostBodyComponents, replacePostBodyComponents: replacePostBodyComponentsSpy },
        {
          excludePaths: /\/my-cool-page/
        }
      )

      expect(replaceHeadComponentsSpy).toHaveBeenCalledTimes(0)
      expect(replacePostBodyComponentsSpy).toHaveBeenCalledTimes(0)
    })
  })
})
