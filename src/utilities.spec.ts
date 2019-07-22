import { checkPathExclusion } from './utilities'

describe('checkPathExclusion', () => {
  it('does the pathname match any of the exclusions', () => {
    expect(checkPathExclusion('/client/omegablerns', { excludePaths: /\/client/ })).toBeTruthy()
    expect(checkPathExclusion('/my-cool-page', { excludePaths: /\/my-cool-page/ })).toBeTruthy()
    expect(checkPathExclusion('/about/blerns', { excludePaths: /(\/client)|(\/tacos)/ })).toBeFalsy()
    expect(checkPathExclusion('/about/tacos', { excludePaths: /(\/client)|(\/about\/tacos)/ })).toBeTruthy()
    expect(checkPathExclusion('/blerkstorm', {})).toBeFalsy()
  })
})
