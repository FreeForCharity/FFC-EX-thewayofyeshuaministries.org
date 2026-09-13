import { loadTeachings } from '../../src/lib/loadTeachings'

const payload = { entries: [], teachings: [] }

function mockFetch(impl: () => Promise<unknown>) {
  global.fetch = jest.fn(impl) as unknown as typeof fetch
}

afterEach(() => {
  jest.restoreAllMocks()
})

describe('loadTeachings', () => {
  it('fetches the corpus the build emits', async () => {
    mockFetch(() => Promise.resolve({ ok: true, json: () => Promise.resolve(payload) }))
    await expect(loadTeachings()).resolves.toEqual(payload)
    expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining('/teachings.json'))
  })

  /*
   * Every failure returns null rather than throwing. The helper keeps working
   * on the pages alone, which matters most offline: the service worker serves
   * the page from cache, and the corpus may not be in it yet.
   */
  it('returns null when the request fails', async () => {
    mockFetch(() => Promise.reject(new Error('offline')))
    await expect(loadTeachings()).resolves.toBeNull()
  })

  it('returns null on a non-OK response', async () => {
    mockFetch(() => Promise.resolve({ ok: false, json: () => Promise.resolve(payload) }))
    await expect(loadTeachings()).resolves.toBeNull()
  })

  it('returns null on a response that is not the corpus', async () => {
    mockFetch(() => Promise.resolve({ ok: true, json: () => Promise.resolve({ nope: true }) }))
    await expect(loadTeachings()).resolves.toBeNull()
  })

  it('returns null when the body is not JSON at all', async () => {
    mockFetch(() =>
      Promise.resolve({ ok: true, json: () => Promise.reject(new SyntaxError('not json')) })
    )
    await expect(loadTeachings()).resolves.toBeNull()
  })
})
