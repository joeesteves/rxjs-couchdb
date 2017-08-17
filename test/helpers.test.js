import { requestOptionsGenerator } from '../src/helpers'

describe('Helper optionGenerator', () => {
  it('returns a find option', () => {
    expect(
      requestOptionsGenerator('url', 'headers')('post', '_find', { _id: 'test' })
    ).toEqual({
      method: 'post',
      url: 'url/_find',
      headers: 'headers',
      json: { _id: 'test' }
    })
  })
})

