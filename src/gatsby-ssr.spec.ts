import { onPreRenderHTML, onRenderBody } from './gatsby-ssr'
import { headComponentsData } from './head-components-data'
import { ReactNode } from 'react'

describe('gatsby-ssr.js', function () {
  describe('onRenderBody', function () {
    it('throws an error when no scripts are passed in', function () {
      // @ts-ignore
      expect(function () {onRenderBody({})}).toThrow(new Error('gatsby-plugin-no-javascript: Gatsby removed an internal detail that this plugin relied upon, please submit this issue to https://www.github.com/itmayziii/gatsby-plugin-no-javascript.'))
    })
  })

  describe('onPreRenderHTML', function () {
    it('does not remove non react components', function () {
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

      const replaceHeadComponents = jasmine.createSpy('replaceHeadComponents')

      // @ts-ignore
      onPreRenderHTML({ getHeadComponents, replaceHeadComponents })
      expect(replaceHeadComponents).toHaveBeenCalledWith([fakeHeadComponents[0], fakeHeadComponents[1]])
    })
  })

})
