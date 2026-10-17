/** Small fetch client usable from a native mobile app or Node 22.
 * Inject secure token storage supplied by the actual app.
 * baseUrl must point to this API (use your machine's LAN address on a physical device).
 */
export class ApiError extends Error {
  constructor(status, error) {
    super(error.message);
    this.name = 'ApiError';
    this.status = status;
    this.code = error.code;
    this.fields = error.fields ?? [];
  }
}

export function createApiClient(baseUrl, { getToken, saveToken }, fetchImpl = fetch) {
  const base = baseUrl.replace(/\/$/, '');
  async function request(path, { method = 'GET', body, timeoutMs = 15000 } = {}) {
    if (!path.startsWith('/api/') || path.startsWith('//')) {
      throw new Error('Use a relative /api/ route');
    }
    const token = await getToken();
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    let response;
    try {
      response = await fetchImpl(base + path, {
        method,
        headers: {
          Accept: 'application/json',
          ...(body === undefined ? {} : { 'Content-Type': 'application/json' }),
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        ...(body === undefined ? {} : { body: JSON.stringify(body) }),
        signal: controller.signal,
      });
    } catch (error) {
      // Writes are never automatically retried: the server may have received them.
      throw new ApiError(0, {
        code: controller.signal.aborted ? 'timeout' : 'network_error',
        message: 'Could not reach the API. Check the connection before retrying.',
      });
    } finally {
      clearTimeout(timer);
    }
    const payload = response.status === 204 ? null : await response.json();
    if (!response.ok) {
      if (response.status === 401) await saveToken(null);
      throw new ApiError(response.status, payload.error ?? { code: 'http_error', message: 'Request failed' });
    }
    return payload;
  }
  async function authenticate(path, body) {
    const session = await request(path, { method: 'POST', body });
    await saveToken(session.session_token);
    return session;
  }
  return {
    request,
    login: (username, password) => authenticate('/api/login/', { username, password }),
    signup: (body) => authenticate('/api/signup/', body),
    verify: (challenge_id, code) => authenticate('/api/auth/verify/', { challenge_id, code }),
    async logout() {
      await request('/api/logout/', { method: 'POST' });
      await saveToken(null);
    },
  };
}
