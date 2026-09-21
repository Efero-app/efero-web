import { afterEach, describe, expect, it, vi } from 'vitest'
import { forwardPartnerIntake } from './partner-intake'

const id = '5d7e20a7-9cbb-4710-81e0-676a3fa322fd'
const request = (body: unknown) => new Request('http://localhost/api/partners/applications', {
  method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body),
})
afterEach(() => { vi.unstubAllEnvs(); vi.unstubAllGlobals() })
describe('partner intake bridge', () => {
  it('fails closed if the backend is not configured', async () => {
    vi.stubEnv('EFERO_PARTNER_API_URL', '')
    const fetchMock = vi.fn(); vi.stubGlobal('fetch', fetchMock)
    expect((await forwardPartnerIntake(request({ clientOperationId: id }), 'applications')).status).toBe(503)
    expect(fetchMock).not.toHaveBeenCalled()
  })
  it('rejects untrusted destinations, oversized bodies and missing operation identity', async () => {
    vi.stubEnv('EFERO_PARTNER_API_URL', 'https://untrusted.example')
    const fetchMock = vi.fn(); vi.stubGlobal('fetch', fetchMock)
    expect((await forwardPartnerIntake(request({ clientOperationId: id }), 'applications')).status).toBe(503)
    expect((await forwardPartnerIntake(request({}), 'applications')).status).toBe(400)
    expect((await forwardPartnerIntake(request({ clientOperationId: id, text: 'a'.repeat(17000) }), 'applications')).status).toBe(413)
    expect(fetchMock).not.toHaveBeenCalled()
  })
  it('forwards only to public intake and confirms authoritative accepted receipts', async () => {
    vi.stubEnv('EFERO_PARTNER_API_URL', 'http://127.0.0.1:8798')
    const fetchMock = vi.fn().mockResolvedValue(new Response(JSON.stringify({ ok: true, data: { accepted: true } })))
    vi.stubGlobal('fetch', fetchMock)
    const response = await forwardPartnerIntake(request({ clientOperationId: id, consent: true }), 'referrals')
    expect(response.status).toBe(200)
    expect(response.headers.get('cache-control')).toBe('no-store')
    expect(String(fetchMock.mock.calls[0]?.[0])).toBe('http://127.0.0.1:8798/v1/public/partners/referrals')
    expect(fetchMock.mock.calls[0]?.[1].headers['idempotency-key']).toBe(id)
  })
  it('never claims success for an invalid response or failed backend', async () => {
    vi.stubEnv('EFERO_PARTNER_API_URL', 'http://127.0.0.1:8798')
    const fetchMock = vi.fn().mockResolvedValueOnce(new Response('{}'))
      .mockResolvedValueOnce(new Response('{}', { status: 429 }))
      .mockResolvedValueOnce(new Response('{}', { status: 400 }))
    vi.stubGlobal('fetch', fetchMock)
    expect((await forwardPartnerIntake(request({ clientOperationId: id }), 'applications')).status).toBe(502)
    expect((await forwardPartnerIntake(request({ clientOperationId: id }), 'applications')).status).toBe(429)
    expect((await forwardPartnerIntake(request({ clientOperationId: id }), 'applications')).status).toBe(400)
  })
})
