import { checkPathExclusion, isChildOfDirectory } from './utilities'

describe('checkPathExclusion', (): void => {
  it('does the pathname match any of the exclusions', (): void => {
    expect(checkPathExclusion('/client/omegablerns', { excludePaths: /\/client/ })).toBeTruthy()
    expect(checkPathExclusion('/my-cool-page', { excludePaths: /\/my-cool-page/ })).toBeTruthy()
    expect(checkPathExclusion('/about/blerns', { excludePaths: /(\/client)|(\/tacos)/ })).toBeFalsy()
    expect(checkPathExclusion('/about/tacos', { excludePaths: /(\/client)|(\/about\/tacos)/ })).toBeTruthy()
    expect(checkPathExclusion('/blerkstorm', {})).toBeFalsy()
  })
})

describe('isChildOfDirectory', (): void => {
  it('checks if a pathname is a child of a dirname', (): void => {
    expect(isChildOfDirectory('/foo', '/foo')).toBeFalsy()
    expect(isChildOfDirectory('/static', '/static/a-file.json')).toBeTruthy()
    expect(isChildOfDirectory('/static', '/static/dir/another-file.png')).toBeTruthy()
    expect(isChildOfDirectory('/page-data', '/page-data/index/page-data.json')).toBeTruthy()
    expect(isChildOfDirectory('/page-data', '/page-data/index/app-data.json')).toBeTruthy()
    expect(isChildOfDirectory('/page-data', '/page-data\\index\\page-data.json')).toBeTruthy()
  })
})
