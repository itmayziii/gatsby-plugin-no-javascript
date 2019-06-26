import { onPreRenderHTML, onRenderBody, Script } from './gatsby-ssr'
import Spy = jasmine.Spy

describe('gatsby-ssr.js', () => {

  describe('onRenderBody', () => {
    it('throws an error when no scripts are passed in', function () {
      expect(() => { onRenderBody({}) }).toThrow(new Error('gatsby-plugin-no-javascript: Gatsby removed an internal detail that this plugin relied upon, please submit this issue to https://www.github.com/itmayziii/gatsby-plugin-no-javascript.'))
    })
  })

  describe('onPreRenderHTML', () => {
    let replaceHeadComponentsSpy: Spy<any>
    let replacePostBodyComponentsSpy: Spy<any>
    beforeEach(() => {
      replaceHeadComponentsSpy = jasmine.createSpy('replaceHeadComponents')
      replacePostBodyComponentsSpy = jasmine.createSpy('replacePostBodyComponents')
    })

    it('does not remove non react components from the head, (checks for props)', function () {
      const fakeHeadComponents = [
        {
          type: 'link',
          key: 'styles-module1.css'
        },
        {
          type: 'link',
          key: 'styles-module2.css'
        }
      ]
      function getHeadComponents () {
        return fakeHeadComponents
      }
      function getPostBodyComponents () {
        return []
      }

      onPreRenderHTML({ getHeadComponents, replaceHeadComponents: replaceHeadComponentsSpy, getPostBodyComponents, replacePostBodyComponents: replacePostBodyComponentsSpy })
      expect(replaceHeadComponentsSpy).toHaveBeenCalledWith(fakeHeadComponents)
    })

    it('should remove static files like JSON from the head as these files are always added by Gatsby', () => {
      onRenderBody({ scripts: [] })
      const fakeHeadComponents = [
        {
          type: 'link',
          key: 'some-component.json',
          ref: null,
          props: {
            as: 'script',
            rel: 'preload',
            href: '/static/d/some-component.json'
          }
        },
        {
          type: 'link',
          key: 'styles-module1.css'
        }
      ]
      function getHeadComponents () {
        return fakeHeadComponents
      }
      function getPostBodyComponents () {
        return []
      }

      onPreRenderHTML({ getHeadComponents, replaceHeadComponents: replaceHeadComponentsSpy, getPostBodyComponents, replacePostBodyComponents: replacePostBodyComponentsSpy })
      expect(replaceHeadComponentsSpy).toHaveBeenCalledWith([fakeHeadComponents[1]])
    })

    it('should remove preload scripts from the head that are called out by Gatsby during onRenderBody', () => {
      const gatsbyGeneratedScripts: Script[] = [
        { name: 'app.a6d963769d2dc276611e.js', rel: 'preload' },
        { name: 'component---src-pages-schedule-a-pickup-php-js-a6d963769d2dc276611e.js', rel: 'preload' }
      ]
      onRenderBody({ scripts: gatsbyGeneratedScripts })

      const fakeHeadComponents = [
        {
          type: 'link',
          key: 'app.a6d963769d2dc276611e.js',
          ref: null,
          props: {
            as: 'script',
            rel: 'preload',
            href: '/app.a6d963769d2dc276611e.js'
          }
        },
        {
          type: 'link',
          key: 'component---src-pages-schedule-a-pickup-php-js-a6d963769d2dc276611e.js',
          ref: null,
          props: {
            as: 'script',
            rel: 'preload',
            href: '/component---src-pages-schedule-a-pickup-php-js-a6d963769d2dc276611e.js'
          }
        },
        {
          type: 'link',
          key: 'styles-module1.css'
        }
      ]
      function getHeadComponents () {
        return fakeHeadComponents
      }
      function getPostBodyComponents () {
        return []
      }

      onPreRenderHTML({ getHeadComponents, replaceHeadComponents: replaceHeadComponentsSpy, getPostBodyComponents, replacePostBodyComponents: replacePostBodyComponentsSpy })
      expect(replaceHeadComponentsSpy).toHaveBeenCalledWith([fakeHeadComponents[2]])
    })

  })

})
